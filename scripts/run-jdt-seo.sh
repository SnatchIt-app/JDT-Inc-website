#!/bin/bash
#
# run-jdt-seo.sh — JDT Inc. local SEO engine runner.
#
# Launched by launchd (~/Library/LaunchAgents/com.jdt.seo.plist) every day at
# 9:00 AM. A 4-day cadence guard means the real SEO run only fires when the
# last successful run was 4+ days ago. Everything else (audit, one improvement,
# validation, commit, push) happens inside Claude Code, driven by the prompt at
# prompts/jdt-seo-engine.md. The GitHub push triggers Vercel auto-deploy.
#
# Usage:
#   scripts/run-jdt-seo.sh            # normal run (respects the 4-day guard)
#   scripts/run-jdt-seo.sh --force    # ignore the guard, run now (manual test)
#
# Exit codes: 0 = success or intentional skip; non-zero = Claude/validation/
# precondition failure (success timestamp is NOT recorded on failure).

set -u

# --- Absolute paths (launchd runs with a minimal environment) ------------
REPO="/Users/josetascon/JDT-inc website"
PROMPT="$REPO/prompts/jdt-seo-engine.md"
LOG_DIR="$REPO/logs"
STAMP="$LOG_DIR/.last-jdt-seo-run"
OUT_LOG="$LOG_DIR/jdt-seo.log"
ERR_LOG="$LOG_DIR/jdt-seo-error.log"

CADENCE_DAYS=4
CADENCE_SECS=$(( CADENCE_DAYS * 24 * 60 * 60 ))

CLAUDE="/Users/josetascon/.local/bin/claude"

# Rebuild a sane PATH so npm/npx/node/git/claude all resolve under launchd.
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/josetascon/.local/bin:$PATH"

FORCE=0
[ "${1:-}" = "--force" ] && FORCE=1

mkdir -p "$LOG_DIR"

timestamp() { date "+%Y-%m-%dT%H:%M:%S%z"; }
log()  { echo "[$(timestamp)] $*" | tee -a "$OUT_LOG"; }
elog() { echo "[$(timestamp)] $*" | tee -a "$ERR_LOG" >&2; }

cd "$REPO" || { elog "FATAL: cannot cd into repo: $REPO"; exit 1; }

# --- 4-day cadence guard -------------------------------------------------
if [ "$FORCE" -eq 0 ] && [ -f "$STAMP" ]; then
  last="$(cat "$STAMP" 2>/dev/null || echo 0)"
  case "$last" in (""|*[!0-9]*) last=0 ;; esac
  now="$(date +%s)"
  age=$(( now - last ))
  if [ "$age" -lt "$CADENCE_SECS" ]; then
    remain_h=$(( (CADENCE_SECS - age) / 3600 ))
    log "SKIP: last successful run was ${age}s ago (< ${CADENCE_DAYS} days). ~${remain_h}h until next eligible run."
    exit 0
  fi
fi

# --- Preconditions -------------------------------------------------------
if [ ! -x "$CLAUDE" ]; then
  CLAUDE="$(command -v claude || true)"
fi
if [ -z "${CLAUDE:-}" ] || [ ! -x "$CLAUDE" ]; then
  elog "FATAL: claude CLI not found (tried fixed path and command -v claude)."
  exit 1
fi
if [ ! -f "$PROMPT" ]; then
  elog "FATAL: prompt file missing: $PROMPT"
  exit 1
fi

log "START: JDT SEO engine run (force=${FORCE}) using ${CLAUDE}"

# --- Run Claude Code non-interactively -----------------------------------
# Claude audits the repo, makes ONE improvement, runs editorial:lint, next
# lint, and tsc --noEmit, and only commits + pushes to main if all pass.
"$CLAUDE" -p "$(cat "$PROMPT")" \
  --dangerously-skip-permissions \
  --add-dir "$REPO" \
  >>"$OUT_LOG" 2>>"$ERR_LOG"
status=$?

if [ "$status" -ne 0 ]; then
  elog "FAIL: claude exited with status ${status}. Not recording success timestamp."
  exit "$status"
fi

# --- Safety net: surface an unclean tree (Claude commits its own work) ----
# A clean run ends with either no changes or a committed+pushed change. Leftover
# uncommitted edits mean something went wrong; log it loudly but base success on
# Claude's own exit code so an intentional no-op run still counts.
if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
  elog "WARN: working tree is not clean after the run. Review logs/jdt-seo.log and git status."
fi

# --- Record success ------------------------------------------------------
date +%s > "$STAMP"
log "DONE: run complete. Success timestamp recorded ($(cat "$STAMP"))."
exit 0
