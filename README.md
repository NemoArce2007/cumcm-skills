# CUMCM Skills

这是应对全国大学生数学建模竞赛（CUMCM，Contemporary Undergraduate Mathematical Contest in Modeling）的一套 skills 文件，把它安装到你的 Agent 后，你告诉 Agent 现在卡在哪一步，它会按对应技能做完那一步。

适用 Agent 包括但不限于：

- Claude Code
- Codex
- Cursor
- TRAE
- OpenClaw
- Hermes Agent
- DeepSeek Harness
- Workbuddy
- 其它按 [agentskills.io](https://agentskills.io/specification) 读技能的 Agent。

竞赛规则只遵守 [www.mcm.edu.cn](https://www.mcm.edu.cn/)（英文站点是 [en.mcm.edu.cn](https://en.mcm.edu.cn/)）。

更多备赛资料：https://pan.quark.cn/s/daa062665609

## 安装 CUMCm Skills

### 1.安装 Node.js

#### macOS

打开“终端”，运行：

```bash
brew install node
```

安装过程中，Homebrew 可能会先自动更新。出现 `Auto-updating Homebrew...` 属于正常现象，请等待安装完成。

#### Windows

打开 **Windows Terminal**、**PowerShell** 或 **命令提示符（CMD）**，运行：

```powershell
winget install --id OpenJS.NodeJS.LTS -e
```

安装完成后，请关闭并重新打开终端，使环境变量生效。

如果系统提示无法识别 `winget`，请前往 [Node.js 官网](https://nodejs.org/en/download) 下载并安装 **LTS** 版本。

### 2. 安装 CUMCM Skills

Node.js 安装完成后，运行：

```bash
npx skills add NemoArce2007/cumcm-skills
```

安装过程中，终端有时会询问是否继续操作；确认提示内容无误后，输入 `y` 并按回车即可。

### 3. 选择Skills

出现 `Select skills to install` 界面后，使用键盘的 `↑`、`↓` 方向键移动光标，按 `Space`（空格键）勾选或取消勾选需要安装的 Skills，选择完成后按 `Enter`（回车键）确认。

完成 Skills 选择后，安装程序会显示常用的 Agent；如果列表中没有你使用的 Agent，可以在 **Additional agents** 区域继续查找并勾选。

在你和 Agent 交互中记得把 `setup-cumcm-skills` 勾上。各 Agent 会把文件放哪里，请见 [docs/INSTALL.md](docs/INSTALL.md)。

### 4. 在赛题目录中初始化

安装完成后，请切换到**赛题目录**，再向 Agent 输入：

```text
运行 setup-cumcm-skills
```

> 注意：本仓库仅作为 Skills 源，不是存放赛题、代码或论文的工作目录。

> 当然，如果你足够懒的话，你可以直接让你的 Agent 帮你安装，并教你使用。

## 怎么用

第一次用，记得先初始化。题没读懂的情况下先追问。如果已经有数字，只想改摘要，就直接开写论文的技能。不要为了「一次做完」把 17 个技能全读一遍。

不知道该开哪个，对 Agent 说 `ask-cumcm`。它只会推荐一个，然后停下来。

| 你在干什么                     | 开这个                                                          |
| ------------------------------ | --------------------------------------------------------------- |
| 不确定下一步                   | `ask-cumcm`                                                     |
| 赛题目录还是空的               | `setup-cumcm-skills`                                            |
| 从读题做到提交包               | `contest-run`                                                   |
| 题意对不上、附件找不到         | `grill-problem`                                                 |
| 拆小问、定题型、选模型         | `problem-brief` → `problem-classify` → `model-select`           |
| 数据、假设、公式、代码         | `data-prep` → `assumption-set` → `model-build` → `compute-impl` |
| 误差、灵敏度、稳健性，然后出图 | `model-validate` → `chart-style`                                |
| 写正文或摘要                   | `paper-write`                                                   |
| 删套话、把数字补回段落         | `academic-voice`                                                |
| 按评委标准过一遍               | `award-review`                                                  |
| AI 声明、支撑材料清单          | `compliance-ai`                                                 |

对于谁先谁后的顺序问题，条件写在 [docs/GRAPH.md](docs/GRAPH.md)。某个 skill 怎样才算跑完，看它自己的「验收」一节；共同的停止规则在 [docs/LOOP.md](docs/LOOP.md)。

其中有四个 skill 只能由你手动触发：`ask-cumcm`、`setup-cumcm-skills`、`contest-run`、`grill-problem`。其余的你也可以手动触发；Agent 走到对应阶段时会自己去读。四个手动技能之间不要互相调用，但可以调用模型技能。

## 它是如何工作的？

当你开口之后，Agent 只走三条路里的一条：已经指明 skill 就只跑那一个；说不清就推荐一个然后停下来；要从头交卷就按主图往下走。

```mermaid
flowchart TD
  you[你说现在卡在哪] --> named{指明用某个 skill?}
  named -->|是| one[只跑那一个]
  named -->|否| know{知道用哪个?}
  know -->|否| ask[ask-cumcm 推荐一个然后停下来]
  know -->|要从头做到提交| run[contest-run 按主图往下走]
```

`contest-run` 的主图如下。实线是往下走，虚线是没过验收、退回去改。

```mermaid
flowchart TD
  setup[setup-cumcm-skills] --> grill[grill-problem]
  grill --> brief[problem-brief]
  brief --> classify[problem-classify]
  classify --> select[model-select]
  select --> data[data-prep]
  data --> assume[assumption-set]
  assume --> build[model-build]
  build --> code[compute-impl]
  code --> valid[model-validate]
  valid -.->|检验没过| code
  valid -.->|模型不对| build
  valid -->|过了| chart[chart-style]
  chart --> paper[paper-write]
  paper --> voice[academic-voice]
  voice --> review[award-review]
  review -.->|结构或表述有问题| paper
  review -.->|结果有问题| valid
  review -->|过了| comp[compliance-ai]
  comp --> ship[可以提交]
```

每个 skill 内部都是同一套停顿方法：先读 `contest-state.json`，干完对照自己的验收清单。全通过才改 `status`；有未通过的就只修相关项，状态不往前推。

```mermaid
flowchart LR
  d[读状态和输入] --> p[只改这一步该改的]
  p --> e[干活并写回]
  e --> v{验收}
  v -->|全通过| stop[停 写下一步 status]
  v -->|有未通过的| d
```

技能分两种。上面四个只能你来手动触发；下面那些你也可以手动触发，`contest-run` 走到那一段时它自己会判断是否要运行。

```mermaid
flowchart TB
  subgraph L["只能你来手动触发"]
    direction LR
    ask["ask-cumcm"]
    setup["setup-cumcm-skills"]
    run["contest-run"]
    grill["grill-problem"]
  end
  subgraph R["其余也可手动触发"]
    direction LR
    r1["拆题选型"]
    r2["数据到出图"]
    r3["论文到提交"]
  end
  run -.-> r1
```

## 2026 年必须守的规定

下面这些已经写进验收项，当内容和组委会冲突时，组委会优先级更高。

- 电子版第一页必须是摘要页。摘要含标题和关键词，原则上不超过一页。不要求英文摘要。
- 正文不要目录，不超过 30 页。附录页数不限。
- 附录放可运行源程序，或者写明没有使用程序。
- 全文匿名，不要出现学校、姓名、队号。
- 用了 AI 必须在参考文献前声明，并在支撑材料里交 `AI工具使用详情.pdf`。
- 核心建模由参赛队完成并核验。不要编数据、编文献、编没跑过的结果。

「摘要写 800–1000 字」「正文至少 25 页」常见于培训材料，但是[2026 年论文格式规范](https://www.mcm.edu.cn/html_cn/node/4cd596519c9eb9fbd866398f6df0caa3.html)里没有这两条。

论文空白模板在 `skills/paper-write/assets/`。LaTeX 是电子版骨架：首页摘要，没有承诺书、编号页和目录。Word 是一份可往里填的大纲。你手头若有带 `\tableofcontents` 的模板，电子版把目录那页删掉。

对于 72 小时怎么规划，见 `skills/contest-run/references/schedule.md`。大体原则是：当晚定方向，次日出结果，第三天成文，截止日检查提交。日期以当年通知为准。

## 仓库里有什么

```
skills/        一个目录一个技能
docs/          编排、停机、状态、安装
templates/     contest-state.json 的字段说明
CONTEXT.md     人和 Agent 共用的词
AGENTS.md      Agent 入门
```

改技能前先读 AGENTS.md。`npm run validate` 会检查 frontmatter 和必备章节。

## 许可证

MIT。本仓库不包含第三方培训讲义，也不包含未公开赛题。竞赛期间请勿把赛题提交到公开仓库。
