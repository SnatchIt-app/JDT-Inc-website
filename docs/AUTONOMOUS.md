# Autonomous editorial pipeline

A weekly cron drafts articles end-to-end. A human is the merge gate. Nothing
ships to production without an approved PR.

## Architecture

```
[ cron · Mondays 14:00 UTC ]
        │
        ▼
analyze-gaps   →  picks the highest-priority cluster gap
        │
        ▼
generate-brief →  Claude generates a structured brief.json
        │
        ▼
generate-draft →  Claude generates a complete Article object,
                  appends to lib/journal.ts as status="draft"
        │
        ▼
editorial:lint →  blocks on AI tells, brand voice, length, keyword density
typescript     →  blocks on type errors
        │
        ▼
peter-evans/create-pull-request opens PR with draft on a feature branch
        │
        ▼
[ HUMAN GATE ] · review, edit, set status, merge
        │
        ▼
Vercel rebuild → sitemap, RSS, llms.txt regenerate · article goes live
```

## Setup (one-time)

1. Create an Anthropic API key.
2. In GitHub: **Settings → Secrets and variables → Actions → New secret**
   - name: `ANTHROPIC_API_KEY`
   - value: your key
3. The workflow runs Mondays at 14:00 UTC. Trigger manually anytime via
   **Actions → autonomous-draft → Run workflow**.

## Manual operation (for testing or one-offs)

```bash
# 1. See what's missing in the cluster blueprint
npm run editorial:gaps

# 2. Generate a brief for the top gap (writes editorial/briefs/<slug>.json)
npm run editorial:brief

# 3. Or override the auto-pick:
npm run editorial:brief -- --topic=meta-ads --kind=supporting

# 4. Generate the draft from the brief (appends to lib/journal.ts)
npm run editorial:draft -- --brief=editorial/briefs/<slug>.json

# 5. Lint
npm run editorial:lint -- --slug=<slug>

# 6. Get internal-link suggestions
npm run editorial:links -- --slug=<slug>

# 7. Edit the article in lib/journal.ts, set status, commit, PR
```

## What's autonomous

- Topic gap analysis (no human input)
- Brief generation (Claude picks angle + keyword cluster)
- Article body generation (Claude writes 800–2500 words)
- Metadata, FAQ, schema (auto from the typed Article)
- Internal link injection (2–3 contextual links per article)
- Linting + typecheck (CI gates)
- Sitemap, RSS, llms.txt updates (rebuild-time)
- Scheduled-publish promotion (existing daily cron)

## What's not autonomous (deliberately)

- The merge button. A human reads the PR, edits if needed, sets
  `status: "published"` or `"scheduled"`, approves, merges.
- Editing the voice contract (`editorial/voice-reference.md`).
- Adding new topic clusters or services.

This single human moment is what keeps the brand from drifting. Removing
it produces content farms; keeping it produces an editorial publication.

## Quality gates (in order)

1. **System prompt** — voice contract from `editorial/voice-reference.md`
   conditions every generation
2. **Tool-use schema** — Claude is forced to emit a valid Article object;
   no free-form text reaches the file
3. **Editorial linter** — banned phrases, keyword density, length, structure;
   errors fail CI
4. **TypeScript** — structural validity of the appended Article
5. **Human PR review** — final taste gate

## Cost

Claude Sonnet 4.6 with one brief (~2k tokens out) + one article (~5k tokens
out) per run ≈ \$0.10–\$0.15 per article. At 1 article/week ≈ \$0.50/month.

## Tuning

- **Voice rules**: edit `editorial/voice-reference.md`
- **Banned phrases**: edit `AI_TELLS` and `BRAND_VIOLATIONS` in
  `scripts/lint-content.ts`
- **Cluster priorities**: edit `COMMERCIAL_WEIGHT` in `scripts/analyze-gaps.ts`
- **Cadence**: edit the cron schedule in `.github/workflows/autonomous-draft.yml`
- **Model**: change the default in `lib/anthropic-client.ts`

## What to do if the system drifts

If a generated draft degrades:

1. Look at what made it through. Add the offending phrase to `AI_TELLS`
   in the linter.
2. If the voice slipped, add a clarifying example to
   `editorial/voice-reference.md`.
3. Re-run from step 4 of the manual flow against the same brief — Claude
   will re-draft against the updated rules.
