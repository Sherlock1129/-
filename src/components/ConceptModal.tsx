"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { concepts } from "@/data/concepts";
import { KeyConcept } from "@/types";

interface ConceptModalProps {
  conceptId: string;
  fallback?: KeyConcept;
  onClose: () => void;
}

export default function ConceptModal({
  conceptId,
  fallback,
  onClose,
}: ConceptModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const concept = concepts[conceptId] ?? fallback;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!concept) return null;

  const hasDetailed = concept.detailed && concept.detailed.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-surface shadow-2xl"
      >
        {/* 标题区 */}
        <div className="relative border-b border-border bg-gradient-to-br from-primary/10 via-surface to-surface p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                  📖
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  核心概念
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {concept.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {concept.brief}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
              aria-label="关闭"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 详细内容 */}
        <div className="max-h-[50vh] overflow-y-auto p-6">
          {hasDetailed ? (
            <RichText text={concept.detailed} />
          ) : (
            <div className="rounded-xl bg-surface-subtle p-4 text-center">
              <p className="text-sm text-muted">
                当前概念没有更详细的内容，可在「概念索引」中查看预置的核心概念详解。
              </p>
            </div>
          )}
        </div>

        {/* 相关概念 */}
        {concept.relatedConcepts && concept.relatedConcepts.length > 0 && (
          <div className="border-t border-border bg-surface-subtle px-6 py-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
              相关概念
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {concept.relatedConcepts.map((id) => {
                const related = concepts[id];
                if (!related) return null;
                return (
                  <span
                    key={id}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-dark"
                  >
                    {related.name}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function RichText({ text }: { text: string }) {
  return (
    <div className="space-y-3">
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
