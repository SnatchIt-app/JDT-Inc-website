#!/usr/bin/env tsx
/**
 * scripts/analyze-gaps.ts
 *
 * Topic-cluster gap analysis. Compares the published-articles state of
 * lib/journal.ts to the 10-cluster blueprint and surfaces what's
 * missing, prioritized for autonomous draft generation.
 *
 * Priority logic:
 *   1. Topics with no pillar yet → write the pillar first
 *   2. Topics with a pillar but <2 supporting → write supporting next
 *   3. Within each tier, prioritize commercial intent topics
 *
 * Output: JSON to stdout. Used by generate-brief.ts and the CI cron.
 *
 * Usage:
 *   npm run editorial:gaps
 *   npm run editorial:gaps -- --limit=5
 */

import { articles, topics, type TopicSlug } from "../lib/journal";

// Higher = higher priority. Roughly: closer to money keywords.
const COMMERCIAL_WEIGHT: Record<TopicSlug, number> = {
  "meta-ads": 10,
  "google-ads": 10,
  "ai-automation": 9,
  "ai-marketing": 9,
  "performance-marketing": 8,
  "funnel-optimization": 8,
  "creative-strategy": 6,
  "aeo-geo": 7,
  "miami-marketing": 6,
  "luxury-brand-marketing": 5,
};

type Gap = {
  topic: TopicSlug;
  topicName: string;
  kind: "pillar" | "supporting";
  /** Higher = write sooner. */
  priority: number;
  reason: string;
};

function buildGaps(): Gap[] {
  const out: Gap[] = [];
  for (const t of topics) {
    const inTopic = articles.filter((a) => a.topic === t.slug);
    const hasPillar = inTopic.some((a) => a.isPillar);
    const supportingCount = inTopic.filter((a) => !a.isPillar).length;
    const weight = COMMERCIAL_WEIGHT[t.slug] ?? 5;

    if (!hasPillar) {
      out.push({
        topic: t.slug,
        topicName: t.name,
        kind: "pillar",
        priority: 100 + weight, // pillars first
        reason: `No pillar published in ${t.name}.`,
      });
    } else if (supportingCount < 4) {
      out.push({
        topic: t.slug,
        topicName: t.name,
        kind: "supporting",
        priority: 50 + weight + (4 - supportingCount), // closer to full = lower
        reason: `Only ${supportingCount}/4 supporting articles in ${t.name}.`,
      });
    }
  }
  return out.sort((a, b) => b.priority - a.priority);
}

function parseArgs(argv: string[]) {
  const out: { limit?: number } = {};
  for (const a of argv) {
    const m = a.match(/^--limit=(\d+)$/);
    if (m) out.limit = Number(m[1]);
  }
  return out;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const gaps = buildGaps();
  const sliced = args.limit ? gaps.slice(0, args.limit) : gaps;
  console.log(JSON.stringify(sliced, null, 2));
}

main();
