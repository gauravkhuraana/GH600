---
title: "Agentic AI Foundations in GitHub - Recording Preparation Notes"
description: "Internal research reference covering all eight units of the Microsoft Learn module Foundations of Agentic AI in GitHub, angled for a QA and SDET audience, with verified facts, misconceptions, demo ideas, interview questions and items to confirm before recording."
author: Gaurav Khurana
ms.date: 2026-09-02
ms.topic: reference
keywords: [agentic ai, github copilot coding agent, agent lifecycle, control plane, codeowners, rulesets, contributor model, qa, sdet]
---

# Agentic AI Foundations in GitHub — Recording Preparation Notes

Shared across all three parts. Every claim in the three scripts should be traceable to a row in this
document. If it is not in here, it does not go in the narration.

## Verified Facts

Verified against the rendered Microsoft Learn unit pages on 2026-09-02.

| Claim | Basis |
| --- | --- |
| The module is named *Foundations of Agentic AI in GitHub* and contains 8 units | Module landing page, unit list |
| It is module 1 of 3 in *Developing in Agentic AI Systems Part 1 of 2*; the others are *Designing Agent Architecture and SDLC Integration* and *Tooling, MCP, and Agent Execution Environments* | Learning path page |
| Module level is Intermediate; roles listed are DevOps Engineer, Administrator, Developer, Solution Architect | Module landing page, At a glance |
| An assistant is reactive: it responds, suggests, and returns control to the user | Unit 2 |
| An agent is goal-driven: it interprets a task, plans, uses tools, produces durable artifacts, and iterates on feedback | Unit 2 |
| Durable artifacts named in the module are branches, commits, and pull requests | Unit 2 |
| "An agent does not replace the workflow. It enters the workflow as a participant." | Unit 2, verbatim |
| The example agent branch naming in the module is `agent/bump-dep-2026-04-03` | Unit 2, implementation examples |
| The lifecycle is plan → act → evaluate, and it is explicitly a **loop**, not a one-time sequence | Unit 3 |
| Plans should be structured, reviewable artifacts — not hidden internal state | Unit 3 |
| A reviewable plan includes scope, success criteria, and a rollback or escalation path | Unit 3, Tip callout |
| Evaluation signals named are workflow runs and status checks, code review feedback, and security signals (code scanning, secret scanning, dependency alerts) | Unit 3 |
| "Agent evaluation must be grounded in system signals, not in the agent's confidence." | Unit 3, verbatim |
| Rulesets and branch protection turn evaluation into an enforceable gate rather than an informal suggestion | Unit 3 |
| GitHub is the system of record because it stores repos and branches, commits and PRs, issues and discussions, workflow runs and artifacts, and review history | Unit 4 |
| The six controls named are pull requests, required reviews, required status checks, CODEOWNERS, rulesets/branch protection, and environments | Unit 4, Controls at a glance table |
| Enabling required checks and rulesets is typically an admin task | Unit 4, Note callout |
| "What the agent can do" often reduces to "what the workflow token and tool credentials can do" | Unit 4 |
| The module explicitly does not cover GitHub Advanced Security features such as secret scanning and push protection in depth | Unit 4, Note callout |
| Accountable parties are those who defined the task, set permissions, chose and configured controls, and approved the change | Unit 5 |
| The four anti-patterns are planless execution, over-permissioned agents, hidden reasoning, and blind trust in automation | Unit 5 |
| "A passing build does not automatically mean the change is complete, appropriate, or low risk." | Unit 5 |
| The minimum audit trail has six links: stated goal, inspectable plan, bounded changeset, automated evidence, human judgment, clear outcome | Unit 5 |
| Org audit log availability depends on org and enterprise configuration | Unit 5 |
| The contributor model avoids two opposite errors: excessive suspicion and excessive trust | Unit 6 |
| "Evaluate the work by the standards of the workflow, not by the novelty of the author." | Unit 6, verbatim |
| The review rubric has six checks: intent, scope, evidence, ownership, policy, fallback | Unit 6 |
| Good agent contributions are understandable, bounded, reviewable, policy-compliant, reconstructable | Unit 6 |
| `MicrosoftDocs/learn-pr` returns 404 — the source repository for this content is private | Attempted fetch, 2026-09-02 |

