/**
 * ARTICLE TEMPLATE — copy/paste reference
 * ---------------------------------------------------------------
 * To add a new article without running the CLI:
 *
 *   1. Copy the object literal below (between the BEGIN/END markers).
 *   2. Paste it inside the `articles` array in `lib/journal.ts`,
 *      before the closing `];`.
 *   3. Fill in every field marked TODO.
 *   4. Run: npm run editorial:lint
 *   5. Run: npm run editorial:links -- --slug=<your-slug>
 *   6. Set status: "published" (or "scheduled" + publishAt) when ready.
 *   7. Commit + PR. CI runs typecheck + lint + editorial-linter.
 *
 * For the CLI path instead, see: scripts/new-article.ts
 * Full editorial workflow: docs/EDITORIAL.md
 *
 * This file is reference-only; it is not imported anywhere and does
 * not ship to production.
 * ---------------------------------------------------------------
 */

import type { Article } from "../lib/journal";

// ─── BEGIN COPY ───────────────────────────────────────────────────
export const articleTemplate: Article = {
  slug: "TODO-slug-kebab-case",
  title: "TODO: full editorial title",
  dek: "TODO: one-line lede that previews the article's argument.",
  topic: "ai-marketing", // one of TopicSlug — see lib/journal.ts
  // isPillar: true,    // uncomment for pillar articles
  status: "draft", // "draft" | "scheduled" | "published"
  // publishAt: "2026-06-15T13:00:00Z", // required when status === "scheduled"
  publishedAt: "2026-05-07", // ISO date — used for sort order + RSS pubDate
  readingMinutes: 0, // updated by lint after the body is filled
  tags: ["TODO"],
  excerpt:
    "TODO: 1–2 sentence excerpt — used in cards, OG, RSS. Make it work standalone.",
  seo: {
    metaTitle: "TODO: ≤60 chars — JDT Inc.",
    metaDescription:
      "TODO: 150–160 character meta description anchored on the primary keyword. Reads as a self-contained summary.",
    primaryKeyword: "TODO primary keyword",
    secondaryKeywords: ["TODO", "TODO", "TODO"],
  },
  body: [
    {
      type: "p",
      text: "TODO: opening paragraph. Set up the argument in the first 60 words. Avoid 'In today's fast-paced world.'",
    },
    { type: "h2", text: "TODO: section heading", id: "section-1" },
    { type: "p", text: "TODO: body." },
    // Block types available:
    //   { type: "p", text: "..." }
    //   { type: "h2", text: "...", id: "..." }
    //   { type: "h3", text: "..." }
    //   { type: "list", items: ["...", "..."], ordered?: true }
    //   { type: "pullquote", text: "...", attribution?: "..." }
    //   { type: "callout", title: "...", body: "..." }
    //   { type: "definition", term: "...", body: "..." }
    //   { type: "divider" }
    //
    // Length targets: pillar 1500–2500 words, supporting 800–1500 words.
    // The linter (npm run editorial:lint) enforces both.
  ],
  internalLinks: [
    // { href: "/services/<service-slug>", label: "..." },
    // { href: "/journal/topics/<topic-slug>", label: "More on …" },
    // Run `npm run editorial:links -- --slug=<your-slug>` for suggestions.
  ],
  cta: {
    eyebrow: "Engage",
    title: "TODO: article-specific CTA headline",
    body: "TODO: tie the CTA back to the article's argument so the close earns the click.",
    primary: { label: "Book a strategy call", href: "/contact" },
    secondary: { label: "See the work", href: "/work" },
  },
};
// ─── END COPY ─────────────────────────────────────────────────────
