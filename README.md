# task-artifact

A Claude Code skill that prevents AI from executing before thinking. When you ask Claude to build, fix, or change anything, it produces an inspectable artifact before writing code — exposing misunderstandings, gaps, and overengineering before they become bugs.

## Install

```bash
claude plugins install github.com/CaffreySun/task-artifact
```

Or manually:
```bash
mkdir -p ~/.claude/skills/task-artifact
cp SKILL.md ~/.claude/skills/task-artifact/
```

## What it does

When triggered, Claude produces a structured artifact covering:

- **Why** — the problem, who's affected, desired outcome
- **What** — concrete deliverable, not vague intent
- **How** — steps specific enough for another AI to execute
- **Verify** — acceptance criteria per step

Then self-inspects the artifact (edge cases, overengineering, assumptions) before executing.

## Why

AI has four traits that make "think first" critical:

1. Won't stop mid-execution to ask if the direction is right
2. Defaults to "just start coding" — speed over accuracy
3. Can hallucinate plausible-but-wrong solutions
4. Forgets context from earlier in long sessions

The artifact is the brake. It externalizes fuzzy internal reasoning into something inspectable.

## License

MIT
