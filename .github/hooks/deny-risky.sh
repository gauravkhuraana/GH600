#!/usr/bin/env bash
# preToolUse guardrail for Copilot cloud agent.
#
# Receives the pending tool call as JSON on stdin and prints a decision on stdout.
#   - Fail-closed: if this script crashes or exits non-zero, the tool call is DENIED.
#   - Timeouts are fail-open (the call proceeds), so keep this fast.
#
# Deliberately simple: it pattern-matches the whole payload rather than parsing it,
# so it works whether toolArgs arrives as an object or a string.

input="$(cat)"

deny() {
  printf '{"permissionDecision":"deny","permissionDecisionReason":"%s"}\n' "$1"
  exit 0
}

# 1. Destructive or history-rewriting commands.
if grep -Eq 'rm -rf|git push (-f|--force)|git reset --hard|--no-verify' <<< "$input"; then
  deny "Blocked by repo guardrail: destructive git or shell command."
fi

# 2. The agent must not edit its own guardrails.
if grep -Eq '"toolName"[[:space:]]*:[[:space:]]*"(edit|create|write)"' <<< "$input" &&
   grep -Eq '\.github/(workflows|hooks|agents)/|\.github/CODEOWNERS' <<< "$input"; then
  deny "Blocked by repo guardrail: workflows, hooks, agent profiles and CODEOWNERS need a human."
fi

echo '{"permissionDecision":"allow"}'
