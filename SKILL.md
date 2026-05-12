---
name: task-artifact
description: >
  Use this skill for EVERY task. Always. This skill prevents you from running in
  the wrong direction at full speed. There is no task too simple for an artifact —
  if you catch yourself thinking "this is simple enough to skip", that is precisely
  when you need it most. An artifact can be 2 lines. It cannot be zero.
---

# task-artifact

> Before you execute, externalize your thinking into something inspectable. An artifact can be 2 lines. It cannot be zero.

## When

Always. For every task, regardless of size.

If you catch yourself thinking "this is too simple for an artifact" — that is the strongest signal that you need one. The simplest-looking tasks hide the most assumptions.

If the task is genuinely a pure instruction with zero decision space (e.g., the user says "run `pnpm test`" and nothing else), the artifact can be one line: "Execute: run pnpm test. Verify: exit code 0."

## The artifact

Structure it as a causal chain:

```
Why → What → How → Verify
```

- **Why**: What problem? Who is affected? What's the desired outcome?
- **What**: What exactly will you deliver? Not "edit tags.ts" but "add a stats endpoint that returns per-tag usage counts"
- **How**: Steps. Each concrete enough that someone else could execute them
- **Verify**: Acceptance criteria per step. Not "tests pass" but "curl returns 3 tags with counts matching the DB"

No fixed format. The test is: **does this prevent me from acting in the wrong direction?**

<details>
<summary>Example: fixing an intermittent bug</summary>

```
Why: Users report tag saves failing occasionally. Logs show DB connection timeouts.

What: Add connection timeout retries to the POST handler.

How:
  1. Locate pool.query error handling in tags.ts POST
  2. Add 3 exponential backoff retries (1s / 2s / 4s)
  3. Return 503 after retries exhausted

Verify:
  1. Mock rejects twice, resolves third → handler returns 200
  2. Mock rejects three times → handler returns 503 + error logged
```
</details>

<details>
<summary>Example: a trivial task</summary>

```
Task: run pnpm test
Artifact: Execute pnpm test in both client/ and server/. Verify: all 373 tests pass, exit code 0.
```
</details>

## Inspect

After writing the artifact, answer these questions. **Give concrete answers, never just "no":**

1. **List at least 2 edge cases you checked** (empty input? concurrency? already exists?)
2. **Point out at least 1 place you might be overengineering** (can this be simpler?)
3. **State at least 1 assumption you're making** (what if it's wrong?)

If the answers reveal gaps → fix the artifact → answer again. Multiple rounds are normal.

For trivial tasks, the inspection can be as short as: "Edge cases: none. Overengineering: n/a. Assumption: pnpm is available."

## Execute

- Follow the artifact step by step. Complete one step, verify it, move to the next.
- If you hit something the artifact doesn't cover → pause → extend artifact → re-inspect → continue.
- If you find a problem in code the artifact explicitly scoped as "do not touch" → report it, don't expand.
- Do not do things the artifact doesn't ask for.

## Verify result

Check every verification criterion from the artifact against what you actually produced.

- Missed a criterion but direction is right → add the missing verification, don't rebuild.
- Direction is wrong → go back to the artifact stage.
