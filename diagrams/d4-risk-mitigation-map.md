---
title: "D4 - Risk to GitHub Mitigation Map"
description: "Original Mermaid diagram mapping the four agent anti-patterns to the GitHub controls that mitigate them."
author: Gaurav Khurana
ms.date: 2026-09-02
ms.topic: reference
keywords: [mermaid, diagram, agent anti-patterns, github mitigation, governance]
---

# D4 — Risk → GitHub Mitigation Map

**Used in:** Part 3, section 5. Revealed one row at a time — anti-pattern appears in red, the
mitigation lands in amber on the next click.

**Point it must make:** none of these four failures needs a new tool. Each one already has a GitHub
control sitting opposite it.

```mermaid
flowchart LR
    subgraph RISK["ANTI-PATTERN"]
        direction TB
        A1["Planless execution<br/><i>a diff with no stated approach</i>"]
        A2["Over-permissioned agent<br/><i>broader access than the task needs</i>"]
        A3["Hidden reasoning<br/><i>output without assumptions or scope</i>"]
        A4["Blind trust in automation<br/><i>'CI passed, ship it'</i>"]
    end

    subgraph MIT["GITHUB MITIGATION"]
        direction TB
        M1["PR template requiring a plan<br/>+ required review before merge"]
        M2["Least-privilege GITHUB_TOKEN<br/>+ environments with required reviewers<br/>+ restrict who can trigger workflows"]
        M3["Require plan, link workflow runs,<br/>record decisions in PR comments"]
        M4["Checks + CODEOWNERS<br/>+ required reviews<br/>+ risk-based approvals"]
    end

    A1 --> M1
    A2 --> M2
    A3 --> M3
    A4 --> M4

    classDef risk fill:#331414,stroke:#f87171,stroke-width:1px,color:#fbe6e6
    classDef mit fill:#332a0f,stroke:#FBBF24,stroke-width:1px,color:#fdf6e6

    class A1,A2,A3,A4 risk
    class M1,M2,M3,M4 mit
```

## The one-line version of each pairing

| Anti-pattern | Say this |
| --- | --- |
| Planless execution | "If you cannot tell me what it was trying to do, you cannot tell me whether it succeeded." |
| Over-permissioned agent | "What the agent can do is what the token can do. Nothing more, nothing less." |
| Hidden reasoning | "A diff tells you what changed. It never tells you what was considered and rejected." |
| Blind trust | "A green build means the tests you already had still pass. That is all it has ever meant." |

## Narration anchor

> "Four ways agent systems fail early, and they are boringly predictable. Which is good news —
> predictable failures have standing mitigations. Every one of these has a control sitting opposite
> it that shipped years before anyone said the word agentic."

## Build notes

- Red `#f87171` for anti-patterns is the only place red appears in the series. Keep it that way so it
  reads as "this is the failure column" without a legend.
- The over-permissioned row has three mitigations and will be visually taller. Do not try to balance
  it — the imbalance correctly signals that permissions are the hardest of the four to get right.
