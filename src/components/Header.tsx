"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/reactions", label: "反应库" },
  { href: "/ai", label: "AI 生成", badge: true },
  { href: "/concepts", label: "概念索引" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <motion.div
            whileHover={{ rotate: -15 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-darker text-lg text-white shadow-md"
          >
            ⚗
          </motion.div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold text-foreground">
              有机化学机理
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
              Organic Chemistry Lab
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span
                  className={`relative flex items-center gap-1.5 ${
                    isActive
                      ? "text-primary-dark"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="rounded-full bg-gradient-to-r from-accent to-accent-light px-1.5 py-0.5 text-[9px] font-bold text-white">
                      AI
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
