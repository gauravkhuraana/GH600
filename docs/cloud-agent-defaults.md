# Copilot cloud agent — defaults and limits worth memorising

A one-page handout for the GH-600 series (video 7). Checked against GitHub Docs on 14 Oct 2026.
Features change; open the linked page before relying on any line.

## Who can start it
- Only users with **write access** to the repository can trigger it. [1]
- Comments from users without write access are **never shown** to the agent. [1]
- Automations (scheduled or event-driven) ignore events from users without write access by default. [1]

## Where it can work
- Only the repository it was started in. [1][2]
- Pushes to **one branch**: the existing PR's branch if mentioned on a PR, otherwise a new `copilot/…` branch. [1]
- You can choose the **base branch** the new branch is cut from. [2]
- Branch protections and required checks still apply to its branch. [1]
- Simple pushes only; it can't run `git push` or other Git commands directly. [1]

## What it can't do
- Mark its PR ready for review, approve it, or merge it. [1]
- The person who asked for the PR can't approve it either. [1]
- GitHub Actions workflows on its PR don't run until someone with write access approves them (unless an admin changes this). [1]

## Secrets
- Uses **Agents** secrets and variables only (Settings → Secrets and variables → Agents). [3]
- Can't read Actions, Codespaces or Dependabot secrets — not in sessions, not in setup steps. [3][7]
- MCP secrets must be named with the `COPILOT_MCP_` prefix. [4]

## Network
- A firewall limits outbound internet access by default, with a **recommended allowlist** (package registries, OS repos, container registries, common CAs, Playwright browser hosts). [5]
- Add hosts at Settings → Copilot → **Internet access** (repo or org). Org rules can't be removed at repo level. [5]
- A blocked request produces a warning on the PR showing the host and the command. [5]
- The firewall covers only processes the agent starts through its shell — **not** setup steps, **not** MCP servers. [5]
- Not compatible with Windows runners; must be disabled for self-hosted runners. [6]
- GitHub: "should not be considered a comprehensive security solution". [5]

## MCP
- Built in: GitHub MCP server (read-only token, current repo only) and Playwright MCP server. [4]
- Uses MCP **tools only** — not resources or prompts. Remote servers that need OAuth aren't supported. [4]
- Configured tools are used **without asking for approval** — allowlist named read-only tools. [4]
- Config sources, later overriding earlier: built-in → custom agent `mcp-servers:` → repository settings. [8]
- Org/enterprise private MCP registries and custom-model policies **don't apply** to the cloud agent. [7]

## Environment (`.github/workflows/copilot-setup-steps.yml`)
- Must be on the **default branch**; job must be named exactly `copilot-setup-steps`. [6]
- Only `steps`, `permissions`, `runs-on`, `services`, `snapshot`, `timeout-minutes` are honoured; timeout max **59 minutes**. [6]
- If a step fails, the rest are skipped and the agent starts anyway. [6]
- Runners: Ubuntu (default), larger runners (Ubuntu x64, Windows x64), or ephemeral self-hosted runners. [6]

## Traceability
- Commits authored by Copilot, with the requester as co-author; signed ("Verified"). [1]
- Every commit message links to the session log; session logs and audit log events are available to admins. [1]
- Built-in validation: CodeQL, dependency check against the Advisory Database, secret scanning, Copilot code review. [1]

## Where Learn and GitHub Docs disagree
| Learn M3 | GitHub Docs |
|---|---|
| Agent opens a PR (unit 4) / you decide whether to (unit 5) | Draft PR it can't mark ready, approve or merge [1] |
| CI uses `npx @github/copilot-cli` with `GITHUB_TOKEN` | `npm install -g @github/copilot`, `copilot -p`; PAT with Copilot Requests, or `GITHUB_TOKEN` for org-owned repos [9] |
| Agent profiles scoped with `applyTo:` | Not an agent-profile property (it's for `*.instructions.md`) [8] |

## Sources
1. Risks and mitigations — https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations
2. Learn M3 unit 4, Execution context and boundaries — https://learn.microsoft.com/en-us/training/modules/agent-tooling-mcp-execution-environments/4-execution-context-boundaries
3. Agents secrets and variables — https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/configure-secrets-and-variables
4. Extend cloud agent with MCP — https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/extend-cloud-agent-with-mcp
5. Customize the agent firewall — https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/customize-the-agent-firewall
6. Customize the agent environment — https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/customize-the-agent-environment
7. Building guardrails for cloud agent — https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails
8. Custom agents configuration — https://docs.github.com/en/copilot/reference/custom-agents-configuration
9. Automate with Copilot CLI and Actions — https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/automate-with-actions
