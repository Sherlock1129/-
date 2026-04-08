"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
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

  // 获取所有已有分类
  const availableCategories = [
    ...new Set(reactions.map((r) => r.category)),
  ] as ReactionCategory[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-extrabold text-foreground">
        反应库
      </h1>
      <p className="mb-8 text-muted">
        浏览所有有机反应，点击查看完整反应机理
      </p>

      {/* 分类过滤 */}
      <div className="mb-8 flex flex-wrap gap-2">
        <a
          href="/reactions"
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-primary text-white"
              : "bg-surface text-muted hover:bg-surface-hover"
          }`}
        >
          全部
        </a>
        {availableCategories.map((cat) => (
          <a
            key={cat}
            href={`/reactions?category=${cat}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-white"
                : "bg-surface text-muted hover:bg-surface-hover"
            }`}
          >
            {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
          </a>
        ))}
      </div>

      {/* 反应列表 */}
      {filteredReactions.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted">该分类暂无反应</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredReactions.map((reaction) => (
            <ReactionCard key={reaction.id} reaction={reaction} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReactionsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="animate-pulse">
            <div className="mb-4 h-8 w-48 rounded bg-border" />
            <div className="mb-8 h-4 w-64 rounded bg-border" />
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-64 rounded-xl bg-border" />
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
