import { notFound } from "next/navigation";
import Link from "next/link";
import { reactions, getReaction } from "@/data/reactions";
import { CATEGORY_LABELS } from "@/types";
import MechanismViewer from "@/components/MechanismViewer";
import EnergyDiagram from "@/components/EnergyDiagram";
import ChemFormula from "@/components/ChemFormula";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return reactions.map((r) => ({ id: r.id }));
}

export default async function ReactionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const reaction = getReaction(id);

  if (!reaction) {
    notFound();
  }

  const hasIntermediate = reaction.mechanism.length > 1 &&
    reaction.id !== "sn2"; // SN2 是一步协同

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* 面包屑 */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
        <Link href="/reactions" className="hover:text-primary">
          反应库
        </Link>
        <span>/</span>
        <span className="text-foreground">{reaction.name}</span>
      </nav>

      {/* 标题区 */}
      <div className="mb-8">
        <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-dark">
          {CATEGORY_LABELS[reaction.category]}
        </span>
        <h1 className="mt-2 text-3xl font-extrabold text-foreground">
          {reaction.name}
        </h1>
        <p className="mt-1 text-sm text-muted">{reaction.nameEn}</p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          {reaction.summary}
        </p>
      </div>

      {/* 反应方程式 */}
      <div className="mb-8 rounded-xl border border-border bg-surface p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
          反应方程式
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3 text-lg">
          {reaction.equation.reactants.map((r, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-muted">+</span>}
              <ChemFormula formula={r} className="text-xl" />
            </span>
          ))}

          <div className="mx-4 flex flex-col items-center">
            <span className="chem-arrow text-2xl">→</span>
            {reaction.equation.conditions.length > 0 && (
              <span className="text-xs text-muted">
                {reaction.equation.conditions.join(", ")}
              </span>
            )}
          </div>

          {reaction.equation.products.map((p, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-muted">+</span>}
              <ChemFormula formula={p} className="text-xl" />
            </span>
          ))}
        </div>

        {/* 反应条件说明 */}
        <p className="mt-4 text-center text-sm text-muted">
          条件：{reaction.conditions}
        </p>
      </div>

      {/* 能量图 */}
      <div className="mb-8">
        <EnergyDiagram
          type={hasIntermediate ? "two-step" : "one-step"}
          labels={
            hasIntermediate
              ? { intermediate: "碳正离子" }
              : { transitionState: "过渡态" }
          }
        />
      </div>

      {/* 反应机理 */}
      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          反应机理
        </h2>
        <MechanismViewer
          steps={reaction.mechanism}
          sideReactions={reaction.sideReactions}
        />
      </div>

      {/* 要点总结 */}
      <div className="mb-8 rounded-xl border border-border bg-surface p-6">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          要点总结
        </h2>
        <ul className="space-y-2">
          {reaction.keyPoints.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-foreground/80"
            >
              <span className="mt-0.5 text-primary">✓</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* 影响因素 */}
      {reaction.factors && (
        <div className="mb-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 text-lg font-bold text-foreground">
            影响因素
          </h2>
          <ul className="space-y-2">
            {reaction.factors.map((factor, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <span className="mt-0.5 text-accent">●</span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 导航 */}
      <div className="flex justify-between border-t border-border pt-6">
        <Link
          href="/reactions"
          className="flex items-center text-sm font-medium text-primary hover:text-primary-dark"
        >
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          返回反应库
        </Link>
      </div>
    </div>
  );
}
