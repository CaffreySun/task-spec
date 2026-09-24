# task-spec — MOVED

> **⚠️ This repository has moved to [`CaffreySun/skills`](https://github.com/CaffreySun/skills).**
>
> It now lives at [`skills/engineering/task-spec`](https://github.com/CaffreySun/skills/tree/main/skills/engineering/task-spec)
> and is archived here. This repository is read-only and receives no further
> updates.

## New install

```bash
# This skill on its own
npx skills add CaffreySun/skills --skill task-spec

# Or the whole collection
npx skills add CaffreySun/skills
```

Claude Code users can install the plugin instead, which covers every skill in
the collection and keeps them updated:

```bash
/plugin marketplace add CaffreySun/skills
/plugin install caffreysun-skills
```

The old `npx skills add CaffreySun/task-spec` path no longer receives updates —
please switch your install over.

## Why it moved

A single skill per repository cannot be enumerated: `npx skills add <repo>` sees
exactly one skill, so every skill needed its own repo, its own README, its own
release dance. Bundling them in one repository lets `skills` list them and lets
you pick (`--skill <name>`), while keeping one changelog, one version, and one
plugin manifest.

Content is unchanged; only the path moved.

---

<sub>Archived 2026-09-24. Issues and PRs: please open them at
[`CaffreySun/skills`](https://github.com/CaffreySun/skills/issues).</sub>
