#!/usr/bin/env node
// Validate skills/*/SKILL.md against agentskills.io + repo contract.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const SKILLS = join(ROOT, "skills");
const errors = [];

function fail(msg) {
  errors.push(msg);
}

const dirs = readdirSync(SKILLS, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

if (dirs.length === 0) fail("skills/ is empty");

const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

for (const dir of dirs) {
  const skillFile = join(SKILLS, dir, "SKILL.md");
  if (!existsSync(skillFile)) {
    fail(`${dir}: missing SKILL.md`);
    continue;
  }
  const text = readFileSync(skillFile, "utf8");
  if (!text.startsWith("---\n") && !text.startsWith("---\r\n")) {
    fail(`${dir}: SKILL.md must start with YAML frontmatter`);
    continue;
  }
  const normalized = text.replace(/\r\n/g, "\n");
  const end = normalized.indexOf("\n---\n", 4);
  if (end < 0) {
    fail(`${dir}: unclosed frontmatter`);
    continue;
  }
  const fm = normalized.slice(4, end);
  const body = normalized.slice(end + 5);
  const map = {};
  for (const line of fm.split("\n")) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) map[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  if (!map.name) fail(`${dir}: missing name`);
  else {
    if (map.name !== dir) fail(`${dir}: name must equal directory`);
    if (!NAME_RE.test(map.name) || map.name.length > 64) {
      fail(`${dir}: invalid name`);
    }
  }
  if (!map.description) fail(`${dir}: missing description`);
  else if (map.description.length > 1024) fail(`${dir}: description > 1024`);
  const lines = body.split("\n").length;
  if (lines > 500) fail(`${dir}: body ${lines} lines > 500`);
  for (const h of ["何时使用", "循环", "验收", "输出", "下一跳"]) {
    if (!body.includes(h)) fail(`${dir}: missing heading ${h}`);
  }
}

if (errors.length) {
  console.error("validate-skills failed:\n" + errors.map((e) => "- " + e).join("\n"));
  process.exit(1);
}
console.log(`ok: ${dirs.length} skills`);
