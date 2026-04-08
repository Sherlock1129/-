"use client";

/**
 * 化学式渲染组件
 * 自动将数字下标化、+/- 上标化
 * 例如: "CH₃Br" 直接渲染, "CH3Br" 会将3处理为下标
 */

interface ChemFormulaProps {
  formula: string;
  className?: string;
}

export default function ChemFormula({
  formula,
  className = "",
}: ChemFormulaProps) {
  // 已经用 Unicode 下标/上标的直接渲染
  return (
    <span className={`chem-formula font-semibold ${className}`}>
      {formula}
    </span>
  );
}
