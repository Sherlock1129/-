"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { reactions } from "@/data/reactions";
import { CATEGORY_LABELS, CATEGORY_ICONS, ReactionCategory } from "@/types";
import ChemFormula from "@/components/ChemFormula";

export default function HomePage() {
  const categoryCounts = reactions.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});
  const categories = Object.entries(categoryCounts) as [
    ReactionCategory,
    number
  ][];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative border-b border-border/50 bg-grid">
        {/* 光晕装饰 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-1/4 top-20 h-96 w-96 translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary-dark">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              由 DeepSeek AI 驱动的学习工具
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-balance mb-6 text-5xl font-extrabold tracking-tight text-foreground md:text-6xl"
          >
            深入理解每一个
            <br />
            <span className="text-gradient">有机反应机理</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-balance text-lg leading-relaxed text-muted"
          >
            从电子转移到轨道对称性，从立体化学到能量曲面
            <br />
            交互式地探索有机化学的底层逻辑
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/ai"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>🤖 AI 生成机理</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
            <Link
              href="/reactions"
              className="rounded-xl border border-border-strong bg-surface px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-surface-hover"
            >
              浏览反应库
            </Link>
          </motion.div>

          {/* 统计数字 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-16 flex max-w-2xl flex-wrap items-center justify-center gap-8 text-center"
          >
            {[
              { n: reactions.length, l: "精选反应", s: "+" },
              { n: "AI", l: "智能生成", s: "" },
              { n: "2", l: "轮审核校验", s: "" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-3xl font-bold text-gradient">
                  {stat.n}
                  {stat.s}
                </span>
                <span className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
                  {stat.l}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 反应分类 */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-foreground">
            按分类浏览
          </h2>
          <p className="text-muted">八大有机反应类型，覆盖核心考点</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(([cat, count], i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/reactions?category=${cat}`}
                className="group block h-full rounded-2xl border border-border/60 bg-surface p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="mb-3 text-4xl transition-transform group-hover:scale-110">
                  {CATEGORY_ICONS[cat]}
                </div>
                <h3 className="text-base font-bold text-foreground group-hover:text-primary-dark">
                  {CATEGORY_LABELS[cat]}
                </h3>
                <p className="mt-1 text-xs text-muted">
                  {count} 个反应
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI 入口 - 大卡片 */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-surface to-accent/5 p-8 md:p-12"
        >
          {/* 装饰元素 */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                Phase 2 · 新功能
              </span>
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                输入任意反应
                <br />
                <span className="text-gradient">AI 帮你生成机理</span>
              </h2>
              <p className="mb-6 text-muted">
                反应库里找不到？DeepSeek AI 为你实时生成分步机理， 再由第二个 AI 以
                化学博士视角审核修正， 两轮校验后呈现给你。
              </p>
              <Link
                href="/ai"
                className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark"
              >
                立即试用
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>

            {/* 工作流可视化 */}
            <div className="space-y-3">
              {[
                { icon: "✍️", title: "1. 你输入反应", desc: "反应名、方程式、或文字描述" },
                { icon: "🧪", title: "2. AI 生成机理", desc: "流式输出，包含分步解析" },
                { icon: "🔬", title: "3. 专家 AI 审核", desc: "化学正确性校验与修正" },
                { icon: "✨", title: "4. 交互式展示", desc: "可深入每一步的机理细节" },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3 rounded-xl bg-surface/80 p-3 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-lg">
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {step.title}
                    </p>
                    <p className="text-xs text-muted">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 精选反应 */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <h2 className="mb-2 text-3xl font-bold text-foreground">
              从这里开始
            </h2>
            <p className="text-muted">3 个最经典的有机反应机理</p>
          </div>
          <Link
            href="/reactions"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark md:inline-flex"
          >
            查看全部
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {reactions.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={`/reactions/${r.id}`}
                className="group flex h-full flex-col rounded-2xl border border-border/60 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
              >
                <span className="mb-3 self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-dark">
                  {CATEGORY_LABELS[r.category]}
                </span>
                <h3 className="mb-1 text-xl font-bold text-foreground group-hover:text-primary-dark">
                  {r.name}
                </h3>
                <p className="mb-4 text-xs uppercase tracking-wider text-muted">
                  {r.nameEn}
                </p>

                {/* 方程式预览 */}
                <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg bg-surface-subtle px-3 py-2 text-sm">
                  {r.equation.reactants.slice(0, 2).map((x, j) => (
                    <span key={j}>
                      {j > 0 && <span className="mx-1 text-muted">+</span>}
                      <ChemFormula formula={x} />
                    </span>
                  ))}
                  <span className="mx-1 text-primary">→</span>
                  {r.equation.products.slice(0, 1).map((x, j) => (
                    <ChemFormula key={j} formula={x} />
                  ))}
                </div>

                <p className="flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                  {r.summary}
                </p>
                <div className="mt-4 flex items-center text-sm font-semibold text-primary">
                  开始学习
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* 特性介绍 */}
      <section className="border-t border-border/60 bg-surface-subtle">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            为什么选这里学习
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "🔬",
                title: "分步机理可视化",
                desc: "每个反应拆解为时间线上的清晰步骤，展示电子转移、过渡态、中间体的完整演化",
              },
              {
                icon: "📖",
                title: "深度概念关联",
                desc: "每一步的关键概念都可点击深入学习，从亲核性到轨道对称性，理解背后的原理",
              },
              {
                icon: "⚡",
                title: "主副反应并重",
                desc: "不仅展示主反应，还包含竞争副反应及其发生条件，帮你建立真实的反应图景",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl bg-surface p-6 text-center shadow-sm"
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-3xl">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
