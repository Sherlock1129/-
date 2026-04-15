"use client";

import { motion } from "framer-motion";

export type PipelinePhase = "idle" | "generating" | "reviewing" | "done" | "error";

interface PipelineProgressProps {
  phase: PipelinePhase;
}

const PHASES: { key: PipelinePhase; label: string; icon: string }[] = [
  { key: "generating", label: "AI 生成机理", icon: "🧪" },
  { key: "reviewing", label: "专家审核", icon: "🔬" },
  { key: "done", label: "完成", icon: "✨" },
];

export default function PipelineProgress({ phase }: PipelineProgressProps) {
  const currentIndex = PHASES.findIndex((p) => p.key === phase);

  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-5">
      <div className="flex items-center justify-between">
        {PHASES.map((p, i) => {
          const isActive = i === currentIndex;
          const isDone = i < currentIndex || phase === "done";
          const isPending = i > currentIndex && phase !== "done";

          return (
            <div key={p.key} className="flex flex-1 items-center">
              {/* 节点 */}
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: isActive ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isActive ? Infinity : 0,
                  }}
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full text-lg transition-colors ${
                    isDone
                      ? "bg-primary text-white"
                      : isActive
                      ? "bg-primary text-white"
                      : "bg-surface-subtle text-muted ring-2 ring-border"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.4],
                        opacity: [0.4, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                  <span className="relative">
                    {isDone && p.key !== "done" ? "✓" : p.icon}
                  </span>
                </motion.div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isActive
                      ? "text-primary-dark"
                      : isDone
                      ? "text-foreground"
                      : "text-muted"
                  }`}
                >
                  {p.label}
                </span>
              </div>

              {/* 连接线 */}
              {i < PHASES.length - 1 && (
                <div className="relative mx-2 h-0.5 flex-1 bg-border">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-primary"
                    initial={{ width: "0%" }}
                    animate={{
                      width: isDone ? "100%" : isActive ? "50%" : "0%",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
