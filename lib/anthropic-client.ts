/**
 * Minimal Anthropic API client.
 *
 * Uses fetch directly (no SDK dependency). Implements tool use for
 * structured output — the only thing we ask Claude to do.
 *
 * Read ANTHROPIC_API_KEY from env. Throws clearly if missing so CI
 * fails loud instead of silently producing empty articles.
 */

const API_URL = "https://api.anthropic.com/v1/messages";
const API_VERSION = "2023-06-01";

export type Tool = {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
};

export type ToolUseResult<T = unknown> = {
  toolName: string;
  input: T;
  stopReason: string;
};

export async function callClaudeWithTool<T = unknown>(opts: {
  model?: string;
  system: string;
  user: string;
  tool: Tool;
  maxTokens?: number;
}): Promise<ToolUseResult<T>> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY not set. Required for the autonomous editorial pipeline.",
    );
  }

  const model = opts.model ?? "claude-sonnet-4-6";
  const maxTokens = opts.maxTokens ?? 8000;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": API_VERSION,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system: opts.system,
      messages: [{ role: "user", content: opts.user }],
      tools: [opts.tool],
      tool_choice: { type: "tool", name: opts.tool.name },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${text}`);
  }

  const json: {
    stop_reason: string;
    content: Array<
      | { type: "text"; text: string }
      | { type: "tool_use"; name: string; input: T }
    >;
  } = await res.json();

  const toolUse = json.content.find(
    (b): b is { type: "tool_use"; name: string; input: T } =>
      b.type === "tool_use",
  );
  if (!toolUse) {
    throw new Error(
      `Claude did not call the tool "${opts.tool.name}". Got stop_reason=${json.stop_reason}.`,
    );
  }

  return {
    toolName: toolUse.name,
    input: toolUse.input,
    stopReason: json.stop_reason,
  };
}
