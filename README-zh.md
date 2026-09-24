# task-spec — 已迁移

> **⚠️ 本仓库已迁移至 [`CaffreySun/skills`](https://github.com/CaffreySun/skills)。**
>
> 现址：[`skills/engineering/task-spec`](https://github.com/CaffreySun/skills/tree/main/skills/engineering/task-spec)
> ，此处已归档只读，不再更新。

## 新的安装方式

```bash
# 只装这一个 skill
npx skills add CaffreySun/skills --skill task-spec

# 或装整个技能集合
npx skills add CaffreySun/skills
```

Claude Code 用户可以走插件方式，覆盖整个技能集合并自动更新：

```bash
/plugin marketplace add CaffreySun/skills
/plugin install caffreysun-skills
```

旧命令 `npx skills add CaffreySun/task-spec` 已不再更新，请切换安装来源。

## 为什么迁移

一个仓库只能放一个 skill，就永远无法被枚举：`npx skills add <repo>` 只看到一个
skill，于是每个 skill 都要单独开仓库、单独写 README、单独走发版流程。合并到一个
仓库后，`skills` 能列出全部技能并支持按需挑选（`--skill <name>`），同时只维护一份
changelog、一个版本号、一份插件清单。

内容未做任何改动，只是路径变了。

---

<sub>2026-09-24 归档。Issue 与 PR 请开到
[`CaffreySun/skills`](https://github.com/CaffreySun/skills/issues)。</sub>
