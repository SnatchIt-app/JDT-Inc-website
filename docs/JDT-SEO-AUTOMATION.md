# JDT Inc. — Local SEO Automation

A local, founder-owned automation that runs Claude Code inside this repo on a
4-day cadence. Each run audits the site, makes **one** meaningful SEO
improvement (a new article only when that's the best move), validates, commits,
and pushes to `main`. The GitHub push triggers Vercel's automatic deployment.

No Claude Cowork tasks, no GitHub Actions content generation, no MCP article
generation, no external paid automation. Just macOS `launchd` + a shell script
+ local Claude Code.

## Moving parts

| Piece | Path |
| --- | --- |
| Autonomous prompt | `prompts/jdt-seo-engine.md` |
| Runner script | `scripts/run-jdt-seo.sh` |
| LaunchAgent | `~/Library/LaunchAgents/com.jdt.seo.plist` |
| Run logs | `logs/jdt-seo.log`, `logs/jdt-seo-error.log` |
| launchd logs | `logs/launchd-jdt-seo.log`, `logs/launchd-jdt-seo-error.log` |
| Cadence stamp | `logs/.last-jdt-seo-run` (epoch seconds of last success) |

The LaunchAgent fires **daily at 9:00 AM** but does nothing unless the last
successful run was 4+ days ago — the 4-day guard lives in the script, so the
schedule can stay simple. `RunAtLoad` is `false`, so loading the agent (or
rebooting) never triggers an immediate run.

`logs/` is git-ignored; logs and the stamp file are never committed.

---

## Install (register + start the schedule)

```bash
launchctl load -w ~/Library/LaunchAgents/com.jdt.seo.plist
```

`-w` marks it enabled and persists across reboots. Verify it's registered:

```bash
launchctl list | grep com.jdt.seo
```

## Unload / disable safely

```bash
launchctl unload -w ~/Library/LaunchAgents/com.jdt.seo.plist
```

This stops all scheduled runs and keeps it disabled across reboots. The plist
file stays on disk; re-enable later with the install command above. To remove it
entirely, delete the plist after unloading:

```bash
rm ~/Library/LaunchAgents/com.jdt.seo.plist
```

## Manual test (run now, ignore the 4-day guard)

```bash
"/Users/josetascon/JDT-inc website/scripts/run-jdt-seo.sh" --force
```

`--force` bypasses the cadence guard and runs a full Claude session immediately
(it can publish + push). Drop `--force` to test the guard behavior instead — a
normal invocation will skip if a run happened in the last 4 days.

## View logs

```bash
# Claude run output (what the engine did)
tail -n 100 "/Users/josetascon/JDT-inc website/logs/jdt-seo.log"

# Errors from the runner / Claude
tail -n 100 "/Users/josetascon/JDT-inc website/logs/jdt-seo-error.log"

# launchd's own stdout/stderr (scheduling-level issues)
tail -n 50 "/Users/josetascon/JDT-inc website/logs/launchd-jdt-seo.log"
tail -n 50 "/Users/josetascon/JDT-inc website/logs/launchd-jdt-seo-error.log"

# Follow a live run
tail -f "/Users/josetascon/JDT-inc website/logs/jdt-seo.log"
```

## Verify the git push

```bash
cd "/Users/josetascon/JDT-inc website"
git log -1 --oneline            # newest commit (should be a `seo: ...` commit)
git status -sb                  # `## main...origin/main` with no "ahead" = pushed
git log origin/main -1 --oneline
```

## Confirm the Vercel deployment

The Vercel project is connected to GitHub `SnatchIt-app/JDT-Inc-website` and
auto-deploys on every push to `main`. After a run pushes a commit:

- Check the Vercel dashboard → the JDT project → Deployments. A new deployment
  matching the latest commit hash should be Building / Ready.
- Or watch the GitHub commit status on the latest commit for the Vercel check.

No manual deploy step is required; the push is the trigger.

## Force a run (reset the cadence)

Delete the stamp file so the next invocation runs regardless of the 4-day guard:

```bash
rm -f "/Users/josetascon/JDT-inc website/logs/.last-jdt-seo-run"
```

The next launchd 9:00 AM fire (or a manual run) will then execute a full run and
write a fresh timestamp. `--force` does the same thing for an immediate manual
test without deleting the stamp.

---

## Behavior & guarantees

- Publishes directly; new articles ship with `status: "published"`.
- Commits and pushes to `main` **only after** `npm run editorial:lint`,
  `next lint`, and `npx tsc --noEmit` all pass.
- Makes one meaningful improvement per run, or exits cleanly with no commit.
  It will not churn files or publish weak, AI-sounding content to keep cadence.
- Never re-enables or edits `.github/workflows/autonomous-draft.yml.disabled`,
  the automation files, or unrelated files.
- The success timestamp is recorded only when the run exits 0, so a failed run
  doesn't consume the 4-day window.

## Maintenance notes

- If the `claude` CLI moves, update `CLAUDE=` in `scripts/run-jdt-seo.sh` (the
  script also falls back to `command -v claude`).
- If Homebrew/node paths change, update `PATH` in both the script and the plist
  `EnvironmentVariables`.
- After editing the plist, reload it: `launchctl unload` then `launchctl load -w`.
