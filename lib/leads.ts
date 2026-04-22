import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "./db";
import {
  ACTIVITY,
  type LeadPriority,
  type LeadStage,
  type LeadTemperature,
} from "./crm";
import { sendNewLeadNotification } from "./email/lead-notification";
import type { NewLeadInput, UpdateLeadInput } from "./validators";

/**
 * Business logic for leads. Keep DB writes here so activity logging
 * stays consistent across call sites.
 */

export type LeadListFilters = {
  q?: string;
  status?: string;
  priority?: string;
  source?: string;
  temperature?: string;
  from?: string; // ISO date (yyyy-mm-dd)
  to?: string; // ISO date (yyyy-mm-dd)
};

export async function listLeads(filters: LeadListFilters = {}) {
  const where: Prisma.LeadWhereInput = {};

  if (filters.q) {
    where.OR = [
      { fullName: { contains: filters.q, mode: "insensitive" } },
      { email: { contains: filters.q, mode: "insensitive" } },
      { company: { contains: filters.q, mode: "insensitive" } },
    ];
  }
  if (filters.status) where.status = filters.status;
  if (filters.priority) where.priority = filters.priority;
  if (filters.source) where.source = filters.source;
  if (filters.temperature) where.temperature = filters.temperature;
  if (filters.from || filters.to) {
    where.createdAt = {};
    if (filters.from) where.createdAt.gte = new Date(filters.from);
    if (filters.to) {
      // include the whole "to" day
      const to = new Date(filters.to);
      to.setHours(23, 59, 59, 999);
      where.createdAt.lte = to;
    }
  }

  return prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

export async function getLeadWithDetails(id: string) {
  return prisma.lead.findUnique({
    where: { id },
    include: {
      notes: {
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true, email: true } } },
      },
      activities: {
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true, email: true } } },
      },
    },
  });
}

type CreateLeadInput =
  | NewLeadInput
  | (Partial<NewLeadInput> & { fullName: string; email: string });

export async function createLead(
  input: CreateLeadInput,
  opts?: { authorId?: string | null }
) {
  const data = {
    fullName: input.fullName,
    email: input.email,
    company: emptyToNull(input.company),
    phone: emptyToNull(input.phone),
    message: emptyToNull(input.message),
    source: input.source ?? "Website Contact Form",
    status: input.status ?? "New",
    priority: input.priority ?? "Medium",
    temperature: input.temperature ?? "Cold",
    serviceInterest: emptyToNull(input.serviceInterest),
    estimatedBudget: emptyToNull(input.estimatedBudget),
    nextFollowUpAt: input.nextFollowUpAt ?? null,
  };

  const lead = await prisma.lead.create({
    data: {
      ...data,
      activities: {
        create: {
          type: ACTIVITY.leadCreated,
          meta: {
            source: data.source,
            ...(data.serviceInterest && { serviceInterest: data.serviceInterest }),
            ...(data.estimatedBudget && { estimatedBudget: data.estimatedBudget }),
          },
          authorId: opts?.authorId ?? null,
        },
      },
    },
  });

  // Fire the admin email notification. `sendNewLeadNotification` never
  // throws — any Resend/network issue is logged so lead creation still
  // succeeds even if email delivery fails.
  await sendNewLeadNotification({
    id: lead.id,
    fullName: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    serviceInterest: lead.serviceInterest,
    estimatedBudget: lead.estimatedBudget,
    message: lead.message,
    source: lead.source,
    createdAt: lead.createdAt,
  });

  return lead;
}

export async function updateLead(
  id: string,
  input: UpdateLeadInput,
  opts: { authorId: string }
) {
  const lead = await prisma.lead.update({
    where: { id },
    data: {
      fullName: input.fullName,
      email: input.email,
      company: emptyToNull(input.company),
      phone: emptyToNull(input.phone),
      message: emptyToNull(input.message),
      source: input.source,
      serviceInterest: emptyToNull(input.serviceInterest),
      estimatedBudget: emptyToNull(input.estimatedBudget),
      activities: {
        create: { type: ACTIVITY.leadUpdated, authorId: opts.authorId },
      },
    },
  });
  return lead;
}

export async function changeStatus(
  id: string,
  next: LeadStage,
  opts: { authorId: string }
) {
  const current = await prisma.lead.findUnique({
    where: { id },
    select: { status: true },
  });
  if (!current) throw new Error("Lead not found");
  if (current.status === next) return;
  await prisma.lead.update({
    where: { id },
    data: {
      status: next,
      activities: {
        create: {
          type: ACTIVITY.statusChanged,
          meta: { from: current.status, to: next },
          authorId: opts.authorId,
        },
      },
    },
  });
}

export async function changePriority(
  id: string,
  next: LeadPriority,
  opts: { authorId: string }
) {
  const current = await prisma.lead.findUnique({
    where: { id },
    select: { priority: true },
  });
  if (!current) throw new Error("Lead not found");
  if (current.priority === next) return;
  await prisma.lead.update({
    where: { id },
    data: {
      priority: next,
      activities: {
        create: {
          type: ACTIVITY.priorityChanged,
          meta: { from: current.priority, to: next },
          authorId: opts.authorId,
        },
      },
    },
  });
}

