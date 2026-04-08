import Link from "next/link";
import { Reaction, CATEGORY_LABELS } from "@/types";
import ChemFormula from "./ChemFormula";

interface ReactionCardProps {
  reaction: Reaction;
}

export default function ReactionCard({ reaction }: ReactionCardProps) {
  return (
    <Link
      href={`/reactions/${reaction.id}`}
      className="group block rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-dark">
          {CATEGORY_LABELS[reaction.category]}
        </span>
      </div>
      <h3 className="mb-1 text-lg font-bold text-foreground group-hover:text-primary-dark">
        {reaction.name}
      </h3>
      <p className="mb-4 text-xs text-muted">{reaction.nameEn}</p>

      {/* 反应方程式 */}
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg bg-background px-4 py-3 font-mono text-sm">
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

      <p className="text-sm leading-relaxed text-muted line-clamp-2">
        {reaction.summary}
      </p>

      <div className="mt-4 flex items-center text-sm font-medium text-primary">
        查看反应机理
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
    </Link>
  );
}
