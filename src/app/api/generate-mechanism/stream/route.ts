import { NextRequest } from "next/server";
import {
  getDeepSeekClient,
  MECHANISM_SYSTEM_PROMPT,
  REVIEW_SYSTEM_PROMPT,
} from "@/lib/deepseek";
import type { Reaction, ReviewResult } from "@/types";

/**
 * 流式生成 + 审核管道
 *
 * 事件流格式（SSE）：
 *   event: phase      — 阶段变化 ("generating" | "reviewing" | "done")
 *   event: token      — 生成阶段的 token 流
 *   event: reaction   — 生成完成，返回 reaction JSON
 *   event: review     — 审核完成，返回 review 结果
 *   event: error      — 错误
 */
export async function POST(request: NextRequest) {
  try {
    const { query, enableReview = true } = await request.json();

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "请输入反应名称或反应物" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const client = getDeepSeekClient();
    const encoder = new TextEncoder();

    const send = (
      controller: ReadableStreamDefaultController,
      event: string,
      data: unknown
    ) => {
      controller.enqueue(
        encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
      );
    };

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // ========== 阶段 1: 生成 ==========
          send(controller, "phase", { phase: "generating", label: "AI 正在生成机理" });

          const genStream = await client.chat.completions.create({
            model: "deepseek-chat",
            messages: [
              { role: "system", content: MECHANISM_SYSTEM_PROMPT },
              {
                role: "user",
                content: `请给出以下有机反应的完整机理解析：${query.trim()}`,
              },
            ],
            temperature: 0.3,
            max_tokens: 4096,
            stream: true,
          });

          let fullContent = "";
          for await (const chunk of genStream) {
            const delta = chunk.choices[0]?.delta?.content;
            if (delta) {
              fullContent += delta;
              send(controller, "token", { content: delta });
            }
          }

          // 解析第一遍生成的 JSON
          const reaction = parseJSON<Reaction>(fullContent);
          if (!reaction) {
            send(controller, "error", { error: "AI 返回的内容格式有误，请重试" });
            controller.close();
            return;
          }
          reaction.id = `ai-${Date.now()}`;

          send(controller, "reaction", { reaction });

          // 如果不启用审核，直接结束
          if (!enableReview) {
            send(controller, "phase", { phase: "done" });
            controller.close();
            return;
          }

          // ========== 阶段 2: 审核 ==========
          send(controller, "phase", {
            phase: "reviewing",
            label: "化学专家 AI 正在审核...",
          });

          const reviewResponse = await client.chat.completions.create({
            model: "deepseek-chat",
            messages: [
              { role: "system", content: REVIEW_SYSTEM_PROMPT },
              {
                role: "user",
                content: `请审核以下 AI 生成的反应机理（原始问题："${query.trim()}"）：\n\n${JSON.stringify(
                  reaction,
                  null,
                  2
                )}`,
              },
            ],
            temperature: 0.2,
            max_tokens: 6000,
          });

          const reviewContent = reviewResponse.choices[0]?.message?.content;
          const review = reviewContent
            ? parseJSON<ReviewResult>(reviewContent)
            : null;

          if (!review) {
            // 审核失败，但主结果仍然可用
            send(controller, "review", {
              review: null,
              warning: "审核过程失败，仅展示初始生成结果",
            });
          } else {
            // 保留原 id
            if (review.revisedReaction) {
              review.revisedReaction.id = reaction.id;
            }
            send(controller, "review", { review });
          }

          send(controller, "phase", { phase: "done" });
          controller.close();
        } catch (err) {
          console.error("Pipeline error:", err);
          const message =
            err instanceof Error ? err.message : "生成失败";
          send(controller, "error", { error: message });
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "请求初始化失败，请检查 API Key 配置";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function parseJSON<T = unknown>(text: string): T | null {
  let s = text.trim();
  if (s.startsWith("```")) {
    s = s.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }
  // Try to extract JSON object if there's surrounding text
  const firstBrace = s.indexOf("{");
  const lastBrace = s.lastIndexOf("}");
  if (firstBrace > 0 && lastBrace > firstBrace) {
    s = s.slice(firstBrace, lastBrace + 1);
  }
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}
