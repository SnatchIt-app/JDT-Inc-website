import "server-only";
import { TOOL_LIST, callTool } from "./tools";

/**
 * Minimal stateless MCP server over JSON-RPC.
 *
 * Implements the small slice of the Model Context Protocol that Cowork /
 * Claude.ai actually need for a single-user remote tool server:
 *
 *   - initialize
 *   - notifications/initialized   (no-op ack)
 *   - ping
 *   - tools/list
 *   - tools/call
 *
 * Auth: static bearer token (`MCP_SECRET`) on the Authorization header,
 * matching the same pattern as the cron routes.
 *
 * Why hand-rolled instead of @modelcontextprotocol/sdk? The SDK's transports
 * are designed around long-lived sessions / SSE; this endpoint is stateless
 * (every call is independent) which keeps it serverless-friendly on Vercel
 * with zero session storage and zero new dependencies.
 */

const PROTOCOL_VERSION = "2024-11-05";
const SERVER_NAME = "jdt-crm";
const SERVER_VERSION = "1.0.0";

type JsonRpcRequest = {
  jsonrpc: "2.0";
  id?: string | number | null;
  method: string;
  params?: unknown;
};

type JsonRpcResponse = {
  jsonrpc: "2.0";
  id: string | number | null;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
};

const ERR = {
  PARSE: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL: -32603,
} as const;

function ok(id: JsonRpcRequest["id"], result: unknown): JsonRpcResponse {
  return { jsonrpc: "2.0", id: id ?? null, result };
}

function err(
  id: JsonRpcRequest["id"],
  code: number,
  message: string,
  data?: unknown
): JsonRpcResponse {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message, data } };
}

function unauthorized(): Response {
  return new Response(JSON.stringify({ error: "unauthorized" }), {
    status: 401,
    headers: { "content-type": "application/json", "WWW-Authenticate": "Bearer" },
  });
}

function checkAuth(req: Request): boolean {
  const expected = process.env.MCP_SECRET;
  if (!expected) {
    // No secret configured = endpoint is disabled. Never accept requests.
    return false;
  }
  const header = req.headers.get("authorization");
  if (!header) return false;
  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return false;
  // Constant-time compare to avoid timing leaks.
  return safeEqual(token, expected);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function handleRpc(rpc: JsonRpcRequest): Promise<JsonRpcResponse | null> {
  // Notifications (no `id`) get no response per JSON-RPC 2.0.
  const isNotification = rpc.id === undefined || rpc.id === null;
  const id = rpc.id ?? null;

  try {
    switch (rpc.method) {
      case "initialize": {
        return ok(id, {
          protocolVersion: PROTOCOL_VERSION,
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
        });
      }

      case "notifications/initialized":
      case "initialized": {
        // Client telling us it's ready. No response for notifications.
        return isNotification ? null : ok(id, {});
      }

      case "ping": {
        return ok(id, {});
      }

      case "tools/list": {
        return ok(id, { tools: TOOL_LIST });
      }

      case "tools/call": {
        const params = (rpc.params ?? {}) as { name?: string; arguments?: unknown };
        if (!params.name || typeof params.name !== "string") {
          return err(id, ERR.INVALID_PARAMS, "Missing tool name");
        }
        try {
          const result = await callTool(params.name, params.arguments);
          return ok(id, {
            content: [{ type: "text", text: jsonStringifySafe(result) }],
            isError: false,
          });
        } catch (e) {
          // Tool errors are surfaced inside the result so the model can see
          // them, rather than as a JSON-RPC error.
          return ok(id, {
            content: [
              { type: "text", text: e instanceof Error ? e.message : String(e) },
            ],
            isError: true,
          });
        }
      }

      default: {
        if (isNotification) return null;
        return err(id, ERR.METHOD_NOT_FOUND, `Method not found: ${rpc.method}`);
      }
    }
  } catch (e) {
    if (isNotification) return null;
    return err(id, ERR.INTERNAL, e instanceof Error ? e.message : "Internal error");
  }
}

function jsonStringifySafe(v: unknown): string {
  return JSON.stringify(v, (_k, val) =>
    typeof val === "bigint" ? val.toString() : val
  );
}

export async function handleMcp(req: Request): Promise<Response> {
  if (!checkAuth(req)) return unauthorized();

  if (req.method === "GET") {
    // Some clients probe with GET; respond with a minimal capabilities hint.
    return Response.json({
      name: SERVER_NAME,
      version: SERVER_VERSION,
      protocolVersion: PROTOCOL_VERSION,
      transport: "streamable-http",
      stateless: true,
    });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json(err(null, ERR.PARSE, "Invalid JSON"), { status: 400 });
  }

  // JSON-RPC supports batched arrays; handle them too.
  if (Array.isArray(body)) {
    const responses = await Promise.all(
      body.map((r) => handleRpc(r as JsonRpcRequest))
    );
    const filtered = responses.filter((r): r is JsonRpcResponse => r !== null);
    if (filtered.length === 0) return new Response(null, { status: 204 });
    return Response.json(filtered);
  }

  const response = await handleRpc(body as JsonRpcRequest);
  if (response === null) return new Response(null, { status: 204 });
  return Response.json(response);
}
