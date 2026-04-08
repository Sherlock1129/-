"use client";

import { useState } from "react";
import { concepts } from "@/data/concepts";
import ConceptModal from "@/components/ConceptModal";

export default function ConceptsPage() {
  const [activeConcept, setActiveConcept] = useState<string | null>(null);
  const conceptList = Object.values(concepts);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-extrabold text-foreground">
        概念索引
      </h1>
      <p className="mb-8 text-muted">
        有机化学核心概念的详细解释，点击任意概念深入学习
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {conceptList.map((concept) => (
          <button
            key={concept.id}
            onClick={() => setActiveConcept(concept.id)}
            className="rounded-xl border border-border bg-surface p-6 text-left transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <h3 className="text-lg font-bold text-foreground">
              {concept.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {concept.brief}
            </p>
            <div className="mt-4 text-sm font-medium text-primary">
              深入学习 →
            </div>
          </button>
        ))}
      </div>

      {activeConcept && (
        <ConceptModal
          conceptId={activeConcept}
          onClose={() => setActiveConcept(null)}
        />
      )}
    </div>
  );
}
