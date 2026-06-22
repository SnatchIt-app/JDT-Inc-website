#!/usr/bin/env tsx
/**
 * scripts/generate-draft.ts — DISABLED
 *
 * The autonomous AI draft-generation step has been retired. This script
 * used to call Claude and append a generated Article to lib/journal.ts as
 * status: "draft". That auto-creation of content is no longer permitted.
 *
 * JDT Inc. now uses a human-authored, Claude-cowork-assisted editorial
 * workflow: a person writes the article, runs the editorial linter, and
 * opens a PR for review before anything is published.
 *
 * The original Claude-powered draft generator is preserved in git history
 * (see the commit that disabled the autonomous pipeline) if it ever needs
 * to be restored.
 *
 * To add an article manually:
 *   1. npm run editorial:new         # scaffold a new entry
 *   2. Write the article body in lib/journal.ts (status: "draft")
 *   3. npm run editorial:lint        # validate voice + structure
 *   4. npm run editorial:links       # internal-link suggestions
 *   5. Open a PR; a human reviewer sets status to "published"/"scheduled"
 */

console.error(
  [
    "editorial:draft is disabled.",
    "Autonomous AI draft generation (auto-appending articles to",
    "lib/journal.ts) has been retired. Write articles by hand instead.",
    "",
    "See docs/AUTONOMOUS.md for the manual, human-reviewed workflow.",
  ].join("\n"),
);
process.exit(1);
