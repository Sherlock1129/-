# 有机化学机理学习站 · Organic Mechanism Lab

一个由 **DeepSeek AI** 驱动的有机化学机理学习网站。覆盖精选经典反应，并支持用 AI 实时生成任意反应的完整分步机理（带轨道分析、立体化学、能量曲线），还会自动进行一次"二审"来校验正确性。

> 教学用定位：不做记忆题库，而是解释"为什么"。每一步都能点进概念卡片深入学习。

---

## ✨ 功能一览

- **精选反应库** — SN2 / E1 / 亲电加成 等经典反应，每步机理都配有深度讲解
- **AI 实时生成** — 输入任意反应，DeepSeek 生成完整分步机理（SSE 流式）
- **双轮 AI 审核** — 第二个 AI 模型校验机理正确性，给出分数、问题定位与修正
- **概念深链** — 任一术语（碳正离子、Walden 反转、马氏规则…）都可点击查看详解
- **能量曲线** — 过渡态 / 中间体可视化
- **美观 UI** — 基于 Tailwind v4 + Framer Motion 的流畅动效

---

## 🚀 快速开始

### 1. 环境要求

- Node.js **≥ 18.18**（推荐 20 LTS）
- npm / pnpm / yarn / bun 任选
- 一个 DeepSeek API Key（注册地址：https://platform.deepseek.com）

### 2. 安装依赖

```bash
git clone https://github.com/sherlock1129/-.git organic-chemistry
cd organic-chemistry
npm install
```

### 3. 配置环境变量

在项目根目录创建 `.env.local`：

```bash
# DeepSeek API Key（必填，用于 AI 生成与审核）
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

# 可选：指定模型（默认 deepseek-chat）
# DEEPSEEK_MODEL=deepseek-chat
```

> 没有 Key 也可以跑起来 —— 只是 `/ai` 页面会报错。静态反应库页面完全可用。

### 4. 启动开发服务器

```bash
npm run dev
```

打开 http://localhost:3000 即可。

### 5. 构建 & 生产运行

```bash
npm run build     # 构建
npm run start     # 启动生产服务器
```

---

## 🗺️ 页面导览

| 路径 | 内容 |
| --- | --- |
| `/`                     | 首页：Hero + 学习路径 + 分类入口 |
| `/reactions`            | 反应库：按分类过滤浏览 |
| `/reactions/[id]`       | 反应详情：方程式 + 能量图 + 分步机理 + 副反应 + 要点 |
| `/concepts`             | 概念索引：可搜索，点击打开概念卡片 |
| `/ai`                   | AI 生成器：流式机理 + 审核面板 |

---

## 🧠 AI 工作流

```
用户输入
   ↓
[Pass 1: 生成] DeepSeek 按系统提示产出 JSON 格式的完整机理
   ↓
[Pass 2: 审核] 第二次调用 DeepSeek 以"严格评审者"身份检查：
   - 电子流向箭头是否正确
   - 立体化学（S/R、顺反、反转）
   - 轨道相互作用（HOMO/LUMO、σ* 反键）
   - 中间体能量合理性
   - 关键问题定位与修正建议
   ↓
前端展示：分步卡片 + 评分圆环 + 问题清单（可展开）
```

API 路由：
- `POST /api/generate-mechanism` — 同步（单次返回）
- `GET  /api/generate-mechanism/stream?query=...` — SSE 流式

SSE 事件类型：`phase` | `token` | `reaction` | `review` | `error`

---

## 🏗️ 技术栈

- **Next.js 16.2.2** · App Router · Turbopack
- **React 19** · 严格模式
- **TypeScript 5** · 严格类型
- **Tailwind CSS v4** · `@theme inline` 设计令牌
- **Framer Motion 12** · 动效
- **OpenAI SDK** · 指向 `https://api.deepseek.com`（DeepSeek 兼容 OpenAI 协议）

---

## 📁 目录结构

```
src/
├── app/
│   ├── page.tsx                       # 首页
│   ├── reactions/
│   │   ├── page.tsx                   # 反应列表
│   │   └── [id]/page.tsx              # 反应详情
│   ├── concepts/page.tsx              # 概念索引
│   ├── ai/page.tsx                    # AI 生成器
│   └── api/generate-mechanism/
│       ├── route.ts                   # 非流式 API
│       └── stream/route.ts            # SSE 流式 API
├── components/
│   ├── Header.tsx
│   ├── MechanismViewer.tsx            # 分步机理展示
│   ├── ReactionCard.tsx
│   ├── ConceptModal.tsx               # 概念弹窗
│   ├── PipelineProgress.tsx           # AI 进度指示
│   ├── ReviewPanel.tsx                # 审核结果面板
│   ├── EnergyDiagram.tsx              # 能量曲线
│   └── ChemFormula.tsx                # 化学式渲染
├── data/
│   ├── reactions.ts                   # 精选反应数据
│   └── concepts.ts                    # 概念词典
├── lib/
│   └── deepseek.ts                    # AI 客户端 + Prompt
└── types/
    └── index.ts                       # 共享类型
```

---

## 🧪 常见问题

**Q: 启动时提示 `DEEPSEEK_API_KEY is not defined`？**
A: 在根目录创建 `.env.local` 并填入 Key，然后重启 `npm run dev`。

**Q: AI 生成卡在"审核中"很久？**
A: DeepSeek 的评审 prompt 较长，通常 10–30 秒。若超时请检查网络代理与 Key 额度。

**Q: 能用别的 OpenAI 兼容模型吗？**
A: 可以。修改 `src/lib/deepseek.ts` 中的 `baseURL` 与 `model` 即可。

**Q: 为什么分子式不画成 2D 结构图？**
A: 当前阶段以键线式 / 结构简式为主，分子 2D/3D 渲染将在后续阶段加入（`smiles-drawer` 已预留）。

---

## 📜 License

仅供学习使用。