## Needs Verification Before Recording

Do not narrate any of these until confirmed against `docs.github.com`. Product surfaces change faster
than training modules. Every one of these is a claim a commenter will correct you on.

| Item | What to confirm |
| --- | --- |
| Copilot coding agent licence tiers | Which Copilot plans include the coding agent today. Confirm whether Pro+ / Business / Enterprise is still accurate and whether Pro was added. |
| Enabling the coding agent | Whether it is on by default or requires an org policy toggle, and where that toggle lives |
| Assigning work to the agent | Exact current mechanism — assign an issue to Copilot from the issue sidebar, and/or the Agents page. Confirm the label used in the assignee list. |
| Draft PR behaviour | Whether the coding agent still opens its pull requests as drafts by default |
| Self-approval | Confirm the agent cannot approve its own pull request and that a human approval is always required |
| Workflow approval gate | The exact current UI string. The module implies "Approve and run workflows". Confirm the wording and whether it applies to coding agent PRs specifically. |
| `.github/copilot-instructions.md` | Confirm the coding agent reads this file, and whether `AGENTS.md` is now the preferred filename |
| Agent firewall / allow-list | Whether the coding agent's network access is restricted by default and where that is configured |
| Default `GITHUB_TOKEN` permissions | Current default for new repos and orgs, and the exact settings path to change it |
| Rulesets vs branch protection | Which is the default UI now, and whether classic branch protection is deprecated or merely legacy |
| CODEOWNERS + required reviews interaction | Confirm CODEOWNERS review requests are only *enforced* when "Require review from Code Owners" is enabled in the ruleset |
| Environments on private repos | Confirm environment protection rules are available on the plan you record with — historically these were restricted on private repos on free plans |
| Copilot code review | Whether Copilot can be added as a reviewer on a PR, and whether that counts toward required approvals (it should not) |

## Removed or Corrected From User Input

| Original assumption | Correction |
| --- | --- |
| "MS might be maintaining a GitHub page for all the Learn documentation" | Partially true. `MicrosoftDocs/learn` and several docs repos are public, but `MicrosoftDocs/learn-pr` — which holds this module — returns 404 and is private. There is no markdown source to pull. Content in this document was reconstructed from the rendered unit pages. |
| "We can use images from these pages" | The media files are reachable at `learn.microsoft.com/en-us/training/github/foundations-agentic-ai/media/<name>.png`, but they are Microsoft copyright. Using them in a monetised YouTube video is a needless risk. All six diagrams are being recreated as originals (D1–D6). Use the Microsoft versions as reference only. |
| Three proposed topics: agentic system vs chatbot, agent lifecycle, policy for reviewing AI work | These map to units 2, 3, and 5–6. Unit 4 — GitHub as the control plane — was missing from the proposal and is the strongest material in the module for a QA audience. It became the whole of Part 2. |
| "Agentic system vs simple AI chatbot" | The module's framing is assistant vs agent, not chatbot vs agent. "Chatbot" is the wrong axis — the distinction is not conversational versus non-conversational, it is whether the system takes durable action. Use the module's framing. |

## 1. Topic Overview

Most developers and testers have used AI in one shape: you ask, it answers, you decide what to do
with the answer. Control never leaves your hands. That is an assistant.

An agent is a different arrangement. You give it a goal. It works out the steps, uses tools to
execute them, produces real artifacts in your repository, reads the feedback those artifacts
generate, and revises. Control leaves your hands for a period of time and comes back to you at a
checkpoint — in GitHub, that checkpoint is the pull request.

That single change forces a question every QA person should recognise: if something can now make
changes without a human at every step, what stops a bad change from reaching production? The module's
answer is that nothing new is needed. The controls that already stop bad *human* changes — pull
requests, required reviews, required checks, code owners, branch policy, environment approvals — are
exactly the controls that stop bad *agent* changes. GitHub becomes both the record of what happened
and the enforcement point for what is allowed.

