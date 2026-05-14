# task-spec

Prevents AI from executing before thinking — by constructing an adversarial
quality-control loop on every task.

## The problem

LLMs have two deep-seated problems. One happens before they act. The other
happens after.

If you picture a modern AI as a person, the traits are striking: vast knowledge,
sharp reasoning, and a persistent habit of cutting corners. It gives you answers
that look right — well-structured, confident, plausible — but it never stops to
check whether they actually are.

This is not laziness. The mechanism runs deeper.

An LLM generates text one token at a time. Each step asks: "what word is
statistically most likely to come next?" — not "what word is correct?" This
means the model's first instinct is always the most probable path, not the most
careful one. A correct answer and a plausible wrong answer have the same
statistical shape. The model cannot tell them apart from the inside.

This plays out in two dimensions:

**Before acting — shallow thinking.** The model grabs the first direction that
comes to mind and runs with it. It does not explore alternatives. It does not
ask whether this is even the right problem. It treats "I have an answer" the
same as "the answer is right."

**After acting — no verification.** The model does not check its work. "Done"
means "done well." It will not catch contradictions, will not compare output
against intent, will not ask what was missed.

Better training data does not fix either dimension. Better data teaches the
model what correct work *looks like* — not the thinking that produced it. The
hesitation, the doubt, the abandoned first attempts — the verification that
humans do before writing — are invisible in the final output. The model sees
only the result, never the process.

## Can it be fixed?

This is an architectural limitation, not a training data issue. The generation
mechanism — next-token prediction — leaves correctness out of scope by design.
No amount of better data, smarter prompts, or RLHF alignment installs an
internal verification loop.

At the **model level**: it may eventually be solved. Research into process
reward models and reasoning architectures that can pause, evaluate, and revise
mid-generation points toward genuine self-verification. But this is a research
frontier — not something we can depend on today.

At the **system level**: the two dimensions differ in kind, not just in
difficulty.

Verification has an **external value function**. "Does the output match the
spec?" is objective. You can enforce it mechanically — a binding contract and
evidence-based review. The standard lives outside the model.

Thinking has no such thing. "Is this the right approach?" "Is this good enough?"
require an **internal value function** — a sense of "better" that points toward
deeper work. The model has no such gradient. Next-token prediction steers toward
"most likely," never "better." The model does not settle for shallow because it
is lazy — it settles for shallow because it cannot tell which direction goes
deeper. The human equivalent is attitude: a person who *wants* to do good work
naturally explores alternatives, questions assumptions, anticipates problems.
The model has no equivalent drive. It cannot *want* anything.

This is why the two dimensions require different strategies. Verification can be
enforced by an external contract. Thinking can only be encouraged by structure
that simulates a quality gradient — guiding the model through the steps a
high-attitude person takes naturally.

## The answer

task-spec addresses both dimensions with a five-phase process:

**Explore → Spec → Challenge → Execute → Verify**

**Explore** — traverse the solution space. Understand the problem, consider
directions, eliminate dead ends. Do not commit yet.

**Spec** — lock in a direction. Define measurable acceptance criteria, anticipate
risks, and state your reasoning. The spec is a binding contract: Execute follows
it, Verify judges by it.

**Challenge** — adversarial review. Five questions: edge cases, wrong assumptions,
overengineering, risk, and whether the solution space was thoroughly traversed.
Non-trivial tasks delegate this to a subagent. No spec proceeds to execution
without surviving this gate.

**Execute** — follow the spec precisely. Every action must trace back to the spec.
Hit uncovered ground? Pause and return to Explore.

**Verify** — check every acceptance criterion against actual output with evidence.
Pass? Done. Fail? Analyze the failure, then return to Explore for a new cycle.

These five phases form two loops. The **inner loop** (Explore → Spec → Challenge)
sharpens the plan before acting — failures route back to Spec for minor fixes
or Explore for major rethinking. The **outer loop** (Execute → Verify → Explore)
validates results after acting — a Verify failure triggers a fresh cycle.

Every spec is written to `.task_spec/<slug>.md`, leaving an audit trail.

## Install

```bash
npx skills add CaffreySun/task-spec
```

Or for Claude Code:

```bash
claude plugins install github.com/CaffreySun/task-spec
```

## License

MIT
