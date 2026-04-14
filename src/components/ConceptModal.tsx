"use client";

import { useEffect, useRef } from "react";
import { concepts } from "@/data/concepts";
import { KeyConcept } from "@/types";

interface ConceptModalProps {
  conceptId: string;
  /** AI 生成的概念（当预定义库中找不到时使用） */
  fallback?: KeyConcept;
  onClose: () => void;
}

export default function ConceptModal({ conceptId, fallback, onClose }: ConceptModalProps) {
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
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-surface p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {concept.name}
            </h2>
            <p className="mt-1 text-sm text-muted">{concept.brief}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
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

        {hasDetailed ? (
          <div className="prose prose-sm max-w-none">
            {concept.detailed.split("\n\n").map((paragraph, i) => (
              <div key={i} className="mb-4">
                {paragraph.split("\n").map((line, j) => {
                  const parts = line.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={j} className="mb-1 text-sm leading-relaxed text-foreground/80">
                      {parts.map((part, k) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return (
                            <strong key={k} className="font-semibold text-foreground">
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
        ) : (
          <p className="text-sm leading-relaxed text-foreground/80">
            {concept.brief}
          </p>
        )}

        {concept.relatedConcepts && concept.relatedConcepts.length > 0 && (
          <div className="mt-6 border-t border-border pt-4">
            <h3 className="mb-2 text-sm font-semibold text-muted">
              相关概念
            </h3>
            <div className="flex flex-wrap gap-2">
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
      </div>
    </div>
  );
}
