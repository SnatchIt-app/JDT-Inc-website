import "server-only";
import { prisma } from "@/lib/db";
import { getAiProvider } from "./provider";
import type { PipelineInsight, PipelineSnapshot } from "./types";

/**
 * Run a pipeline-level analysis.
 * Produces observations, risks, and opportunities for the dashboard.
 */
export async function analyzePipeline(): Promise<PipelineInsight> {
  const [leads, byStatus, byPriority, byTemperature] = await Promise.all([
    prisma.lead.findMany({ orderBy: { updatedAt: "desc" }, take: 500 }),
    prisma.lead.groupBy({ by: ["status"], _count: { status: true } }),
    prisma.lead.groupBy({ by: ["priority"], _count: { priority: true } }),
    prisma.lead.groupBy({
      by: ["temperature"],
      _count: { temperature: true },
    }),
  ]);

  const snapshot: PipelineSnapshot = {
    leads,
    statusCounts: Object.fromEntries(
      byStatus.map((r) => [r.status, r._count.status])
    ),
    priorityCounts: Object.fromEntries(
      byPriority.map((r) => [r.priority, r._count.priority])
    ),
    temperatureCounts: Object.fromEntries(
      byTemperature.map((r) => [r.temperature, r._count.temperature])
    ),
    generatedAt: new Date(),
  };

  return getAiProvider().analyzePipeline(snapshot);
}
