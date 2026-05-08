#!/usr/bin/env tsx
/**
 * scripts/new-article.ts
 *
 * Editorial scaffolding CLI. Given a topic + slug + intent, prints a
 * fully-typed Article skeleton ready to paste into lib/journal.ts.
 *
 * The goal is to compress the boilerplate, NOT to produce content.
 * Every field is structured but empty — a writer fills in the body
 * blocks, the editorial review catches voice issues, the linter
 * catches mechanical issues.
 *
 * Usage:
 *   npm run editorial:new -- --slug=meta-ads-creative-testing \
 *     --topic=meta-ads --kind=supporting --title="..." \
 *     --keyword="meta ads creative testing"
 *
 *   With a brief file (preferred — keeps inputs reviewable):
 *   npm run editorial:new -- --brief=./editorial/briefs/some-topic.json
 *
 * Brief schema:
 *   {
 *     "slug": "meta-ads-creative-testing",
 *     "topic": "meta-ads",
 *     "kind": "supporting",
 *     "title": "How to build a creative testing matrix that compounds",
 *     "dek": "...",
 *     "primaryKeyword": "meta ads creative testing",
 *     "secondaryKeywords": ["..."]
 *   }
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

type Brief = {
  slug: string;
  topic: string;
  kind: "pillar" | "supporting";
  title: string;
  dek?: string;
  primaryKeyword: string;
  secondaryKeywords?: string[];
  tags?: string[];
};

function parseArgs(argv: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const arg of argv) {
    const m = arg.match(/^--([^=]+)=(.*)$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

function loadBrief(args: Record<string, string>): Brief {
  if (args.brief) {
    const path = resolve(process.cwd(), args.brief);
    const raw = readFileSync(path, "utf-8");
    return JSON.parse(raw) as Brief;
  }
  // Inline mode — quick scaffolds.
  if (!args.slug || !args.topic || !args.title || !args.keyword) {
    console.error(
      "Missing required args. Use --brief=path.json OR provide " +
        "--slug --topic --title --keyword (and optional --kind, --dek).",
    );
    process.exit(2);
  }
  return {
    slug: args.slug,
    topic: args.topic,
    kind: (args.kind as Brief["kind"]) ?? "supporting",
    title: args.title,
    dek: args.dek,
    primaryKeyword: args.keyword,
    secondaryKeywords: args.secondary
      ? args.secondary.split(",").map((s) => s.trim())
      : [],
    tags: args.tags ? args.tags.split(",").map((s) => s.trim()) : [],
  };
}

function metaTitleFor(title: string): string {
  // Reasonable default — clip + brand suffix. Editor refines.
  const suffix = " — JDT Inc.";
  const room = 60 - suffix.length;
  const clipped = title.length > room ? title.slice(0, room - 1) + "…" : title;
  return clipped + suffix;
}

function escapeForTS(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function scaffold(brief: Brief): string {
  const today = new Date().toISOString().slice(0, 10);
  const isPillar = brief.kind === "pillar";
  const dek =
    brief.dek ??
    "TODO: write the dek — one line that previews the article's argument.";
  const tags = brief.tags?.length
    ? brief.tags.map((t) => `"${t}"`).join(", ")
    : `"${brief.topic}"`;
  const secondary = (brief.secondaryKeywords ?? [])
    .map((k) => `      "${k}",`)
    .join("\n");

  return `  // ─────────────────────────────────────────────────────────────────
  // ${brief.title}
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "${brief.slug}",
    title: "${escapeForTS(brief.title)}",
    dek: "${escapeForTS(dek)}",
    topic: "${brief.topic}",${isPillar ? "\n    isPillar: true," : ""}
    status: "draft",
    publishedAt: "${today}",
    readingMinutes: 0, // updated by lint after body is filled
    tags: [${tags}],
    excerpt:
      "TODO: 1-2 sentence excerpt — used in cards, OG, RSS.",
    seo: {
      metaTitle: "${escapeForTS(metaTitleFor(brief.title))}",
      metaDescription:
        "TODO: 150–160 character meta description anchored on the primary keyword.",
      primaryKeyword: "${brief.primaryKeyword}",
      secondaryKeywords: [
${secondary}
    ],
    },
    body: [
      { type: "p", text: "TODO: opening paragraph. Set up the argument. Avoid 'In today's fast-paced world.'" },
      { type: "h2", text: "TODO: section heading", id: "section-1" },
      { type: "p", text: "TODO: body." },
      // ${isPillar ? "Pillar: aim for 1500–2500 words. Add callouts, pullquote, lists." : "Supporting: aim for 800–1500 words."}
    ],
    internalLinks: [
      // { href: "/services/...", label: "..." },
      // { href: "/journal/topics/${brief.topic}", label: "More on ${brief.topic}" },
    ],
    cta: {
      eyebrow: "Engage",
      title: "TODO: article-specific CTA headline",
      body: "TODO: article-specific CTA body. Tie to the article's topic.",
      primary: { label: "Book a strategy call", href: "/contact" },
      secondary: { label: "See the work", href: "/work" },
    },
  },
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const brief = loadBrief(args);
  const code = scaffold(brief);
  console.log("\n// ─── Append the following inside the `articles` array");
  console.log("// ─── of lib/journal.ts (before the closing `];`):\n");
  console.log(code);
  console.log("\n// Next steps:");
  console.log("//   1. Paste the block into lib/journal.ts");
  console.log("//   2. Fill in body blocks, dek, excerpt, meta description");
  console.log("//   3. Run: npm run editorial:lint");
  console.log("//   4. Run: npm run editorial:links");
  console.log(
    "//   5. Set status: 'published' (or 'scheduled' + publishAt) when ready",
  );
}

main();
