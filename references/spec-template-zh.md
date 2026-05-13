<!--
task-spec 的格式参考。
填写时必须遵循 SKILL.md 中的约束。执行阶段不写此文件——用 todo_write 追踪。
-->
# spec: <slug>

## Cycle 1

### Think
<任务规范正文：What / How / Verify 标准>

### Reflect
- 边界情况：<至少 2 个>
- 错误假设：<至少 1 个>
- 过度设计：<至少 1 处>
- 风险：<破坏性？影响面？回滚？>
- 判定：PASS 或 FAIL（若 FAIL → 附缺陷清单）

### Verify
- <验收标准 1>：PASS / FAIL（附证据，例：curl 返回 … 与预期一致）
- <验收标准 2>：PASS / FAIL（附证据）
- …
- 判定：全部通过 / 触发 Cycle N+1（注明原因）

## Cycle 2（因 <具体触发原因> 触发）
…
