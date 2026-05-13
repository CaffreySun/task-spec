import type { HookAPI } from "@oh-my-pi/pi-coding-agent/extensibility/hooks";

// Execution tools blocked during Explore/Spec/Challenge.
const EXECUTION_TOOLS = new Set([
  "bash",
  "write",
  "edit",
  "ast_edit",
  "browser",
  "debug",
]);

// Always-allowed tools — read/search/coordination only.
const ALLOWED_TOOLS = new Set([
  "read",
  "search",
  "find",
  "ast_grep",
  "lsp",
  "todo_write",
  "ask",
  "task",
  "eval",
  "resolve",
  "exit_plan_mode",
  "web_search",
  "mcp__context_query_docs",
  "mcp__context_resolve_library_id",
  "mcp__thinking_sequentialthinking",
]);

// Track current phase from todo_write calls.
let currentPhase: "explore" | "spec" | "challenge" | "execute" | "verify" =
  "explore";
// Track whether any todo list with Execute/Verify has been seen.
let hasTodoList = false;

export default function phaseGate(pi: HookAPI): void {
  // Parse todo_write calls to infer phase.
  pi.on("tool_result", async (event) => {
    if (event.toolName !== "todo_write" || event.isError) return;

    try {
      const input = event.content
        ?.map((c) => (c.type === "text" ? c.text : ""))
        .join("");

      if (!input) return;

      // Check if any op sets "Execute" or "Verify" to in_progress.
      if (/Execute.*in_progress/.test(input)) {
        currentPhase = "execute";
        hasTodoList = true;
      } else if (/Verify.*in_progress/.test(input)) {
        currentPhase = "verify";
        hasTodoList = true;
      } else if (hasTodoList) {
        // Has a todo list but Execute/Verify not active → pre-execution.
        currentPhase = "explore";
      }
    } catch {
      // Parse failure → stay in current phase.
    }
  });

  // Block execution tools before Execute.
  pi.on("tool_call", async (event) => {
    const name = event.toolName;

    // Always allow coordination and read tools.
    if (ALLOWED_TOOLS.has(name)) return;
    // MCP tools not in allowlist → block during pre-execution.
    if (name.startsWith("mcp__")) {
      if (currentPhase !== "execute" && currentPhase !== "verify") {
        return {
          block: true,
          reason: `[task-spec] Cannot use MCP tool "${name}" in ${currentPhase} phase. Execution tools require Execute phase.`,
        };
      }
      return;
    }

    // Block execution tools if not in Execute or Verify.
    if (EXECUTION_TOOLS.has(name)) {
      if (currentPhase !== "execute" && currentPhase !== "verify") {
        return {
          block: true,
          reason: `[task-spec] Cannot use "${name}" in ${currentPhase} phase. Complete Explore→Spec→Challenge first.`,
        };
      }
    }
  });

  // Inject phase reminder into context.
  pi.on("context", async (event) => {
    const phaseLabel =
      currentPhase === "explore"
        ? "Explore (pre-spec)"
        : currentPhase === "spec"
        ? "Spec (pre-challenge)"
        : currentPhase === "challenge"
        ? "Challenge (pre-execute)"
        : currentPhase === "execute"
        ? "Execute"
        : "Verify";

    const allowedMsg =
      currentPhase === "execute" || currentPhase === "verify"
        ? "all tools available"
        : "read/search/todo_write only — no execution tools";

    const reminder = {
      role: "custom" as const,
      customType: "task-spec-phase",
      content: [
        {
          type: "text" as const,
          text: `[task-spec phase gate] Phase: ${phaseLabel}. ${allowedMsg}.`,
        },
      ],
    };

    const messages = [...event.messages];
    // Insert after system messages, before user content.
    const insertAt = messages.findIndex(
      (m) => m.role !== "system" && m.customType !== "task-spec-phase",
    );
    if (insertAt >= 0) {
      messages.splice(insertAt, 0, reminder);
    } else {
      messages.push(reminder);
    }

    return { messages };
  });
}
