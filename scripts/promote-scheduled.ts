#!/usr/bin/env tsx
/**
 * scripts/promote-scheduled.ts
 *
 * Run by .github/workflows/scheduled-publish.yml on a daily cron.
 *
 * Walks lib/journal.ts and promotes any article whose:
 *   - status === "scheduled"
 *   - publishAt (or publishedAt fallback) <= now
 *
 * to status === "published". Modifies the file in-place; the workflow
 * commits the change to a branch and opens a PR.
 *
 * Outputs a markdown bullet list of promoted articles to stdout — the
 * workflow uses that as the PR body.
 *
 * NOTE: This is a string-replacement edit on the source file, not an
 * AST rewrite. We deliberately keep it simple — the file is line-
 * oriented data, and any edge case ought to be reviewed by a human
 * via the PR anyway. If lib/journal.ts ever gains exotic formatting,
 * upgrade to ts-morph.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { articles } from "../lib/journal";

const JOURNAL_PATH = resolve(process.cwd(), "lib/journal.ts");

function shouldPromote(a: (typeof articles)[number], now: Date): boolean {
  if (a.status !== "scheduled") return false;
  const target = a.publishAt ?? a.publishedAt;
  return new Date(target).getTime() <= now.getTime();
}

function promoteInSource(source: string, slug: string): string {
  // Find the article block by slug, then flip its status. We anchor on
  // `slug: "<slug>"` and look forward up to ~40 lines for the status
  // line — the data file's article blocks are well under that height.
  const slugPattern = new RegExp(`slug:\\s*"${slug}"`);
  const slugIdx = source.search(slugPattern);
  if (slugIdx === -1) return source;

  // Window of source after the slug line.
  const tail = source.slice(slugIdx);
  const statusPattern = /status:\s*"scheduled"/;
  const localIdx = tail.search(statusPattern);
  if (localIdx === -1) return source;

  const before = source.slice(0, slugIdx + localIdx);
  const after = source
    .slice(slugIdx + localIdx)
    .replace(statusPattern, 'status: "published"');
  return before + after;
}

function main() {
  const now = new Date();
  const due = articles.filter((a) => shouldPromote(a, now));
  if (due.length === 0) {
    // Empty stdout signals "no changes" to the workflow.
    return;
  }

  let source = readFileSync(JOURNAL_PATH, "utf-8");
  const promoted: string[] = [];

  for (const a of due) {
    const next = promoteInSource(source, a.slug);
    if (next !== source) {
      source = next;
      promoted.push(`- **${a.title}** — \`/journal/${a.slug}\``);
    }
  }

  if (promoted.length > 0) {
    writeFileSync(JOURNAL_PATH, source, "utf-8");
    console.log("Promoted articles:\n");
    console.log(promoted.join("\n"));
  }
}

main();
