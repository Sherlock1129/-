/** 分子表示 */
export interface Molecule {
  /** 结构简式，如 CH₃Br */
  condensed: string;
  /** 分子名称 */
  name?: string;
  /** SMILES 表示（用于后期键线式渲染） */
  smiles?: string;
  /** 在反应中的角色 */
  role: "reactant" | "product" | "intermediate" | "catalyst" | "leaving-group" | "nucleophile" | "electrophile" | "base" | "solvent";
}

/** 机理中的一步 */
export interface MechanismStep {
  id: number;
  /** 步骤标题 */
  title: string;
  /** 简要描述 */
  description: string;
  /** 详细解释（点击展开） */
  detailedExplanation: string;
  /** 该步涉及的分子/中间体 */
  structures: string[];
  /** 关键概念标签，可链接到深入学习 */
  keyConcepts?: KeyConcept[];
}

/** 可深入学习的关键概念 */
export interface KeyConcept {
  id: string;
  name: string;
  brief: string;
  detailed: string;
  /** 相关概念 */
  relatedConcepts?: string[];
}

/** 副反应 */
export interface SideReaction {
  name: string;
  description: string;
  condition: string;
  products: string[];
  mechanism?: MechanismStep[];
}

/** 反应分类 */
export type ReactionCategory =
  | "substitution"    // 取代反应
  | "elimination"     // 消除反应
  | "addition"        // 加成反应
  | "oxidation"       // 氧化反应
  | "reduction"       // 还原反应
  | "rearrangement"   // 重排反应
  | "pericyclic"      // 周环反应
  | "radical";        // 自由基反应

export const CATEGORY_LABELS: Record<ReactionCategory, string> = {
  substitution: "取代反应",
  elimination: "消除反应",
  addition: "加成反应",
  oxidation: "氧化反应",
  reduction: "还原反应",
  rearrangement: "重排反应",
  pericyclic: "周环反应",
  radical: "自由基反应",
};

export const CATEGORY_ICONS: Record<ReactionCategory, string> = {
  substitution: "🔄",
  elimination: "✂️",
  addition: "➕",
  oxidation: "🔥",
  reduction: "⬇️",
  rearrangement: "🔀",
  pericyclic: "🔁",
  radical: "⚡",
};

/** 完整的反应数据 */
export interface Reaction {
  id: string;
  /** 反应名称 */
  name: string;
  /** 英文名 */
  nameEn: string;
  /** 反应分类 */
  category: ReactionCategory;
  /** 反应简介 */
  summary: string;
  /** 反应方程式（结构简式） */
  equation: {
    reactants: string[];
    conditions: string[];
    products: string[];
  };
  /** 反应物 */
  reactants?: Molecule[];
  /** 产物 */
  products?: Molecule[];
  /** 反应条件 */
  conditions: string;
  /** 主反应机理 */
  mechanism: MechanismStep[];
  /** 副反应 */
  sideReactions?: SideReaction[];
  /** 反应特点/要点 */
  keyPoints: string[];
  /** 影响因素 */
  factors?: string[];
}

/** 审核结果 */
export interface ReviewResult {
  /** 正确性评分 0-100 */
  correctness: number;
  status: "approved" | "minor-issues" | "major-issues";
  summary: string;
  issues: ReviewIssue[];
  revisedReaction: Reaction;
}

export interface ReviewIssue {
  severity: "critical" | "warning" | "suggestion";
  location: string;
  problem: string;
  correction: string;
}