export async function changeTemperature(
  id: string,
  next: LeadTemperature,
  opts: { authorId: string }
) {
  const current = await prisma.lead.findUnique({
    where: { id },
    select: { temperature: true },
  });
  if (!current) throw new Error("Lead not found");
  if (current.temperature === next) return;
  await prisma.lead.update({
    where: { id },
    data: {
      temperature: next,
      activities: {
        create: {
          type: ACTIVITY.temperatureChanged,
          meta: { from: current.temperature, to: next },
          authorId: opts.authorId,
        },
      },
    },
  });
}

/** Mark a lead as contacted right now (or at a provided datetime). */
export async function markContacted(
  id: string,
  opts: { authorId: string; at?: Date | null }
) {
  const at = opts.at ?? new Date();
  await prisma.lead.update({
    where: { id },
    data: {
      lastContactedAt: at,
      activities: {
        create: {
          type: ACTIVITY.contacted,
          meta: { at: at.toISOString() },
          authorId: opts.authorId,
        },
      },
    },
  });
}

/** Set or clear the next follow-up date. Pass `null` to clear. */
export async function setFollowUp(
  id: string,
  next: Date | null,
  opts: { authorId: string }
) {
  await prisma.lead.update({
    where: { id },
    data: {
      nextFollowUpAt: next,
      activities: {
        create: {
          type: next ? ACTIVITY.followUpScheduled : ACTIVITY.followUpCleared,
          meta: next ? { at: next.toISOString() } : undefined,
          authorId: opts.authorId,
        },
      },
    },
  });
}

export async function addNote(
  id: string,
  body: string,
  opts: { authorId: string }
) {
  return prisma.note
    .create({
      data: {
        body,
        leadId: id,
        authorId: opts.authorId,
        lead: undefined,
      } as unknown as Prisma.NoteCreateInput,
    })
    .then(async (note) => {
      await prisma.activity.create({
        data: {
          type: ACTIVITY.noteAdded,
          leadId: id,
          authorId: opts.authorId,
        },
      });
      return note;
    });
}

export async function deleteLead(id: string) {
  await prisma.lead.delete({ where: { id } });
}

/**
 * Dashboard summary — one trip to the DB.
 * Returns everything the dashboard page needs to render at a glance.
 */
export async function getDashboardStats() {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);

  const [
    total,
    byStatus,
    byPriority,
    byTemperature,
    thisWeek,
    wonThisMonth,
    newCount,
    hotLeads,
    overdue,
    recent,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({ by: ["status"], _count: { status: true } }),
    prisma.lead.groupBy({ by: ["priority"], _count: { priority: true } }),
    prisma.lead.groupBy({ by: ["temperature"], _count: { temperature: true } }),
    prisma.lead.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.lead.count({
      where: { status: "Won", updatedAt: { gte: startOfMonth } },
    }),
    prisma.lead.count({ where: { status: "New" } }),
    prisma.lead.findMany({
      where: {
        temperature: "Hot",
        status: { notIn: ["Won", "Lost"] },
      },
      orderBy: [{ nextFollowUpAt: "asc" }, { updatedAt: "desc" }],
      take: 10,
    }),
    prisma.lead.findMany({
      where: {
        nextFollowUpAt: { lte: endOfToday, not: null },
        status: { notIn: ["Won", "Lost"] },
      },
      orderBy: { nextFollowUpAt: "asc" },
      take: 10,
    }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const statusCounts = Object.fromEntries(
    byStatus.map((r) => [r.status, r._count.status])
  );
  const priorityCounts = Object.fromEntries(
    byPriority.map((r) => [r.priority, r._count.priority])
  );
  const temperatureCounts = Object.fromEntries(
    byTemperature.map((r) => [r.temperature, r._count.temperature])
  );

  return {
    total,
    statusCounts,
    priorityCounts,
    temperatureCounts,
    thisWeek,
    wonThisMonth,
    newCount,
    hotLeads,
    overdue,
    recent,
  };
}

function emptyToNull(v: string | null | undefined): string | null {
  if (!v) return null;
  const trimmed = v.trim();
  return trimmed.length === 0 ? null : trimmed;
}

// ---------------------------------------------------------------------
// Follow-up automation queries
// Used by the cron routes under `app/api/cron/*`.
// ---------------------------------------------------------------------

/**
 * Leads whose `nextFollowUpAt` has reached/passed `now`, and that are
 * still active (not Won/Lost). Ordered oldest-due-first so the most
 * overdue ones are emailed first.
 */
export async function getDueFollowUps(now: Date = new Date()) {
  return prisma.lead.findMany({
    where: {
      nextFollowUpAt: { lte: now, not: null },
      status: { notIn: ["Won", "Lost"] },
    },
    orderBy: { nextFollowUpAt: "asc" },
  });
}

/**
 * Snapshot used to build the daily digest email.
 * Runs the three queries in parallel, single DB round-trip where possible.
 */
export async function getDailyDigestData(now: Date = new Date()) {
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const [overdue, hot, newLast24h] = await Promise.all([
    prisma.lead.findMany({
      where: {
        nextFollowUpAt: { lte: endOfToday, not: null },
        status: { notIn: ["Won", "Lost"] },
      },
      orderBy: { nextFollowUpAt: "asc" },
      take: 25,
    }),
    prisma.lead.findMany({
      where: {
        temperature: "Hot",
        status: { notIn: ["Won", "Lost"] },
      },
      orderBy: [{ nextFollowUpAt: "asc" }, { updatedAt: "desc" }],
      take: 25,
    }),
    prisma.lead.findMany({
      where: { createdAt: { gte: dayAgo } },
      orderBy: { createdAt: "desc" },
      take: 25,
    }),
  ]);

  return { overdue, hot, newLast24h };
}
