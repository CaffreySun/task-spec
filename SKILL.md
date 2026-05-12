---
name: task-artifact
description: >
  Use this skill whenever you are about to start any task that requires decisions —
  coding, fixing bugs, reviewing code, designing features, writing docs, debugging,
  or anything beyond pure execution of explicit instructions. This skill prevents you
  from running in the wrong direction at full speed. Trigger when the user asks you
  to build, fix, add, change, refactor, review, design, investigate, analyze, or
  improve anything. Do NOT trigger for: running a specific command, reading a file,
  or modifying a specific line the user already identified.
---

# task-artifact

> Before you execute, externalize your thinking into something inspectable.

When you need to make any decision — what to build, how to fix something, what files to touch, whether a problem is real — produce an artifact first. Not a document for its own sake. A brake.

## When

Produce an artifact before acting whenever you need to:

- **Choose**: A or B? Which approach? Which library?
- **Judge**: Is this problem valid? Is it a symptom or the root cause?
- **Scope**: Which files? Where are the boundaries? What do I NOT touch?
- **Assess**: What breaks if I change this?
- **Design**: What does the interface look like?

Skip only when the user gave you a precise instruction with zero decision space: "run pnpm test", "read line 42 of foo.ts", "change 'foo' to 'bar' on line 3".

**When in doubt, produce the artifact.**

## The artifact

Structure it as a causal chain:

```
Why → What → How → Verify
```

- **Why**: What problem? Who is affected? What's the desired outcome?
- **What**: What exactly will you deliver? Not "edit tags.ts" but "add a stats endpoint that returns per-tag usage counts for the past N days"
- **How**: Steps. Each concrete enough that someone else could execute them
- **Verify**: Acceptance criteria per step. Not "tests pass" but "curl returns 3 tags with counts matching the DB"

No fixed format. The test is: **does this prevent me from writing code in the wrong direction?**

<details>
<summary>Example: fixing an intermittent bug</summary>

```
Why: Users report tag saves failing occasionally. Logs show DB connection timeouts.
     Tags get lost. Unreliable UX.

What: Add connection timeout retries to the POST handler.

How:
  1. Locate the pool.query error handling in tags.ts POST
  2. Add 3 exponential backoff retries (1s / 2s / 4s)
  3. Return 503 after retries exhausted

Verify:
  1. Mock rejects twice, resolves third → handler returns 200
  2. Mock rejects three times → handler returns 503 + error logged
```
</details>

## Inspect

After writing the artifact, answer these questions. **Give concrete answers, never just "no":**

1. **List at least 2 edge cases you checked** (empty input? concurrency? already exists?)
2. **Point out at least 1 place you might be overengineering** (can this be simpler?)
3. **State at least 1 assumption you're making** (what if it's wrong?)

If the answers reveal gaps → fix the artifact → answer again. Multiple rounds are normal.

## Execute

- Follow the artifact step by step. Complete one step, verify it, move to the next.
- If you hit something the artifact doesn't cover → pause → decide whether to extend the artifact → re-inspect → continue.
- If you find a problem in code the artifact explicitly scoped as "do not touch" → report it, but don't expand scope.
- Do not do things the artifact doesn't ask for.

## Verify result

Check every verification criterion from the artifact against what you actually produced.

- Missed a criterion but the direction is right → add the missing verification, don't rebuild.
- Direction is wrong → go back to the artifact stage.
