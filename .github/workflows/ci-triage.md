---
on:
  workflow_dispatch:
permissions:
  contents: read
  actions: read
  issues: read
network: defaults
tools:
  github:
safe-outputs:
  create-issue:
    title-prefix: "[ci-triage] "
    labels: [agent-report]
    max: 1
---

# CI failure triage

Look at the last five runs of the CI workflow on `main`.
For any failed run, find the failing test and the first error line.
Group failures that look like the same cause.
Open one issue summarising: failing test, run links, likely cause (code, test, or environment), suggested next step.
If nothing failed, do nothing.
