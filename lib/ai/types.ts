/**
 * Shared types for the AI service layer.
 *
 * These types intentionally stay transport-agnostic so any future
 * provider (Naive, Anthropic, OpenAI, self-hosted) can implement them.
 */

import type { Lead, Note, Activity } from "@prisma/client";

/** Minimal snapshot of a lead we pass to an AI provider. */
export type LeadSnapshot = Lead & {
  notes: Pick<Note, "body" | "createdAt">[];
  activities: Pick<Activity, "type" | "meta" | "createdAt">[];
};

/** Pipeline context passed to pipeline-level analyses. */
export type PipelineSnapshot = {
  leads: Lead[];
  statusCounts: Record<string, number>;
  priorityCounts: Record<string, number>;
  temperatureCounts: Record<string, number>;
  generatedAt: Date;
};

export type LeadSummary = {
  headline: string;
  bullets: string[];
  nextBestAction: string;
};

export type FollowUpSuggestion = {
  channel: "email" | "call" | "text" | "dm" | "other";
  subject?: string;
  body: string;
  /** ISO date string for when to send it (e.g. "2026-04-25"). */
  suggestedAt?: string;
  reasoning?: string;
};

export type PipelineInsight = {
  headline: string;
  observations: string[];
  risks: string[];
  opportunities: string[];
};

/** Contract every AI provider must implement. */
export interface AiProvider {
  name: string;
  summarizeLead(lead: LeadSnapshot): Promise<LeadSummary>;
  suggestFollowUp(lead: LeadSnapshot): Promise<FollowUpSuggestion>;
  analyzePipeline(snapshot: PipelineSnapshot): Promise<PipelineInsight>;
}
