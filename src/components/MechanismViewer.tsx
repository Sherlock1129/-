"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MechanismStep, SideReaction, KeyConcept } from "@/types";
import ConceptModal from "./ConceptModal";
import ChemFormula from "./ChemFormula";

interface MechanismViewerProps {
  steps: MechanismStep[];
  sideReactions?: SideReaction[];
}

export default function MechanismViewer({
  steps,
  sideReactions,
}: MechanismViewerProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const [activeConcept, setActiveConcept] = useState<string | null>(null);
  const [activeConceptFallback, setActiveConceptFallback] = useState<
    KeyConcept | undefined
  >();
  const [showSideReaction, setShowSideReaction] = useState<number | null>(null);

  // 为 AI 生成的内联 concept 构建查找表
  const inlineConcepts: Record<string, KeyConcept> = {};
  for (const step of steps) {
    if (step.keyConcepts) {
      for (const c of step.keyConcepts) {
        inlineConcepts[c.id] = c;
      }
    }
  }

  const toggleStep = (id: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSteps(new Set(steps.map((s) => s.id)));
  };

  const collapseAll = () => {
    setExpandedSteps(new Set());
  };

  return (
    <div>
      {/* 控制栏 */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-muted">
          共 {steps.length} 步
        </span>
        <div className="flex gap-1 text-xs">
          <button
            onClick={expandAll}
            className="rounded-lg px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            全部展开
          </button>
          <button
            onClick={collapseAll}
            className="rounded-lg px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            全部收起
          </button>
        </div>
      </div>

      {/* 主反应机理 */}
      <div className="relative">
        {steps.map((step, index) => {
          const isExpanded = expandedSteps.has(step.id);
          const isLast = index === steps.length - 1;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative flex gap-4"
            >
              {/* 时间线 */}
              <div className="flex flex-col items-center">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-sm font-bold text-white shadow-md shadow-primary/20">
                  {step.id}
                </div>
                {!isLast && (
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/30 via-primary/15 to-primary/30" />
                )}
              </div>

              {/* 内容卡片 */}
              <div className={`flex-1 ${isLast ? "" : "pb-6"}`}>
                <motion.div
                  className="overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-sm transition-shadow hover:shadow-md"
                  animate={{
                    borderColor: isExpanded
                      ? "rgba(13, 148, 136, 0.3)"
                      : "rgb(231 229 228 / 0.6)",
                  }}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-foreground">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* 结构变化 */}
                    <div className="mt-4 rounded-xl bg-gradient-to-br from-surface-subtle to-background px-4 py-3.5 ring-1 ring-border/40">
                      {step.structures.map((s, i) => (
                        <div
                          key={i}
                          className="text-center text-sm leading-relaxed"
                        >
                          <ChemFormula formula={s} />
                        </div>
                      ))}
                    </div>

                    {/* 关键概念标签 */}
                    {step.keyConcepts && step.keyConcepts.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {step.keyConcepts.map((concept) => (
                          <button
                            key={concept.id}
                            onClick={() => {
                              setActiveConcept(concept.id);
                              setActiveConceptFallback(
                                inlineConcepts[concept.id]
                              );
                            }}
                            className="group inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary-dark transition-all hover:border-primary/40 hover:bg-primary/10"
                            title={concept.brief}
                          >
                            <span className="transition-transform group-hover:scale-110">
                              📖
                            </span>
                            {concept.name}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* 展开按钮 */}
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="mt-4 flex w-full items-center justify-between rounded-xl border border-border/50 bg-surface-subtle px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/5"
                    >
                      <span className="flex items-center gap-2 text-primary-dark">
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
                        {isExpanded ? "收起详细解释" : "深入理解这一步"}
                      </span>
                      <motion.svg
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="h-4 w-4 text-muted"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </motion.svg>
                    </button>
                  </div>

                  {/* 详细解释（可展开） */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/60 bg-gradient-to-br from-primary/5 via-surface to-surface px-5 py-4">
                          <RichText text={step.detailedExplanation} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 副反应 */}
      {sideReactions && sideReactions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="mb-5 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
              ⚡
            </span>
            <h3 className="text-lg font-bold text-foreground">
              竞争副反应
            </h3>
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
              {sideReactions.length}
            </span>
          </div>
          <div className="space-y-3">
            {sideReactions.map((sr, index) => {
              const isOpen = showSideReaction === index;
              const hasDetailedMechanism = sr.mechanism && sr.mechanism.length > 0;

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-orange-50/50 to-amber-50/50"
                >
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-base">
                        ⚠️
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-amber-900">{sr.name}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-amber-800/80">
                          {sr.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-amber-900">
                        <span className="text-muted">条件：</span>
                        {sr.condition}
                      </span>
                      {sr.products.map((p, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-white/70 px-3 py-1 text-xs text-amber-900"
                        >
                          <span className="text-muted">产物：</span>
                          <ChemFormula formula={p} />
                        </span>
                      ))}
                    </div>

                    {hasDetailedMechanism && (
                      <button
                        onClick={() =>
                          setShowSideReaction(isOpen ? null : index)
                        }
                        className="mt-4 flex items-center gap-1.5 rounded-lg bg-white/70 px-3 py-1.5 text-sm font-medium text-amber-900 transition-colors hover:bg-white"
                      >
                        {isOpen ? "收起机理" : "查看副反应机理"}
                        <motion.svg
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </motion.svg>
                      </button>
                    )}
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && hasDetailedMechanism && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-accent/20 bg-white/40 p-5">
                          <div className="space-y-3">
                            {sr.mechanism!.map((step) => (
                              <div
                                key={step.id}
                                className="rounded-xl bg-white p-4 shadow-sm"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                                    {step.id}
                                  </span>
                                  <h5 className="font-semibold text-amber-900">
                                    {step.title}
                                  </h5>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-amber-800/80">
                                  {step.description}
                                </p>
                                <div className="mt-2 rounded-lg bg-amber-50/60 px-3 py-2 text-center text-sm">
                                  {step.structures.map((s, i) => (
                                    <div key={i}>
                                      <ChemFormula formula={s} />
                                    </div>
                                  ))}
                                </div>
                                {step.detailedExplanation && (
                                  <details className="mt-2">
                                    <summary className="cursor-pointer text-xs font-medium text-amber-700 hover:text-amber-900">
                                      展开详解
                                    </summary>
                                    <div className="mt-2 text-xs">
                                      <RichText
                                        text={step.detailedExplanation}
                                      />
                                    </div>
                                  </details>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* 概念弹窗 */}
      <AnimatePresence>
        {activeConcept && (
          <ConceptModal
            conceptId={activeConcept}
            fallback={activeConceptFallback}
            onClose={() => {
              setActiveConcept(null);
              setActiveConceptFallback(undefined);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * 解析 markdown-lite 文本：**bold** 和换行
 */
function RichText({ text }: { text: string }) {
  return (
    <div className="space-y-2.5">
      {text.split("\n\n").map((paragraph, i) => (
        <div key={i}>
          {paragraph.split("\n").map((line, j) => {
            const parts = line.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p
                key={j}
                className="text-sm leading-relaxed text-foreground/85"
              >
                {parts.map((part, k) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                      <strong
                        key={k}
                        className="font-semibold text-primary-dark"
                      >
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return <span key={k}>{part}</span>;
                })}
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
}
