# Editorial automation disable — change report

**Date:** 2026-06-22
**Goal:** Replace the autonomous article-generation system with a manual,
human-reviewed Claude-cowork workflow. Remove **only** automatic content
creation and automatic draft creation. Keep the editorial system, journal,
and all publishing functionality intact.

---

## A. What automation existed

The repo ran an end-to-end **autonomous editorial pipeline** plus supporting
tooling. Full inventory from the audit:

**Automatic content creation (the target of this change):**

| Component | File | What it did |
|---|---|---|
| Autonomous draft workflow | `.github/workflows/autonomous-draft.yml` | **Weekly cron** (Mondays 14:00 UTC). Picked the top content-gap, generated a brief, generated a full article draft via Claude, linted it, and opened a PR with a new `status:"draft"` article appended to `lib/journal.ts`. |
| AI brief generator | `scripts/generate-brief.ts` | Called Claude to produce a structured `brief.json` for the next article. |
| AI draft generator | `scripts/generate-draft.ts` | Called Claude to write a complete `Article` and auto-append it to `lib/journal.ts`. |
| Anthropic API client | `lib/anthropic-client.ts` | Minimal Claude client used **only** by the two generators above. |
| npm triggers | `package.json` → `editorial:brief`, `editorial:draft` | Convenience triggers for the generators. |
| Docs | `docs/AUTONOMOUS.md` | Documented the autonomous pipeline. |

**Automation that is NOT content creation (left running — see §D):**

- `.github/workflows/ci.yml` — typecheck + `next lint` + editorial linter on every PR/push.
- `.github/workflows/scheduled-publish.yml` + `scripts/promote-scheduled.ts` — promotes **manually-written** `scheduled` articles to `published` once `publishAt` passes (opens a PR; no auto-merge).
- `app/api/cron/follow-ups`, `app/api/cron/daily-digest` + `vercel.json` crons — **CRM** lead-reminder / digest emails. Nothing to do with articles.
- `app/api/mcp/route.ts` + `lib/mcp/*` — MCP server exposing the **CRM leads** API (list/create/update leads). No article or content tools. Not article generation.
- `lib/ai/*` — deterministic **heuristic** lead/pipeline analysis for the CRM dashboard. No external AI calls, no content generation.

> Note: the "MCP article generation" named in the brief does **not** exist in
> this repo — the only MCP server here is the CRM. It was left untouched.

---

## B. Files changed

| File | Change |
|---|---|
| `.github/workflows/autonomous-draft.yml` | **Renamed** → `autonomous-draft.yml.disabled` (GitHub Actions only loads `.yml`/`.yaml`, so the workflow no longer exists as far as Actions is concerned). |
| `scripts/generate-brief.ts` | Replaced with a **disabled stub** that prints an explanation and exits 1. Original preserved in git history. |
| `scripts/generate-draft.ts` | Replaced with a **disabled stub** that prints an explanation and exits 1. Original preserved in git history. |
| `package.json` | Removed the `editorial:brief` and `editorial:draft` scripts. Kept `editorial:new`, `editorial:lint`, `editorial:lint:strict`, `editorial:links`, `editorial:gaps`. |
| `docs/AUTONOMOUS.md` | Added a prominent **DISABLED** banner at the top and a new **"Manual article workflow (current process)"** section at the bottom. |
| `docs/AUTOMATION-DISABLE-REPORT.md` | This report (new). |

`lib/anthropic-client.ts` was intentionally **left in place but is now
orphaned** (no code imports it). It has no triggers and cannot run on its own.
Delete it later if you want; leaving it keeps the change minimal and reversible.

---

## C. What was disabled

- The **weekly autonomous draft cron** — can no longer fire (workflow file is
  no longer a loadable workflow).
- **AI brief generation** (`editorial:brief`) — trigger removed; script stubbed.
- **AI draft generation** (`editorial:draft`) — trigger removed; script stubbed;
  it can no longer auto-append generated articles to `lib/journal.ts`.
- Net effect: **no path remains that creates article content automatically.**

Verified: running the stub exits with code 1 and a clear message instead of
generating anything.

---

## D. What remains active (unchanged, still functioning)

- ✅ **Editorial linting** — `npm run editorial:lint` / `:lint:strict` (`scripts/lint-content.ts`)
- ✅ **Article validation** — typed `Article` model + linter checks in CI
- ✅ **Sitemap generation** — `app/sitemap.ts`
- ✅ **RSS generation** — `app/feed.xml`
- ✅ **`llms.txt` generation** — `app/llms.txt/route.ts`
- ✅ **Schema generation** — JSON-LD from typed articles
- ✅ **Topic hubs** — `app/journal/topics/*`
- ✅ **Journal rendering** — `lib/journal.ts` + journal pages (`draft`/`scheduled`/`published` lifecycle intact)
- ✅ **Scheduled publish for manually-written articles** — `scheduled-publish.yml` + `promote-scheduled.ts`
- ✅ **CI gates** — `ci.yml` (typecheck, `next lint`, editorial linter)
- ✅ **CRM MCP server + CRM cron emails** — `app/api/mcp`, `app/api/cron/*`, `lib/mcp/*`, `lib/ai/*`
- ✅ Manual planning helpers — `editorial:gaps`, `editorial:new`, `editorial:links`

The website builds and runs exactly as before. Only automatic authoring is gone.

**Verification results:**

```
npm run editorial:lint   → 0 errors, 0 warnings (exit 0)
npx tsc --noEmit         → exit 0
next lint                → exit 0 (1 pre-existing GA-script warning, unrelated)
```

---

## E. How to add articles now (manual, human-reviewed)

1. **Plan** — `npm run editorial:gaps` to see which topic clusters need coverage.
2. **Scaffold** — `npm run editorial:new` (or copy an existing entry in
   `lib/journal.ts`). Start as `status: "draft"` so it stays off the live site.
3. **Write** — author the body/dek/FAQ/tags/keywords in `lib/journal.ts`. Use
   Claude in Cowork to assist drafting/editing — a person owns the final copy.
4. **Validate** — `npm run editorial:lint` (voice, AI tells, length, fields);
   `npm run editorial:links` for internal-link suggestions.
5. **Review & ship** — open a PR. CI runs typecheck + `next lint` + editorial
   linter. A human sets `status: "published"` (live now) or `status:"scheduled"`
   with a future `publishAt`.
6. **Scheduled posts** — `scheduled-publish.yml` promotes them to `published`
   via a PR once `publishAt` passes. Sitemap/RSS/`llms.txt` regenerate at build.

---

## Final git commands

```bash
cd "JDT-inc website"

# Review the change set
git status
git diff

# Stage everything (the workflow rename is already staged by git mv)
git add -A

# Commit
git commit -m "editorial: disable autonomous article generation

- Disable weekly autonomous-draft workflow (rename .yml -> .yml.disabled)
- Stub out scripts/generate-brief.ts and scripts/generate-draft.ts
- Remove editorial:brief and editorial:draft npm scripts
- Document the manual, human-reviewed article workflow

Keeps: editorial linting, validation, sitemap/RSS/llms.txt, schema,
topic hubs, journal rendering, scheduled-publish for manual articles,
CRM MCP/cron. Only automatic content creation is removed."

# Push (open a PR per your normal flow)
git push origin HEAD
```

To fully restore the autonomous pipeline later:
`git revert <commit>` (or `git checkout <commit>~1 -- <files>`), since the
original generator code is preserved in history.
