import "server-only";
import { z } from "zod";
import {
  LEAD_PRIORITIES,
  LEAD_SOURCES,
  LEAD_STAGES,
  LEAD_TEMPERATURES,
  SERVICE_INTERESTS,
  BUDGET_RANGES,
} from "@/lib/crm";
import {
  listLeads,
  getLeadWithDetails,
  createLead,
  changeStatus,
  changePriority,
  changeTemperature,
  setFollowUp,
  markContacted,
  addNote,
  getDashboardStats,
  getDueFollowUps,
  getDailyDigestData,
} from "@/lib/leads";
import { resolveMcpAdminId } from "./admin";

/**
 * MCP tool registry.
 *
 * Each tool wraps a function from `lib/leads.ts` and is the ONLY place where
 * we marshal arguments between MCP JSON and our domain types. Keep the schemas
 * tight — they double as the contract sent to MCP clients (Cowork, Claude.ai).
 */

type ToolDef = {
  name: string;
  description: string;
  // JSON Schema sent to the client during tools/list.
  inputSchema: Record<string, unknown>;
  // Zod schema used to validate inbound args inside tools/call.
  zod: z.ZodTypeAny;
  // Handler returns plain JSON-serializable data; the dispatcher wraps it.
  handler: (args: unknown) => Promise<unknown>;
};

// ---------- shared helpers ----------------------------------------------------

const optionalIsoDate = z
  .string()
  .datetime({ offset: true })
  .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/))
  .nullable()
  .optional();

const isoDateOrNull = optionalIsoDate.transform((v) => {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
});

// JSON Schema fragment for a stage/priority/etc. enum.
const enumSchema = (values: readonly string[]) => ({
  type: "string",
  enum: [...values],
});

// ---------- tool definitions --------------------------------------------------

