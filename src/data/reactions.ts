import { Reaction } from "@/types";

export const reactions: Reaction[] = [
  // ========== SN2 反应 ==========
  {
    id: "sn2",
    name: "SN2 亲核取代反应",
    nameEn: "SN2 Nucleophilic Substitution",
    category: "substitution",
    summary:
      "双分子亲核取代反应：亲核试剂从离去基团背面进攻碳原子，新键形成与旧键断裂同时发生（协同机理），构型完全翻转。",
    equation: {
      reactants: ["HO⁻", "CH₃Br"],
      conditions: ["丙酮溶剂"],
      products: ["CH₃OH", "Br⁻"],
    },
    reactants: [
      {
        condensed: "HO⁻",
        name: "氢氧根离子",
        smiles: "[OH-]",
        role: "nucleophile",
      },
      {
        condensed: "CH₃Br",
        name: "溴甲烷",
        smiles: "CBr",
        role: "reactant",
      },
    ],
    products: [
      {
        condensed: "CH₃OH",
        name: "甲醇",
        smiles: "CO",
        role: "product",
      },
      {
        condensed: "Br⁻",
        name: "溴离子",
        smiles: "[Br-]",
        role: "leaving-group",
      },
    ],
    conditions: "非质子极性溶剂（如丙酮、DMSO）",
    mechanism: [
      {
        id: 1,
        title: "亲核试剂背面进攻",
        description:
          "OH⁻ 从 C-Br 键的背面（180°方向）接近碳原子，其孤对电子指向碳的σ*反键轨道。",
        detailedExplanation:
          "SN2 反应是一步协同反应。亲核试剂必须从离去基团的正对面（180°）进攻，这是因为：\n\n1. **轨道对称性**：亲核试剂的孤对电子需要与 C-X 的σ*反键轨道重叠。σ*轨道的大叶片在离去基团的背面。\n2. **空间因素**：正面进攻会被离去基团阻挡。\n3. **电子因素**：背面进攻使得亲核试剂的电子可以同时与碳形成新键并削弱 C-X 键。\n\n这就是为什么 SN2 反应对底物的空间位阻非常敏感——碳上取代基越多，背面进攻越困难。",
        structures: ["HO⁻ ···· CH₃—Br"],
        keyConcepts: [
          {
            id: "nucleophile",
            name: "亲核试剂",
            brief: "富含电子、能够提供电子对进攻缺电子中心的物种。",
            detailed: "",
          },
          {
            id: "leaving-group",
            name: "离去基团",
            brief: "在反应中带着一对电子离去的基团。",
            detailed: "",
          },
        ],
      },
      {
        id: 2,
        title: "过渡态形成",
        description:
          "形成五配位过渡态 [HO···C···Br]⁻，碳原子呈 sp² 杂化，三个氢原子在赤道平面。",
        detailedExplanation:
          "在过渡态中：\n\n1. **碳原子几何构型**：碳从 sp³ 四面体变为类似 sp² 的三角双锥结构\n2. **键的状态**：C-OH 键部分形成（虚线），C-Br 键部分断裂（虚线），三个 C-H 键位于赤道平面\n3. **电荷分布**：负电荷分散在 OH 和 Br 之间\n4. **能量**：这是整个反应路径的能量最高点\n\n过渡态不能被分离，但可以通过动力学实验间接推断其结构。SN2 的速率方程 v = k[Nu⁻][R-X] 证明了两个分子同时参与决速步。",
        structures: ["[HO⸱⸱⸱C(H₃)⸱⸱⸱Br]⁻‡"],
        keyConcepts: [
          {
            id: "transition-state",
            name: "过渡态",
            brief: "反应过程中能量最高点的结构，不可分离。",
            detailed: "",
          },
        ],
      },
      {
        id: 3,
        title: "Walden 翻转完成",
        description:
          "C-OH 键完全形成，C-Br 键完全断裂，Br⁻ 离去。碳上三个氢像雨伞翻转一样翻转到另一侧，构型翻转。",
        detailedExplanation:
          "产物形成过程中：\n\n1. **键的变化**：C-O 键变为完整的σ键，C-Br 键完全断裂，Br⁻ 带着一对电子离去\n2. **构型翻转**：碳原子的三个取代基从一面翻转到另一面，就像风吹翻雨伞。如果原来是 R 构型，产物就是 S 构型\n3. **立体专一性**：100% 构型翻转，没有任何消旋化\n\n这个构型翻转（Walden 翻转）是 SN2 反应的标志性特征，也是区分 SN1 和 SN2 的关键实验证据。",
        structures: ["CH₃OH + Br⁻"],
        keyConcepts: [
          {
            id: "walden-inversion",
            name: "Walden 翻转",
            brief: "SN2 反应中手性中心构型完全翻转。",
            detailed: "",
          },
        ],
      },
    ],
    sideReactions: [
      {
        name: "E2 消除反应",
        description:
          "当亲核试剂同时是强碱时（如 OH⁻），可能发生 E2 消除生成烯烃。对于甲基底物几乎不发生，但随着底物位阻增大，E2 比例增加。",
        condition: "强碱、底物位阻大、温度高",
        products: ["CH₂=CH₂ (若底物为 CH₃CH₂Br)", "H₂O", "Br⁻"],
      },
    ],
    keyPoints: [
      "一步协同机理，无中间体",
      "速率方程：v = k[Nu⁻][底物]，二级反应",
      "构型完全翻转（Walden 翻转）",
      "底物活性：CH₃X > 1° > 2° >> 3°（3° 几乎不发生）",
      "强亲核试剂、非质子极性溶剂有利",
    ],
    factors: [
      "底物结构：位阻越小越有利（甲基 > 伯 > 仲 >> 叔）",
      "亲核试剂：亲核性越强速率越快",
      "离去基团：离去能力越好速率越快（I⁻ > Br⁻ > Cl⁻）",
      "溶剂：非质子极性溶剂（DMSO、DMF、丙酮）最有利",
    ],
  },

  // ========== 亲电加成反应 ==========
  {
    id: "electrophilic-addition-hbr",
    name: "HBr 对烯烃的亲电加成",
    nameEn: "Electrophilic Addition of HBr to Alkenes",
    category: "addition",
    summary:
      "HBr 加成到不对称烯烃上，遵循 Markovnikov 规则：H 加到含氢较多的碳上，Br 加到含氢较少的碳上。反应经过碳正离子中间体。",
    equation: {
      reactants: ["CH₃CH=CH₂", "HBr"],
      conditions: [],
      products: ["CH₃CHBrCH₃"],
    },
    reactants: [
      {
        condensed: "CH₃CH=CH₂",
        name: "丙烯",
        smiles: "CC=C",
        role: "reactant",
      },
      {
        condensed: "HBr",
        name: "溴化氢",
        smiles: "Br",
        role: "electrophile",
      },
    ],
    products: [
      {
        condensed: "CH₃CHBrCH₃",
        name: "2-溴丙烷",
        smiles: "CC(Br)C",
        role: "product",
      },
    ],
    conditions: "室温，无需催化剂",
    mechanism: [
      {
        id: 1,
        title: "质子化——形成碳正离子",
        description:
          "烯烃的π电子作为亲核试剂进攻 HBr 的 H（亲电试剂），双键断裂，H 加到双键一端，另一端碳成为碳正离子。",
        detailedExplanation:
          "这一步是决速步（慢步骤）：\n\n1. **烯烃的亲核性**：C=C 双键的π电子云位于碳骨架上下两侧，电子密度高，可以作为亲核试剂\n2. **HBr 的极化**：H-Br 键中 H 带部分正电荷（δ+），是亲电中心\n3. **区域选择性**：H⁺ 优先加到含氢多的碳上（C1），使 C2 成为更稳定的 2° 碳正离子，而不是加到 C2 产生不稳定的 1° 碳正离子\n\n这就是 **Markovnikov 规则** 的本质：反应经过更稳定的碳正离子中间体。",
        structures: [
          "CH₃CH=CH₂ + H⁺ → CH₃C⁺H—CH₃ (2° 碳正离子)",
        ],
        keyConcepts: [
          {
            id: "markovnikov",
            name: "Markovnikov 规则",
            brief: "H加到含氢较多的碳上，经过更稳定的碳正离子。",
            detailed: "",
          },
          {
            id: "carbocation",
            name: "碳正离子",
            brief: "带正电荷的碳原子，sp²杂化。",
            detailed: "",
          },
        ],
      },
      {
        id: 2,
        title: "Br⁻ 亲核进攻碳正离子",
        description:
          "Br⁻（亲核试剂）迅速进攻缺电子的碳正离子，形成 C-Br 键，得到产物 2-溴丙烷。",
        detailedExplanation:
          "这一步是快步骤：\n\n1. **碳正离子的活性**：2° 碳正离子虽然比 1° 稳定，但仍然是高度活泼的缺电子物种，会迅速与亲核试剂反应\n2. **Br⁻ 的进攻**：Br⁻ 可以从碳正离子平面的上方或下方进攻（碳正离子是平面 sp² 结构）\n3. **立体化学**：因为碳正离子是平面的，Br⁻ 从两面进攻的概率相等，所以如果该碳是手性中心，产物是外消旋体\n\n最终得到 Markovnikov 加成产物：CH₃CHBrCH₃",
        structures: ["CH₃C⁺H—CH₃ + Br⁻ → CH₃CHBrCH₃"],
        keyConcepts: [
          {
            id: "electrophile",
            name: "亲电试剂",
            brief: "缺电子、能够接受电子对的物种。",
            detailed: "",
          },
        ],
      },
    ],
    sideReactions: [
      {
        name: "反 Markovnikov 加成（自由基加成）",
        description:
          "在过氧化物（ROOR）存在下，HBr 通过自由基机理加成，得到反马氏产物。Br 加到含氢多的碳上。",
        condition: "过氧化物存在，光照或加热",
        products: ["CH₃CH₂CH₂Br (1-溴丙烷)"],
        mechanism: [
          {
            id: 1,
            title: "引发：生成 Br 自由基",
            description:
              "过氧化物均裂产生 RO·，RO· 夺取 HBr 的 H 生成 Br·。",
            detailedExplanation:
              "链引发阶段：\n1. ROOR → 2 RO·（过氧键均裂）\n2. RO· + HBr → ROH + Br·（Br自由基生成）\n\n过氧化物的 O-O 键较弱（约150 kJ/mol），容易在加热或光照下均裂。",
            structures: ["ROOR → 2 RO·", "RO· + HBr → ROH + Br·"],
          },
          {
            id: 2,
            title: "增长：Br· 加成到烯烃",
            description:
              "Br· 加到双键末端碳（含氢多的碳），生成更稳定的 2° 碳自由基。",
            detailedExplanation:
              "Br· 加到 C1 生成 2° 碳自由基（更稳定），而不是加到 C2 生成 1° 碳自由基。\n\n自由基稳定性顺序与碳正离子相同：3° > 2° > 1° > CH₃·\n\n注意：这里 Br 加到了含氢多的碳上——与离子型加成的区域选择性相反！",
            structures: [
              "CH₃CH=CH₂ + Br· → CH₃ĊH—CH₂Br",
            ],
          },
          {
            id: 3,
            title: "增长：碳自由基夺取 H",
            description:
              "碳自由基从另一个 HBr 分子夺取 H，生成产物并再生 Br·。",
            detailedExplanation:
              "CH₃ĊH—CH₂Br + HBr → CH₃CH₂CH₂Br + Br·\n\n再生的 Br· 继续与下一个烯烃分子反应，形成链式反应。这就是为什么只需要催化量的过氧化物就能引发反应。",
            structures: [
              "CH₃ĊH—CH₂Br + HBr → CH₃CH₂CH₂Br + Br·",
            ],
          },
        ],
      },
      {
        name: "碳正离子重排",
        description:
          "如果初始碳正离子相邻有更稳定的碳正离子位置，可能发生 1,2-氢迁移或 1,2-烷基迁移重排。",
        condition: "底物可生成更稳定碳正离子时",
        products: ["重排产物"],
      },
    ],
    keyPoints: [
      "两步反应：质子化（慢）→ 亲核进攻（快）",
      "遵循 Markovnikov 规则（H加到含氢多的碳）",
      "经过碳正离子中间体",
      "可能发生碳正离子重排",
      "过氧化物存在下转为自由基机理（反马氏）",
    ],
    factors: [
      "烯烃取代度：取代度越高，π电子密度越大，反应越快",
      "HX 活性：HI > HBr > HCl > HF",
      "过氧化物效应仅对 HBr 显著（HCl 和 HI 的自由基链反应热力学不利）",
    ],
  },

  // ========== E1 消除反应 ==========
  {
    id: "e1",
    name: "E1 消除反应",
    nameEn: "E1 Elimination",
    category: "elimination",
    summary:
      "单分子消除反应：分两步进行，先慢步骤离解生成碳正离子，再由碱夺取β-H消除得到烯烃。遵循 Zaitsev 规则。",
    equation: {
      reactants: ["(CH₃)₃CBr"],
      conditions: ["EtOH, 加热"],
      products: ["(CH₃)₂C=CH₂", "HBr"],
    },
    reactants: [
      {
        condensed: "(CH₃)₃CBr",
        name: "2-溴-2-甲基丙烷（叔丁基溴）",
        smiles: "CC(C)(C)Br",
        role: "reactant",
      },
    ],
    products: [
      {
        condensed: "(CH₃)₂C=CH₂",
        name: "2-甲基丙烯（异丁烯）",
        smiles: "CC(=C)C",
        role: "product",
      },
      {
        condensed: "HBr",
        name: "溴化氢",
        role: "product",
      },
    ],
    conditions: "质子溶剂（如乙醇、水），加热",
    mechanism: [
      {
        id: 1,
        title: "离去基团离去——生成碳正离子",
        description:
          "C-Br 键异裂，Br⁻ 带着一对电子离去，碳原子成为 3° 碳正离子。这是决速步。",
        detailedExplanation:
          "E1 的第一步与 SN1 完全相同：\n\n1. **键的异裂**：C-Br 键断裂，两个电子都归 Br，形成 Br⁻ 和 (CH₃)₃C⁺\n2. **碳正离子稳定性**：叔碳正离子被三个甲基通过超共轭和诱导效应稳定，这就是为什么 E1 几乎只在叔碳底物上发生\n3. **决速步**：这一步的活化能最高，决定了整个反应的速率\n4. **速率方程**：v = k[(CH₃)₃CBr]，只与底物浓度有关（单分子）\n\n溶剂的作用至关重要：质子溶剂（如乙醇）可以通过氢键稳定离去的 Br⁻ 和碳正离子，降低活化能。",
        structures: ["(CH₃)₃C—Br → (CH₃)₃C⁺ + Br⁻"],
        keyConcepts: [
          {
            id: "carbocation",
            name: "碳正离子",
            brief: "带正电荷的碳原子，sp²杂化，缺电子物种。",
            detailed: "",
          },
          {
            id: "leaving-group",
            name: "离去基团",
            brief: "在反应中带着一对电子离去的基团。",
            detailed: "",
          },
        ],
      },
      {
        id: 2,
        title: "碱夺取 β-氢",
        description:
          "溶剂分子（EtOH）作为碱，从碳正离子的β碳上夺取一个 H，电子对形成 C=C 双键。",
        detailedExplanation:
          "消除步骤的细节：\n\n1. **β-H 的酸性**：碳正离子使得邻位（β位）的 C-H 键酸性增强，因为失去 H 后电子对可以形成稳定的π键\n2. **碱的选择**：E1 通常用弱碱（如溶剂 EtOH），因为碳正离子活性高，不需要强碱\n3. **产物选择性（Zaitsev 规则）**：如果有多个β-H可供消除，优先生成取代度最高（最稳定）的烯烃\n4. **快步骤**：碳正离子一旦生成就迅速反应，这一步活化能低\n\n在本例中，(CH₃)₃C⁺ 只有一种β-H，所以只有一种消除产物。",
        structures: [
          "(CH₃)₃C⁺ + EtOH → (CH₃)₂C=CH₂ + EtOH₂⁺",
        ],
        keyConcepts: [
          {
            id: "basicity",
            name: "碱性 vs 亲核性",
            brief: "碱性是热力学性质，亲核性是动力学性质。",
            detailed: "",
          },
        ],
      },
    ],
    sideReactions: [
      {
        name: "SN1 取代反应",
        description:
          "碳正离子中间体也可以被亲核试剂（如溶剂 EtOH）直接进攻，生成取代产物而非消除产物。E1 和 SN1 共享同一个碳正离子中间体，因此总是竞争发生。",
        condition: "弱碱/弱亲核试剂，较低温度",
        products: ["(CH₃)₃C—OEt (叔丁基乙醚)"],
      },
      {
        name: "碳正离子重排",
        description:
          "如果存在可以通过 1,2-迁移生成更稳定碳正离子的途径，重排会在消除之前发生，导致骨架重排的产物。",
        condition: "邻位有可迁移的 H 或烷基时",
        products: ["重排烯烃"],
      },
    ],
    keyPoints: [
      "两步反应：C-X 离解（慢）→ 去质子化（快）",
      "速率方程：v = k[底物]，一级反应",
      "需要稳定的碳正离子：3° >> 2° > 1°（1°不发生）",
      "遵循 Zaitsev 规则：生成最稳定（多取代）烯烃",
      "与 SN1 竞争——升高温度有利于 E1",
      "质子溶剂有利",
    ],
    factors: [
      "底物结构：叔碳 >> 仲碳 > 伯碳（伯碳不发生 E1）",
      "温度：升温有利于消除（ΔS > 0）",
      "碱的强度：E1 不需要强碱，弱碱/溶剂即可",
      "溶剂：质子溶剂（EtOH、H₂O）有利于碳正离子的形成",
    ],
  },
];

export function getReaction(id: string): Reaction | undefined {
  return reactions.find((r) => r.id === id);
}

export function getReactionsByCategory(category: string): Reaction[] {
  return reactions.filter((r) => r.category === category);
}
