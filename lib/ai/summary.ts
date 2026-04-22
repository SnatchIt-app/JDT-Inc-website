import "server-only";
import { prisma } from "@/lib/db";
import { getAiProvider } from "./provider";
import type { LeadSummary } from "./types";

/**
 * Generate a short, scannable summary of a lead.
 * Thin wrapper: load the snapshot, hand it to the provider.
 */
export async function summarizeLead(leadId: string): Promise<LeadSummary> {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: {
      notes: { orderBy: { createdAt: "desc" }, take: 10 },
      activities: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  });
  if (!lead) throw new Error("Lead not found");
  return getAiProvider().summarizeLead(lead);
}
