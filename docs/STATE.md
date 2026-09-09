# STATE.md — contest-state.json

赛题工作区根目录放一份 `contest-state.json`。本 skills 仓库的 `templates/contest-state.json` 是 schema 说明，复制到赛题仓库后填写。

## 读写权

| 字段 | 写者 | 读者 |
| --- | --- | --- |
| `schema_version` | setup | 全体 |
| `contest.*` | setup, grill-problem | 全体 |
| `status` | 当前节点在验收全绿或合法回退时 | 全体 |
| `gate_failures` | 当前节点（先清空本节点旧项再写入） | contest-run, award-review |
| `problems[].goal/inputs/outputs/constraints/traps` | problem-brief | 其后全体 |
| `problems[].type` | problem-classify | model-select 及之后 |
| `problems[].model` | model-select；model-build 可补公式引用 | compute-impl, paper-write |
| `problems[].results` | compute-impl | validate, chart, paper |
| `problems[].validation` | model-validate | review, paper |
| `data.*` | data-prep | compute-impl |
| `assumptions`, `symbols` | assumption-set | build, paper |
| `code.*` | compute-impl | validate, compliance |
| `paper.*` | paper-write, academic-voice | review, compliance |
| `ai_use.*` | 各节点追加用途；compliance-ai 定稿 | compliance, review |

## status 枚举（顺序）

`uninitialized` → `problem_locked` → `classified` → `model_selected` → `data_ready` → `assumptions_locked` → `model_built` → `solved` → `validated` → `charts_ready` → `paper_drafted` → `voice_checked` → `reviewed` → `compliance_ready` → `shippable`

回退时写回目标节点刚完成时的 status，并保留 `gate_failures`。
