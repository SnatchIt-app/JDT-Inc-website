# Editorial workflow

The JDT Journal is published through a structured pipeline. AI handles the
mechanics — scaffolding, link suggestions, metadata generation, scheduling.
Humans handle the writing, taste, and the final review. Every article passes
through both.

## The pipeline

```
brief.json → scaffold → human writes → lint → link suggestions
                                                      ↓
                                             reviewer + scheduling
                                                      ↓
                                             commit + PR + CI gates
                                                      ↓
                                             merge → live (or scheduled)
                                                      ↓
                                             daily cron promotes scheduled
```

## Phases

### 1. Brief

Every article starts as a `brief.json`. The brief is a structured argument for
why this article should exist:

```json
{
  "slug": "meta-ads-creative-testing-matrix",
  "topic": "meta-ads",
  "kind": "supporting",
  "title": "How to build a creative testing matrix that compounds",
  "dek": "Most creative testing is whack-a-mole. Here's the structure that turns variant volume into compounding learning.",
  "primaryKeyword": "meta ads creative testing",
  "secondaryKeywords": [
    "creative testing matrix",
    "meta ads creative variants",
    "facebook ads creative testing"
  ],
  "tags": ["Meta Ads", "Creative testing", "Field notes"]
}
```

The brief can come from a human, from an AI assistant (Claude, ChatGPT) used
in a separate session, or from research surfaced by tooling — whatever the
source, the file format is the same.

### 2. Scaffold

```bash
npm run editorial:new -- --brief=editorial/briefs/your-brief.json
```

The script prints a fully-typed `Article` skeleton ready to paste into
`lib/journal.ts`. Every required field is present; every optional field is
hinted with a TODO comment. Status defaults to `"draft"` so the article is
invisible until we explicitly promote it.

### 3. Write

Open `lib/journal.ts`, find the new article, and fill in the body. The block
model enforces editorial discipline:

- `p` for paragraphs (max ~120 words per block — keeps reads scannable)
- `h2` / `h3` for section heads (use questions when possible — AI engines
  preferentially cite Q-anchored content)
- `list` for ordered or unordered lists
- `pullquote` for one-line emphasis
- `callout` for asides and warnings
- `definition` for inline glossary
- `divider` between long sections

Length targets:
- Pillar articles: 1,500–2,500 words
- Supporting articles: 800–1,500 words

### 4. Lint

```bash
npm run editorial:lint
# or for a single article:
npm run editorial:lint -- --slug=your-slug
```

The linter catches:
- Length issues (under target = error)
- Missing fields (dek, excerpt, meta description, primary keyword)
- Meta title > 60 chars / meta description > 160 chars (warning)
- Primary keyword absent from body (error) or appearing > 8 times (error —
  stuffing)
- AI tells: banned phrases like "delve into", "tapestry", "in today's
  fast-paced world" (error)
- Brand voice violations: "synergy", "world-class", "unparalleled" (warning)
- Repetitive paragraph openers (warning)
- Internal link count below threshold (warning)
- Missing FAQ-style H2 on supporting articles (warning)

CI runs the linter on every PR. Errors block merge.

### 5. Internal-link suggestions

```bash
npm run editorial:links -- --slug=your-slug
```

The suggester scans every article's body against every other site surface
(services, locations, neighborhoods, topic hubs) and proposes contextual
links. Output is Markdown — paste the relevant ones into the article's
`internalLinks` array, or work them into the body where the trigger phrase
appears.

The script never modifies article files. Human reviews; human inserts.

### 6. Schedule (optional)

If the article isn't shipping immediately, set:

```ts
status: "scheduled",
publishAt: "2026-06-15T13:00:00Z",
```

Drafts and scheduled-with-future-publishAt articles never appear in the
sitemap, RSS feed, journal index, topic hubs, or article URLs. They 404 in
production until the cron promotes them.

### 7. Commit + PR

Standard flow. PR opens against `main`. CI gates:

1. TypeScript typecheck
2. Next.js lint (accessibility, image optimization, etc.)
3. Editorial linter

Reviewer approves on copy quality. Merge.

### 8. Publish

If the article was `published`, the merge ships it. Vercel rebuilds within
~30 seconds, the sitemap and RSS feed regenerate, and the article is live.

If the article was `scheduled`, the daily cron at `13:00 UTC` checks every
scheduled post. Anything whose `publishAt` has passed gets flipped to
`published` — the cron commits the change to a branch and opens an
`editorial: promote scheduled articles` PR. A reviewer confirms and merges,
which is the actual publish event.

## What this system protects against

- **AI content farming.** Every article passes through a writer's keyboard.
  The linter blocks AI tells; the structured block model prevents pasting
  raw LLM HTML.
- **Keyword stuffing.** Density caps in the linter (max 8 occurrences of
  primary keyword) make spam detectable in CI.
- **Brand voice drift.** Banned-phrase list in the linter is the wall. As
  the brand evolves, edit `AI_TELLS` and `BRAND_VIOLATIONS` in
  `scripts/lint-content.ts`.
- **Topical authority leaks.** The link suggester ensures new articles
  connect into the existing topic graph, not float in isolation.
- **Premature publishing.** Drafts never leak to production. Scheduling
  requires explicit `status` and `publishAt`. The cron requires a PR
  approval before flipping.

## What this system doesn't replace

- **The writer.** Every article still has a human author who chose every
  sentence.
- **The editor.** PR review is where copy quality is judged. Tooling
  catches mechanical issues; humans catch editorial ones.
- **The strategist.** Topic selection, brief writing, and content-program
  prioritization are senior decisions. The tooling executes the program;
  it does not design it.

## Adding new quality gates

Edit `scripts/lint-content.ts`. Two arrays drive the linter:

- `AI_TELLS` — phrases that cause an error and block CI
- `BRAND_VIOLATIONS` — phrases that cause a warning

Add to either as patterns emerge. Keep the lists tight — a too-noisy linter
gets disabled.

## AI-assisted research (separate from publishing)

For topic ideation, SERP analysis, and competitor coverage research,
use Claude or ChatGPT in a separate session. Outputs from those sessions
become briefs. Briefs go into the pipeline above.

The publishing system itself does not call AI APIs — by design. AI assists
the editorial workflow at the human's discretion; AI does not auto-publish.
