# task-spec

Prevents AI from executing before thinking — by constructing an adversarial
quality-control loop on every task.

If you treat a modern AI agent as a person, the picture is striking: vast
knowledge, high reasoning ability, and a consistent tendency to cut corners.
It produces answers that look right — plausible, well-structured, confident —
but it won't stop to verify they are actually correct. It's smart enough to do
the job, but it defaults to doing the easiest version of it.

This isn't laziness. The mechanism behind it is deeper.

## The problem

When two equally intelligent people do the same task, what makes one produce
better work? The better one thinks before acting — explores alternatives,
questions assumptions, anticipates problems. The worse one starts with the
first idea and races to finish.

An LLM's default mode is the second person. Next-token prediction has no
concept of pausing to evaluate. The highest-probability continuation is the
first "thought," and the model runs with it.

This plays out in two dimensions:

**Before acting — shallow thinking.** The model takes the first direction that
comes to mind. It doesn't explore alternatives, doesn't question whether the
problem is even the right problem, doesn't anticipate downstream effects. It
confuses "having an answer" with "having the right answer."

**After acting — no verification.** The model doesn't check its work. "Done"
equals "done well." It won't catch contradictions, won't compare output against
intent, won't ask whether anything was missed.

Training data quality doesn't fix either dimension. Better data teaches the
model what correct work *looks like*, not the thinking that produced it. The
pauses, the doubts, the abandoned first attempts — the human verification
process — are invisible in the final output.
## Can it be fixed?

This is an architectural limitation, not a training data issue. The core
mechanism — next-token prediction — defines correctness out of scope by design.
No amount of better data, smarter prompts, or RLHF alignment adds an internal
verification loop.

At the **model level**: it may eventually be solved. Research directions like
process reward models or reasoning architectures that pause, evaluate, and
revise mid-generation point toward genuine self-verification. But this is a
research frontier — not something we can depend on today.

At the **system level**: the two dimensions are not equally hard — they differ
in kind.

Verification has an **external value function**. "Does the output match the
spec?" is an objective question. You can enforce it mechanically with binding
contracts and evidence-based review. The standard sits outside the model.

Thinking has no such thing. "Is this the right approach?" "Is this good enough?"
These need an **internal value function** — a sense of "better" that points
toward deeper work. The model has no such gradient. Next-token prediction orients
toward "most likely," not "better." The model doesn't settle for shallow because
it's lazy — it settles for shallow because it cannot tell which direction is
deeper. The human analogy is attitude: a person who *wants* to do good work
naturally explores alternatives, questions assumptions, anticipates problems.
The model has no equivalent drive. It can't *want* anything.

This is why the two dimensions cannot be addressed with the same mechanism.
Verification can be enforced by an external contract. Thinking can only be
encouraged by structure that simulates a quality gradient — forcing the model
through steps that a high-attitude person would take naturally.

## The answer

task-spec addresses both dimensions with distinct mechanisms.

**For the verification gap — Spec-Driven execution.**
The spec is a binding contract: Execute follows it, Verify judges by it. Every
acceptance criterion is checked against actual output with evidence. No spec,
no execution. Verification is enforced from the outside — the answer either
matches or it doesn't.

**For the thinking gap — Explore before Spec.**
Before committing to a plan, the model traverses the solution space: understand
the problem itself, consider possible directions, eliminate dead ends. Only
then does it lock in a direction, anticipate what could go wrong, and define
measurable success criteria. The spec is the output of this exploration, not
its starting point. The structure simulates what a high-attitude person does
naturally — walk the space before landing.

The exploration is itself subject to adversarial challenge. Before spec is
finalized, the model confronts its own reasoning: was the solution space
thoroughly traversed? Are the eliminations defensible? Only after surviving
this challenge does the spec become the contract for execution.
## Install

```bash
npx skills add CaffreySun/task-spec
```

Or for Claude Code:

```bash
claude plugins install github.com/CaffreySun/task-spec
```

## How it works

**Inner loop** (Explore → Spec → Challenge) — the AI traverses the solution
space, locks in a direction with measurable criteria, then challenges it
adversarially. Were alternatives considered? What assumption could be wrong?
Is there a simpler approach? Was the solution space thoroughly traversed? If
the spec has gaps, routing depends on severity: minor defects return to Spec,
major defects return to Explore.

**Outer loop** (Execute → Verify → Explore) — the AI follows the spec
precisely, then checks every acceptance criterion against actual output with
evidence. If anything fails, the failure is first analyzed for validity, then
returns to Explore for a new cycle.
Every spec is written to `.task_spec/<slug>.md`, creating an audit trail.

## License

MIT
