# Spec: README readability optimization (v3)

"问题"不缩——定义完整是理解答案的前提。优化方向：结构流畅度、
术语可接近性、段落过渡。

## Target structure

1. **Tagline** — unchanged
2. **The problem** — KEPT FULL. Restructured for outsider readability:
   - 开头加一句总领："LLM 有两个根深蒂固的问题——一个是动手前的，一个是动手后的。"
   - 人格化比喻保留，但前移到"两个维度"之前作为铺垫
   - "两个维度"分段更清晰，每段有明确的"这是问题一/二"标记
   - 训练数据段落保留
   - 语言微调：避免突兀出现的术语（如不靠前文直接说"next-token prediction"，
     先铺垫"模型生成文本的方式"）
3. **Can it be fixed?** — kept, same position. 语言微调。
4. **The answer** — merged with "How it works":
   - 先说五阶段（Explore → Spec → Challenge → Execute → Verify）
   - 再说两层循环
   - 不再有独立的 "How it works" 章节
5. **Install** — unchanged
6. **License** — unchanged

## What changes

- 问题章节：结构微调（总领句 + 比喻前置 + 维度更清晰的分段），篇幅不变
- 答案 + 原理：合并，命名五阶段
- 术语前加铺垫（如 "next-token prediction —— 模型生成文本的基本方式 ——"）
- 删除独立 "How it works"，内容并入答案

## What stays

- 问题定义完整保留
- "能修吗" 完整保留
- 所有实质论述
- 两语言并行

## Verify

- 新读者能用连贯逻辑从头读到尾，不需要提前理解内部术语
- 问题定义完整
- 两个 README 结构一致
