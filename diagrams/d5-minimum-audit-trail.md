---
title: "D5 - Minimum Audit Trail for an Agent Contribution"
description: "Original Mermaid diagram showing the six links that make an agent contribution reconstructable after the fact."
author: Gaurav Khurana
ms.date: 2026-09-02
ms.topic: reference
keywords: [mermaid, diagram, audit trail, traceability, agent contribution]
---

# D5 — Minimum Audit Trail

**Used in:** Part 3, section 6. Built link by link on click, then the whole chain is walked backwards
on screen against the real merged PR from the demo.

**Point it must make:** six links. Break any one and you cannot reconstruct what happened. This is not
a compliance checkbox — it is the thing you need at 2am.

```mermaid
flowchart LR
    G["1. STATED GOAL<br/><i>issue link or PR description</i>"]
    P["2. INSPECTABLE PLAN<br/><i>PR plan section</i>"]
    C["3. BOUNDED CHANGESET<br/><i>branch and commits</i>"]
    E["4. AUTOMATED EVIDENCE<br/><i>workflow run and artifacts</i>"]
    H["5. HUMAN JUDGMENT<br/><i>review and approval</i>"]
    O["6. CLEAR OUTCOME<br/><i>merge, revert or escalation</i>"]

    G --> P --> C --> E --> H --> O

    O -.->|"when something breaks,<br/>walk it backwards"| G

    classDef link fill:#0f2a33,stroke:#22D3EE,stroke-width:1px,color:#e6f7fb
    classDef human fill:#332a0f,stroke:#FBBF24,stroke-width:2px,color:#fdf6e6

    class G,P,C,E,O link
    class H human
```

## The four post-incident questions

Put these on the slide underneath the chain, revealed after the backwards arrow appears.

1. Was there a visible plan and scope?
2. Were the right reviewers requested — and did they approve?
3. Did the checks match the risk of the change?
4. Is the audit trail sufficient to reconstruct what happened?

## Narration anchor

> "Six links. And notice that link five is the only one a machine cannot produce for you. Everything
> else GitHub records automatically. The human judgement is the part that has to be deliberately
> added — which is exactly the part that gets skipped when the volume goes up."

## Build notes

- Link 5 is amber, every other link is cyan. That single colour break is the whole argument of the
  slide and needs no explanation.
- The dotted backwards arrow should animate last and slowly. The forward chain is how work happens;
  the backwards walk is how incidents get solved.
- When walking this against the real PR on camera, start at the merge commit and click backwards.
  Going forwards feels like a tour. Going backwards feels like an investigation, which is the point.
