import { KeyConcept } from "@/types";

/** 关键概念库 —— 可深入学习的机理要素 */
export const concepts: Record<string, KeyConcept> = {
  nucleophile: {
    id: "nucleophile",
    name: "亲核试剂",
    brief: "富含电子、能够提供电子对进攻缺电子中心的物种。",
    detailed:
      "亲核试剂（Nucleophile）是指拥有孤对电子或负电荷，能向缺电子的原子（亲电中心）提供电子对形成新共价键的化学物种。亲核性的强弱受以下因素影响：\n\n1. **电荷**：负离子通常比中性分子亲核性更强（OH⁻ > H₂O）\n2. **电负性**：同周期中电负性越小，亲核性越强（NH₃ > H₂O > HF）\n3. **极化性**：同族中原子越大，极化性越强，在质子溶剂中亲核性越强（I⁻ > Br⁻ > Cl⁻ > F⁻）\n4. **溶剂效应**：质子溶剂会通过氢键溶剂化降低亲核性；非质子溶剂中亲核性与碱性趋势一致\n5. **空间位阻**：位阻越大亲核性越弱（(CH₃)₃CO⁻ 亲核性弱但碱性强）",
    relatedConcepts: ["electrophile", "leaving-group", "basicity"],
  },
  electrophile: {
    id: "electrophile",
    name: "亲电试剂",
    brief: "缺电子、能够接受电子对的物种。",
    detailed:
      "亲电试剂（Electrophile）是指缺少电子、能够接受来自亲核试剂的电子对的化学物种。常见亲电试剂包括：\n\n1. **正碳离子** (R⁺)：如叔碳正离子\n2. **极化的σ键**：如 R-X 中碳带部分正电荷\n3. **极化的π键**：如羰基 C=O 中碳带部分正电荷\n4. **Lewis酸**：如 BF₃、AlCl₃\n\n亲电性强弱取决于正电荷的集中程度和空间可接近性。",
    relatedConcepts: ["nucleophile", "carbocation"],
  },
  "leaving-group": {
    id: "leaving-group",
    name: "离去基团",
    brief: "在反应中带着一对电子离去的基团，通常是弱碱。",
    detailed:
      "离去基团（Leaving Group）是在取代或消除反应中，带着共用电子对离去的原子或基团。好的离去基团特征：\n\n1. **弱碱性**：共轭酸越强，离去能力越好\n2. **能稳定负电荷**：通过共振、诱导效应分散电荷\n3. **极化性好**：更容易被拉伸断键\n\n离去能力排序：TsO⁻ > I⁻ > Br⁻ > Cl⁻ >> F⁻ >> OH⁻\n\nOH⁻ 和 NH₂⁻ 是很差的离去基团（强碱），但可以通过质子化转化为 H₂O 和 NH₃（中性分子，较好的离去基团）。",
    relatedConcepts: ["nucleophile", "basicity"],
  },
  carbocation: {
    id: "carbocation",
    name: "碳正离子",
    brief: "带正电荷的碳原子，sp²杂化，缺电子物种。",
    detailed:
      "碳正离子（Carbocation）是碳原子只有6个价电子、带正电荷的活泼中间体。\n\n**稳定性顺序**：\n3° > 2° > 1° > CH₃⁺\n\n**稳定化因素**：\n1. **超共轭效应**：相邻 C-H 键的σ电子离域到空p轨道\n2. **诱导效应**：烷基的推电子效应\n3. **共振稳定**：苄基正离子、烯丙基正离子\n4. **杂原子稳定**：相邻氧/氮的孤对电子共振\n\n**碳正离子重排**：\n- 1,2-氢迁移：H 从邻碳迁移到正电荷碳\n- 1,2-烷基迁移：烷基从邻碳迁移\n- 总是从不稳定重排到更稳定的碳正离子",
    relatedConcepts: ["electrophile", "hyperconjugation"],
  },
  "transition-state": {
    id: "transition-state",
    name: "过渡态",
    brief: "反应过程中能量最高点的结构，不可分离的瞬间状态。",
    detailed:
      "过渡态（Transition State）是从反应物到产物的反应路径上能量最高点对应的结构。\n\n**关键特征**：\n1. 不能被分离或直接观测\n2. 旧键部分断裂、新键部分形成\n3. 决定反应的活化能（Ea）\n4. 用 ‡ 符号标记\n\n**与中间体的区别**：\n- 过渡态：能量最高点（鞍点），寿命为零\n- 中间体：能量局部最低点，有短暂但有限的寿命\n\n**Hammond 假说**：\n放热反应的过渡态结构更接近反应物；吸热反应的过渡态结构更接近产物。",
    relatedConcepts: ["carbocation", "activation-energy"],
  },
  "walden-inversion": {
    id: "walden-inversion",
    name: "Walden 翻转",
    brief: "SN2 反应中手性中心构型完全翻转的现象。",
    detailed:
      "Walden 翻转（Walden Inversion）是 SN2 反应的标志性立体化学特征。\n\n**机理**：\n亲核试剂从离去基团的背面（180°）进攻碳原子。在过渡态中，碳原子呈 sp² 杂化（三角双锥），攻击方向与离去方向共线。随着新键形成、旧键断裂，其余三个基团如雨伞翻转一般翻到另一面。\n\n**立体化学结果**：\n- 构型完全翻转（R → S 或 S → R）\n- 100% 立体专一性\n- 这是 SN2 机理是协同反应的直接证据\n\n**类比**：\n像风把雨伞吹翻一样——伞骨（三个取代基）从一面翻转到另一面。",
    relatedConcepts: ["nucleophile", "leaving-group", "transition-state"],
  },
  "markovnikov": {
    id: "markovnikov",
    name: "Markovnikov 规则",
    brief: "不对称烯烃加 HX 时，H 加到含氢较多的碳上。",
    detailed:
      "Markovnikov 规则（马氏规则）描述了不对称烯烃与 HX 加成时的区域选择性。\n\n**经典表述**：\"氢加氢多\"——H 加到双键中已有氢更多的碳上。\n\n**现代解释**：\n反应经过更稳定的碳正离子中间体。质子化双键时，优先生成更稳定（取代度更高）的碳正离子：\n- 3° 碳正离子 > 2° 碳正离子 > 1° 碳正离子\n\n**适用范围**：\n- HX 加成到烯烃\n- H₂O（酸催化）加成到烯烃\n- 所有经历碳正离子中间体的亲电加成\n\n**反 Markovnikov 加成**：\n在过氧化物存在下，HBr 与烯烃发生自由基加成，给出反马氏产物。这是因为自由基稳定性决定了区域选择性。",
    relatedConcepts: ["carbocation", "electrophile"],
  },
  basicity: {
    id: "basicity",
    name: "碱性 vs 亲核性",
    brief: "碱性是热力学性质（平衡），亲核性是动力学性质（速率）。",
    detailed:
      "碱性和亲核性都涉及电子对的给予，但衡量的维度不同：\n\n**碱性（Basicity）**：\n- 热力学概念：衡量对质子 H⁺ 的亲和力\n- 用 pKa（共轭酸）衡量\n- 与平衡常数相关\n\n**亲核性（Nucleophilicity）**：\n- 动力学概念：衡量进攻碳原子的速率\n- 用 SN2 反应速率衡量\n- 与活化能相关\n\n**二者不一致的情况**：\n- t-BuO⁻：强碱但弱亲核试剂（位阻大）\n- I⁻：弱碱但强亲核试剂（极化性大）\n- 在非质子溶剂中：碱性和亲核性趋势基本一致",
    relatedConcepts: ["nucleophile", "leaving-group"],
  },
  hyperconjugation: {
    id: "hyperconjugation",
    name: "超共轭效应",
    brief: "相邻σ键电子与空p轨道或π*轨道的离域作用。",
    detailed:
      "超共轭效应（Hyperconjugation）是σ键（通常是 C-H 或 C-C）中的电子向相邻空轨道的离域。\n\n**在碳正离子中**：\n邻位 C-H σ键电子部分离域到碳正离子的空 p 轨道，分散正电荷，降低体系能量。这解释了为什么取代度越高的碳正离子越稳定——有更多的 C-H 键参与超共轭。\n\n**在烯烃中**：\nC-H σ键电子可以离域到 C=C 的 π* 反键轨道，解释了多取代烯烃更稳定的原因（Zaitsev 规则的基础）。\n\n**与诱导效应的区别**：\n- 超共轭：通过轨道重叠实现电子离域\n- 诱导效应：通过σ键的极化传递",
    relatedConcepts: ["carbocation"],
  },
};

export function getConcept(id: string): KeyConcept | undefined {
  return concepts[id];
}
