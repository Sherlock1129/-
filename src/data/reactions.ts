import { Reaction } from "@/types";

export const reactions: Reaction[] = [
  {
    id: "sn2",
    name: "SN2 亲核取代反应",
    nameEn: "SN2 Nucleophilic Substitution",
    category: "substitution",
    summary:
      "双分子亲核取代反应：亲核试剂背面进攻亲电碳，成键与断键同步发生，伴随构型翻转。",
    equation: {
      reactants: ["HO⁻", "CH₃Br"],
      conditions: ["丙酮"],
      products: ["CH₃OH", "Br⁻"],
    },
    reactants: [
      { condensed: "HO⁻", name: "氢氧根", smiles: "[OH-]", role: "nucleophile" },
      { condensed: "CH₃Br", name: "溴甲烷", smiles: "CBr", role: "reactant" },
    ],
    products: [
      { condensed: "CH₃OH", name: "甲醇", smiles: "CO", role: "product" },
      { condensed: "Br⁻", name: "溴离子", smiles: "[Br-]", role: "leaving-group" },
    ],
    conditions: "非质子极性溶剂（DMSO、DMF、丙酮）",
    mechanism: [
      {
        id: 1,
        title: "背面进攻与电子转移",
        description: "OH⁻ 孤对电子进攻 C-Br 反键轨道，Br⁻ 同步离去。",
        detailedExplanation:
          "**1. 电子转移**：亲核体孤对电子从背面进攻，C-Br 键电子对转移至 Br。\n\n**2. 轨道分析**：HOMO（Nu 的孤对）与 LUMO（σ* C-Br）发生同相重叠。\n\n**3. 立体化学**：背面进攻导致中心碳构型翻转（Walden inversion）。\n\n**4. 动力学**：一步协同、二级反应，v = k[Nu⁻][R-X]。\n\n**5. 关键因素**：低位阻底物、强亲核体、好离去基更有利。",
        structures: ["HO⁻ + CH₃Br → [HO···CH₃···Br]⁻‡ → CH₃OH + Br⁻"],
        keyConcepts: [
          { id: "nucleophile", name: "亲核试剂", brief: "给电子对形成新键", detailed: "" },
          { id: "walden-inversion", name: "Walden 翻转", brief: "SN2 的立体专一性特征", detailed: "" },
        ],
      },
    ],
    sideReactions: [
      {
        name: "E2 竞争",
        description: "强碱条件下可能同时夺取 β-H 发生消除。",
        condition: "强碱、升温、位阻增大",
        products: ["烯烃", "H₂O", "Br⁻"],
      },
    ],
    keyPoints: [
      "一步协同反应，无中间体",
      "速率取决于亲核体与底物浓度",
      "构型反转是机制证据",
      "位阻越大速率越慢",
      "非质子极性溶剂有利",
    ],
    factors: ["底物位阻", "亲核性", "离去基能力", "溶剂效应"],
  },
  {
    id: "sn1",
    name: "SN1 亲核取代反应",
    nameEn: "SN1 Nucleophilic Substitution",
    category: "substitution",
    summary: "单分子亲核取代：先离解形成碳正离子，再被亲核体进攻，常出现消旋与重排。",
    equation: {
      reactants: ["(CH₃)₃CBr", "H₂O"],
      conditions: ["室温"],
      products: ["(CH₃)₃COH", "HBr"],
    },
    conditions: "极性质子溶剂中进行，三级底物最典型",
    mechanism: [
      {
        id: 1,
        title: "离去基团离解",
        description: "C-Br 键异裂，形成叔碳正离子。",
        detailedExplanation:
          "**1. 电子转移**：C-Br 键电子完全转移到 Br，形成 Br⁻。\n\n**2. 轨道分析**：离解后碳中心形成空 p 轨道，成为强亲电中心。\n\n**3. 立体化学**：碳正离子是平面结构，后续进攻两面都可发生。\n\n**4. 动力学**：该步是决速步，v = k[R-X]。\n\n**5. 关键因素**：碳正离子稳定性和溶剂极性是核心。",
        structures: ["(CH₃)₃C-Br → (CH₃)₃C⁺ + Br⁻"],
        keyConcepts: [
          { id: "carbocation", name: "碳正离子", brief: "SN1 核心中间体", detailed: "" },
          { id: "leaving-group", name: "离去基团", brief: "带电子离去", detailed: "" },
        ],
      },
      {
        id: 2,
        title: "亲核进攻与去质子化",
        description: "水进攻碳正离子，随后失去质子得到醇。",
        detailedExplanation:
          "**1. 电子转移**：H₂O 孤对进攻碳正离子形成 C-O 键，再经去质子化中和。\n\n**2. 轨道分析**：Nu 的 lone pair 与碳正离子空 p 轨道重叠。\n\n**3. 立体化学**：平面中间体导致外消旋倾向。\n\n**4. 动力学**：进攻通常快于离解。\n\n**5. 关键因素**：亲核体强弱影响次级速率但不改决速步。",
        structures: ["(CH₃)₃C⁺ + H₂O → (CH₃)₃COH₂⁺ → (CH₃)₃COH + H⁺"],
        keyConcepts: [
          { id: "racemization", name: "消旋化", brief: "平面中间体导致立体信息丢失", detailed: "" },
        ],
      },
    ],
    sideReactions: [
      {
        name: "E1 消除",
        description: "碳正离子可被碱夺取 β-H 形成烯烃。",
        condition: "升温、碱性增强",
        products: ["异丁烯"],
      },
    ],
    keyPoints: ["先离解后进攻", "速率只与底物有关", "易重排", "常伴消旋"],
    factors: ["底物取代度", "溶剂极性", "离去基能力", "温度"],
  },
  {
    id: "e1",
    name: "E1 消除反应",
    nameEn: "E1 Elimination",
    category: "elimination",
    summary: "先形成碳正离子再失去 β-H 形成烯烃，遵循 Zaitsev 规则。",
    equation: {
      reactants: ["(CH₃)₃CBr"],
      conditions: ["EtOH, 加热"],
      products: ["(CH₃)₂C=CH₂", "HBr"],
    },
    conditions: "质子溶剂、升温条件下进行",
    mechanism: [
      {
        id: 1,
        title: "离解生成碳正离子",
        description: "离去基先离去，形成平面碳正离子。",
        detailedExplanation:
          "**1. 电子转移**：C-X 键异裂产生 X⁻ 和碳正离子。\n\n**2. 轨道分析**：形成空 p 轨道，增强邻位 C-H 酸性。\n\n**3. 立体化学**：平面中间体降低立体专一性。\n\n**4. 动力学**：该步为决速步，一级速率。\n\n**5. 关键因素**：极性质子溶剂稳定离子对。",
        structures: ["(CH₃)₃C-Br → (CH₃)₃C⁺ + Br⁻"],
        keyConcepts: [{ id: "carbocation", name: "碳正离子", brief: "E1 中间体", detailed: "" }],
      },
      {
        id: 2,
        title: "去质子化成烯",
        description: "碱夺取 β-H，电子形成 π 键。",
        detailedExplanation:
          "**1. 电子转移**：β-C-H 键电子转移形成 C=C。\n\n**2. 轨道分析**：σ(C-H) 电子转化为 π(C=C) 离域。\n\n**3. 立体化学**：通常给热力学更稳定烯烃。\n\n**4. 动力学**：快步骤，不控制总体速率。\n\n**5. 关键因素**：温度升高和较弱碱均可推动 E1。",
        structures: ["(CH₃)₃C⁺ + EtOH → (CH₃)₂C=CH₂ + EtOH₂⁺"],
        keyConcepts: [{ id: "zaitsev-rule", name: "Zaitsev 规则", brief: "优先形成更取代烯烃", detailed: "" }],
      },
    ],
    sideReactions: [{ name: "SN1 竞争", description: "同一碳正离子可被亲核体捕获。", condition: "低温", products: ["叔丁基醚"] }],
    keyPoints: ["两步机制", "一级动力学", "经碳正离子", "与 SN1 竞争"],
    factors: ["底物稳定性", "溶剂", "温度", "离去基能力"],
  },
  {
    id: "e2-oh-alkyl-halide",
    name: "E2 消除（OH⁻ + 卤代烷）",
    nameEn: "E2 Elimination of Alkyl Halides",
    category: "elimination",
    summary: "强碱一步协同夺取 β-H 并同步离去基脱离，形成烯烃。",
    equation: {
      reactants: ["CH₃CH₂CH₂Br", "OH⁻"],
      conditions: ["乙醇, 加热"],
      products: ["CH₃CH=CH₂", "Br⁻", "H₂O"],
    },
    conditions: "强碱 + 升温，反式共平面构型最有利",
    mechanism: [
      {
        id: 1,
        title: "抗式消除协同发生",
        description: "OH⁻ 夺取 β-H，同步形成 C=C 并使 Br⁻ 离去。",
        detailedExplanation:
          "**1. 电子转移**：碱夺取 β-H，C-H 电子形成 π 键，同时 C-Br 电子转移到 Br。\n\n**2. 轨道分析**：需要 antiperiplanar 构象，保证 σ(C-H) 与 σ*(C-Br) 有效重叠。\n\n**3. 立体化学**：构象控制产物几何，常给反式烯烃。\n\n**4. 动力学**：一步二级，v = k[RX][Base]。\n\n**5. 关键因素**：强碱、高温、底物可达抗式构象。",
        structures: ["CH₃CH₂CH₂Br + OH⁻ → CH₃CH=CH₂ + Br⁻ + H₂O"],
        keyConcepts: [
          { id: "antiperiplanar", name: "反式共平面", brief: "E2 构型要求", detailed: "" },
          { id: "zaitsev-rule", name: "Zaitsev 规则", brief: "多取代烯烃优先", detailed: "" },
        ],
      },
    ],
    sideReactions: [{ name: "SN2 竞争", description: "伯卤代烷上强亲核体也会取代。", condition: "低温、弱位阻", products: ["醇"] }],
    keyPoints: ["一步协同", "二级动力学", "要求 antiperiplanar", "升温有利消除"],
    factors: ["碱强度", "底物位阻", "构象可达性", "温度"],
  },
  {
    id: "br2-alkene-anti-addition",
    name: "Br₂ 对烯烃的反式加成",
    nameEn: "Anti Addition of Br2 to Alkenes",
    category: "addition",
    summary: "烯烃先形成溴鎓离子，再被 Br⁻ 背面开环，得到反式二溴化物。",
    equation: {
      reactants: ["CH₂=CH₂", "Br₂"],
      conditions: ["CCl₄"],
      products: ["BrCH₂CH₂Br"],
    },
    conditions: "惰性溶剂中进行，避免强亲核溶剂竞争",
    mechanism: [
      {
        id: 1,
        title: "形成溴鎓离子",
        description: "π 键极化 Br₂ 并进攻，形成三元环溴鎓中间体。",
        detailedExplanation:
          "**1. 电子转移**：π 电子进攻 Br₂，Br-Br 异裂产生 Br⁻。\n\n**2. 轨道分析**：π 轨道与 Br-Br σ* 轨道耦合，形成桥式中间体。\n\n**3. 立体化学**：桥式结构屏蔽同侧进攻。\n\n**4. 动力学**：中间体形成较快，区域选择受正电分布影响。\n\n**5. 关键因素**：烯烃电子密度越高越易反应。",
        structures: ["CH₂=CH₂ + Br₂ → [CH₂-CH₂-Br]⁺ + Br⁻"],
        keyConcepts: [{ id: "halonium-ion", name: "卤鎓离子", brief: "三元环正离子中间体", detailed: "" }],
      },
      {
        id: 2,
        title: "Br⁻ 背面开环",
        description: "Br⁻ 从反面进攻并开环，给反式加成产物。",
        detailedExplanation:
          "**1. 电子转移**：Br⁻ 进攻环上更缺电子碳，C-Br 桥键断裂。\n\n**2. 轨道分析**：类似 SN2 开环，背面进攻。\n\n**3. 立体化学**：严格 anti addition。\n\n**4. 动力学**：开环快。\n\n**5. 关键因素**：溶剂亲核性决定副产物。",
        structures: ["[CH₂-CH₂-Br]⁺ + Br⁻ → BrCH₂CH₂Br"],
        keyConcepts: [{ id: "anti-addition", name: "反式加成", brief: "两基团从相对两侧加入", detailed: "" }],
      },
    ],
    sideReactions: [{ name: "卤代醇生成", description: "水存在时水分子开环。", condition: "湿润溶剂", products: ["溴代醇"] }],
    keyPoints: ["先卤鎓后开环", "反式加成", "不经自由碳正离子"],
    factors: ["溶剂", "烯烃取代度", "亲核体种类"],
  },
  {
    id: "cyanohydrin-formation",
    name: "醛酮与 HCN 的亲核加成",
    nameEn: "Nucleophilic Addition of HCN to Carbonyl",
    category: "addition",
    summary: "CN⁻ 进攻羰基碳生成烷氧负离子，再质子化得到氰醇。",
    equation: {
      reactants: ["CH₃CHO", "HCN"],
      conditions: ["NaCN 催化"],
      products: ["CH₃CH(OH)CN"],
    },
    conditions: "弱碱性条件维持 CN⁻ 供给并避免副反应",
    mechanism: [
      {
        id: 1,
        title: "CN⁻ 进攻羰基",
        description: "CN⁻ 进攻羰基碳，π 键电子转移到氧形成烷氧负离子。",
        detailedExplanation:
          "**1. 电子转移**：CN⁻ 作为亲核体攻击羰基碳，C=O π 电子移向 O。\n\n**2. 轨道分析**：HOMO(CN⁻) 与 LUMO(π* C=O) 重叠。\n\n**3. 立体化学**：平面羰基可双面进攻，手性中心可形成外消旋。\n\n**4. 动力学**：亲核加成是关键步骤。\n\n**5. 关键因素**：羰基电子贫化程度决定速率。",
        structures: ["CH₃CHO + CN⁻ → CH₃CH(O⁻)CN"],
        keyConcepts: [{ id: "carbonyl", name: "羰基活化", brief: "C=O 的亲电碳位点", detailed: "" }],
      },
      {
        id: 2,
        title: "烷氧负离子质子化",
        description: "烷氧负离子从 HCN 或溶剂获取质子生成氰醇。",
        detailedExplanation:
          "**1. 电子转移**：O⁻ 夺取 H⁺。\n\n**2. 轨道分析**：酸碱中和步骤。\n\n**3. 立体化学**：若生成新手性中心，可能出现对映体混合物。\n\n**4. 动力学**：快速质子转移。\n\n**5. 关键因素**：pH 控制决定 CN⁻ 有效浓度。",
        structures: ["CH₃CH(O⁻)CN + HCN → CH₃CH(OH)CN + CN⁻"],
        keyConcepts: [{ id: "cyanohydrin", name: "氰醇", brief: "羰基亲核加成产物", detailed: "" }],
      },
    ],
    sideReactions: [{ name: "羟醛副反应", description: "碱过强时醛可自缩合。", condition: "强碱过量", products: ["缩合副产物"] }],
    keyPoints: ["亲核加成-质子化两步", "CN⁻ 为关键亲核体", "常形成新手性中心"],
    factors: ["羰基取代度", "pH", "温度", "CN⁻ 浓度"],
  },
  {
    id: "friedel-crafts-acylation",
    name: "Friedel-Crafts 酰基化",
    nameEn: "Friedel-Crafts Acylation",
    category: "substitution",
    summary: "芳环对酰鎓离子进行亲电取代，得到芳香酮并恢复芳香性。",
    equation: {
      reactants: ["C₆H₆", "CH₃COCl"],
      conditions: ["AlCl₃"],
      products: ["C₆H₅COCH₃", "HCl"],
    },
    conditions: "无水 Lewis 酸条件，避免催化剂失活",
    mechanism: [
      {
        id: 1,
        title: "生成酰鎓离子",
        description: "酰氯与 AlCl₃ 配位并离解形成酰鎓亲电体。",
        detailedExplanation:
          "**1. 电子转移**：Cl 向 AlCl₃ 供电子后离去，形成 RCO⁺。\n\n**2. 轨道分析**：酰鎓离子由共振稳定，是强亲电体。\n\n**3. 立体化学**：平面亲电体便于芳环进攻。\n\n**4. 动力学**：亲电体生成影响整体速率。\n\n**5. 关键因素**：无水条件与 Lewis 酸强度。",
        structures: ["CH₃COCl + AlCl₃ → CH₃CO⁺ + AlCl₄⁻"],
        keyConcepts: [{ id: "acylium-ion", name: "酰鎓离子", brief: "共振稳定亲电体", detailed: "" }],
      },
      {
        id: 2,
        title: "芳环亲电取代与去质子化",
        description: "苯环进攻酰鎓形成 σ-络合物，再去质子化恢复芳香性。",
        detailedExplanation:
          "**1. 电子转移**：芳环 π 电子进攻酰鎓，随后碱夺 H⁺ 恢复芳香。\n\n**2. 轨道分析**：芳环 HOMO 与酰鎓 LUMO 作用。\n\n**3. 立体化学**：无重排，区域选择受取代基导向。\n\n**4. 动力学**：σ-络合物形成通常为能垒较高步骤。\n\n**5. 关键因素**：取代基活化/钝化效应显著。",
        structures: ["C₆H₆ + CH₃CO⁺ → σ-络合物 → C₆H₅COCH₃ + H⁺"],
        keyConcepts: [{ id: "electrophilic-aromatic-substitution", name: "芳香亲电取代", brief: "EAS 经典机制", detailed: "" }],
      },
    ],
    sideReactions: [{ name: "多酰化受限", description: "酰基钝化芳环，二次取代显著降低。", condition: "过量底物", products: ["少量二酰化物"] }],
    keyPoints: ["经酰鎓离子", "EAS 机理", "通常不重排", "产物较稳定"],
    factors: ["芳环活化程度", "Lewis 酸强度", "无水条件", "温度"],
  },
  {
    id: "methane-chlorination",
    name: "甲烷氯代自由基取代",
    nameEn: "Radical Chlorination of Methane",
    category: "radical",
    summary: "光照下 Cl₂ 发生均裂，经历链引发-增长-终止，得到氯甲烷。",
    equation: {
      reactants: ["CH₄", "Cl₂"],
      conditions: ["hν"],
      products: ["CH₃Cl", "HCl"],
    },
    conditions: "紫外光或高温引发自由基链反应",
    mechanism: [
      {
        id: 1,
        title: "链引发",
        description: "Cl₂ 光解均裂生成两个 Cl·。",
        detailedExplanation:
          "**1. 电子转移**：Cl-Cl 键均裂，每个 Cl 各得一个电子。\n\n**2. 轨道分析**：σ 键在光激发下断裂。\n\n**3. 立体化学**：自由基步骤通常立体选择弱。\n\n**4. 动力学**：引发步慢但决定反应开始。\n\n**5. 关键因素**：光强与温度。",
        structures: ["Cl₂ --hν→ 2 Cl·"],
        keyConcepts: [{ id: "radical-initiation", name: "自由基引发", brief: "链反应启动步骤", detailed: "" }],
      },
      {
        id: 2,
        title: "链增长",
        description: "Cl· 抽氢生成 CH₃·，CH₃· 再与 Cl₂ 反应生成 CH₃Cl 并再生 Cl·。",
        detailedExplanation:
          "**1. 电子转移**：Cl· 抽取 H 后产生 CH₃·；CH₃· 进攻 Cl₂ 再生 Cl·。\n\n**2. 轨道分析**：单电子过程，SOMO 参与反应。\n\n**3. 立体化学**：甲烷无手性问题。\n\n**4. 动力学**：增长步循环导致量子产率高。\n\n**5. 关键因素**：反应物比例决定过氯化概率。",
        structures: ["Cl· + CH₄ → HCl + CH₃·", "CH₃· + Cl₂ → CH₃Cl + Cl·"],
        keyConcepts: [{ id: "radical-chain", name: "链式反应", brief: "自由基循环再生", detailed: "" }],
      },
    ],
    sideReactions: [{ name: "过度氯化", description: "继续取代可生成 CH₂Cl₂、CHCl₃、CCl₄。", condition: "Cl₂ 过量/长时间照射", products: ["CH₂Cl₂", "CHCl₃", "CCl₄"] }],
    keyPoints: ["均裂引发", "链增长主导", "可多步氯化", "需控制停留时间"],
    factors: ["光照强度", "Cl₂ 比例", "反应时间", "温度"],
  },
  {
    id: "pcc-oxidation-alcohol",
    name: "PCC 氧化醇",
    nameEn: "Oxidation of Alcohols by PCC",
    category: "oxidation",
    summary: "PCC 可将一级醇温和氧化到醛、二级醇氧化到酮，通常避免过氧化。",
    equation: {
      reactants: ["RCH₂OH", "PCC"],
      conditions: ["CH₂Cl₂"],
      products: ["RCHO"],
    },
    conditions: "无水条件下温和氧化，避免醛进一步氧化",
    mechanism: [
      {
        id: 1,
        title: "形成铬酸酯",
        description: "醇氧与 Cr(VI) 配位生成铬酸酯中间体。",
        detailedExplanation:
          "**1. 电子转移**：醇氧孤对与 Cr 中心配位。\n\n**2. 轨道分析**：Lewis 酸碱相互作用形成可消除中间体。\n\n**3. 立体化学**：不改变骨架构型，仅发生官能团氧化。\n\n**4. 动力学**：中间体形成较快。\n\n**5. 关键因素**：无水环境抑制副反应。",
        structures: ["RCH₂OH + PCC → RCH₂O-Cr 中间体"],
        keyConcepts: [{ id: "chromate-ester", name: "铬酸酯", brief: "PCC 氧化关键中间体", detailed: "" }],
      },
      {
        id: 2,
        title: "β-消除生成羰基",
        description: "碱夺取 α-H，发生类 E2 消除生成羰基。",
        detailedExplanation:
          "**1. 电子转移**：C-H 电子形成 C=O，Cr-O 键断裂。\n\n**2. 轨道分析**：σ(C-H) 向 π(C=O) 转化。\n\n**3. 立体化学**：通常保持碳骨架不变。\n\n**4. 动力学**：消除步骤决定产物形成速率。\n\n**5. 关键因素**：底物类型决定停留在醛还是酮。",
        structures: ["RCH₂O-Cr → RCHO"],
        keyConcepts: [{ id: "oxidation-state", name: "氧化态变化", brief: "碳被氧化、铬被还原", detailed: "" }],
      },
    ],
    sideReactions: [{ name: "过氧化", description: "含水或过强氧化条件下醛可继续氧化为酸。", condition: "含水环境", products: ["RCOOH"] }],
    keyPoints: ["温和选择性高", "一级醇→醛", "二级醇→酮", "需无水"],
    factors: ["底物类型", "含水量", "温度", "氧化剂当量"],
  },
  {
    id: "fischer-esterification",
    name: "Fischer 酯化",
    nameEn: "Fischer Esterification",
    category: "addition",
    summary: "羧酸与醇在酸催化下可逆缩合成酯，需移除水推动平衡。",
    equation: {
      reactants: ["CH₃COOH", "CH₃CH₂OH"],
      conditions: ["H₂SO₄, 加热"],
      products: ["CH₃COOCH₂CH₃", "H₂O"],
    },
    conditions: "酸催化并持续脱水以提高酯收率",
    mechanism: [
      {
        id: 1,
        title: "羰基活化与醇进攻",
        description: "羧酸羰基先被质子化，随后乙醇亲核进攻。",
        detailedExplanation:
          "**1. 电子转移**：羰基氧先受质子活化，随后醇氧孤对进攻羰基碳。\n\n**2. 轨道分析**：质子化降低 π* 轨道能级，增强亲电性。\n\n**3. 立体化学**：经四面体中间体，不涉及手性控制。\n\n**4. 动力学**：亲核进攻与后续质子转移共同控制速率。\n\n**5. 关键因素**：酸强度与醇浓度。",
        structures: ["CH₃COOH + H⁺ + EtOH → 四面体中间体"],
        keyConcepts: [{ id: "tetrahedral-intermediate", name: "四面体中间体", brief: "酰基取代常见中间体", detailed: "" }],
      },
      {
        id: 2,
        title: "水离去与去质子化",
        description: "中间体经质子转移后脱水，最后去质子化得到酯。",
        detailedExplanation:
          "**1. 电子转移**：羟基转化为更好离去基（水），离去后重建羰基。\n\n**2. 轨道分析**：孤对回落形成 π 键。\n\n**3. 立体化学**：主要是官能团互变。\n\n**4. 动力学**：可逆反应，平衡控制更关键。\n\n**5. 关键因素**：移水、过量醇、酸催化循环。",
        structures: ["四面体中间体 → CH₃COOCH₂CH₃ + H₂O + H⁺"],
        keyConcepts: [{ id: "equilibrium-shift", name: "平衡移动", brief: "勒夏特列原理提升收率", detailed: "" }],
      },
    ],
    sideReactions: [{ name: "酸催化脱水", description: "乙醇在强酸高温下可脱水成乙烯。", condition: "高温浓硫酸", products: ["CH₂=CH₂"] }],
    keyPoints: ["酸催化可逆", "四面体中间体", "脱水推动平衡", "常需回流"],
    factors: ["酸浓度", "温度", "移水效率", "醇/酸比例"],
  },
  {
    id: "electrophilic-addition-hbr",
    name: "HBr 对烯烃的亲电加成",
    nameEn: "Electrophilic Addition of HBr to Alkenes",
    category: "addition",
    summary: "离子机制下遵循 Markovnikov 规则；过氧化物存在时可走自由基反马氏路径。",
    equation: {
      reactants: ["CH₃CH=CH₂", "HBr"],
      conditions: [],
      products: ["CH₃CHBrCH₃"],
    },
    conditions: "常温下即可反应，过氧化物会改变机制",
    mechanism: [
      {
        id: 1,
        title: "质子化形成碳正离子",
        description: "π 键进攻 H⁺，优先形成更稳定碳正离子。",
        detailedExplanation:
          "**1. 电子转移**：π 电子进攻 H-Br 的 H，Br 以 Br⁻ 形式离去。\n\n**2. 轨道分析**：烯烃 HOMO 与 H-Br σ* 作用。\n\n**3. 立体化学**：经平面碳正离子，可能失去立体专一性。\n\n**4. 动力学**：质子化通常是决速步。\n\n**5. 关键因素**：碳正离子稳定性决定区域选择。",
        structures: ["CH₃CH=CH₂ + HBr → CH₃C⁺HCH₃ + Br⁻"],
        keyConcepts: [{ id: "markovnikov", name: "Markovnikov 规则", brief: "氢加氢多", detailed: "" }],
      },
      {
        id: 2,
        title: "Br⁻ 捕获碳正离子",
        description: "Br⁻ 快速进攻碳正离子得到产物。",
        detailedExplanation:
          "**1. 电子转移**：Br⁻ 向碳正离子提供电子对形成 C-Br。\n\n**2. 轨道分析**：孤对填充空 p 轨道。\n\n**3. 立体化学**：若形成手性中心可有外消旋。\n\n**4. 动力学**：快速捕获步骤。\n\n**5. 关键因素**：亲核体浓度与溶剂。",
        structures: ["CH₃C⁺HCH₃ + Br⁻ → CH₃CHBrCH₃"],
        keyConcepts: [{ id: "carbocation", name: "碳正离子", brief: "区域选择与重排来源", detailed: "" }],
      },
    ],
    sideReactions: [{ name: "过氧化物效应", description: "自由基链机制导致反 Markovnikov 加成。", condition: "ROOR + hν", products: ["CH₃CH₂CH₂Br"] }],
    keyPoints: ["离子机制两步", "Markovnikov 选择性", "可被自由基路径改写"],
    factors: ["过氧化物", "溶剂", "底物取代度"],
  },
];

export function getReaction(id: string): Reaction | undefined {
  return reactions.find((r) => r.id === id);
}

export function getReactionsByCategory(category: string): Reaction[] {
  return reactions.filter((r) => r.category === category);
}
