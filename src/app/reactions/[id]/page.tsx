import { notFound } from "next/navigation";
import Link from "next/link";
import { reactions, getReaction } from "@/data/reactions";
import { CATEGORY_LABELS, CATEGORY_ICONS } from "@/types";
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

  const hasIntermediate =
    reaction.mechanism.length > 1 && reaction.id !== "sn2";

  // 相关反应：同一分类下的其他反应
  const related = reactions
    .filter((r) => r.category === reaction.category && r.id !== reaction.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* 面包屑 */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-primary">
          首页
        </Link>
        <span>/</span>
        <Link href="/reactions" className="hover:text-primary">
          反应库
        </Link>
        <span>/</span>
        <span className="text-foreground">{reaction.name}</span>
      </nav>

      {/* 标题区 */}
      <div className="mb-8 rounded-3xl border border-border/60 bg-gradient-to-br from-primary/5 via-surface to-accent/5 p-8 ring-1 ring-border/40">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-dark">
            <span>{CATEGORY_ICONS[reaction.category]}</span>
            {CATEGORY_LABELS[reaction.category]}
          </span>
          <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-muted">
            {reaction.mechanism.length} 步机理
          </span>
          {reaction.sideReactions && reaction.sideReactions.length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              ⚡ {reaction.sideReactions.length} 个副反应
            </span>
          )}
        </div>
        <h1 className="mt-4 text-4xl font-extrabold text-foreground">
          {reaction.name}
        </h1>
        <p className="mt-1 text-xs uppercase tracking-wider text-muted">
          {reaction.nameEn}
        </p>
        <p className="mt-5 text-base leading-relaxed text-foreground/80">
          {reaction.summary}
        </p>
      </div>

      {/* 反应方程式 */}
      <section className="mb-8 rounded-2xl border border-border/60 bg-surface p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="h-px w-6 bg-primary/40" />
          反应方程式
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-surface-subtle to-background p-6 text-lg ring-1 ring-border/40">
          {reaction.equation.reactants.map((r, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-muted">+</span>}
              <ChemFormula formula={r} className="text-xl" />
            </span>
          ))}

          <div className="mx-4 flex flex-col items-center">
            <span className="chem-arrow text-2xl text-primary">→</span>
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

        <p className="mt-4 text-center text-sm text-muted">
          <span className="font-semibold text-foreground">条件：</span>
          {reaction.conditions}
        </p>
      </section>

      {/* 能量图 */}
      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="h-px w-6 bg-primary/40" />
          能量变化
        </div>
        <EnergyDiagram
          type={hasIntermediate ? "two-step" : "one-step"}
          labels={
            hasIntermediate
              ? { intermediate: "碳正离子" }
              : { transitionState: "过渡态" }
          }
        />
      </section>

      {/* 反应机理 */}
      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="h-px w-6 bg-primary/40" />
          分步机理
        </div>
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          反应机理详解
        </h2>
        <MechanismViewer
          steps={reaction.mechanism}
          sideReactions={reaction.sideReactions}
        />
      </section>

      {/* 要点总结 */}
      <section className="mb-8 rounded-2xl border border-border/60 bg-surface p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="h-px w-6 bg-primary/40" />
          要点
        </div>
        <h2 className="mb-4 text-xl font-bold text-foreground">要点总结</h2>
        <ul className="space-y-3">
          {reaction.keyPoints.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl bg-primary/5 p-3 text-sm text-foreground/85"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* 影响因素 */}
      {reaction.factors && (
        <section className="mb-8 rounded-2xl border border-border/60 bg-surface p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="h-px w-6 bg-accent/40" />
            影响
          </div>
          <h2 className="mb-4 text-xl font-bold text-foreground">影响因素</h2>
          <ul className="space-y-3">
            {reaction.factors.map((factor, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl bg-accent/5 p-3 text-sm text-foreground/85"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  ●
                </span>
                {factor}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 相关反应 */}
      {related.length > 0 && (
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="h-px w-6 bg-primary/40" />
            相关
          </div>
          <h2 className="mb-4 text-xl font-bold text-foreground">相关反应</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/reactions/${r.id}`}
                className="group rounded-xl border border-border/60 bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <div className="text-xs text-muted">
                  {CATEGORY_ICONS[r.category]} {CATEGORY_LABELS[r.category]}
                </div>
                <div className="mt-1 font-semibold text-foreground group-hover:text-primary-dark">
                  {r.name}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 导航 */}
      <div className="flex items-center justify-between border-t border-border/60 pt-6">
        <Link
          href="/reactions"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          返回反应库
        </Link>
        <Link
          href="/ai"
          className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg"
        >
          🤖 AI 生成其他机理
        </Link>
      </div>
    </div>
  );
}
