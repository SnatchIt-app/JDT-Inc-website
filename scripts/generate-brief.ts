#!/usr/bin/env tsx
/**
 * scripts/generate-brief.ts
 *
 * Calls Claude to produce a structured brief.json for the next article
 * to write. Picks the highest-priority gap from analyze-gaps unless
 * --topic and --kind are passed explicitly.
 *
 * Output: writes editorial/briefs/<slug>.json and prints the path.
 *
 * Usage:
 *   npm run editorial:brief                       (auto-pick top gap)
 *   npm run editorial:brief -- --topic=meta-ads --kind=supporting
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { articles, topics, type TopicSlug } from "../lib/journal";
import { callClaudeWithTool } from "../lib/anthropic-client";

type Brief = {
  slug: string;
  topic: TopicSlug;
  kind: "pillar" | "supporting";
  title: string;
  dek: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  tags: string[];
  argument: string;
};

function parseArgs(argv: string[]) {
  const out: { topic?: string; kind?: string } = {};
  for (const a of argv) {
    const tm = a.match(/^--topic=(.+)$/);
    const km = a.match(/^--kind=(.+)$/);
    if (tm) out.topic = tm[1];
    if (km) out.kind = km[1];
  }
  return out;
}

async function pickGap(args: { topic?: string; kind?: string }) {
  if (args.topic && args.kind) {
    return {
      topic: args.topic as TopicSlug,
      kind: args.kind as "pillar" | "supporting",
    };
  }
  // Inline gap analysis (avoids spawning analyze-gaps).
  const COMMERCIAL_WEIGHT: Record<string, number> = {
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
  const candidates: { topic: TopicSlug; kind: "pillar" | "supporting"; priority: number }[] =
    [];
  for (const t of topics) {
    const inTopic = articles.filter((a) => a.topic === t.slug);
    const hasPillar = inTopic.some((a) => a.isPillar);
    const supportingCount = inTopic.filter((a) => !a.isPillar).length;
    const w = COMMERCIAL_WEIGHT[t.slug] ?? 5;
    if (!hasPillar)
      candidates.push({ topic: t.slug, kind: "pillar", priority: 100 + w });
    else if (supportingCount < 4)
      candidates.push({
        topic: t.slug,
        kind: "supporting",
        priority: 50 + w + (4 - supportingCount),
      });
  }
  candidates.sort((a, b) => b.priority - a.priority);
  if (candidates.length === 0) {
    throw new Error("No content gaps. Cluster blueprint is full.");
  }
  return { topic: candidates[0].topic, kind: candidates[0].kind };
}

const SYSTEM_PROMPT = `You are the editorial director for JDT Inc., a Miami-based AI-powered marketing agency. Your job: propose the next article in the agency's Journal, given a topic cluster and kind (pillar or supporting).

Your output is a brief — not the article. The brief is a structured argument for why this specific article should exist now.

Brief criteria:
- Title is editorial, opinionated, specific. Not "10 tips" or "ultimate guide."
- Primary keyword maps to real search intent for the agency's verticals.
- Argument names the position the article will take — not just the topic.
- Voice anchors: "senior operators," "compounding," "engineered," "in production."

Avoid: "elevate," "unlock," "harness," "delve into," "ultimate guide," "best practices," "tips and tricks."

Existing JDT topics: AI Marketing, Performance Marketing, Meta Ads, Google Ads, AI Automation, Funnel Optimization, Creative Strategy, Luxury Brand Marketing, Miami Marketing, AEO/GEO.

Existing JDT services: Meta Ads, Google Ads, AI Automation, Content Production, Creative Direction, Lead Generation, CRM Systems, Funnel Optimization.

Existing pillar in AI Marketing: "What AI actually changes about running a marketing operation." Do not duplicate angles.

Output: call the emit_brief tool with a complete brief.`;

const TOOL_SCHEMA = {
  name: "emit_brief",
  description: "Emit a structured brief for the next Journal article.",
  input_schema: {
    type: "object",
    required: [
      "slug",
      "topic",
      "kind",
      "title",
      "dek",
      "primaryKeyword",
      "secondaryKeywords",
      "tags",
      "argument",
    ],
    properties: {
      slug: {
        type: "string",
        description: "kebab-case slug, max 60 chars, no leading/trailing dashes",
      },
      topic: {
        type: "string",
        enum: topics.map((t) => t.slug),
      },
      kind: { type: "string", enum: ["pillar", "supporting"] },
      title: { type: "string", description: "60–90 char editorial title" },
      dek: {
        type: "string",
        description: "1-line lede previewing the article's argument",
      },
      primaryKeyword: { type: "string" },
      secondaryKeywords: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 6,
      },
      tags: {
        type: "array",
        items: { type: "string" },
        minItems: 1,
        maxItems: 5,
      },
      argument: {
        type: "string",
        description: "2–3 sentence statement of the position this article takes",
      },
    },
  },
};

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const gap = await pickGap(args);

  const topic = topics.find((t) => t.slug === gap.topic)!;
  const inTopic = articles.filter((a) => a.topic === topic.slug);
  const existingTitles = inTopic.map((a) => `- ${a.title}`).join("\n") || "(none)";

  const userPrompt = `Topic cluster: ${topic.name} (slug: ${topic.slug})
Kind needed: ${gap.kind}
Cluster description: ${topic.description}
Cluster primary keyword: ${topic.primaryKeyword}

Already published in this cluster:
${existingTitles}

Propose the next article. Avoid overlap with what's already published. Take a clear position.`;

  const result = await callClaudeWithTool<Brief>({
    system: SYSTEM_PROMPT,
    user: userPrompt,
    tool: TOOL_SCHEMA,
    maxTokens: 2000,
  });

  const brief = result.input;
  const dir = resolve(process.cwd(), "editorial/briefs");
  mkdirSync(dir, { recursive: true });
  const path = resolve(dir, `${brief.slug}.json`);
  writeFileSync(path, JSON.stringify(brief, null, 2) + "\n", "utf-8");
  console.log(path);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
