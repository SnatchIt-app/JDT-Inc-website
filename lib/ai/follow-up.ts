import "server-only";
import { prisma } from "@/lib/db";
import { getAiProvider } from "./provider";
import type { FollowUpSuggestion } from "./types";

/**
 * Suggest a follow-up message + send date for a lead.
 */
export async function suggestFollowUp(
  leadId: string
): Promise<FollowUpSuggestion> {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: {
      notes: { orderBy: { createdAt: "desc" }, take: 10 },
      activities: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  });
  if (!lead) throw new Error("Lead not found");
  return getAiProvider().suggestFollowUp(lead);
}
