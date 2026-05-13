<!--
Format reference for the task-spec skill.
You MUST follow the constraints in SKILL.md when filling this in.
Execute phase is NOT written here — track it with todo_write.
-->
# spec: <slug>

## Cycle 1

### Think
<spec body: What / How / Verify criteria>

### Reflect
- Edge cases: <at least 2>
- Wrong assumptions: <at least 1>
- Overengineering: <at least 1>
- Risk: <destructive? blast radius? rollback?>
- Verdict: PASS or FAIL (if FAIL → attach defect list)

### Verify
- <criterion 1>: PASS / FAIL (with evidence — e.g. "curl returned … matching expected")
- <criterion 2>: PASS / FAIL (with evidence)
- …
- Verdict: all passed / triggers Cycle N+1 (state reason)

## Cycle 2 (triggered by <specific reason>)
…
