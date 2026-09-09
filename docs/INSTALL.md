# 安装到各 Agent

技能源目录是本仓库的 `skills/`。格式遵循 [agentskills.io](https://agentskills.io/specification)。

## 推荐：skills CLI（多 Agent）

```bash
npx skills add NemoArce2007/cumcm-skills
```

在交互里勾选本仓库技能，并选择要安装的 Agent。请把 `setup-cumcm-skills` 装上。

更新：

```bash
npx skills update
```

## 各客户端路径

项目级优先于用户级。项目级推荐统一放到赛题仓库的 `.agents/skills/`（多数 2026 客户端会读）。Claude Code 项目级是 `.claude/skills/`。

| Agent | `--agent` 提示 | 项目目录 | 用户目录 |
| --- | --- | --- | --- |
| Claude Code | `claude-code` | `.claude/skills/` | `~/.claude/skills/` |
| Codex | `codex` | `.agents/skills/` | `~/.codex/skills/` |
| Cursor | `cursor` | `.agents/skills/` | `~/.cursor/skills/` |
| TRAE / TRAE CN | `trae` / `trae-cn` | `.trae/skills/` | `~/.trae/skills/` 或 `~/.trae-cn/skills/` |
| OpenClaw | `openclaw` | `skills/` | `~/.openclaw/skills/` |
| Hermes Agent | `hermes` 或 universal | `.agents/skills/` | 以客户端文档为准 |
| DeepSeek Harness | universal | `.agents/skills/` | 以客户端文档为准 |
| Workbuddy | universal | `.agents/skills/` | 以客户端文档为准 |
| 其他 SKILL.md 客户端 | `universal` | `.agents/skills/` | `~/.config/agents/skills/` |

CLI 不认识的客户端：把 `skills/*` 复制到上表对应目录，保持 `skill-name/SKILL.md` 结构。

## Claude Code 插件

本仓库含 `.claude-plugin/plugin.json`。可将本仓库加为本地 marketplace，或把 `skills/` 链到 `~/.claude/skills/`。

## 装完后

在**赛题工作区**（不是本技能仓库）运行一次 `setup-cumcm-skills`。不要把未公开赛题提交到本开源仓库的 fork 公开分支。
