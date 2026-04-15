"use client";

import { useMemo, useState } from "react";

interface DiagramPoint {
  x: number;
  y: number;
  label: string;
  kind: "reactant" | "transition" | "intermediate" | "product";
  note?: string;
}

interface EnergyDiagramProps {
  /** 预设类型 */
  type: "one-step" | "two-step";
  /** 可覆盖默认标签 */
  labels?: {
    reactant?: string;
    product?: string;
    transitionState?: string;
    intermediate?: string;
  };
}

const AXIS = {
  left: 50,
  right: 370,
  bottom: 190,
  top: 22,
};

function createPath(points: DiagramPoint[]): string {
  if (points.length < 2) return "";
  const [start, ...rest] = points;
  let d = `M ${start.x},${start.y}`;
  for (let i = 0; i < rest.length; i++) {
    const prev = i === 0 ? start : rest[i - 1];
    const cur = rest[i];
    const c1x = prev.x + (cur.x - prev.x) * 0.45;
    const c2x = prev.x + (cur.x - prev.x) * 0.55;
    d += ` C ${c1x},${prev.y} ${c2x},${cur.y} ${cur.x},${cur.y}`;
  }
  return d;
}

export default function EnergyDiagram({ type, labels = {} }: EnergyDiagramProps) {
  const [active, setActive] = useState<DiagramPoint | null>(null);

  const points = useMemo<DiagramPoint[]>(() => {
    if (type === "one-step") {
      return [
        { x: 78, y: 150, label: labels.reactant ?? "反应物", kind: "reactant", note: "起始能级" },
        { x: 212, y: 40, label: labels.transitionState ?? "过渡态", kind: "transition", note: "单一能垒峰值" },
        { x: 340, y: 162, label: labels.product ?? "产物", kind: "product", note: "终态能级" },
      ];
    }

    return [
      { x: 72, y: 145, label: labels.reactant ?? "反应物", kind: "reactant", note: "起始能级" },
      { x: 140, y: 50, label: "TS1", kind: "transition", note: "第一步活化峰" },
      { x: 200, y: 104, label: labels.intermediate ?? "中间体", kind: "intermediate", note: "局部稳定谷值" },
      { x: 258, y: 66, label: "TS2", kind: "transition", note: "第二步活化峰" },
      { x: 340, y: 158, label: labels.product ?? "产物", kind: "product", note: "终态能级" },
    ];
  }, [type, labels]);

  const reactant = points.find((p) => p.kind === "reactant");
  const product = points.find((p) => p.kind === "product");
  const tsPoints = points.filter((p) => p.kind === "transition");
  const highestTs = tsPoints.reduce((acc, p) => (p.y < acc.y ? p : acc), tsPoints[0]);

  const ea = reactant && highestTs ? Math.max(0, reactant.y - highestTs.y) : 0;
  const dg = reactant && product ? reactant.y - product.y : 0;

  const path = createPath(points);

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <h4 className="mb-3 text-center text-sm font-semibold text-muted">
        能量图 — {type === "one-step" ? "一步协同机理" : "两步反应机理"}
      </h4>

      <svg viewBox="0 0 400 240" className="w-full" aria-label="反应能量图">
        {/* 坐标轴 */}
        <line x1={AXIS.left} y1={AXIS.bottom} x2={AXIS.right} y2={AXIS.bottom} stroke="#a8a29e" strokeWidth="1.5" />
        <line x1={AXIS.left} y1={AXIS.bottom} x2={AXIS.left} y2={AXIS.top} stroke="#a8a29e" strokeWidth="1.5" />

        <text x="210" y="214" textAnchor="middle" className="fill-muted text-xs">
          反应坐标
        </text>
        <text x="15" y="105" textAnchor="middle" className="fill-muted text-xs" transform="rotate(-90, 15, 105)">
          相对自由能
        </text>

        {/* 曲线 */}
        <path d={path} fill="none" stroke="#0f766e" strokeWidth="2.6" />

        {/* Ea 标注：从反应物到最高 TS */}
        {reactant && highestTs && (
          <>
            <line x1={highestTs.x - 20} y1={reactant.y} x2={highestTs.x - 20} y2={highestTs.y} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
            <text x={highestTs.x - 26} y={(reactant.y + highestTs.y) / 2} textAnchor="end" className="fill-amber-600 text-xs font-medium">
              Ea ≈ {ea}
            </text>
          </>
        )}

        {/* ΔG 标注 */}
        {reactant && product && (
          <>
            <line x1={360} y1={reactant.y} x2={360} y2={product.y} stroke="#2563eb" strokeWidth="1" strokeDasharray="4,3" />
            <text x={354} y={(reactant.y + product.y) / 2} textAnchor="end" className="fill-blue-600 text-xs font-medium">
              ΔG ≈ {dg > 0 ? "-" : "+"}
              {Math.abs(dg)}
            </text>
          </>
        )}

        {/* 点 + 文本 + 交互 */}
        {points.map((point) => {
          const color =
            point.kind === "transition"
              ? "#ef4444"
              : point.kind === "intermediate"
                ? "#f59e0b"
                : "#0f766e";

          return (
            <g key={`${point.kind}-${point.x}`} onMouseEnter={() => setActive(point)} onMouseLeave={() => setActive(null)}>
              <circle cx={point.x} cy={point.y} r="4" fill={color} />
              <text
                x={point.x}
                y={point.kind === "transition" ? point.y - 11 : point.y + 18}
                textAnchor="middle"
                className="fill-foreground text-xs font-medium"
              >
                {point.label}
                {point.kind === "transition" ? " ‡" : ""}
              </text>
            </g>
          );
        })}

        {/* 选中点的提示卡 */}
        {active && (
          <g>
            <rect x={active.x - 55} y={active.y - 44} width="110" height="24" rx="6" fill="#111827" opacity="0.9" />
            <text x={active.x} y={active.y - 28} textAnchor="middle" className="fill-white text-[10px]">
              {active.note ?? active.label}
            </text>
          </g>
        )}
      </svg>

      <div className="mt-3 grid gap-2 text-xs text-muted sm:grid-cols-2">
        <div className="rounded-lg bg-surface-subtle px-3 py-2">最高能垒 Ea：从反应物到最高过渡态。</div>
        <div className="rounded-lg bg-surface-subtle px-3 py-2">ΔG：反应物与产物能级差，负值更热力学有利。</div>
      </div>
    </div>
  );
}