const tools: ToolDef[] = [
  {
    name: "list_leads",
    description:
      "List up to 200 leads from the JDT CRM, newest first. Supports filtering by status, priority, source, temperature, free-text query (matches name/email/company), and a created-at date range.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        q: { type: "string", description: "Free-text match on name, email, or company." },
        status: enumSchema(LEAD_STAGES),
        priority: enumSchema(LEAD_PRIORITIES),
        source: enumSchema(LEAD_SOURCES),
        temperature: enumSchema(LEAD_TEMPERATURES),
        from: { type: "string", description: "Created on/after (yyyy-mm-dd or ISO)." },
        to: { type: "string", description: "Created on/before (yyyy-mm-dd or ISO)." },
      },
    },
    zod: z.object({
      q: z.string().optional(),
      status: z.enum(LEAD_STAGES).optional(),
      priority: z.enum(LEAD_PRIORITIES).optional(),
      source: z.enum(LEAD_SOURCES).optional(),
      temperature: z.enum(LEAD_TEMPERATURES).optional(),
      from: z.string().optional(),
      to: z.string().optional(),
    }),
    handler: async (args) => {
      const a = args as Record<string, string | undefined>;
      return listLeads(a);
    },
  },

  {
    name: "get_lead",
    description:
      "Fetch a single lead by ID, including all notes and the full activity timeline.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["id"],
      properties: {
        id: { type: "string", description: "Lead ID (cuid)." },
      },
    },
    zod: z.object({ id: z.string().min(1) }),
    handler: async (args) => {
      const { id } = args as { id: string };
      const lead = await getLeadWithDetails(id);
      if (!lead) throw new Error(`Lead ${id} not found`);
      return lead;
    },
  },

  {
    name: "create_lead",
    description:
      "Create a new lead in the JDT CRM. Triggers the standard new-lead Resend notification. Defaults: source=Manual Entry, status=New, priority=Medium, temperature=Cold.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["fullName", "email"],
      properties: {
        fullName: { type: "string" },
        email: { type: "string", format: "email" },
        company: { type: "string" },
        phone: { type: "string" },
        message: { type: "string" },
        source: { ...enumSchema(LEAD_SOURCES), default: "Manual Entry" },
        status: { ...enumSchema(LEAD_STAGES), default: "New" },
        priority: { ...enumSchema(LEAD_PRIORITIES), default: "Medium" },
        temperature: { ...enumSchema(LEAD_TEMPERATURES), default: "Cold" },
        serviceInterest: enumSchema(SERVICE_INTERESTS),
        estimatedBudget: enumSchema(BUDGET_RANGES),
        nextFollowUpAt: { type: "string", description: "ISO datetime or yyyy-mm-dd." },
      },
    },
    zod: z.object({
      fullName: z.string().min(1).max(200),
      email: z.string().email().max(200),
      company: z.string().max(200).optional(),
      phone: z.string().max(60).optional(),
      message: z.string().max(5000).optional(),
      source: z.enum(LEAD_SOURCES).optional(),
      status: z.enum(LEAD_STAGES).optional(),
      priority: z.enum(LEAD_PRIORITIES).optional(),
      temperature: z.enum(LEAD_TEMPERATURES).optional(),
      serviceInterest: z.enum(SERVICE_INTERESTS).optional(),
      estimatedBudget: z.enum(BUDGET_RANGES).optional(),
      nextFollowUpAt: isoDateOrNull,
    }),
    handler: async (args) => {
      const input = args as Parameters<typeof createLead>[0];
      const authorId = await resolveMcpAdminId();
      return createLead(input, { authorId });
    },
  },

  {
    name: "change_status",
    description:
      "Move a lead to a new pipeline stage. Logs a status_changed activity. No-op if already at that stage.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["id", "status"],
      properties: {
        id: { type: "string" },
        status: enumSchema(LEAD_STAGES),
      },
    },
    zod: z.object({ id: z.string().min(1), status: z.enum(LEAD_STAGES) }),
    handler: async (args) => {
      const { id, status } = args as { id: string; status: (typeof LEAD_STAGES)[number] };
      const authorId = await resolveMcpAdminId();
      await changeStatus(id, status, { authorId });
      return { ok: true, id, status };
    },
  },

  {
    name: "change_priority",
    description: "Change a lead's priority (Low | Medium | High). Logs an activity.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["id", "priority"],
      properties: {
        id: { type: "string" },
        priority: enumSchema(LEAD_PRIORITIES),
      },
    },
    zod: z.object({ id: z.string().min(1), priority: z.enum(LEAD_PRIORITIES) }),
    handler: async (args) => {
      const { id, priority } = args as {
        id: string;
        priority: (typeof LEAD_PRIORITIES)[number];
      };
      const authorId = await resolveMcpAdminId();
      await changePriority(id, priority, { authorId });
      return { ok: true, id, priority };
    },
  },

  {
    name: "change_temperature",
    description: "Change a lead's temperature (Cold | Warm | Hot). Logs an activity.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["id", "temperature"],
      properties: {
        id: { type: "string" },
        temperature: enumSchema(LEAD_TEMPERATURES),
      },
    },
    zod: z.object({ id: z.string().min(1), temperature: z.enum(LEAD_TEMPERATURES) }),
    handler: async (args) => {
      const { id, temperature } = args as {
        id: string;
        temperature: (typeof LEAD_TEMPERATURES)[number];
      };
      const authorId = await resolveMcpAdminId();
      await changeTemperature(id, temperature, { authorId });
      return { ok: true, id, temperature };
    },
  },

  {
    name: "mark_contacted",
    description:
      "Stamp `lastContactedAt` on a lead. Defaults to now() if `at` is omitted. Logs a contacted activity.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["id"],
      properties: {
        id: { type: "string" },
        at: { type: "string", description: "Optional ISO datetime; defaults to now." },
      },
    },
    zod: z.object({ id: z.string().min(1), at: isoDateOrNull }),
    handler: async (args) => {
      const { id, at } = args as { id: string; at: Date | null };
      const authorId = await resolveMcpAdminId();
      await markContacted(id, { authorId, at: at ?? null });
      return { ok: true, id, at: (at ?? new Date()).toISOString() };
    },
  },

  {
    name: "set_follow_up",
    description:
      "Set or clear the next follow-up date on a lead. Pass `nextFollowUpAt: null` (or omit) to clear.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["id"],
      properties: {
        id: { type: "string" },
        nextFollowUpAt: {
          type: ["string", "null"],
          description: "ISO datetime or yyyy-mm-dd. null clears.",
        },
      },
    },
    zod: z.object({ id: z.string().min(1), nextFollowUpAt: isoDateOrNull }),
    handler: async (args) => {
      const { id, nextFollowUpAt } = args as { id: string; nextFollowUpAt: Date | null };
      const authorId = await resolveMcpAdminId();
      await setFollowUp(id, nextFollowUpAt, { authorId });
      return { ok: true, id, nextFollowUpAt: nextFollowUpAt?.toISOString() ?? null };
    },
  },

  {
    name: "add_note",
    description: "Append a note to a lead's timeline. Also logs a note_added activity.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["id", "body"],
      properties: {
        id: { type: "string" },
        body: { type: "string", maxLength: 5000 },
      },
    },
    zod: z.object({ id: z.string().min(1), body: z.string().min(1).max(5000) }),
    handler: async (args) => {
      const { id, body } = args as { id: string; body: string };
      const authorId = await resolveMcpAdminId();
      return addNote(id, body, { authorId });
    },
  },

  {
    name: "dashboard_stats",
    description:
      "Return the same snapshot the /admin dashboard uses: totals, counts by status/priority/temperature, hot leads, overdue follow-ups, recent leads, and Won-this-month.",
    inputSchema: { type: "object", additionalProperties: false, properties: {} },
    zod: z.object({}).strict(),
    handler: async () => getDashboardStats(),
  },

  {
    name: "due_follow_ups",
    description:
      "Leads whose `nextFollowUpAt` is at or before `now`, excluding Won/Lost. Oldest-due first.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        now: { type: "string", description: "Override 'now' (ISO datetime). Defaults to server time." },
      },
    },
    zod: z.object({ now: isoDateOrNull.optional() }),
    handler: async (args) => {
      const { now } = (args as { now?: Date | null }) ?? {};
      return getDueFollowUps(now ?? new Date());
    },
  },

  {
    name: "daily_digest",
    description:
      "Snapshot used to build the daily digest email: overdue follow-ups, hot leads, and new leads in the last 24h.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        now: { type: "string", description: "Override 'now' (ISO datetime). Defaults to server time." },
      },
    },
    zod: z.object({ now: isoDateOrNull.optional() }),
    handler: async (args) => {
      const { now } = (args as { now?: Date | null }) ?? {};
      return getDailyDigestData(now ?? new Date());
    },
  },
];

export const TOOL_LIST = tools.map((t) => ({
  name: t.name,
  description: t.description,
  inputSchema: t.inputSchema,
}));

export async function callTool(name: string, rawArgs: unknown): Promise<unknown> {
  const tool = tools.find((t) => t.name === name);
  if (!tool) throw new Error(`Unknown tool: ${name}`);
  const parsed = tool.zod.safeParse(rawArgs ?? {});
  if (!parsed.success) {
    throw new Error(`Invalid arguments for ${name}: ${parsed.error.message}`);
  }
  return tool.handler(parsed.data);
}
