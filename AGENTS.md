# AGENTS.md

你在 CUMCM（全国大学生数学建模竞赛）技能仓库里工作。先读 [CONTEXT.md](CONTEXT.md)。编排读 [docs/GRAPH.md](docs/GRAPH.md)。每个技能内部的停机条件读 [docs/LOOP.md](docs/LOOP.md)。

## 硬规则

1. 官方文本优先于任何课程讲义。摘要「原则上不超过一页」、正文「不要目录、不超过 30 页」、电子版首页必须是摘要页。来源：全国组委会 2026 年论文格式规范。
2. 核心建模必须由参赛队主导。AI 只辅助。禁止编造数据、文献、未运行的结果。
3. 不要把未公开赛题、队内身份信息提交到公开 git remote。
4. 用户点名的 skill 才能再调模型技能；用户技能之间禁止互调。
5. 验收失败不得把 `contest-state.json` 的 `status` 前移。
6. 中文回复用户。技能文件本身也用中文，专有名词保留 CUMCM、PDF、AHP 等。

## 技能怎么选

不确定 → 读本文件下面的表，或让用户跑 `/ask-cumcm`。

| 用户说了什么 | 用 | 不要用 |
| --- | --- | --- |
| 第一次在本仓库/赛题目录用这套技能 | `setup-cumcm-skills` | 直接 `contest-run` |
| 不知道下一步 | `ask-cumcm` | 同时加载全部技能 |
| 从读题做到提交包 | `contest-run` | 跳过 grill 直接写论文 |
| 题还没看懂 / 要我追问 | `grill-problem` | `paper-write` |
| 拆题、列约束 | `problem-brief` | `model-build` |
| 这是优化还是评价 | `problem-classify` | 凭印象选型 |
| 选什么模型 | `model-select` | 先写代码 |
| 有附件数据 | `data-prep` | 改原始文件 |
| 写假设和符号 | `assumption-set` | 无依据的“忽略摩擦” |
| 推导公式 | `model-build` | 从网文粘贴无推导 |
| 写代码/跑数 | `compute-impl` | 在论文里编数字 |
| 误差/灵敏度/稳健性 | `model-validate` | 用套话代替指标 |
| 改图、配色、补流程图 | `chart-style` | 改底层数据 |
| 写正文/摘要 | `paper-write` | 先润色后建模 |
| 去套话、补证据 | `academic-voice` | 为“降 AI 率”改公式 |
| 对照评委标准打分式检查 | `award-review` | 只看查重百分比 |
| AI 声明、详情 PDF | `compliance-ai` | 赛后补假声明 |

## 改本仓库时

- 一个 skill 一个目录，目录名 = `name` 字段。
- `description` 必须含「做什么」和「何时用」，第三人称，≤1024 字符。
- `SKILL.md` 尽量 < 500 行；细则放 `references/`。
- 跑 `npm run validate`。
