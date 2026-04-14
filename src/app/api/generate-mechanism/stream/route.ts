import { NextRequest } from "next/server";
import { getDeepSeekClient, MECHANISM_SYSTEM_PROMPT } from "@/lib/deepseek";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return new Response(JSON.stringify({ error: "请输入反应名称或反应物" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = getDeepSeekClient();

    const stream = await client.chat.completions.create({
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

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "流式传输中断" })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Stream init error:", err);
    const message =
      err instanceof Error ? err.message : "生成失败，请检查 API Key 配置";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
