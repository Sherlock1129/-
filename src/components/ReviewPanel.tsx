"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ReviewResult } from "@/types";

interface ReviewPanelProps {
  review: ReviewResult;
}

const STATUS_CONFIG = {
  approved: {
    label: "审核通过",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "✓",
    iconBg: "bg-emerald-500",
  },
  "minor-issues": {
    label: "有轻微问题",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "!",
    iconBg: "bg-amber-500",
  },
  "major-issues": {
    label: "存在明显问题",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "⚠",
    iconBg: "bg-red-500",
  },
} as const;

const SEVERITY_CONFIG = {
  critical: { label: "严重", color: "bg-red-100 text-red-700", icon: "⛔" },
  warning: { label: "警告", color: "bg-amber-100 text-amber-700", icon: "⚠️" },
  suggestion: { label: "建议", color: "bg-blue-100 text-blue-700", icon: "💡" },
} as const;

export default function ReviewPanel({ review }: ReviewPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[review.status] ?? STATUS_CONFIG.approved;
  const score = Math.max(0, Math.min(100, review.correctness || 0));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-2xl border ${cfg.border} ${cfg.bg}`}
    >
      <div className="p-5">
        <div className="flex items-center gap-4">
          {/* 状态图标 */}
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${cfg.iconBg} text-lg font-bold text-white`}
          >
            {cfg.icon}
          </div>

          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className={`text-sm font-bold ${cfg.color}`}>
                {cfg.label}
              </span>
              <span className="rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium text-muted">
                第二轮 AI 审核
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">
              {review.summary}
            </p>
          </div>

          {/* 分数圆环 */}
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                className={cfg.color}
                initial={{ strokeDasharray: "0 264" }}
                animate={{ strokeDasharray: `${(score / 100) * 264} 264` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </svg>
            <div className="text-center">
              <span className={`text-xl font-bold ${cfg.color}`}>{score}</span>
              <span className="block text-[9px] font-medium uppercase tracking-wider text-muted">
                分
              </span>
            </div>
          </div>
        </div>

        {/* 问题列表 */}
        {review.issues && review.issues.length > 0 && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 flex w-full items-center justify-between rounded-xl bg-white/60 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white"
            >
              <span className="flex items-center gap-2">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                审核详情（{review.issues.length} 条）
              </span>
              <motion.svg
                animate={{ rotate: expanded ? 180 : 0 }}
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

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2">
                    {review.issues.map((issue, i) => {
                      const sev =
                        SEVERITY_CONFIG[issue.severity] ??
                        SEVERITY_CONFIG.suggestion;
                      return (
                        <div
                          key={i}
                          className="rounded-xl bg-white/80 p-4 ring-1 ring-black/5"
                        >
                          <div className="mb-2 flex items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${sev.color}`}
                            >
                              <span>{sev.icon}</span>
                              {sev.label}
                            </span>
                            <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-[10px] text-muted">
                              {issue.location}
                            </code>
                          </div>
                          <p className="text-sm text-foreground/85">
                            <strong className="font-semibold">问题：</strong>
                            {issue.problem}
                          </p>
                          <p className="mt-1 text-sm text-foreground/70">
                            <strong className="font-semibold text-primary-dark">
                              修正：
                            </strong>
                            {issue.correction}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
}
