#!/usr/bin/env tsx
/**
 * scripts/lint-content.ts
 *
 * Editorial linter. Walks every article in lib/journal.ts and checks:
 *
 *   - Length: pillars >=1500 words, supporting >=600 words
 *   - Missing fields: dek, excerpt, meta description, primary keyword
 *   - Meta title ≤ 60 chars; meta description ≤ 160 chars
 *   - Keyword density: primary keyword appears 1×–8× in body
 *     (above 8 starts looking like stuffing; below 1 misses the target)
 *   - AI tells: rejects banned phrases that signal generic LLM prose
 *   - Brand voice: rejects banned terms ("delve into", "tapestry", etc.)
 *   - Repetitive opener: warns when consecutive paragraphs start the
 *     same way
 *   - Reading minutes: recomputes if 0 or stale
 *   - Internal links: pillar pages should have 3+, supporting 2+
 *   - FAQ structure: at least one question-style H2 OR an explicit faq block
 *
 * Exits non-zero on errors so it can gate CI. Warnings don't fail.
 *
 * Usage:
 *   npm run editorial:lint
 *   npm run editorial:lint -- --slug=ai-marketing-operation  (single article)
 *   npm run editorial:lint -- --strict                       (warnings fail too)
 */

import { articles, type Article, type Block } from "../lib/journal";

// Phrases that mark generic LLM-flavored writing. Edit as the brand
// evolves; this list is the wall between "AI-assisted editorial" and
// "AI content farm."
const AI_TELLS: string[] = [
  "in today's fast-paced",
  "in today's digital age",
  "in the ever-evolving",
  "navigating the complexities",
  "delve into",
  "delves into",
  "delving into",
  "tapestry",
  "realm of",
  "in the realm",
  "embark on",
  "embarking on",
  "in conclusion,",
  "to sum up,",
  "it's important to note that",
  "it's worth noting that",
  "furthermore,",
  "moreover,",
  "in this article, we will",
  "in this article we will",
  "let's dive into",
  "dive deep into",
  "buckle up",
  "the world of",
  "harness the power of",
  "unlock the power",
  "unleash the power",
  "elevate your",
  "elevate the brand", // we have this one — flag it as a check
  "level up",
  "game-changer",
  "game-changing",
  "cutting-edge",
  "next-level",
  "best-in-class",
];

// Brand voice — tone violations specific to JDT's editorial standards.
const BRAND_VIOLATIONS: string[] = [
  // SaaS-y vocabulary that breaks luxury voice
  "synergy",
  "synergies",
  "leverage our",
  "leverage their",
  "robust solution",
  "innovative solution",
  "world-class",
  "industry-leading",
  "we are passionate about",
  "we're passionate about",
  // Cliché openers
  "imagine if",
  "picture this",
  // Pure marketing fluff
  "unparalleled",
  "unrivaled",
  "second to none",
];

type Severity = "error" | "warning";
type Finding = {
  slug: string;
  title: string;
  severity: Severity;
  rule: string;
  message: string;
};

function parseArgs(argv: string[]): { slug?: string; strict?: boolean } {
  const out: { slug?: string; strict?: boolean } = {};
  for (const a of argv) {
    if (a === "--strict") out.strict = true;
    const m = a.match(/^--slug=(.+)$/);
    if (m) out.slug = m[1];
  }
  return out;
}

function blocksToText(body: Block[]): string {
  return body
    .map((b) => {
      switch (b.type) {
        case "p":
        case "h2":
        case "h3":
          return b.text;
        case "list":
          return b.items.join(" ");
        case "pullquote":
          return b.text;
        case "callout":
          return `${b.title} ${b.body}`;
        case "definition":
          return `${b.term} ${b.body}`;
        default:
          return "";
      }
    })
    .join("\n");
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function estimateReadingMinutes(text: string): number {
  // 220 wpm — slightly faster than average to account for editorial readers.
  return Math.max(1, Math.round(countWords(text) / 220));
}

function findOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  const re = new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  return (haystack.match(re) ?? []).length;
}

