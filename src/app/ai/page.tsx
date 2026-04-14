"use client";

import { useState, useRef } from "react";
import { Reaction } from "@/types";
import MechanismViewer from "@/components/MechanismViewer";
import EnergyDiagram from "@/components/EnergyDiagram";
import ChemFormula from "@/components/ChemFormula";

const EXAMPLE_QUERIES = [
  "Diels-Alder 反应",
  "醇的酸催化脱水（E1）",
  "Grignard 反应",
  "Friedel-Crafts 烷基化",
  "酯的碱性水解（皂化反应）",
  "Aldol 缩合反应",
  "Beckmann 重排",
  "Wittig 反应",
];

export default function AIPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [streamText, setStreamText] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const generate = async (input?: string) => {
    const q = input ?? query;
    if (!q.trim()) return;

    // 取消之前的请求
    if (abortRef.current) {
      abortRef.current.abort();
    }

    setLoading(true);
    setError(null);
    setReaction(null);
    setStreamText("");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/generate-mechanism/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q.trim() }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("无法读取响应流");

      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        const lines = text.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.content) {
              fullContent += parsed.content;
              setStreamText(fullContent);
            }
          } catch {
            // skip unparseable chunks
          }
        }
      }

      // 解析完整的 JSON
      let jsonStr = fullContent.trim();
      if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
      }

      const parsed = JSON.parse(jsonStr);
      parsed.id = `ai-${Date.now()}`;
      setReaction(parsed as Reaction);
      setStreamText("");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(
        err instanceof Error ? err.message : "生成失败，请稍后重试"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-extrabold text-foreground">
          AI 机理生成
        </h1>
        <p className="text-muted">
          输入任意有机反应，AI 为你生成完整的反应机理解析
        </p>
        <p className="mt-1 text-xs text-amber-600">
          由 DeepSeek AI 生成，仅供学习参考，请结合教材验证
        </p>
      </div>

      {/* 搜索框 */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入反应名称、反应物→产物、或描述反应..."
            className="flex-1 rounded-xl border border-border bg-surface px-5 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/10"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                生成中
              </span>
            ) : (
              "生成机理"
            )}
          </button>
        </div>
      </form>

      {/* 示例查询 */}
      {!reaction && !loading && (
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium text-muted">试试这些：</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setQuery(q);
                  generate(q);
                }}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 错误提示 */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
          {error.includes("API Key") && (
            <p className="mt-2 text-xs text-red-500">
              请在项目根目录的 .env.local 文件中配置 DEEPSEEK_API_KEY
            </p>
          )}
        </div>
      )}

      {/* 流式输出预览 */}
      {loading && streamText && (
        <div className="mb-6 rounded-xl border border-border bg-surface p-6">
          <div className="mb-3 flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm font-medium text-primary">
              AI 正在生成机理...
            </span>
          </div>
          <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap break-all rounded-lg bg-background p-4 font-mono text-xs text-muted">
            {streamText}
          </pre>
        </div>
      )}

      {/* Loading without stream text yet */}
      {loading && !streamText && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <svg className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-muted">正在连接 AI 服务...</p>
          </div>
        </div>
      )}

      {/* 生成结果展示 */}
      {reaction && <AIReactionResult reaction={reaction} />}
    </div>
  );
}

function AIReactionResult({ reaction }: { reaction: Reaction }) {
  const hasIntermediate =
    reaction.mechanism && reaction.mechanism.length > 1;

  return (
    <div>
      {/* AI 标记 */}
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <p className="text-xs text-amber-700">
          🤖 以下内容由 DeepSeek AI 生成，仅供学习参考。建议结合教材和文献验证机理的准确性。
        </p>
      </div>

      {/* 标题 */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-foreground">
          {reaction.name}
        </h2>
        {reaction.nameEn && (
          <p className="mt-1 text-sm text-muted">{reaction.nameEn}</p>
        )}
        <p className="mt-3 text-base leading-relaxed text-foreground/80">
          {reaction.summary}
        </p>
      </div>

      {/* 反应方程式 */}
      {reaction.equation && (
        <div className="mb-8 rounded-xl border border-border bg-surface p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            反应方程式
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3 text-lg">
            {reaction.equation.reactants?.map((r, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-muted">+</span>}
                <ChemFormula formula={r} className="text-xl" />
              </span>
            ))}

            <div className="mx-4 flex flex-col items-center">
              <span className="chem-arrow text-2xl">→</span>
              {reaction.equation.conditions &&
                reaction.equation.conditions.length > 0 && (
                  <span className="text-xs text-muted">
                    {reaction.equation.conditions.join(", ")}
                  </span>
                )}
            </div>

            {reaction.equation.products?.map((p, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-muted">+</span>}
                <ChemFormula formula={p} className="text-xl" />
              </span>
            ))}
          </div>
          {reaction.conditions && (
            <p className="mt-4 text-center text-sm text-muted">
              条件：{reaction.conditions}
            </p>
          )}
        </div>
      )}

      {/* 能量图 */}
      <div className="mb-8">
        <EnergyDiagram
          type={hasIntermediate ? "two-step" : "one-step"}
          labels={
            hasIntermediate
              ? { intermediate: "中间体" }
              : { transitionState: "过渡态" }
          }
        />
      </div>

      {/* 反应机理 */}
      {reaction.mechanism && reaction.mechanism.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-6 text-2xl font-bold text-foreground">
            反应机理
          </h3>
          <MechanismViewer
            steps={reaction.mechanism}
            sideReactions={reaction.sideReactions}
          />
        </div>
      )}

      {/* 要点 */}
      {reaction.keyPoints && reaction.keyPoints.length > 0 && (
        <div className="mb-8 rounded-xl border border-border bg-surface p-6">
          <h3 className="mb-4 text-lg font-bold text-foreground">
            要点总结
          </h3>
          <ul className="space-y-2">
            {reaction.keyPoints.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <span className="mt-0.5 text-primary">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 影响因素 */}
      {reaction.factors && reaction.factors.length > 0 && (
        <div className="mb-8 rounded-xl border border-border bg-surface p-6">
          <h3 className="mb-4 text-lg font-bold text-foreground">
            影响因素
          </h3>
          <ul className="space-y-2">
            {reaction.factors.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <span className="mt-0.5 text-accent">●</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
