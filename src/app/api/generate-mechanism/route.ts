import { NextRequest, NextResponse } from "next/server";
import {
  getDeepSeekClient,
  MECHANISM_SYSTEM_PROMPT,
  REVIEW_SYSTEM_PROMPT,
} from "@/lib/deepseek";

/**
 * 非流式版本：直接返回最终结果（含审核）
 * 适合用于程序调用或测试
 */
export async function POST(request: NextRequest) {
  try {
    const { query, enableReview = true } = await request.json();

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json(
        { error: "请输入反应名称或反应物" },
        { status: 400 }
      );
    }

    const client = getDeepSeekClient();

    // 阶段 1: 生成
    const genResponse = await client.chat.completions.create({
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
    });

    const content = genResponse.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "AI 未返回有效内容" },
        { status: 500 }
      );
    }

    const reaction = parseJSON(content);
    if (!reaction) {
      return NextResponse.json(
        { error: "AI 返回的内容格式有误，请重试" },
        { status: 500 }
      );
    }
    reaction.id = `ai-${Date.now()}`;

    if (!enableReview) {
      return NextResponse.json({ reaction });
    }

    // 阶段 2: 审核
    const reviewResponse = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: REVIEW_SYSTEM_PROMPT },
        {
          role: "user",
          content: `请审核以下反应机理（原始问题："${query.trim()}"）：\n\n${JSON.stringify(reaction, null, 2)}`,
        },
      ],
      temperature: 0.2,
      max_tokens: 6000,
    });

    const reviewContent = reviewResponse.choices[0]?.message?.content;
    const review = reviewContent ? parseJSON(reviewContent) : null;

    if (review?.revisedReaction) {
      review.revisedReaction.id = reaction.id;
    }

    return NextResponse.json({ reaction, review });
  } catch (err) {
    console.error("Generate error:", err);
    const message =
      err instanceof Error ? err.message : "生成失败，请检查 API Key 配置";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function parseJSON<T = { id?: string; revisedReaction?: { id?: string } }>(
  text: string
): T | null {
  let s = text.trim();
  if (s.startsWith("```")) {
    s = s.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }
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
