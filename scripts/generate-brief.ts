#!/usr/bin/env tsx
/**
 * scripts/generate-brief.ts — DISABLED
 *
 * The autonomous AI brief-generation step has been retired. JDT Inc. has
 * moved to a human-authored, Claude-cowork-assisted editorial workflow.
 * Articles are now written and reviewed by a person before publishing.
 *
 * The original Claude-powered brief generator is preserved in git history
 * (see the commit that disabled the autonomous pipeline) if it ever needs
 * to be restored.
 *
 * To plan the next article manually:
 *   1. npm run editorial:gaps        # see which clusters need coverage
 *   2. npm run editorial:new         # scaffold a new article entry
 *   3. Write/edit the article in lib/journal.ts (status: "draft")
 *   4. npm run editorial:lint        # validate voice + structure
 *   5. npm run editorial:links       # internal-link suggestions
 *   6. Open a PR; a human reviews and sets status to "published"/"scheduled"
 */

console.error(
  [
    "editorial:brief is disabled.",
    "Autonomous AI brief generation has been retired in favour of a",
    "human-authored, Claude-cowork-assisted workflow.",
    "",
    "Plan articles manually with: npm run editorial:gaps, editorial:new,",
    "editorial:lint, editorial:links. See docs/AUTONOMOUS.md.",
  ].join("\n"),
);
process.exit(1);
