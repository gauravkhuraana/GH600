---
title: "Agentic AI Foundations in GitHub - 3-Part Series Brief"
description: "Series spine, audience, unit-to-part mapping, demo arc and deliverable index for the three-part YouTube series based on the Microsoft Learn module Foundations of Agentic AI in GitHub."
author: Gaurav Khurana
ms.date: 2026-09-02
ms.topic: reference
keywords: [agentic ai, github copilot coding agent, sdlc, qa, sdet, governance]
---

# Agentic AI Foundations in GitHub — Series Brief

| Field | Value |
| --- | --- |
| Source | [Foundations of Agentic AI in GitHub](https://learn.microsoft.com/en-us/training/modules/foundations-agentic-ai/) (module 1 of 3 in [Developing in Agentic AI Systems Part 1 of 2](https://learn.microsoft.com/en-us/training/paths/gh-developing-agentic-systems-1)) |
| Format | 3-part YouTube series, ~10 minutes per part |
| Audience | QA engineers and SDETs who already use Copilot for autocomplete and chat |
| Assumed knowledge | Repos, branches, pull requests, basic CI. No agent experience assumed. |
| Demo | One governance-focused repo, one continuous agent run, cut across all three parts |
| Visuals | All diagrams original (D1–D6). No Microsoft Learn images shipped. |
| Topic slug | `agentic-github` |
| Stamp | `20260902_1012` |

## The spine

> **You already know how to review a pull request. That is the whole skill for supervising an AI agent.**

Say it in Part 1 at roughly the 1-minute mark. Repeat it as the closing line of Part 1, the opening
callback of Part 2, and the final line of Part 3.

Why it works for this audience: QA people are told daily that AI is coming for their job. This
inverts it. The thing they are already best at — deciding whether a change is safe to ship — is the
scarce skill in an agentic workflow. The series never argues that agents are good or bad. It argues
that agent output is a contribution, and contributions get reviewed.

## The promise per part

| Part | Title | Units | Promise to the viewer |
| --- | --- | --- | --- |
| 1 | Assistant or Agent? What Actually Changed | 1, 2, 3 | You will be able to tell, from a pull request alone, whether an AI behaved as an assistant or an agent — and name the phase of the loop it is in. |
| 2 | GitHub Is the Control Plane | 4 | You will know the six GitHub controls that decide what an agent is physically able to do, and which ones you can turn on yourself. |
| 3 | How to Review Work an Agent Wrote | 5, 6, 7, 8 | You will leave with a six-point rubric you can apply to the next agent PR that lands in your queue. |

## Unit-to-part mapping

| Learn unit | Part | Where it lands |
| --- | --- | --- |
| 1. Introduction | P1 | Folded into the hook and the "why now" section |
| 2. Define agentic AI in the SDLC | P1 | Sections 3–4, anchored on diagram D1 |
| 3. Explain the agent lifecycle — plan, act, evaluate | P1 | Sections 5–7, anchored on diagram D2 |
| 4. Describe GitHub as the system of record and control plane | P2 | Whole video, anchored on diagram D3 |
| 5. Identify responsibilities, risks, anti-patterns, traceability | P3 | Sections 3–6, anchored on diagrams D4 and D5 |
| 6. Apply the contributor model to agent-generated work | P3 | Sections 7–9, anchored on diagram D6 |
| 7. Knowledge Check | P3 | Converted into three on-screen questions with a pause beat |
| 8. Summary | P3 | Series recap plus the pointer to modules 2 and 3 |

## Narrative arc across the three parts

The demo repo is recorded once, end to end, then cut across the series so each part lands on a
cliffhanger the next part resolves.

- **Part 1 ends** the moment the Copilot-authored pull request appears in the repo, with its plan
  visible in the description. Closing line: *"So the agent opened a pull request. Nothing stopped it.
  Should something have?"*
- **Part 2 opens** on that same pull request and answers the question — the ruleset blocking merge,
  the required check, the CODEOWNERS review request, the workflow approval gate. Closing line:
  *"The guardrails held. Now somebody has to actually read the diff. That somebody is you."*
- **Part 3 opens** on the review itself, runs the rubric against the PR, contrasts it with the
  deliberately bad anti-pattern PR, merges, then walks the audit trail backwards.

## Recording order

Record the demo **first**, in one continuous session, before any script is written. The coding
agent's turnaround time is unpredictable and its output cannot be scripted in advance — write the
narration to the footage that actually exists, not the footage you hoped for. Capture the full run
even if long; speed-ups and cuts are handled later in the edit plan.

Part 1 uses a cold open: the agent PR appearing on screen with no narration for the first four
seconds, then the hook. Show, then explain — do not explain, then show.

## Framing rules for a QA audience

1. **Translate every governance concept into a test concept.** A plan is a test-design doc. Required
   checks are entry criteria for merge. The audit trail is the defect trail. CODEOWNERS is the
   reviewer assignment matrix.
2. **Never say "AI writes the code so testers are safe."** The point is not job security. The point
   is that the volume of changes needing review goes up, and unreviewed volume is where defects live.
3. **Do not sell the agent.** No "look how amazing this is." Show the PR, show the plan, show the
   gate that stopped it. Neutral tone earns more trust with this audience than enthusiasm.
4. **Name the two failure modes explicitly** — rejecting work because AI wrote it, and accepting work
   because automation produced it. Most viewers sit in one camp and think the other camp is naive.
5. **Every control mentioned gets an "can you turn this on yourself?" answer.** Rulesets and default
   token permissions are admin-only. The review discipline is not. Say which is which, every time.

## What this series deliberately does not cover

- Modules 2 and 3 of the learning path — agent architecture, tool use, MCP, execution environments.
  These are a natural follow-up series, referenced in the Part 3 outro.
- GitHub Advanced Security in depth. The source module excludes it; so do we. Code scanning and
  secret scanning appear only as evaluation *signals*, not as a feature tour.
- Prompt engineering, model choice, or how the agent reasons internally. The series is about the
  workflow the agent enters, not the agent's internals.
- Any comparison of Copilot against competing agents.

## Deliverable index

| File | Status |
| --- | --- |
| `00-series-brief.md` | ✅ this file |
| `video_agentic-github_details_20260902_1012.md` | ✅ shared research and prep notes, all 8 units |
| `video_agentic-github-p1_script_20260902_1012.md` | ✅ ~1,570 spoken words, ~10:25 |
| `video_agentic-github-p2_script_20260902_1012.md` | ✅ ~1,460 spoken words, ~9:45 |
| `video_agentic-github-p3_script_20260902_1012.md` | ✅ ~1,690 spoken words, ~11:15 |
| `video_agentic-github-p1_ppt_20260902_1012.md` | ✅ 14 slides |
| `video_agentic-github-p2_ppt_20260902_1012.md` | ✅ 14 slides |
| `video_agentic-github-p3_ppt_20260902_1012.md` | ✅ 14 slides, slide 10 has two build states |
| `video_agentic-github-p1_thumbnail_20260902_1012.md` | ✅ 3 prompts, 4 titles, description |
| `video_agentic-github-p2_thumbnail_20260902_1012.md` | ✅ 3 prompts, 4 titles, description |
| `video_agentic-github-p3_thumbnail_20260902_1012.md` | ✅ 3 prompts, 4 titles, description |
| `diagrams/d1-assistant-vs-agent.excalidraw` | ✅ hero visual, Part 1 |
| `diagrams/d2-agent-lifecycle-loop.excalidraw` | ✅ hero visual, Part 1 |
| `diagrams/d3-system-of-record-control-plane.md` | ✅ Mermaid, Part 2 |
| `diagrams/d4-risk-mitigation-map.md` | ✅ Mermaid, Part 3 |
| `diagrams/d5-minimum-audit-trail.md` | ✅ Mermaid, Part 3 |
| `diagrams/d6-review-rubric.md` | ✅ Mermaid, Part 3 |
| `demo-repo/` | ✅ scaffolded; lint, build and 6 tests verified passing locally |
| `video_agentic-github-p{1,2,3}_editplan_*.md` | ⏸️ **deferred** — requires the real SRT after recording |

## Next actions, in order

1. Work through `demo-repo/SETUP.md` — create the repo, configure the ruleset, environment and token
   permissions, and **verify each guardrail actually bites** before recording anything.
2. Clear the `VERIFY` flags in all three scripts against `docs.github.com`. Several are load-bearing;
   the Part 2 workflow-approval shot in particular may not exist in your configuration.
3. Record the demo in one continuous session per `SETUP.md`'s run sheet.
4. Build the three decks from the `_ppt` specs, exporting D1–D6 to PNG first.
5. Record narration to the footage, not the other way round.
6. Generate the `_editplan` files from the real SRT after export.
