---
name: paper-write
description: 按问题驱动结构撰写或改写 CUMCM 论文，遵守 2026 格式规范。在结果与图已齐、用户说「写论文」「写摘要」「改结构」时使用。不要在还没有数字时生成带假结果的全文。
license: MIT
metadata:
  author: cumcm-skills
  version: "0.1.0"
  invocation: model
  graph-node: N10
---

# paper-write

结构：[references/structure.md](references/structure.md)。官方格式见 [compliance-ai/references/official.md](../compliance-ai/references/official.md)。

## 何时使用

必须使用：要出正文；改目录级结构；写摘要。

禁止使用：无 `results/` 却写具体最优值；电子版加入承诺书/编号页；加入目录。

## 循环

目标：`paper/` 中有完整稿规划；摘要单独成首页且计划不超过一页；每问有建模-求解-结果。

`max_rounds`: 4

## 步骤

1. 用问题驱动结构，不要「模型百科」。
2. 摘要最后写：各问方法 + 关键数字 + 一句检验。不写空「效果良好」。
3. 摘要含标题与关键词，原则上不超过一页。不要为凑讲义里的 800–1000 字而注水。
4. 正文不要目录；规划不超过 30 页。不够就砍套话，不要灌水凑 25 页。
5. 图、表、式编号并在正文引用。
6. 参考文献前留「AI 工具使用声明」位置，正文由 `compliance-ai` 定稿。
7. 匿名：删除学校、姓名、学号、队号、指导教师。

## 验收

- [ ] 电子版规划：第 1 页 = 摘要专用页
- [ ] 无目录
- [ ] 每个赛题小问有对应小节且回答题面所问
- [ ] 摘要中的数字能在 `results/` 找到
- [ ] 无身份字段

## 输出

`paper.path`、`paper.has_toc=false`。`status=paper_drafted`。

## 下一跳

`academic-voice`。