For a QA audience the takeaway is uncomfortable in a good way. The bottleneck moves. Writing the
change gets cheap; deciding whether the change is safe does not get cheaper. Review capacity becomes
the constraint, and review capacity is the thing QA has always owned.

## 2. Key Concepts and Terminology

### Core distinctions

| Term | Definition | The tell |
| --- | --- | --- |
| Assistant | Reactive AI that produces suggestions or explanations and returns control to the user | No repository actions. You apply every step manually. |
| Agent | Goal-driven AI that maintains a goal across steps, decides intermediate actions, uses tools, creates durable artifacts, and iterates on feedback | There is a branch and a pull request it created |
| Durable artifact | Something that persists in the repository after the AI stops running | Branch, commit, pull request, issue comment |
| Tool use | The agent calling something outside itself — GitHub API, CI, repository write operations | Not covered in depth in this module; that is module 3 of the path |

### Lifecycle terms

| Term | Meaning in GitHub |
| --- | --- |
| Plan | The stated approach before execution. Lives in the PR description or a linked issue. Should carry scope, success criteria, rollback path. |
| Act | Execution bounded to a branch — file changes, commits, opening and updating the PR, responding to review |
| Evaluate | Reading system signals: status checks, review feedback, security alerts |
| Loop | Failing evaluation sends the agent back to plan or act. The work is not done when the agent says it is done. |

### Governance terms

| Term | Meaning | Who can configure it |
| --- | --- | --- |
| System of record | The place that stores what was proposed, why, what evidence existed, and what was decided | n/a |
| Control plane | The place where enforcement happens — where a merge can actually be blocked | Admin |
| CODEOWNERS | A file that routes review requests by file path | Anyone who can commit to the repo; *enforcement* needs a ruleset |
| Ruleset | Centralised branch policy — require PRs, approvals, status checks, block force pushes | Repo or org admin |
| Environment | A deployment target that can require named reviewers before a job runs, and gates secrets | Repo admin |
| Least privilege | Give the workflow token and tool credentials the narrowest access that works | Repo or org admin for defaults; anyone editing a workflow can narrow it per-job |
| Traceability | Being able to reconstruct after the fact what changed, who approved it, and what evidence existed | n/a |
| Contributor model | Judging a change by the standards of the workflow rather than by who or what authored it | n/a |

### Terms people confuse

| Confused pair | The actual difference |
| --- | --- |
| Agent vs agent mode | "Agent" is the behaviour pattern. "Agent mode" is a specific VS Code feature. The coding agent on github.com is a third thing. Be precise about which you are demoing. |
| Plan vs prompt | A prompt is your input. A plan is the agent's stated approach, and it should be visible to reviewers. |
| Evidence vs confidence | Evidence is a check result or a scan alert. Confidence is the agent's own summary of how it went. Only one is admissible. |
| CODEOWNERS vs required reviews | CODEOWNERS decides *who* gets asked. Required reviews decides *whether an approval is mandatory*. You need both. |
| Rulesets vs branch protection | Two generations of the same idea. Rulesets are the newer, org-scalable version. |

## 3. How It Actually Works

### The loop, step by step

**Plan.** The agent receives a goal — typically an issue. It produces an approach. In a well-run
setup that approach is written into the pull request description or a checklist on the issue, so a
human can read it *before* reading the diff. A plan worth reviewing answers three things: what will
change, how we will know it worked, and what we do if it did not.

**Act.** The agent creates a branch, edits files, commits, and opens a pull request. Every one of
those actions is bounded. It is not writing to `main`. It is not deploying. It is proposing. When
review comments arrive, it can push follow-up commits to the same branch.

**Evaluate.** Signals come back from the system, not from the agent:

- Status checks — build, test, lint
- Review feedback — requested changes, approvals
- Security signals — code scanning results, secret scanning alerts, dependency alerts

If a check fails or a requirement is unmet, the loop continues. Revise the plan, adjust the change,
re-evaluate, or escalate to a human. The module is blunt about this: the work is not complete just
because the agent stopped.

