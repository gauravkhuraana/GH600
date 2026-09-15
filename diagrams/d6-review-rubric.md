---
title: "D6 - Six-Point Review Rubric for Agent Pull Requests"
description: "Original Mermaid diagram of the contributor-model review rubric: intent, scope, evidence, ownership, policy, fallback."
author: Gaurav Khurana
ms.date: 2026-09-02
ms.topic: reference
keywords: [mermaid, diagram, review rubric, contributor model, agent pull request, code review]
---

# D6 — The Six-Point Review Rubric

**Used in:** Part 3, section 8. This is the takeaway asset of the entire series — it must be legible
as a paused screenshot on a phone. Also drives the thumbnail concept for Part 3.

**Point it must make:** this is not a special standard for AI. It is the standard of a healthy
engineering workflow, applied consistently.

```mermaid
flowchart TB
    START(["An agent opened a pull request"])

    Q1{"INTENT<br/>Is there a clear goal<br/>and a visible plan?"}
    Q2{"SCOPE<br/>Do the changed files<br/>match the plan?"}
    Q3{"EVIDENCE<br/>Do required checks pass?<br/>Are logs and artifacts available?"}
    Q4{"OWNERSHIP<br/>Did the right code owners<br/>review sensitive areas?"}
    Q5{"POLICY<br/>Does it comply with rulesets,<br/>branch rules, environments?"}
    Q6{"FALLBACK<br/>Is rollback or escalation<br/>clear for high-risk change?"}

    OK["Approve"]
    BACK["Request changes<br/><i>and say which check failed</i>"]

    START --> Q1
    Q1 -->|yes| Q2
    Q2 -->|yes| Q3
    Q3 -->|yes| Q4
    Q4 -->|yes| Q5
    Q5 -->|yes| Q6
    Q6 -->|yes| OK

    Q1 & Q2 & Q3 & Q4 & Q5 & Q6 -->|no| BACK

    classDef check fill:#0f2a33,stroke:#22D3EE,stroke-width:1px,color:#e6f7fb
    classDef start fill:#22D3EE,stroke:#22D3EE,color:#0B0F14
    classDef good fill:#0f331f,stroke:#4ade80,color:#e6fbef
    classDef bad fill:#331414,stroke:#f87171,color:#fbe6e6

    class Q1,Q2,Q3,Q4,Q5,Q6 check
    class START start
    class OK good
    class BACK bad
```

## What good looks like — the companion five

Show immediately after the rubric, as a plain list. These are the properties a PR has *after* it
passes all six checks.

- **Understandable** — clear goal and plan
- **Bounded** — scoped changeset, least privilege
- **Reviewable** — right owners involved, evidence present
- **Policy-compliant** — rulesets, branch rules, environments respected
- **Reconstructable** — audit trail supports post-hoc analysis

## The two failure modes this rubric prevents

| Failure mode | What it sounds like | Why the rubric stops it |
| --- | --- | --- |
| Excessive suspicion | "Reject it, an AI wrote it" | None of the six checks asks who the author was |
| Excessive trust | "Approve it, the build is green" | Evidence is one check out of six, not the whole review |

## Narration anchor

> "Six questions. Read them again and tell me which one you would not ask a human contributor.
> That is the whole point. This is not an AI review checklist. It is a review checklist — and the
> only thing that changed is how many pull requests are now arriving."

## Build notes

- Every "no" path collapses into one node. Do not draw six separate rejection boxes; the visual noise
  destroys the readability that makes this a shareable screenshot.
- For the phone-legibility test: render at 1920x1080, scale to 400px wide, and check the six headline
  words — INTENT, SCOPE, EVIDENCE, OWNERSHIP, POLICY, FALLBACK — are still readable. If not, drop the
  italic sub-questions from the graphic and keep them in narration only.
- The six headline words in order are the Part 3 thumbnail. Keep the wording locked across the
  diagram, the slide, the thumbnail and the YouTube description.
