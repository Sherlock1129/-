import { KeyConcept } from "@/types";

/** 关键概念库 —— Phase 4A 扩展版（40 条） */
export const concepts: Record<string, KeyConcept> = {
  nucleophile: { id: "nucleophile", name: "亲核试剂", brief: "给出电子对进攻亲电中心", detailed: "富电子物种，常以孤对电子或负电荷对缺电子中心发起进攻。", relatedConcepts: ["electrophile", "basicity"] },
  electrophile: { id: "electrophile", name: "亲电试剂", brief: "接受电子对形成新键", detailed: "缺电子物种，常含正电荷、空轨道或极化键。", relatedConcepts: ["nucleophile", "carbocation"] },
  "leaving-group": { id: "leaving-group", name: "离去基团", brief: "带电子离开底物", detailed: "离去能力通常与其共轭酸强度相关，弱碱是好离去基。", relatedConcepts: ["basicity", "sn1-vs-sn2"] },
  carbocation: { id: "carbocation", name: "碳正离子", brief: "缺电子平面中间体", detailed: "sp² 平面结构，稳定性常为 3° > 2° > 1° > 甲基。", relatedConcepts: ["rearrangement", "hyperconjugation"] },
  "transition-state": { id: "transition-state", name: "过渡态", brief: "反应路径能量峰顶", detailed: "不可分离，符号 ‡，决定活化能高低。", relatedConcepts: ["activation-energy", "hammond-postulate"] },
  "walden-inversion": { id: "walden-inversion", name: "Walden 翻转", brief: "SN2 的构型反转", detailed: "背面进攻导致手性中心构型完全翻转。", relatedConcepts: ["sn1-vs-sn2", "stereospecificity"] },
  markovnikov: { id: "markovnikov", name: "Markovnikov 规则", brief: "氢加到含氢较多碳", detailed: "根源是形成更稳定碳正离子中间体。", relatedConcepts: ["carbocation", "anti-markovnikov"] },
  basicity: { id: "basicity", name: "碱性与亲核性", brief: "热力学 vs 动力学", detailed: "碱性衡量夺 H⁺ 能力；亲核性衡量进攻碳中心速率。", relatedConcepts: ["nucleophile", "solvent-effect"] },
  hyperconjugation: { id: "hyperconjugation", name: "超共轭", brief: "σ 电子离域稳定中间体", detailed: "相邻 C-H/C-C σ 键与空轨道相互作用降低能量。", relatedConcepts: ["carbocation", "zaitsev-rule"] },

  "sn1-vs-sn2": { id: "sn1-vs-sn2", name: "SN1 vs SN2", brief: "取代机理判据", detailed: "SN1 走碳正离子中间体；SN2 协同一步完成。" },
  "e1-vs-e2": { id: "e1-vs-e2", name: "E1 vs E2", brief: "消除机理判据", detailed: "E1 经碳正离子，E2 需要 antiperiplanar 协同消除。" },
  "zaitsev-rule": { id: "zaitsev-rule", name: "Zaitsev 规则", brief: "优先生成多取代烯烃", detailed: "热力学控制下更稳定烯烃产率更高。" },
  "hofmann-product": { id: "hofmann-product", name: "Hofmann 产物", brief: "位阻碱偏向少取代烯烃", detailed: "大位阻碱更易抽取可及性更高的 β-H。" },
  antiperiplanar: { id: "antiperiplanar", name: "反式共平面", brief: "E2 的构象要求", detailed: "β-H 与离去基反向共平面可最大化轨道重叠。" },
  rearrangement: { id: "rearrangement", name: "重排", brief: "中间体骨架迁移", detailed: "常见 1,2-氢迁移和 1,2-烷基迁移以稳定碳正离子。" },
  racemization: { id: "racemization", name: "消旋化", brief: "对映体比例趋于 1:1", detailed: "平面中间体允许两面进攻导致立体信息丢失。" },

  "solvent-effect": { id: "solvent-effect", name: "溶剂效应", brief: "溶剂改变反应速率和选择性", detailed: "质子溶剂强溶剂化阴离子；非质子极性溶剂常增强亲核性。" },
  "protic-solvent": { id: "protic-solvent", name: "质子溶剂", brief: "可供氢键的溶剂", detailed: "如 H₂O、ROH，常有利 SN1/E1。" },
  "aprotic-solvent": { id: "aprotic-solvent", name: "非质子极性溶剂", brief: "不供氢键但极性高", detailed: "如 DMSO/DMF/丙酮，常有利 SN2。" },
  "activation-energy": { id: "activation-energy", name: "活化能 Ea", brief: "越低反应越快", detailed: "反应物跨越过渡态所需能量差。" },
  "delta-g": { id: "delta-g", name: "自由能变化 ΔG", brief: "决定平衡方向", detailed: "ΔG<0 热力学自发，ΔG>0 需外部驱动。" },
  "hammond-postulate": { id: "hammond-postulate", name: "Hammond 假说", brief: "过渡态类似邻近稳定态", detailed: "放热反应 TS 偏反应物，吸热反应 TS 偏产物。" },

  "stereochemistry": { id: "stereochemistry", name: "立体化学", brief: "关注三维构型变化", detailed: "包括 R/S、E/Z、顺反、立体专一/选择性。" },
  "stereospecificity": { id: "stereospecificity", name: "立体专一性", brief: "底物立体构型决定产物构型", detailed: "SN2 翻转是典型立体专一过程。" },
  "regioselectivity": { id: "regioselectivity", name: "区域选择性", brief: "键形成位置偏好", detailed: "如 Markovnikov 与反马氏选择。" },
  "anti-addition": { id: "anti-addition", name: "反式加成", brief: "加成基团从相对两面加入", detailed: "溴鎓离子开环是经典 anti addition。" },
  "syn-addition": { id: "syn-addition", name: "顺式加成", brief: "加成基团同侧进入", detailed: "如某些金属催化氢化反应。" },

  "radical-initiation": { id: "radical-initiation", name: "自由基引发", brief: "链反应启动步骤", detailed: "通过光/热使弱键均裂形成自由基。" },
  "radical-chain": { id: "radical-chain", name: "自由基链增长", brief: "自由基再生维持循环", detailed: "增长步持续放大反应效率。" },
  "radical-termination": { id: "radical-termination", name: "自由基终止", brief: "两个自由基偶联失活", detailed: "自由基浓度下降后链反应停止。" },
  "anti-markovnikov": { id: "anti-markovnikov", name: "反 Markovnikov", brief: "自由基路径反向区域选择", detailed: "HBr + ROOR 条件下常见。" },

  carbonyl: { id: "carbonyl", name: "羰基亲电性", brief: "C=O 碳是亲核攻击位点", detailed: "氧电负性高使羰基碳带部分正电。" },
  cyanohydrin: { id: "cyanohydrin", name: "氰醇", brief: "HCN 对羰基加成产物", detailed: "可作为延碳与官能团转换中间体。" },
  "tetrahedral-intermediate": { id: "tetrahedral-intermediate", name: "四面体中间体", brief: "酰基取代关键中间体", detailed: "亲核加成后由平面羰基转为四面体结构。" },
  "equilibrium-shift": { id: "equilibrium-shift", name: "平衡移动", brief: "通过条件推动产率", detailed: "移除副产物或使用过量反应物可推平衡。" },

  "electrophilic-aromatic-substitution": { id: "electrophilic-aromatic-substitution", name: "芳香亲电取代", brief: "先加成后恢复芳香性", detailed: "形成 σ-络合物后去质子化再芳构化。" },
  "acylium-ion": { id: "acylium-ion", name: "酰鎓离子", brief: "Friedel-Crafts 亲电体", detailed: "RCO⁺ 由共振稳定，重排倾向小。" },
  "halonium-ion": { id: "halonium-ion", name: "卤鎓离子", brief: "桥式三元环正离子", detailed: "控制卤素加成反应立体化学。" },

  "chromate-ester": { id: "chromate-ester", name: "铬酸酯", brief: "PCC 氧化中间体", detailed: "经消除步骤转化为羰基产物。" },
  "oxidation-state": { id: "oxidation-state", name: "氧化态", brief: "追踪电子得失", detailed: "有助于快速判断氧化还原方向。" },
  "kinetic-vs-thermodynamic": { id: "kinetic-vs-thermodynamic", name: "动力学/热力学控制", brief: "快产物与稳产物竞争", detailed: "低温常偏动力学，高温可趋热力学。" },
  "orbital-overlap": { id: "orbital-overlap", name: "轨道重叠", brief: "反应能否进行的微观基础", detailed: "有效同相重叠降低能垒并提高速率。" },
  resonance: { id: "resonance", name: "共振稳定", brief: "电子离域分散电荷", detailed: "共振可显著稳定中间体并改变反应位点。" },
  "inductive-effect": { id: "inductive-effect", name: "诱导效应", brief: "通过 σ 键传递电子效应", detailed: "吸电子/给电子基团可影响反应速率与选择性。" },
  "mesomeric-effect": { id: "mesomeric-effect", name: "共轭效应", brief: "π 体系内电子推拉作用", detailed: "常用于解释芳环导向和中间体稳定性。" },
  "beta-hydrogen": { id: "beta-hydrogen", name: "β-氢", brief: "消除反应被夺取的氢", detailed: "E1/E2 中 β-位氢被夺取后形成双键。" },
  "homo-lumo": { id: "homo-lumo", name: "HOMO/LUMO", brief: "前线轨道相互作用", detailed: "亲核体 HOMO 与亲电体 LUMO 重叠主导反应。" },
  "rate-determining-step": { id: "rate-determining-step", name: "决速步", brief: "控制整体速率的最慢步骤", detailed: "能垒最高步骤决定动力学速率表达式。" },
  "chemo-selectivity": { id: "chemo-selectivity", name: "化学选择性", brief: "优先反应某一官能团", detailed: "多官能团底物中，条件决定优先转化位点。" },
  "retro-synthesis": { id: "retro-synthesis", name: "逆合成思维", brief: "从产物倒推反应路径", detailed: "用于规划机理教学中的前后逻辑与策略。" },
  "isotope-effect": { id: "isotope-effect", name: "同位素效应", brief: "同位素替换影响速率", detailed: "KIE 常用于判定是否涉及 C-H 断键的决速步。" },
};

export function getConcept(id: string): KeyConcept | undefined {
  return concepts[id];
}