### Where enforcement actually happens

A useful mental model is two layers over the same artifacts.

The **record** layer is passive. Repos, branches, commits, PRs, issues, workflow runs, artifacts,
review history. It answers "what happened".

The **control** layer is active. Required reviews, required status checks, CODEOWNERS routing,
rulesets, environment approvals, token permissions. It answers "what is allowed to happen next".

The same pull request object sits in both layers. That is the elegant part, and it is why the module
insists an agent does not need a parallel governance system — it enters the one you already have.

### Why permissions are the real boundary

The blunt version: an agent can do exactly what its credentials let it do, and nothing more. If the
workflow token can write to the repo, the agent's workflows can write to the repo. If a job can read
a production secret, the agent's path to that secret is open.

So the practical controls are:

- Set default workflow token permissions conservatively — read-only where possible
- Elevate per job, not globally
- Put anything that touches secrets or deployments behind an environment with required reviewers

### The human gates that already exist

Two are worth showing on camera because they surprise people:

1. **Workflow approval for untrusted changes.** GitHub can require a human to explicitly approve
   running workflows on certain pull requests. This exists so privileged CI does not fire
   automatically on code nobody has looked at.
2. **Environment approvals.** A job targeting an environment with required reviewers simply waits.
   It does not fail, it does not skip — it sits there until a named human approves. Secrets stay
   sealed until then.

## 4. Common Misconceptions and Myths

| Misconception | Reality |
| --- | --- |
| "Agentic just means the AI is chattier" | The axis is durable action, not conversation. A silent tool that opens a PR is an agent. A talkative chatbot that opens nothing is an assistant. |
| "If it passed CI, it is safe to merge" | Checks validate only what they were designed to detect. A green build says the tests you have still pass. It says nothing about whether the change was the right change. |
| "The agent is responsible for its output" | Responsibility does not move with execution. The people who defined the task, set the permissions, configured the controls and approved the merge remain accountable. |
| "We need a new governance framework for AI" | The module's whole argument is the opposite. PRs, reviews, checks, CODEOWNERS, rulesets and environments already do this job. |
| "Agent PRs should get extra scrutiny because AI wrote them" | That is the excessive-suspicion failure mode. Apply the same standard, consistently. |
| "Agent PRs need less scrutiny because automation is consistent" | That is the excessive-trust failure mode, and it is the more dangerous of the two. |
| "The agent can just merge its own work if the tests pass" | Required reviews exist precisely to prevent this. A human approval should always be in the path. |
| "Traceability is a compliance checkbox" | It is an operational tool. When something breaks at 2am you need to reconstruct what changed, who approved it, and what evidence existed. |
| "Giving the agent broad permissions makes it more useful" | It makes the blast radius larger. Capability should be granted per task, not held permanently. |
| "This makes testers redundant" | It multiplies the volume of changes needing judgement while leaving the supply of judgement flat. |

## 5. Real-World Examples and Use Cases

### The module's own example — dependency bump

A security alert fires. The agent creates `agent/bump-dep-2026-04-03`, updates the dependency and
lockfile, opens a PR with a summary and plan, then waits for CI and review, revising if needed.

The assistant version of the same request: you ask "how do I safely update this dependency?" and get
recommended commands, a risk checklist, and suggested code. You still create the branch and the PR
yourself. Same information, entirely different division of labour.

### QA-flavoured scenarios worth naming on camera

**Flaky test triage.** An issue describes a test that fails one run in twenty. The agent proposes a
fix. The plan matters more than the diff here — did it identify the race condition, or did it just
add a retry and call it fixed? A retry that hides a real race is a change that passes CI and makes
the product worse. This is the single best illustration of "green build ≠ safe change" for a QA
audience.

**Test coverage gap.** An issue asks for tests around an uncovered branch. Evaluation is unusually
clean here because coverage is measurable. But watch scope: did it also refactor the code under test?
Tests that were changed to fit the code are not evidence.

