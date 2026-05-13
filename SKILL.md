---
name: task-spec
description: >
  Before acting on any task request, produce an inspectable spec: define the problem,
  the deliverable, the concrete steps, and the acceptance criteria. Challenge the spec
  for edge cases and wrong assumptions before executing. Verify every criterion after.
  If verification fails, restart from thinking. Works on everything from one-line
  commands to multi-file features — the spec can be 2 lines, never zero.
---

# task-spec

> The spec is not a template to fill in. It is the output of a quality-control
> process. If the process doesn't loop, quality didn't happen.

## Core contract: the spec binds all four phases

The spec produced by Think+Reflect is not a "reference plan" — it is a **binding contract**:
- **Execute** may only carry out what the spec has planned
- **Verify** may only judge pass/fail against the spec's stated acceptance criteria
- Anything not in the spec → outside this task's scope

This means the fundamental purpose of Think+Reflect is not "write a plan first" —
it is **establish the sole, non-deviable contract that Execute and Verify will follow**.

## The two loops

```
┌─────────────── INNER LOOP ───────────────┐
│                                           │
│  Think ──→ Reflect ──(fail)──→ Think     │
│    │                      ↑              │
│    └──(pass)──────────────┘              │
│           │                              │
└───────────│──────────────────────────────┘
            ↓
         Execute ──→ Verify ──(fail)──→ Think
                         │                ↑
                         └──(pass)────────┘
              └──────── OUTER LOOP ────────┘
```

**State transition rules (explicit):**

| Current state | Condition | Next state |
|---|---|---|
| Start | — | Think |
| Think | spec produced | Reflect |
| Think | critical information missing, cannot obtain | Terminate (report to user) |
| Think | trade-off decision needed, not covered by docs | Terminate (report to user) |
| Reflect | spec passes quality gate | Execute |
| Reflect | spec has defects | Think (carrying defect list) |
| Execute | all steps complete | Verify |
| Execute | hit something spec doesn't cover | Think |
| Execute | blocker exceeds capability/permission | Terminate (report to user) |
| Verify | all acceptance criteria pass | Terminate (task complete) |
| Verify | any criterion fails | Think (with deviation as input) |

Inner loop (Think ⇄ Reflect) inspects the plan before acting; may run multiple rounds.
Outer loop (Execute → Verify → Think) inspects results after acting; a Verify failure
is the normal trigger for a new cycle.
Each loop narrows the problem.
---

## Phase 1: Think

**Goal**: Produce a concrete, inspectable spec. This spec is the sole contract
for Execute and Verify — Execute follows it, Verify judges by it.

**The spec form depends on the task**:

| Task type | Spec contains |
|---|---|
| New feature | Plan (steps + acceptance criteria per step) |
| Bug fix | Root cause hypothesis + fix approach + verification |
| Code review | Scope + checkpoints + related docs |
| Debug | Execution path analysis + hypotheses |
| Architecture | Decision criteria + trade-offs + migration path |
| Write docs | Outline + key arguments |
| Trivial instruction | One line: "Execute: X. Verify: Y." |

The test: **could another engineer read this spec and execute the task without
ambiguity?**

**MUST**:
- Read relevant context (code, docs, specs, history)
- Understand current state and desired outcome
- State task boundaries explicitly: what you will do, what you will NOT do

**MUST NOT**:
- Guess or assume when information is available via tools or codebase
- Skip Think and jump to Execute
- Produce vague specs ("fix the bug", "refactor the module")

---

## Phase 2: Reflect

**Goal**: Challenge the spec before acting. This is a quality gate, not a
formality. You do not execute until the spec survives this phase.

**The reflection must be concrete and adversarial.** Ask:

1. **Edge cases**: list at least 2. What happens with empty input? Concurrent calls?
   Already existing state? Partial failure? Scale (N=0, N=1, N=large)?
2. **Wrong assumptions**: state at least 1 assumption in the spec. What breaks if
   it is wrong? How would you detect the error early?
3. **Overengineering**: point out at least 1 place the spec could be simpler.
   Is the simplest thing that could possibly work?
4. **Risk**: is this a destructive change? What is the blast radius? Is there a
   rollback path?

**Output**: PASS (spec is reliable → proceed to Execute) or FAIL (spec has
gaps → return to Think with specific defects listed).

