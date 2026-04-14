import Link from "next/link";
import { reactions } from "@/data/reactions";
import { CATEGORY_LABELS, CATEGORY_ICONS, ReactionCategory } from "@/types";

export default function HomePage() {
  // 按分类统计反应数
  const categoryCounts = reactions.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.entries(categoryCounts) as [ReactionCategory, number][];

  return (
    <div>
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            有机化学反应机理
            <span className="text-primary">学习平台</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted">
            深入理解每一步反应历程。从亲核取代到周环反应，
            交互式地探索反应机理、副反应和关键概念。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/reactions"
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              浏览反应库
            </Link>
            <Link
              href="/ai"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
            >
              🤖 AI 生成机理
            </Link>
            <Link
              href="/concepts"
              className="rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-hover"
            >
              概念索引
            </Link>
          </div>
        </div>
      </section>

      {/* 反应分类 */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
          反应分类
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(([cat, count]) => (
            <Link
              key={cat}
              href={`/reactions?category=${cat}`}
              className="group rounded-xl border border-border bg-surface p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-2 text-3xl">{CATEGORY_ICONS[cat]}</div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary-dark">
                {CATEGORY_LABELS[cat]}
              </h3>
              <p className="mt-1 text-sm text-muted">{count} 个反应</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 精选反应 */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
            从这里开始
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {reactions.slice(0, 3).map((r) => (
              <Link
                key={r.id}
                href={`/reactions/${r.id}`}
                className="group rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-dark">
                  {CATEGORY_LABELS[r.category]}
                </span>
                <h3 className="mt-2 text-lg font-bold text-foreground group-hover:text-primary-dark">
                  {r.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                  {r.summary}
                </p>
                <div className="mt-4 text-sm font-medium text-primary">
                  开始学习 →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI 生成入口 */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-8 text-center md:p-12">
          <div className="mb-3 text-4xl">🤖</div>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            找不到你要的反应？让 AI 帮你
          </h2>
          <p className="mx-auto mb-6 max-w-lg text-sm text-muted">
            输入任意有机反应名称或反应物，DeepSeek AI
            为你实时生成完整的反应机理解析，包含分步机理、副反应和关键概念。
          </p>
          <Link
            href="/ai"
            className="inline-block rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
          >
            开始使用 AI 生成
          </Link>
        </div>
      </section>

      {/* 特性介绍 */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-3 text-3xl">🔬</div>
            <h3 className="mb-2 text-base font-bold">分步机理展示</h3>
            <p className="text-sm text-muted">
              每个反应拆解为清晰的步骤，展示电子转移和中间体形成的完整过程
            </p>
          </div>
          <div className="text-center">
            <div className="mb-3 text-3xl">📖</div>
            <h3 className="mb-2 text-base font-bold">深入概念学习</h3>
            <p className="text-sm text-muted">
              每个关键概念都可以点击深入学习，理解背后的原理
            </p>
          </div>
          <div className="text-center">
            <div className="mb-3 text-3xl">⚡</div>
            <h3 className="mb-2 text-base font-bold">主反应与副反应</h3>
            <p className="text-sm text-muted">
              不仅展示主反应机理，还包含竞争副反应及其发生条件
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
