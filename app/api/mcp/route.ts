import { handleMcp } from "@/lib/mcp/handler";

/**
 * Model Context Protocol (MCP) endpoint for the JDT CRM.
 *
 * Exposes lib/leads.ts as a remote MCP server so Cowork / Claude.ai can read
 * and act on leads directly. All requests must include a static bearer token:
 *
 *   Authorization: Bearer $MCP_SECRET
 *
 * See README.md → "MCP server" for setup, tool list, and how to add this as a
 * custom connector.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = handleMcp;
export const POST = handleMcp;