**Dependency and lockfile updates at volume.** The realistic near-term case. Ten agent PRs a week,
each individually boring. This is where blind trust sets in, and where a required check plus
CODEOWNERS on sensitive paths earns its keep.

**Config and workflow file changes.** The highest-risk category and the reason CODEOWNERS should
guard `.github/workflows/` and `infra/`. A change to a workflow file can alter the very checks that
are supposed to validate it.

### Beginner scenario for the video

One issue, one agent, one PR, one review. Show the plan in the description, show the check running,
show the ruleset refusing merge, approve, merge. Ten minutes of real time, ninety seconds on screen.

### Advanced scenario for the video

The same repo, but the anti-pattern PR: no plan in the description, a workflow file changed to
`permissions: write-all`, and a green build. Everything a lazy reviewer looks at says yes. Every
item on the rubric says no. This is the moment the series earns its keep.

## 6. Comparison and Alternatives

### Assistant vs agent, side by side

| Dimension | Assistant | Agent |
| --- | --- | --- |
| Trigger | You ask | You set a goal |
| Steps | One turn | Many, across time |
| Memory of goal | Within the turn | Maintained across steps |
| Tools | None, or read-only context | GitHub API, CI, repo writes |
| Output | Text and suggestions | Branch, commits, pull request |
| Failure feedback | You notice | Checks, reviews, scans feed back in |
| Who applies the change | You | It does, on a branch |
| Where it stops | When it answers | At the pull request |

### The six controls, and who can turn them on

| Control | Enforces | Why it matters for agents | Admin needed |
| --- | --- | --- | --- |
| Pull requests | Changes are proposed before merging | Makes agent work reviewable and discussable | No |
| Required reviews | Human approval gate | Prevents unreviewed merges, supports accountability | Yes |
| Required status checks | CI evidence before merging | Converts evaluation into enforceable policy | Yes |
| CODEOWNERS | Review routing by path | Right experts supervise high-impact changes | File: no. Enforcement: yes. |
| Rulesets / branch protection | Centralised branch policy | Consistent guardrails, blocks unsafe merges | Yes |
| Environments | Approvals for deployments and secrets | Controls sensitive execution and secret access | Yes |

Say the admin column out loud in Part 2. Half the audience cannot enable these on Monday, and
pretending otherwise wastes their time. What they *can* do without admin rights: write a PR template
that demands a plan, add a CODEOWNERS file, narrow `permissions:` in workflow files they own, and
apply the review rubric.

### Where this module sits versus the rest of the path

| Module | Question it answers |
| --- | --- |
| 1. Foundations (this series) | What is an agent, and how does GitHub keep it accountable? |
| 2. Agent Architecture and SDLC Integration | How do you separate planning, reasoning and execution for reliability? |
| 3. Tooling, MCP and Execution Environments | How do agents get tools, and how do you bound what those tools can reach? |

## 7. Hands-On and Demo Ideas

### Demo environment

Repository `agentic-guardrails-demo`, deliberately tiny. A trivial TypeScript module with a handful
of tests — enough to produce a real green or red check and nothing more. The subject of the code is
irrelevant and should stay irrelevant; every second spent explaining the app is a second not spent on
governance.

Governance files committed to the repo:

- `.github/pull_request_template.md` — required Plan, Scope, Success criteria, Rollback sections
- `.github/CODEOWNERS` — routes `.github/workflows/` and `infra/` to the owner
- `.github/workflows/ci.yml` — explicit `permissions: contents: read`
- `.github/workflows/deploy.yml` — targets an environment with required reviewers
- `.github/copilot-instructions.md` — instructs the agent to always post a plan

Configured through the UI and therefore listed in `demo-repo/SETUP.md`, not committed:

- Ruleset on `main`: require a PR, require one approving review, require the CI check, block force pushes
- Environment `production` with a required reviewer
- Default workflow token permissions set to read-only

### Demo sequence — record once, continuous

1. Show the empty repo and the ruleset settings. Ten seconds. Establish that the guardrails existed
   before the agent did.
