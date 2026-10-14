#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"

deny() {
  printf '{"permissionDecision":"deny","permissionDecisionReason":"%s"}\n' "$1"
  exit 0
}

# Block destructive or history-rewriting commands.
if grep -Eqi 'rm[[:space:]]+-rf|git[[:space:]]+push([^"]*)[[:space:]](-f|--force)|git[[:space:]]+reset[[:space:]]+--hard|--no-verify' <<< "$input"; then
  deny "Blocked by repo guardrail: destructive git or shell command."
fi

# Prevent agents from modifying guardrail configuration.
if grep -Eqi '"toolName"[[:space:]]*:[[:space:]]*"(edit|create|write|apply_patch)"' <<< "$input" &&
   grep -Eqi '\.github/(hooks|hooks\.json)|\.github_hooks_guardrails\.json' <<< "$input"; then
  deny "Blocked by repo guardrail: agents cannot modify guardrail files."
fi

# Allow all other operations, including read-only GitHub MCP calls.
exit 0