"use client";

/**
 * 反应能量图（简化版）
 * 用 SVG 绘制反应坐标-能量图
 */

interface EnergyDiagramProps {
  /** "one-step" = SN2 一步协同, "two-step" = 经过中间体 */
  type: "one-step" | "two-step";
  labels?: {
    reactant?: string;
    product?: string;
    transitionState?: string;
    intermediate?: string;
  };
}

export default function EnergyDiagram({
  type,
  labels = {},
}: EnergyDiagramProps) {
  const {
    reactant = "反应物",
    product = "产物",
    transitionState = "过渡态 (TS)",
    intermediate = "中间体",
  } = labels;

  if (type === "one-step") {
    return (
      <div className="rounded-xl border border-border bg-surface p-4">
        <h4 className="mb-3 text-center text-sm font-semibold text-muted">
          能量图 — 一步协同机理
        </h4>
        <svg viewBox="0 0 400 220" className="w-full" aria-label="反应能量图">
          {/* 坐标轴 */}
          <line x1="50" y1="190" x2="370" y2="190" stroke="#a8a29e" strokeWidth="1.5" />
          <line x1="50" y1="190" x2="50" y2="20" stroke="#a8a29e" strokeWidth="1.5" />
          {/* 轴标签 */}
          <text x="210" y="212" textAnchor="middle" className="fill-muted text-xs">
            反应坐标
          </text>
          <text x="15" y="105" textAnchor="middle" className="fill-muted text-xs" transform="rotate(-90, 15, 105)">
            能量
          </text>

          {/* 能量曲线 */}
          <path
            d="M 80,150 C 120,150 160,40 210,40 C 260,40 300,160 340,160"
            fill="none"
            stroke="#0f766e"
            strokeWidth="2.5"
          />

          {/* 反应物能级 */}
          <line x1="60" y1="150" x2="100" y2="150" stroke="#0f766e" strokeWidth="2" strokeDasharray="6,3" />
          <text x="80" y="170" textAnchor="middle" className="fill-foreground text-xs font-medium">
            {reactant}
          </text>

          {/* 过渡态 */}
          <circle cx="210" cy="40" r="4" fill="#ef4444" />
          <text x="210" y="28" textAnchor="middle" className="fill-red-600 text-xs font-medium">
            {transitionState} ‡
          </text>

          {/* Ea 标注 */}
          <line x1="140" y1="150" x2="140" y2="40" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
          <text x="130" y="95" textAnchor="end" className="fill-amber-600 text-xs">
            Ea
          </text>

          {/* 产物能级 */}
          <line x1="320" y1="160" x2="360" y2="160" stroke="#0f766e" strokeWidth="2" strokeDasharray="6,3" />
          <text x="340" y="180" textAnchor="middle" className="fill-foreground text-xs font-medium">
            {product}
          </text>
        </svg>
      </div>
    );
  }

  // 两步反应（经过中间体）
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <h4 className="mb-3 text-center text-sm font-semibold text-muted">
        能量图 — 两步反应（经过中间体）
      </h4>
      <svg viewBox="0 0 400 220" className="w-full" aria-label="反应能量图">
        {/* 坐标轴 */}
        <line x1="50" y1="190" x2="370" y2="190" stroke="#a8a29e" strokeWidth="1.5" />
        <line x1="50" y1="190" x2="50" y2="20" stroke="#a8a29e" strokeWidth="1.5" />
        <text x="210" y="212" textAnchor="middle" className="fill-muted text-xs">
          反应坐标
        </text>
        <text x="15" y="105" textAnchor="middle" className="fill-muted text-xs" transform="rotate(-90, 15, 105)">
          能量
        </text>

        {/* 能量曲线：两个驼峰 */}
        <path
          d="M 70,140 C 95,140 115,45 140,45 C 165,45 170,100 195,100 C 220,100 230,60 255,60 C 280,60 310,155 340,155"
          fill="none"
          stroke="#0f766e"
          strokeWidth="2.5"
        />

        {/* 反应物 */}
        <line x1="55" y1="140" x2="85" y2="140" stroke="#0f766e" strokeWidth="2" strokeDasharray="6,3" />
        <text x="70" y="158" textAnchor="middle" className="fill-foreground text-xs font-medium">
          {reactant}
        </text>

        {/* TS1 */}
        <circle cx="140" cy="45" r="4" fill="#ef4444" />
        <text x="140" y="35" textAnchor="middle" className="fill-red-600 text-xs font-medium">
          TS1 ‡
        </text>

        {/* 中间体 */}
        <circle cx="195" cy="100" r="4" fill="#f59e0b" />
        <text x="195" y="118" textAnchor="middle" className="fill-amber-600 text-xs font-medium">
          {intermediate}
        </text>

        {/* TS2 */}
        <circle cx="255" cy="60" r="4" fill="#ef4444" />
        <text x="255" y="50" textAnchor="middle" className="fill-red-600 text-xs font-medium">
          TS2 ‡
        </text>

        {/* 产物 */}
        <line x1="325" y1="155" x2="355" y2="155" stroke="#0f766e" strokeWidth="2" strokeDasharray="6,3" />
        <text x="340" y="173" textAnchor="middle" className="fill-foreground text-xs font-medium">
          {product}
        </text>

        {/* Ea 标注 */}
        <line x1="105" y1="140" x2="105" y2="45" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
        <text x="95" y="92" textAnchor="end" className="fill-amber-600 text-xs">
          Ea₁
        </text>
      </svg>
    </div>
  );
}
