"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { concepts } from "@/data/concepts";
import ConceptModal from "@/components/ConceptModal";

export default function ConceptsPage() {
  const [activeConcept, setActiveConcept] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const conceptList = Object.values(concepts);
  const filtered = query
    ? conceptList.filter(
        (c) =>
          c.name.includes(query) ||
          c.brief.includes(query) ||
          c.id.toLowerCase().includes(query.toLowerCase())
      )
    : conceptList;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="h-px w-8 bg-primary/40" />
          概念索引
        </div>
        <h1 className="mb-3 text-4xl font-extrabold text-foreground">
          有机化学核心概念
        </h1>
        <p className="text-muted">
          点击任意卡片深入学习，了解概念背后的原理、示例与相关反应
        </p>
      </motion.div>

      {/* 搜索 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索概念（如：碳正离子、Walden、SN1...）"
            className="w-full rounded-2xl border border-border/60 bg-surface px-5 py-3 pl-12 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <svg
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
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
        </div>
      </motion.div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface py-16 text-center">
          <div className="mb-3 text-4xl">🔍</div>
          <p className="text-base font-medium text-foreground">
            没有匹配的概念
          </p>
          <p className="mt-1 text-sm text-muted">换个关键词试试</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((concept, i) => (
            <motion.button
              key={concept.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              onClick={() => setActiveConcept(concept.id)}
              className="group flex flex-col rounded-2xl border border-border/60 bg-surface p-6 text-left transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="mb-2 text-xs font-mono uppercase tracking-wider text-muted">
                {concept.id}
              </div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary-dark">
                {concept.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                {concept.brief}
              </p>
              <div className="mt-4 flex items-center text-sm font-semibold text-primary">
                深入学习
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {activeConcept && (
        <ConceptModal
          conceptId={activeConcept}
          onClose={() => setActiveConcept(null)}
        />
      )}
    </div>
  );
}