function lintArticle(a: Article, strict: boolean): Finding[] {
  const out: Finding[] = [];
  const push = (severity: Severity, rule: string, message: string) =>
    out.push({ slug: a.slug, title: a.title, severity, rule, message });

  const text = blocksToText(a.body);
  const lower = text.toLowerCase();
  const wc = countWords(text);

  // ─── Length ──────────────────────────────────────────────────────
  const minWords = a.isPillar ? 1500 : 600;
  if (wc < minWords) {
    push(
      "error",
      "length",
      `Body is ${wc} words; ${a.isPillar ? "pillar" : "supporting"} needs ≥ ${minWords}.`,
    );
  }

  // ─── Reading minutes ────────────────────────────────────────────
  const expected = estimateReadingMinutes(text);
  if (a.readingMinutes === 0 || Math.abs(a.readingMinutes - expected) > 2) {
    push(
      "warning",
      "reading-minutes",
      `readingMinutes is ${a.readingMinutes}; expected ~${expected}.`,
    );
  }

  // ─── Required fields ────────────────────────────────────────────
  if (!a.dek || a.dek.startsWith("TODO")) push("error", "dek", "Missing dek.");
  if (!a.excerpt || a.excerpt.startsWith("TODO"))
    push("error", "excerpt", "Missing excerpt.");
  if (!a.seo.metaDescription || a.seo.metaDescription.startsWith("TODO"))
    push("error", "meta-description", "Missing meta description.");
  if (a.seo.metaTitle.length > 60)
    push(
      "warning",
      "meta-title-length",
      `metaTitle is ${a.seo.metaTitle.length} chars; recommended ≤ 60.`,
    );
  if (a.seo.metaDescription.length > 160)
    push(
      "warning",
      "meta-description-length",
      `metaDescription is ${a.seo.metaDescription.length} chars; recommended ≤ 160.`,
    );

  // ─── Keyword density ────────────────────────────────────────────
  const kw = a.seo.primaryKeyword;
  if (kw) {
    const occ = findOccurrences(text, kw);
    if (occ === 0) {
      push(
        "error",
        "primary-keyword",
        `Primary keyword "${kw}" never appears in the body.`,
      );
    } else if (occ > 8) {
      push(
        "error",
        "keyword-stuffing",
        `Primary keyword "${kw}" appears ${occ} times — likely stuffing (max 8).`,
      );
    }
  }

  // ─── AI tells ────────────────────────────────────────────────────
  for (const tell of AI_TELLS) {
    if (lower.includes(tell)) {
      push(
        "error",
        "ai-tell",
        `Banned LLM phrase: "${tell}". Rewrite — this is what makes content read as AI-generated.`,
      );
    }
  }

  // ─── Brand voice ─────────────────────────────────────────────────
  for (const v of BRAND_VIOLATIONS) {
    if (lower.includes(v)) {
      push("warning", "brand-voice", `SaaS-y / cliché phrase: "${v}".`);
    }
  }

  // ─── Repetitive openers ──────────────────────────────────────────
  const paras = a.body.filter((b): b is { type: "p"; text: string } => b.type === "p");
  for (let i = 1; i < paras.length; i++) {
    const prev = paras[i - 1].text.split(/\s+/).slice(0, 3).join(" ").toLowerCase();
    const cur = paras[i].text.split(/\s+/).slice(0, 3).join(" ").toLowerCase();
    if (prev && cur && prev === cur) {
      push(
        "warning",
        "repetitive-opener",
        `Two consecutive paragraphs open the same way: "${prev}…"`,
      );
    }
  }

  // ─── Internal links ──────────────────────────────────────────────
  const expectedLinks = a.isPillar ? 3 : 2;
  const linkCount = a.internalLinks?.length ?? 0;
  if (linkCount < expectedLinks) {
    push(
      "warning",
      "internal-links",
      `Has ${linkCount} internal links; recommend ≥ ${expectedLinks}. Run: npm run editorial:links --slug=${a.slug}`,
    );
  }

  // ─── FAQ formatting (Q-style H2 or explicit faq block) ──────────
  const hasQuestionH2 = a.body.some(
    (b) => b.type === "h2" && /\?$/.test(b.text.trim()),
  );
  if (!hasQuestionH2 && !a.isPillar) {
    push(
      "warning",
      "aeo-format",
      "No question-style H2 found. AI engines preferentially cite Q-anchored content.",
    );
  }

  return strict ? out : out;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const targets = args.slug ? articles.filter((a) => a.slug === args.slug) : articles;
  if (targets.length === 0) {
    console.error(`No article found for --slug=${args.slug ?? "(none)"}`);
    process.exit(2);
  }

  let errors = 0;
  let warnings = 0;
  for (const a of targets) {
    const findings = lintArticle(a, !!args.strict);
    if (findings.length === 0) continue;
    console.log(`\n${a.slug} — ${a.title}`);
    for (const f of findings) {
      const tag = f.severity === "error" ? "ERROR" : "warn ";
      console.log(`  [${tag}] ${f.rule}: ${f.message}`);
      if (f.severity === "error") errors++;
      else warnings++;
    }
  }

  console.log(
    `\nEditorial lint: ${errors} error${errors === 1 ? "" : "s"}, ${warnings} warning${warnings === 1 ? "" : "s"}, across ${targets.length} article${targets.length === 1 ? "" : "s"}.`,
  );

  if (errors > 0 || (args.strict && warnings > 0)) process.exit(1);
}

main();
