import Link from "next/link";
import { Reaction, CATEGORY_LABELS, CATEGORY_ICONS } from "@/types";
import ChemFormula from "./ChemFormula";

interface ReactionCardProps {
  reaction: Reaction;
}

export default function ReactionCard({ reaction }: ReactionCardProps) {
  return (
    <Link
      href={`/reactions/${reaction.id}`}
      className="group flex h-full flex-col rounded-2xl border border-border/60 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-dark">
          <span>{CATEGORY_ICONS[reaction.category]}</span>
          {CATEGORY_LABELS[reaction.category]}
        </span>
        <span className="text-xs text-muted">
          {reaction.mechanism.length} 步机理
        </span>
      </div>

      <h3 className="mb-1 text-xl font-bold text-foreground group-hover:text-primary-dark">
        {reaction.name}
      </h3>
      <p className="mb-4 text-xs uppercase tracking-wider text-muted">
        {reaction.nameEn}
      </p>

      {/* 反应方程式 */}
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl bg-gradient-to-br from-surface-subtle to-background px-4 py-3 text-sm ring-1 ring-border/40">
        {reaction.equation.reactants.map((r, i) => (
          <span key={i}>
            {i > 0 && <span className="mx-1 text-muted">+</span>}
            <ChemFormula formula={r} />
          </span>
        ))}
        <span className="mx-2 text-primary">→</span>
        {reaction.equation.products.map((p, i) => (
          <span key={i}>
            {i > 0 && <span className="mx-1 text-muted">+</span>}
            <ChemFormula formula={p} />
          </span>
        ))}
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted line-clamp-3">
        {reaction.summary}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
        <div className="flex items-center gap-3 text-xs text-muted">
          {reaction.sideReactions && reaction.sideReactions.length > 0 && (
            <span className="inline-flex items-center gap-1">
              <span className="text-accent">⚡</span>
              {reaction.sideReactions.length} 个副反应
            </span>
          )}
        </div>
        <span className="flex items-center text-sm font-semibold text-primary">
          查看机理
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
        </span>
      </div>
    </Link>
  );
}
