"use client";

import { useState } from "react";
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
  const [activeConceptFallback, setActiveConceptFallback] = useState<KeyConcept | undefined>();
  const [showSideReaction, setShowSideReaction] = useState<number | null>(null);

  // Build a lookup of inline concepts from all steps (for AI-generated data)
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
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div>
      {/* 主反应机理 */}
      <div className="relative">
        {steps.map((step, index) => {
          const isExpanded = expandedSteps.has(step.id);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="relative flex gap-4">
              {/* 时间线 */}
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {step.id}
                </div>
                {!isLast && (
                  <div className="w-0.5 flex-1 bg-primary/20" />
                )}
              </div>

              {/* 内容 */}
              <div className={`flex-1 ${isLast ? "" : "pb-8"}`}>
                <div className="rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/20">
                  <h3 className="text-base font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {step.description}
                  </p>

                  {/* 结构简式展示 */}
                  <div className="mt-3 rounded-lg bg-background px-4 py-3">
                    {step.structures.map((s, i) => (
                      <div
                        key={i}
                        className="text-center font-mono text-sm"
                      >
                        <ChemFormula formula={s} />
                      </div>
                    ))}
                  </div>

                  {/* 关键概念标签 */}
                  {step.keyConcepts && step.keyConcepts.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {step.keyConcepts.map((concept) => (
                        <button
                          key={concept.id}
                          onClick={() => {
                            setActiveConcept(concept.id);
                            setActiveConceptFallback(inlineConcepts[concept.id]);
                          }}
                          className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary-dark transition-colors hover:bg-primary/10"
                          title={concept.brief}
                        >
                          📖 {concept.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* 展开/收起详细解释 */}
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="mt-3 flex items-center text-sm font-medium text-primary transition-colors hover:text-primary-dark"
                  >
                    {isExpanded ? "收起详解" : "深入理解"}
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
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
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 rounded-lg border-l-4 border-primary/30 bg-primary/5 p-4">
                      {step.detailedExplanation
                        .split("\n\n")
                        .map((paragraph, i) => (
                          <div key={i} className="mb-3 last:mb-0">
                            {paragraph.split("\n").map((line, j) => {
                              const parts = line.split(/(\*\*[^*]+\*\*)/g);
                              return (
                                <p
                                  key={j}
                                  className="mb-1 text-sm leading-relaxed text-foreground/80"
                                >
                                  {parts.map((part, k) => {
                                    if (
                                      part.startsWith("**") &&
                                      part.endsWith("**")
                                    ) {
                                      return (
                                        <strong
                                          key={k}
                                          className="font-semibold text-foreground"
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
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 副反应 */}
      {sideReactions && sideReactions.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-4 text-lg font-bold text-foreground">
            ⚡ 竞争副反应
          </h3>
          <div className="space-y-4">
            {sideReactions.map((sr, index) => (
              <div
                key={index}
                className="rounded-xl border border-amber-200 bg-amber-50 p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-amber-900">{sr.name}</h4>
                    <p className="mt-1 text-sm text-amber-800/80">
                      {sr.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                    条件：{sr.condition}
                  </span>
                  {sr.products.map((p, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800"
                    >
                      产物：<ChemFormula formula={p} />
                    </span>
                  ))}
                </div>

                {/* 副反应机理（如果有的话） */}
                {sr.mechanism && sr.mechanism.length > 0 && (
                  <>
                    <button
                      onClick={() =>
                        setShowSideReaction(
                          showSideReaction === index ? null : index
                        )
                      }
                      className="mt-3 flex items-center text-sm font-medium text-amber-700 transition-colors hover:text-amber-900"
                    >
                      {showSideReaction === index
                        ? "收起机理"
                        : "查看副反应机理"}
                      <svg
                        className={`ml-1 h-4 w-4 transition-transform ${
                          showSideReaction === index ? "rotate-180" : ""
                        }`}
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
                      </svg>
                    </button>
                    {showSideReaction === index && (
                      <div className="mt-4 space-y-3 border-t border-amber-200 pt-4">
                        {sr.mechanism.map((step) => (
                          <div
                            key={step.id}
                            className="rounded-lg bg-white/60 p-4"
                          >
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-800">
                                {step.id}
                              </span>
                              <h5 className="font-semibold text-amber-900">
                                {step.title}
                              </h5>
                            </div>
                            <p className="mt-2 text-sm text-amber-800/80">
                              {step.description}
                            </p>
                            <div className="mt-2 rounded bg-amber-50 px-3 py-2">
                              {step.structures.map((s, i) => (
                                <div
                                  key={i}
                                  className="text-center font-mono text-xs"
                                >
                                  <ChemFormula formula={s} />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 概念弹窗 */}
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
    </div>
  );
}
