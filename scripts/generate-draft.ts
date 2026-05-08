#!/usr/bin/env tsx
/**
 * scripts/generate-draft.ts
 *
 * Calls Claude to produce a complete Article from a brief, then
 * appends it to lib/journal.ts as status: "draft".
 *
 * The brand voice contract lives in editorial/voice-reference.md and
 * is loaded into the system prompt at runtime. Edit that file (not
 * this script) to evolve the voice.
 *
 * Usage:
 *   npm run editorial:draft -- --brief=editorial/briefs/<slug>.json
 *
 * Exit codes:
 *   0 — draft appended to lib/journal.ts
 *   1 — Claude API error
 *   2 — usage / file not found
 *   3 — model emitted an article that fails structural validation
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { callClaudeWithTool } from "../lib/anthropic-client";
import { topics, type Article, type TopicSlug } from "../lib/journal";

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

const JOURNAL_PATH = resolve(process.cwd(), "lib/journal.ts");
const VOICE_PATH = resolve(process.cwd(), "editorial/voice-reference.md");

function parseArgs(argv: string[]) {
  const out: { brief?: string } = {};
  for (const a of argv) {
    const m = a.match(/^--brief=(.+)$/);
    if (m) out.brief = m[1];
  }
  return out;
}

function loadBrief(path: string): Brief {
  const raw = readFileSync(resolve(process.cwd(), path), "utf-8");
  return JSON.parse(raw) as Brief;
}

function buildSystemPrompt(): string {
  const voice = readFileSync(VOICE_PATH, "utf-8");
  return `You are the senior staff writer for JDT Inc.'s Journal. You write field notes from inside production — like the agency's most senior strategist publishing under their own byline.

Below is the voice contract. Adhere to it without exception.

---

${voice}

---

Output: call the emit_article tool with a complete article object. The body must be structured blocks only — no Markdown, no HTML, no inline formatting.

Length: pillars 1500–2500 words; supporting 800–1500 words. Count carefully.

Internal links: include 2–3 in the internalLinks array, pointing at /services/<slug>, /journal/topics/<topic>, or /locations/miami where natural.

CTA: write article-specific copy that ties back to the article's argument.`;
}

const BLOCK_SCHEMA = {
  oneOf: [
    {
      type: "object",
      required: ["type", "text"],
      properties: {
        type: { const: "p" },
        text: { type: "string" },
      },
    },
    {
      type: "object",
      required: ["type", "text"],
      properties: {
        type: { const: "h2" },
        text: { type: "string" },
        id: { type: "string" },
      },
    },
    {
      type: "object",
      required: ["type", "text"],
      properties: {
        type: { const: "h3" },
        text: { type: "string" },
        id: { type: "string" },
      },
    },
    {
      type: "object",
      required: ["type", "items"],
      properties: {
        type: { const: "list" },
        items: { type: "array", items: { type: "string" } },
        ordered: { type: "boolean" },
      },
    },
    {
      type: "object",
      required: ["type", "text"],
      properties: {
        type: { const: "pullquote" },
        text: { type: "string" },
        attribution: { type: "string" },
      },
    },
    {
      type: "object",
      required: ["type", "title", "body"],
      properties: {
        type: { const: "callout" },
        title: { type: "string" },
        body: { type: "string" },
      },
    },
    {
      type: "object",
      required: ["type", "term", "body"],
      properties: {
        type: { const: "definition" },
        term: { type: "string" },
        body: { type: "string" },
      },
    },
    {
      type: "object",
      required: ["type"],
      properties: { type: { const: "divider" } },
    },
  ],
};

const TOOL_SCHEMA = {
  name: "emit_article",
  description: "Emit a complete Journal article object.",
  input_schema: {
    type: "object",
    required: [
      "slug",
      "title",
      "dek",
      "topic",
      "isPillar",
      "tags",
      "excerpt",
      "readingMinutes",
      "seo",
      "body",
      "internalLinks",
      "cta",
    ],
    properties: {
      slug: { type: "string" },
      title: { type: "string" },
      dek: { type: "string" },
      topic: { type: "string", enum: topics.map((t) => t.slug) },
      isPillar: { type: "boolean" },
      tags: { type: "array", items: { type: "string" } },
      excerpt: { type: "string" },
      readingMinutes: { type: "number" },
      seo: {
        type: "object",
        required: [
          "metaTitle",
          "metaDescription",
          "primaryKeyword",
          "secondaryKeywords",
        ],
        properties: {
          metaTitle: { type: "string", maxLength: 70 },
          metaDescription: { type: "string", maxLength: 170 },
          primaryKeyword: { type: "string" },
          secondaryKeywords: { type: "array", items: { type: "string" } },
        },
      },
      body: {
        type: "array",
        items: BLOCK_SCHEMA,
        minItems: 12,
      },
      internalLinks: {
        type: "array",
        items: {
          type: "object",
          required: ["href", "label"],
          properties: {
            href: { type: "string" },
            label: { type: "string" },
          },
        },
      },
      cta: {
        type: "object",
        required: ["eyebrow", "title", "body", "primary"],
        properties: {
          eyebrow: { type: "string" },
          title: { type: "string" },
          body: { type: "string" },
          primary: {
            type: "object",
            required: ["label", "href"],
            properties: {
              label: { type: "string" },
              href: { type: "string" },
            },
          },
          secondary: {
            type: "object",
            required: ["label", "href"],
            properties: {
              label: { type: "string" },
              href: { type: "string" },
            },
          },
        },
      },
    },
  },
};

function buildUserPrompt(brief: Brief): string {
  return `Write the following article.

Title: ${brief.title}
Dek: ${brief.dek}
Topic cluster: ${brief.topic}
Kind: ${brief.kind} (${brief.kind === "pillar" ? "1500–2500 words" : "800–1500 words"})
Primary keyword: ${brief.primaryKeyword}
Secondary keywords (work in naturally, do not list): ${brief.secondaryKeywords.join(", ")}
Tags: ${brief.tags.join(", ")}

Argument the article must take:
${brief.argument}

Write the full body now. Set isPillar accordingly. readingMinutes ≈ word count / 220.`;
}

function articleToTSBlock(a: Article): string {
  // Serialize a generated Article object to a TS literal block for
  // appending into lib/journal.ts. JSON.stringify gets us 95% there;
  // we just emit it as a JS-compatible object literal.
  const json = JSON.stringify(a, null, 4);
  // Indent two extra spaces so it nests cleanly inside the array.
  const indented = json
    .split("\n")
    .map((l) => "  " + l)
    .join("\n");
  // Convert opening `{` to a comment + opening so future readers know
  // this was generated.
  const banner = `\n  // ─── Auto-generated draft (status: "draft"). Review before merging.\n`;
  return banner + indented + ",\n";
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.brief) {
    console.error("Missing --brief=editorial/briefs/<slug>.json");
    process.exit(2);
  }

  const brief = loadBrief(args.brief);
  const today = new Date().toISOString().slice(0, 10);

  const result = await callClaudeWithTool<Article>({
    system: buildSystemPrompt(),
    user: buildUserPrompt(brief),
    tool: TOOL_SCHEMA,
    maxTokens: 12000,
  });

  // Stamp the lifecycle fields the model isn't responsible for.
  const article: Article = {
    ...result.input,
    status: "draft",
    publishedAt: today,
  };

  // Structural sanity — fail loud rather than ship a broken Article.
  if (!Array.isArray(article.body) || article.body.length < 8) {
    console.error("Article body too short or malformed.");
    console.error(JSON.stringify(article, null, 2));
    process.exit(3);
  }

  const source = readFileSync(JOURNAL_PATH, "utf-8");
  const closeIdx = source.lastIndexOf("];");
  if (closeIdx === -1) {
    console.error("Could not locate `articles` array close in lib/journal.ts.");
    process.exit(3);
  }

  const next =
    source.slice(0, closeIdx) +
    articleToTSBlock(article) +
    source.slice(closeIdx);

  writeFileSync(JOURNAL_PATH, next, "utf-8");

  console.log(`Draft appended to lib/journal.ts: ${article.slug}`);
  console.log(`Topic: ${article.topic} · Pillar: ${article.isPillar ? "yes" : "no"}`);
  console.log(`Body blocks: ${article.body.length} · Reading minutes: ${article.readingMinutes}`);
  console.log(`Next: npm run editorial:lint -- --slug=${article.slug}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