**Inner loop may run multiple rounds.** This is normal. Each round sharpens the spec.

**MUST NOT**:
- Pass with "looks fine" without listing what you checked
- Notice a problem but stay silent to "get to execution faster"
- Fix a problem yourself in Reflect rather than returning to Think

**For trivial tasks**, the reflection can be one line: "No edge cases. No assumptions
beyond tool availability. No overengineering."

---

## Phase 3: Execute

**Goal**: Follow the spec precisely.

**Every action must be traceable to a specific entry in the spec.**

**MUST**:
- Before starting, initialize `todo_write` with the spec's steps (see Progress visibility)
- Complete one step, confirm it locally, move to the next
- If you hit something the spec does not cover → PAUSE → return to Think (not
  Reflect — this is a new problem to plan for)
**MUST NOT**:
- Deviate from the spec (unless Think+Reflect approved a scope change)
- Skip steps or merge steps
- "While you're at it" — do anything outside the spec's stated boundaries
- Keep going when results don't match expectations (that's Verify, not Execute)

---

## Phase 4: Verify

**Goal**: Confirm every acceptance criterion from the spec is met.

**Check each criterion from the spec against what you actually produced.**
Give each a PASS/FAIL with evidence.

- **All PASS** → task complete
- **One or more FAIL** → describe the specific deviation → **return to Think**
  with this deviation as the input for a new cycle

**MUST NOT**:
- Claim PASS when a problem exists
- Lower the standard to declare PASS
- Fix the problem directly in Verify without going through Think first

---

## Stop conditions

Stop and report to the user when:

| Phase | Condition |
|---|---|
| Think | Critical information is missing and cannot be obtained from tools or codebase |
| Think | A trade-off decision is needed that principle docs do not cover |
| Execute | A blocker exceeds current capability or permission scope |

**Report format**:
1. Current phase
2. What the blocker is
3. What you tried (paths already ruled out)
4. What decision or information you need from the user

---

## Recursive decomposition

If a step in the spec is itself complex (multi-level decisions, significant
uncertainty, or large blast radius), start a **new nested iteration** for that
step alone: Think → Reflect → Execute → Verify within the outer Execute phase.

This is not scope creep — it is the mechanism that keeps the outer spec
concrete while handling the inner complexity rigorously.

---

## Operational conventions

These are defaults. Override when the task calls for it.

### File location and naming

- **Non-trivial tasks** (spec longer than one line): write to `.task_spec/<slug>.md`
  - slug derives from the spec's "What" summary — lowercase, hyphenated. E.g. `add-tag-stats`
  - create the directory if it does not exist
- **Trivial instruction tasks** (spec is one line, e.g. `pnpm test`): skip the file
- **Recursively decomposed sub-tasks**: use `--` to connect parent and child slugs.
  E.g. `.task_spec/add-tag-stats--perf-optimize.md`

### File structure: append cycles, never split

One file per task-slug. Append each cycle to the same file — do not create new files
for new cycles.

Three phases get recorded in the file. **Execute is NOT written to the file** —
track progress with `todo_write` instead.

File structure template: see `references/spec-template.md`.
**Constraints**:
- Think "How" must be executable — another engineer following it encounters zero ambiguity
- Think "Verify" criteria must be measurable — not "tests pass" but "`pnpm test` exit code 0, all 373 pass"
- Reflect answers must be concrete — "no edge cases" and "no assumptions" are forbidden (trivial tasks excepted)
- Verify must attach evidence per criterion — "looks correct" is forbidden
- After multiple cycles, only the last cycle's spec body is the authoritative contract;
  earlier cycles are the audit trail

### Progress visibility

- When entering the Execute phase, if the spec has **3 or more distinct steps**,
  use `todo_write` to track progress. Map each step to a todo item; check off as
  you complete each one.
- Specs with 1–2 steps do not need a todo list
- **MUST NOT** create a todo list during Think or Reflect — the steps are not
  final until Reflect passes

### Subagent delegation

Use a `task` subagent for a recursively decomposed sub-step when **all** of these hold:
1. Self-contained with clear input/output boundaries
2. Touches multiple files or subsystems
3. Can run in parallel with other sub-steps

Otherwise, run the sub-iteration inline. Sub-task specs go in their own file
(see file location and naming); the subagent runs its own think→reflect→execute→verify cycle.


