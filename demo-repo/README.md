# agentic-guardrails-demo

A deliberately tiny repository. The code does one boring thing: it maps a defect's impact
and reach to a severity band.

The code is not the point. The point is everything in `.github/`.

This repository exists to show what happens when a coding agent opens a pull request into
a repository that already has guardrails — and what a reviewer does about it.

## What is being demonstrated

| File or setting | Demonstrates |
| --- | --- |
| `.github/pull_request_template.md` | Mitigates **planless execution** and **hidden reasoning** |
| `.github/CODEOWNERS` | Routes review of high-impact paths to the right people |
| `.github/workflows/ci.yml` | Least-privilege `GITHUB_TOKEN`, and required status checks |
| `.github/workflows/deploy.yml` | Environment approval gating a secret |
| `.github/copilot-instructions.md` | Constrains agent behaviour before it starts |
| Ruleset on `main` (UI, see `SETUP.md`) | Turns evaluation into an enforceable gate |

## Local commands

```bash
npm ci
npm run lint    # tsc --noEmit
npm run build   # tsc
npm test        # node --test dist/
```

## Reviewing a pull request here

Six checks, and none of them ask who the author was.

1. **Intent** — is there a clear goal and a visible plan?
2. **Scope** — do the changed files match the plan?
3. **Evidence** — do required checks pass, and are logs available?
4. **Ownership** — did the right code owners review sensitive areas?
5. **Policy** — does it comply with rulesets, branch rules, environments?
6. **Fallback** — is rollback or escalation clear for anything high risk?

## Setup

The files in this repository are only half of the configuration. Rulesets, environments and
default token permissions are set through the GitHub UI and cannot be committed.

See [SETUP.md](SETUP.md) before recording.
