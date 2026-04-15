"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reaction, ReviewResult } from "@/types";
import MechanismViewer from "@/components/MechanismViewer";
import EnergyDiagram from "@/components/EnergyDiagram";
import ChemFormula from "@/components/ChemFormula";
import PipelineProgress, {
  PipelinePhase,
} from "@/components/PipelineProgress";
import ReviewPanel from "@/components/ReviewPanel";

const EXAMPLE_QUERIES = [
  { q: "Diels-Alder 反应", tag: "周环" },
  { q: "醇的酸催化脱水（E1）", tag: "消除" },
  { q: "Grignard 试剂与醛反应", tag: "加成" },
  { q: "Friedel-Crafts 烷基化", tag: "取代" },
  { q: "酯的碱性水解（皂化）", tag: "取代" },
  { q: "Aldol 缩合反应", tag: "加成" },
  { q: "Beckmann 重排", tag: "重排" },
  { q: "Wittig 反应", tag: "加成" },
];

export default function AIPage() {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<PipelinePhase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [review, setReview] = useState<ReviewResult | null>(null);
  const [enableReview, setEnableReview] = useState(true);
  const [streamText, setStreamText] = useState("");
  const [showRaw, setShowRaw] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 结果出现后滚动到结果区
    if (reaction && phase === "done" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [reaction, phase]);

  const generate = async (input?: string) => {
    const q = input ?? query;
    if (!q.trim()) return;

    if (abortRef.current) abortRef.current.abort();

    setPhase("generating");
    setError(null);
    setReaction(null);
    setReview(null);
    setStreamText("");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/generate-mechanism/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q.trim(), enableReview }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "网络错误" }));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("无法读取响应流");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const ev of events) {
          if (!ev.trim()) continue;
          const lines = ev.split("\n");
          let eventType = "message";
          let data = "";
          for (const line of lines) {
            if (line.startsWith("event: ")) eventType = line.slice(7).trim();
            else if (line.startsWith("data: ")) data = line.slice(6).trim();
          }
          if (!data) continue;

          try {
            const payload = JSON.parse(data);
            handleEvent(eventType, payload);
          } catch {
            // skip invalid
          }
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "生成失败，请稍后重试");
      setPhase("error");
    }
  };

  const handleEvent = (type: string, payload: Record<string, unknown>) => {
    switch (type) {
      case "phase":
        setPhase(payload.phase as PipelinePhase);
        break;
      case "token":
        setStreamText((prev) => prev + (payload.content as string));
        break;
      case "reaction":
        setReaction(payload.reaction as Reaction);
        break;
      case "review":
        if (payload.review) {
          setReview(payload.review as ReviewResult);
          // 如果审核通过并有修正版本，采用修正后的 reaction
          const r = payload.review as ReviewResult;
          if (r.revisedReaction) {
            setReaction(r.revisedReaction);
          }
        }
        break;
      case "error":
        setError(payload.error as string);
        setPhase("error");
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate();
  };

  const reset = () => {
    setQuery("");
    setPhase("idle");
    setError(null);
    setReaction(null);
    setReview(null);
    setStreamText("");
  };

  const loading = phase === "generating" || phase === "reviewing";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-dark text-sm text-white">
            🤖
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            AI-Powered · DeepSeek
          </span>
        </div>
        <h1 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl">
          输入任意反应，
          <br />
          <span className="text-gradient">AI 生成 + 专家审核</span>
        </h1>
        <p className="mt-3 text-sm text-muted">
          第一个 AI 生成完整机理，第二个 AI 以化学博士视角审核修正，两轮校验后呈现给你。
        </p>
      </motion.div>

      {/* 输入区 */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="mb-6"
      >
        <div className="rounded-2xl border border-border bg-surface p-2 shadow-sm transition-shadow focus-within:border-primary/40 focus-within:shadow-md">
          <div className="flex items-center gap-2">
            <svg
              className="ml-3 h-5 w-5 shrink-0 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="如：Diels-Alder 反应、Grignard 试剂加醛、CH₃Br 与 KOH..."
              className="flex-1 bg-transparent px-2 py-3 text-sm text-foreground outline-none placeholder:text-muted-light"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary-dark px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <Spinner />
                    <span className="hidden sm:inline">处理中</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    生成
                  </>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* 选项 */}
        <div className="mt-3 flex items-center justify-between px-1">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={enableReview}
              onChange={(e) => setEnableReview(e.target.checked)}
              disabled={loading}
              className="h-3.5 w-3.5 rounded border-border-strong accent-primary"
            />
            <span>启用第二轮 AI 审核（推荐）</span>
          </label>
          {(reaction || error) && !loading && (
            <button
              type="button"
              onClick={reset}
              className="text-xs font-medium text-muted hover:text-foreground"
            >
              清空重试
            </button>
          )}
        </div>
      </motion.form>

      {/* 示例查询 */}
      {phase === "idle" && !reaction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
            试试这些
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_QUERIES.map((ex) => (
              <button
                key={ex.q}
                onClick={() => {
                  setQuery(ex.q);
                  generate(ex.q);
                }}
                className="group flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5"
              >
                <span>{ex.q}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary-dark">
                  {ex.tag}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* 错误 */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500 text-white">
                ✕
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-700">生成失败</p>
                <p className="mt-1 text-sm text-red-600">{error}</p>
                {error.includes("API Key") && (
                  <p className="mt-2 rounded-lg bg-red-100 px-3 py-2 text-xs text-red-700">
                    💡 请在项目根目录创建 <code className="font-mono">.env.local</code>{" "}
                    文件并配置 <code className="font-mono">DEEPSEEK_API_KEY=sk-xxx</code>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 管道进度 */}
      <AnimatePresence>
        {(phase === "generating" || phase === "reviewing" || (phase === "done" && review)) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <PipelineProgress phase={phase} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 流式输出 */}
      <AnimatePresence>
        {loading && streamText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => setShowRaw(!showRaw)}
              className="mb-2 flex items-center gap-2 text-xs font-medium text-muted hover:text-foreground"
            >
              <motion.svg
                animate={{ rotate: showRaw ? 90 : 0 }}
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
              {showRaw ? "隐藏" : "查看"}原始流式输出（{streamText.length} 字符）
            </button>
            {showRaw && (
              <pre className="max-h-40 overflow-y-auto rounded-xl border border-border/60 bg-surface-subtle p-4 font-mono text-[11px] leading-relaxed text-muted">
                {streamText}
              </pre>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 结果区 */}
      <div ref={resultRef}>
        <AnimatePresence mode="wait">
          {reaction && (phase === "reviewing" || phase === "done") && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* 审核面板 */}
              {review && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <ReviewPanel review={review} />
                </motion.div>
              )}

              {/* 若审核中，显示 placeholder */}
              {phase === "reviewing" && !review && (
                <div className="rounded-2xl border border-border/60 bg-surface p-5">
                  <div className="flex items-center gap-3">
                    <Spinner />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        化学专家 AI 正在审核...
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        检查化学正确性、机理完整性、立体化学等
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <AIReactionResult reaction={reaction} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function AIReactionResult({ reaction }: { reaction: Reaction }) {
  const hasIntermediate = reaction.mechanism && reaction.mechanism.length > 1;

  return (
    <div>
      {/* 标题 */}
      <div className="mb-8 rounded-2xl border border-border/60 bg-surface p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-dark">
            AI 生成
          </span>
          {reaction.category && (
            <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs text-muted">
              {reaction.category}
            </span>
          )}
        </div>
        <h2 className="text-2xl font-bold text-foreground">{reaction.name}</h2>
        {reaction.nameEn && (
          <p className="mt-1 text-xs uppercase tracking-wider text-muted">
            {reaction.nameEn}
          </p>
        )}
        <p className="mt-4 text-sm leading-relaxed text-foreground/80">
          {reaction.summary}
        </p>
      </div>

      {/* 反应方程式 */}
      {reaction.equation && (
        <div className="mb-6 rounded-2xl border border-border/60 bg-surface p-6">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
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
      <div className="mb-6">
        <EnergyDiagram
          type={hasIntermediate ? "two-step" : "one-step"}
          labels={
            hasIntermediate
              ? { intermediate: "中间体" }
              : { transitionState: "过渡态" }
          }
        />
      </div>

      {/* 机理 */}
      {reaction.mechanism && reaction.mechanism.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-5 text-xl font-bold text-foreground">
            反应机理
          </h3>
          <MechanismViewer
            steps={reaction.mechanism}
            sideReactions={reaction.sideReactions}
          />
        </div>
      )}

      {/* 要点 + 影响因素 */}
      <div className="grid gap-6 md:grid-cols-2">
        {reaction.keyPoints && reaction.keyPoints.length > 0 && (
          <div className="rounded-2xl border border-border/60 bg-surface p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
                ✓
              </span>
              要点总结
            </h3>
            <ul className="space-y-2">
              {reaction.keyPoints.map((p, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {reaction.factors && reaction.factors.length > 0 && (
          <div className="rounded-2xl border border-border/60 bg-surface p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/10 text-accent">
                ●
              </span>
              影响因素
            </h3>
            <ul className="space-y-2">
              {reaction.factors.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