2. Open an issue describing a small, real change.
3. Assign the issue to Copilot. Show the assignment in the sidebar.
4. Cut. The agent takes minutes; the viewer does not.
5. The pull request appears. Read the plan in the description on camera. **This is the Part 1 ending.**
6. Show the workflow approval gate, approve, let CI run. **Part 2 opens here.**
7. Show CODEOWNERS requesting review, and the merge button disabled by the ruleset.
8. Switch to the pre-made `demo/anti-pattern` branch PR. Green build, no plan, `write-all` in the
   workflow diff. Contrast.
9. Back to the good PR. Walk the six-point rubric out loud. Approve. Merge. **Part 3 climax.**
10. Walk the audit trail backwards from the merge commit to the original issue.

### Optional demo: break it on purpose

Try to merge before approving. The button is disabled and the reason is stated. Four seconds of
footage, and it does more for the argument than any slide.

### Optional demo: the permissions diff

Put `permissions: contents: read` and `permissions: write-all` side by side in the same frame. Say
the line: what the agent can do is what the token can do.

## 8. Interview-Ready Points

**Q1. What makes an AI system agentic rather than assistive?**
Durable action. An assistant returns a suggestion and gives control back to you. An agent holds a
goal across multiple steps, decides intermediate actions, uses tools, and produces artifacts that
persist — a branch, commits, a pull request. The follow-up they usually ask: can an agent be wrong in
ways an assistant cannot? Yes — an assistant's mistake sits in your chat window, an agent's mistake
sits in your repository.

**Q2. Describe the agent lifecycle.**
Plan, act, evaluate — as a loop. Plan is the stated approach, and it should be an inspectable
artifact rather than hidden internal state. Act is bounded execution on a branch. Evaluate reads
system signals: checks, reviews, security alerts. Failing evaluation returns to plan or act. The task
is complete when the signals say so, not when the agent says so.

**Q3. Who is accountable when an agent ships a defect?**
The humans who defined the task, set the permissions, chose the controls, and approved the merge.
Responsibility does not transfer to the thing that executed the work. The system proposes; people
decide.

**Q4. What does GitHub being the "control plane" mean?**
It is where enforcement lives. Required reviews, required status checks, CODEOWNERS routing,
rulesets and branch protection, environment approvals — these determine what a change is actually
permitted to do, regardless of who or what authored it.

**Q5. Name the common anti-patterns in agent systems.**
Planless execution — a diff with no stated approach. Over-permissioned agents — broader token or
credential access than the task needs. Hidden reasoning — outputs without assumptions, scope or
decision trail. Blind trust in automation — treating a green build as sufficient evidence.

**Q6. How do you review an agent-authored pull request?**
The same way as any other, against six checks: intent, scope, evidence, ownership, policy, fallback.
Is there a clear goal and visible plan? Do the changed files match the plan? Do checks pass and are
logs available? Did the right code owners review sensitive areas? Does it comply with repository
policy? Is rollback or escalation clear for anything high risk?

**Q7. What is the minimum audit trail for an agent contribution?**
Six links: a stated goal, an inspectable plan, a bounded changeset, automated evidence, human
judgement, and a clear outcome. If any link is missing you cannot reconstruct what happened.

**Q8. Why is "CI passed" insufficient?**
Because checks only validate what they were built to detect. A passing build means the existing tests
still pass. It does not mean the change was appropriate, complete, or low risk. This is the same
argument QA has been making about coverage metrics for twenty years.

## 9. Common Mistakes and Best Practices

### What people get wrong first

- Judging agent PRs by author rather than by content — in either direction
- Reading the diff before reading the plan, which anchors you to *how* before you have decided *whether*
- Treating a green check as an approval
- Leaving default workflow token permissions wide open because narrowing them broke something once
- Adding CODEOWNERS but never enabling code-owner review in the ruleset, so it silently does nothing
- Letting agent PRs accumulate unreviewed because each one looks small

### What experienced people still miss

- Scope creep inside an otherwise-correct change. The fix is right; the four unrelated files are not.
- Changes to the checks themselves. A PR that modifies `.github/workflows/` can weaken the evidence
  that validates it. This is why CODEOWNERS on that path is not optional.
