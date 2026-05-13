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

LLMs don't have an internal verification loop. They generate the next token
based on statistical likelihood, not logical necessity. A mathematically correct
proof and a plausible-but-wrong argument look the same to the model because both
exist in the training distribution — the model cannot distinguish them from
within.

This is the mechanism behind every "sloppy AI" behavior:

- **Won't stop to question direction** — no mechanism to self-interrupt based on
  correctness evaluation
- **Defaults to "just start coding"** — the shortest path from prompt to
  completion is the most probable path
- **Hallucinates plausible wrong answers** — plausible = statistically frequent;
  verifying correctness is a capability that doesn't exist
- **Drifts or contradicts itself in long sessions** — the attention mechanism
  decays; no verification step catches contradictions

Training data quality doesn't fix this. The model can only reproduce what
correct work *looks like* — not the reasoning that produced it. The verification
that a human does before writing is invisible to the model. It sees the output,
not the process.
## Can it be fixed?

This is an architectural limitation, not a training data issue. The core
mechanism — next-token prediction — defines correctness out of scope by design.
No amount of better data, smarter prompts, or RLHF alignment adds an internal
verification loop.

At the **model level**: it may eventually be solved. Research directions like
process reward models or reasoning architectures that pause, evaluate, and
revise mid-generation point toward genuine self-verification. But this is a
research frontier — not something we can depend on today.

At the **system level**: it can be mitigated now. The verification doesn't have
to live inside the model. External scaffolding — forced adversarial challenge,
binding contracts, evidence-based review — can compensate for the missing
capability. This is the approach task-spec takes.

task-spec should never try to "make the model better." Its job is to make the
model **unable to escape** verification.

## The answer

task-spec constructs an artificial adversarial environment that compensates for
this missing capability. It doesn't make the model verify — it makes the model
**unable to bypass** verification.

Before acting, the AI produces an inspectable **spec** with reasoning, steps,
and measurable acceptance criteria. The spec is a binding contract — Execute
follows it, Verify judges by it. No spec, no execution.

The spec is then subjected to an adversarial challenge (edge cases, wrong
assumptions, overengineering, risk). If the spec fails, the AI returns to
thinking. This loops until the spec survives.

After execution, every acceptance criterion is checked against actual output
with evidence. If anything fails, the AI returns to thinking with the deviation
as input for a new cycle.

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

**Inner loop** (Think ⇄ Reflect) — the AI produces a spec with explicit
reasoning, then challenges it. Does it handle empty input? What assumption
could be wrong? Is there a simpler approach? What's the blast radius? If the
spec has gaps, go back to Think and fix it.

**Outer loop** (Execute → Verify → Think) — the AI follows the spec precisely,
then checks every acceptance criterion against the actual output with evidence.
If anything fails, go back to Think with the deviation as input.

Every spec is written to `.task_spec/<slug>.md`, creating an audit trail.

## License

MIT
