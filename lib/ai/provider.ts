import "server-only";
import type {
  AiProvider,
  FollowUpSuggestion,
  LeadSnapshot,
  LeadSummary,
  PipelineInsight,
  PipelineSnapshot,
} from "./types";

/**
 * Provider factory.
 *
 * Today we ship a deterministic, zero-dependency "heuristic" provider that
 * produces useful output without any external service. When the Naive (or
 * any other) provider is ready, implement `AiProvider` in a new file and
 * wire it up here behind an env flag — e.g.
 *
 *   if (process.env.AI_PROVIDER === "naive") return new NaiveProvider();
 *
 * The rest of the app (actions, UI) never needs to change.
 */
export function getAiProvider(): AiProvider {
  // Placeholder for future switch:
  // switch (process.env.AI_PROVIDER) {
  //   case "naive":
  //     return new NaiveProvider();
  //   case "anthropic":
  //     return new AnthropicProvider();
  // }
  return heuristicProvider;
}

/* ------------------------------------------------------------------ */
/* Heuristic provider — no external calls, no dependencies.            */
/* Good enough to wire the UI today and smoke-test the flow.           */
/* ------------------------------------------------------------------ */

const heuristicProvider: AiProvider = {
  name: "heuristic",

  async summarizeLead(lead: LeadSnapshot): Promise<LeadSummary> {
    const bullets: string[] = [];
    if (lead.company) bullets.push(`Company: ${lead.company}`);
    if (lead.serviceInterest)
      bullets.push(`Interested in: ${lead.serviceInterest}`);
    if (lead.estimatedBudget)
      bullets.push(`Budget: ${lead.estimatedBudget}`);
    bullets.push(
      `Stage: ${lead.status} · Temp: ${lead.temperature} · Priority: ${lead.priority}`
    );
    if (lead.lastContactedAt)
      bullets.push(
        `Last contacted: ${new Date(lead.lastContactedAt).toLocaleDateString()}`
      );
    if (lead.nextFollowUpAt)
      bullets.push(
        `Next follow-up: ${new Date(lead.nextFollowUpAt).toLocaleDateString()}`
      );
    if (lead.notes.length > 0)
      bullets.push(`${lead.notes.length} internal note(s) on file`);

    return {
      headline: `${lead.fullName}${lead.company ? ` — ${lead.company}` : ""}`,
      bullets,
      nextBestAction: deriveNextBestAction(lead),
    };
  },

  async suggestFollowUp(lead: LeadSnapshot): Promise<FollowUpSuggestion> {
    const firstName = lead.fullName.split(" ")[0] ?? lead.fullName;
    const service = lead.serviceInterest ?? "what you're building";

    return {
      channel: lead.phone ? "call" : "email",
      subject: `Quick follow-up, ${firstName}`,
      body:
        `Hi ${firstName} — following up on your note about ${service}. ` +
        `Happy to send over a quick plan or jump on a 15-minute call this week. ` +
        `What works better for you?`,
      suggestedAt: suggestNextBusinessDay(),
      reasoning:
        "Default template — replace with model output when a real AI provider is wired in.",
    };
  },

  async analyzePipeline(
    snapshot: PipelineSnapshot
  ): Promise<PipelineInsight> {
    const stalled = snapshot.leads.filter((l) => {
      if (!l.updatedAt) return false;
      const days =
        (Date.now() - new Date(l.updatedAt).getTime()) /
        (1000 * 60 * 60 * 24);
      return (
        days > 7 && l.status !== "Won" && l.status !== "Lost"
      );
    }).length;

    const hot =
      (snapshot.temperatureCounts["Hot"] ?? 0) +
      (snapshot.temperatureCounts["hot"] ?? 0);
    const proposals = snapshot.statusCounts["Proposal Sent"] ?? 0;

    return {
      headline: `${snapshot.leads.length} leads tracked`,
      observations: [
        `${hot} leads marked Hot`,
        `${proposals} proposals currently out`,
        `${stalled} leads untouched for 7+ days`,
      ],
      risks: stalled > 0 ? [`${stalled} deals may be going cold`] : [],
      opportunities:
        hot > 0
          ? [`Close ${hot} hot leads this week`]
          : ["Qualify more leads up to Hot this week"],
    };
  },
};

function deriveNextBestAction(lead: LeadSnapshot): string {
  if (lead.status === "Won" || lead.status === "Lost") return "No action needed.";
  if (!lead.lastContactedAt) return "Make first contact — introduce yourself.";
  if (lead.temperature === "Hot") return "Push for a proposal or kickoff call.";
  if (lead.status === "Proposal Sent") return "Follow up on the proposal.";
  return "Re-engage with a short, specific message.";
}

function suggestNextBusinessDay(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  // Skip weekends — push to Monday.
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  return d.toISOString().slice(0, 10);
}

export type { LeadSummary, FollowUpSuggestion, PipelineInsight };
