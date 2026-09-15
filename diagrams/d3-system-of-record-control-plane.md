---
title: "D3 - GitHub as System of Record and Control Plane"
description: "Original Mermaid diagram showing the passive record layer and the active control layer sharing the same pull request object."
author: Gaurav Khurana
ms.date: 2026-09-02
ms.topic: reference
keywords: [mermaid, diagram, github control plane, system of record]
---

# D3 — System of Record vs Control Plane

**Used in:** Part 2, section 3. Full-bleed slide, revealed in two passes — record layer first, then
control layer drops in on click.

**Point it must make:** the same pull request sits in both layers. One layer remembers, the other
layer enforces. An agent does not need a parallel governance system.

```mermaid
flowchart TB
    subgraph REC["SYSTEM OF RECORD — what happened"]
        direction LR
        R1["Repos and branches<br/><i>what exists</i>"]
        R2["Commits<br/><i>what changed</i>"]
        R3["Issues and discussions<br/><i>intent</i>"]
        R4["Workflow runs and artifacts<br/><i>evidence</i>"]
        R5["Review history<br/><i>decisions</i>"]
    end

    PR(["PULL REQUEST<br/>the shared object"])

    subgraph CTL["CONTROL PLANE — what is allowed next"]
        direction LR
        C1["Required reviews<br/><i>human approval gate</i>"]
        C2["Required status checks<br/><i>CI evidence before merge</i>"]
        C3["CODEOWNERS<br/><i>review routing by path</i>"]
        C4["Rulesets / branch protection<br/><i>centralised branch policy</i>"]
        C5["Environments<br/><i>approvals for secrets and deploys</i>"]
    end

    R1 --- PR
    R2 --- PR
    R3 --- PR
    R4 --- PR
    R5 --- PR

    PR --> C1
    PR --> C2
    PR --> C3
    PR --> C4
    PR --> C5

    C1 & C2 & C3 & C4 & C5 --> GATE{"Merge allowed?"}
    GATE -->|"all satisfied"| MERGE["Merge to main"]
    GATE -->|"anything unmet"| BLOCK["Blocked"]

    classDef record fill:#0f2a33,stroke:#22D3EE,stroke-width:1px,color:#e6f7fb
    classDef control fill:#332a0f,stroke:#FBBF24,stroke-width:1px,color:#fdf6e6
    classDef pr fill:#22D3EE,stroke:#22D3EE,color:#0B0F14
    classDef gate fill:#0B0F14,stroke:#FBBF24,stroke-width:2px,color:#FBBF24
    classDef good fill:#0f331f,stroke:#4ade80,color:#e6fbef
    classDef bad fill:#331414,stroke:#f87171,color:#fbe6e6

    class R1,R2,R3,R4,R5 record
    class C1,C2,C3,C4,C5 control
    class PR pr
    class GATE gate
    class MERGE good
    class BLOCK bad
```

## Narration anchor

> "Everything on the top half is memory. Everything on the bottom half is a gate. And the pull
> request is the one object that lives in both — which is why the agent does not need a governance
> system of its own. It walks into yours."

## Build notes

- Record layer in cyan `#22D3EE`, control layer in amber `#FBBF24`. Amber is reserved for enforcement
  throughout the series, so the colour itself carries meaning by Part 3.
- On the slide, the "Blocked" branch should animate in last. That is the beat where the audience
  realises the guardrail is real.
- If the diagram is too wide at 1920x1080, drop `R1` and render the record layer as four nodes. The
  branch/repo node is the least load-bearing.
