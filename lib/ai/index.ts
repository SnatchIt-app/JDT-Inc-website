/**
 * Public entry point for the AI service layer.
 *
 * Keep this thin — it just re-exports the three capabilities so
 * the rest of the app imports from one place:
 *
 *   import { summarizeLead, suggestFollowUp, analyzePipeline } from "@/lib/ai";
 *
 * The real logic lives in each feature file, and the concrete provider
 * is selected inside `provider.ts`. When Naive (or any other provider)
 * comes online, only `provider.ts` changes — callers never do.
 */

export { summarizeLead } from "./summary";
export { suggestFollowUp } from "./follow-up";
export { analyzePipeline } from "./pipeline";
export type {
  AiProvider,
  LeadSummary,
  FollowUpSuggestion,
  PipelineInsight,
  LeadSnapshot,
  PipelineSnapshot,
} from "./types";
