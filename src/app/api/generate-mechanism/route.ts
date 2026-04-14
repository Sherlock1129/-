import { NextRequest, NextResponse } from "next/server";
import { getDeepSeekClient, MECHANISM_SYSTEM_PROMPT } from "@/lib/deepseek";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json(
        { error: "请输入反应名称或反应物" },
        { status: 400 }
      );
    }

    const client = getDeepSeekClient();

    const response = await client.chat.completions.create({
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

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "AI 未返回有效内容" },
        { status: 500 }
      );
    }

    // 尝试解析 JSON — DeepSeek 有时会用 ```json ``` 包裹
    let jsonStr = content.trim();
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    const data = JSON.parse(jsonStr);

    // 补上 id 字段
    data.id = `ai-${Date.now()}`;

    return NextResponse.json({ reaction: data });
  } catch (err) {
    console.error("Generate mechanism error:", err);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "AI 返回的内容格式有误，请重试" },
        { status: 500 }
      );
    }

    const message =
      err instanceof Error ? err.message : "生成失败，请检查 API Key 配置";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