- Tests modified to match the code rather than the requirement
- Reviewing the final state and never reading the intermediate commits or the workflow logs
- Assuming the audit trail exists. It only exists if the goal was stated and the plan was recorded.

### Best practice checklist

- [ ] PR template with mandatory Plan, Scope, Success criteria, Rollback sections
- [ ] CODEOWNERS covering `.github/workflows/`, `infra/`, and anything security-sensitive
- [ ] Ruleset on the default branch requiring a PR, an approving review, and the CI check
- [ ] Code-owner review actually enabled in the ruleset, not just the file present
- [ ] Default workflow token permissions read-only, elevated per job where needed
- [ ] Environments with required reviewers guarding secrets and deployments
- [ ] A stated goal on every agent task — an issue, not a verbal request
- [ ] Read the plan before the diff, every time
- [ ] Same rubric for human and agent contributions

## 10. Resources and References

### Primary source

- Microsoft Learn — *Foundations of Agentic AI in GitHub*, all 8 units
- Microsoft Learn — *Developing in Agentic AI Systems Part 1 of 2* learning path
- Sibling modules: *Designing Agent Architecture and SDLC Integration*, *Tooling, MCP, and Agent Execution Environments*

### GitHub documentation to cite on screen

Name the doc page rather than reading a URL aloud. All of these need a currency check before
recording — see the verification table.

- GitHub Docs — Copilot coding agent: about, enabling, assigning issues
- GitHub Docs — Best practices for using Copilot coding agent
- GitHub Docs — Rulesets: available rules for branches
- GitHub Docs — About code owners
- GitHub Docs — Controlling permissions for `GITHUB_TOKEN`
- GitHub Docs — Using environments for deployment, protection rules
- GitHub Docs — Approving workflow runs from public forks
- GitHub Docs — Adding a pull request template to your repository

### Deliberately not linked

- Vendor comparisons between coding agents
- Anything about model internals or prompt engineering
- GitHub Advanced Security feature tours — the source module excludes them

## 11. Talking Points Not to Miss

### Main points, in priority order

1. The distinction is durable action, not conversation.
2. Plan → act → evaluate is a loop, and evaluation uses system signals rather than the agent's own confidence.
3. GitHub is both the record of what happened and the enforcement point for what is allowed.
4. Responsibility does not move with execution.
5. Review by the standard of the workflow, not the novelty of the author.
6. The bottleneck moves from writing to reviewing — which is a QA problem, and therefore a QA opportunity.

### Debate hooks for comments

- "If a human reviewer approves an agent PR without reading it, is that worse than no review at all?"
  It is, because it manufactures the appearance of judgement.
- "Should agent PRs be labelled?" Labelling is fine for metrics. Using the label to change the review
  standard is exactly the failure mode the contributor model warns about.
- "How many agent PRs a week before your review process breaks?" Ask it. Let them answer in comments.

### Pre-empt these objections

- *"This is just DevOps hygiene rebranded."* Yes. That is the argument, not an accusation. The claim
  is that existing hygiene is sufficient — and that most teams do not have it.
- *"I do not have admin rights, so none of this applies."* Half of it applies. PR templates,
  CODEOWNERS, workflow permissions in files you own, and the review rubric need no admin rights.
- *"Our agents are not allowed to write to the repo."* Then you are already applying least privilege.
  The rest still matters the day that changes.
- *"This is a Microsoft training module, so it is a sales pitch."* The controls named are generic
  version-control governance. Nothing in the six-control table is unique to Copilot.

## 12. SEO Keywords

```text
agentic ai in github
github copilot coding agent
ai agent vs ai assistant
agent lifecycle plan act evaluate
reviewing ai generated pull requests
github as control plane
codeowners for ai agents
github rulesets branch protection agents
least privilege github token
ai code review for testers
agentic ai for qa engineers
sdet agentic workflows
ai pull request review checklist
traceability ai generated code
contributor model agent generated work
agent anti patterns software development
github actions permissions least privilege
supervising ai coding agents
```
