# task-spec

Prevents AI from executing before thinking — by forcing a quality-control loop on every task.

Before acting, the AI produces an inspectable **spec** (a binding contract with steps and
acceptance criteria), challenges it for edge cases and wrong assumptions, and only executes
after the spec survives the challenge. After execution, it verifies every criterion. If
verification fails, it restarts from thinking.

The spec can be 2 lines. It cannot be zero.

## Install

```bash
npx skills add CaffreySun/task-spec
```

Or for Claude Code:

```bash
claude plugins install github.com/CaffreySun/task-spec
```

## How it works

A two-loop quality-control process runs on every task:

**Inner loop** (Think ⇄ Reflect) — the AI produces a spec, then challenges it. Does it
handle empty input? What assumption could be wrong? Is there a simpler approach? If the
spec has gaps, go back to Think and fix it. This loops until the spec passes.

**Outer loop** (Execute → Verify → Think) — the AI follows the spec precisely, then
checks every acceptance criterion against the actual output. If anything fails, go back
to Think with the deviation as input for a new cycle.

Every spec is written to `.task_spec/<slug>.md`, creating an audit trail the user can
inspect at any time.

## Why

AI has four traits that make "think first, verify after" critical:

1. Won't stop mid-execution to ask if the direction is right
2. Defaults to "just start coding" — speed over accuracy
3. Can hallucinate plausible-but-wrong solutions
4. Forgets context from earlier in long sessions

The spec is the brake. It externalizes fuzzy internal reasoning into something
inspectable, challengeable, and verifiable — before it becomes a bug.

## Chinese version

See `references/SKILL-zh.md`.

## License

MIT
