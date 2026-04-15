"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { reactions } from "@/data/reactions";
import { CATEGORY_LABELS, CATEGORY_ICONS, ReactionCategory } from "@/types";
import ReactionCard from "@/components/ReactionCard";

function ReactionsContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const filteredReactions =
    activeCategory === "all"
      ? reactions
      : reactions.filter((r) => r.category === activeCategory);

  const availableCategories = [
    ...new Set(reactions.map((r) => r.category)),
  ] as ReactionCategory[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="h-px w-8 bg-primary/40" />
          反应库
        </div>
        <h1 className="mb-3 text-4xl font-extrabold text-foreground">
          浏览所有反应
        </h1>
        <p className="text-muted">
          精选的经典有机反应，每个都有完整的分步机理解析
        </p>
      </motion.div>

      {/* 分类过滤 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-10 flex flex-wrap gap-2"
      >
        <Link
          href="/reactions"
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            activeCategory === "all"
              ? "bg-foreground text-white shadow-md"
              : "border border-border bg-surface text-muted hover:border-primary/40 hover:text-foreground"
          }`}
        >
          全部 · {reactions.length}
        </Link>
        {availableCategories.map((cat) => {
          const count = reactions.filter((r) => r.category === cat).length;
          const isActive = activeCategory === cat;
          return (
            <Link
              key={cat}
              href={`/reactions?category=${cat}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "border border-border bg-surface text-muted hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <span className="mr-1">{CATEGORY_ICONS[cat]}</span>
              {CATEGORY_LABELS[cat]} · {count}
            </Link>
          );
        })}
      </motion.div>

      {/* 反应列表 */}
      {filteredReactions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface py-20 text-center">
          <div className="mb-3 text-4xl">🧪</div>
          <p className="text-base font-medium text-foreground">该分类暂无反应</p>
          <p className="mt-1 text-sm text-muted">
            可以试试用 <Link href="/ai" className="text-primary hover:underline">AI 生成</Link>{" "}
            任意反应的机理
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {filteredReactions.map((reaction, i) => (
            <motion.div
              key={reaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <ReactionCard reaction={reaction} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* AI 生成入口 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 text-center md:p-8"
      >
        <p className="mb-1 text-sm font-semibold text-foreground">
          找不到你要的反应？
        </p>
        <p className="mb-4 text-sm text-muted">
          让 DeepSeek AI 为你实时生成任意反应的完整机理
        </p>
        <Link
          href="/ai"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg"
        >
          🤖 使用 AI 生成
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}

export default function ReactionsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="space-y-6">
            <div className="h-10 w-48 shimmer rounded-xl" />
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 shimmer rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ReactionsContent />
    </Suspense>
  );
}
