# SETUP — before you press record

Committed files are only half the configuration. Rulesets, environments and default token
permissions live in the GitHub UI and cannot be committed. Do these in order.

> **Currency warning.** Every UI path below was correct for the concepts as described in the
> Microsoft Learn module, but GitHub's settings pages move. Confirm each path in the UI before
> recording rather than narrating from this file.

---

## 0. Pre-flight

- [ ] Confirm your Copilot plan includes the **coding agent**. Check `docs.github.com` for the
      current list of qualifying plans — do not rely on memory, this has changed more than once.
- [ ] Confirm the coding agent is enabled for the account or org that will own the repo.
- [ ] Decide **public or private**. Some environment protection rules have historically been
      unavailable on private repos on lower plans. If the environment gate does not appear, make
      the repo public — that gate is the best shot in Part 2 and worth the trade.
- [ ] Replace `@REPLACE-WITH-YOUR-USERNAME` in `.github/CODEOWNERS` with your handle.
      CODEOWNERS silently does nothing if the handle is wrong. Verify by opening a throwaway PR
      and confirming the review request actually appears.

## 1. Create the repo

```bash
git init -b main
npm install
npm run lint && npm run build && npm test   # all three must pass before you push
git add .
git commit -m "Initial commit: severity helper plus governance scaffolding"
gh repo create agentic-guardrails-demo --public --source=. --push
```

## 2. Default workflow token permissions

**Settings → Actions → General → Workflow permissions**

- [ ] Set to **Read repository contents and packages permissions**
- [ ] Leave "Allow GitHub Actions to create and approve pull requests" **unchecked**

This is a good five-second shot for Part 2. Frame the toggle, do not narrate the whole page.

## 3. Ruleset on `main`

**Settings → Rules → Rulesets → New branch ruleset**

- [ ] Name: `main protection`
- [ ] Enforcement status: **Active**
- [ ] Target branches: include **default branch**
- [ ] Restrict deletions
- [ ] Block force pushes
- [ ] **Require a pull request before merging**
  - [ ] Required approvals: **1**
  - [ ] **Require review from Code Owners** — without this the CODEOWNERS file is decorative
  - [ ] Dismiss stale pull request approvals when new commits are pushed
- [ ] **Require status checks to pass**
  - [ ] Add `Type check`
  - [ ] Add `Unit tests`
  - [ ] Require branches to be up to date before merging

> The status check names must match the `name:` values of the jobs in `ci.yml`. They will not
> appear in the picker until each check has run at least once. Open a throwaway PR first.

## 4. Production environment

**Settings → Environments → New environment → `production`**

- [ ] Add yourself under **Required reviewers**
- [ ] Add an environment secret `DEPLOY_TOKEN` with any dummy value

The `deploy.yml` job will then sit and wait for approval on every push to `main`. That waiting
job is the shot.

## 5. Verify the guardrails actually bite

Do not skip this. Discovering on camera that a control was never enabled is unrecoverable.

- [ ] Open a throwaway PR. Confirm the two checks run.
- [ ] Confirm the merge button is disabled with a stated reason before approval.
- [ ] Confirm a review request lands on you via CODEOWNERS.
- [ ] Push to `main` and confirm the deploy job pauses on the environment gate.
- [ ] Close and delete the throwaway PR and branch. Reset the repo to a clean state.

## 6. Build the anti-pattern branch

This branch is prepared **in advance** and never touched by the agent. It is the contrast shot
in Part 3.

```bash
git checkout -b demo/anti-pattern
```

Apply the changes described in [anti-pattern/README.md](anti-pattern/README.md), commit, push,
and open a pull request with the deliberately empty description from that same folder.

- [ ] Confirm this PR shows a **green build** despite being obviously unmergeable on review.
      If the build goes red the whole point collapses — the danger is that it looks fine.

---

## Demo run sheet

Record in one continuous session. Cut it apart later. Do not re-shoot in three separate takes
or the repository state will drift between parts and the audience will notice.

| # | Shot | Lands in |
| --- | --- | --- |
| 1 | Repo settings: the ruleset and the environment, already configured | P2 |
| 2 | Open an issue using the Agent task template | P1 |
| 3 | Assign the issue to Copilot. Hold on the assignee sidebar. | P1 |
| 4 | *(cut — the agent takes minutes)* | — |
| 5 | The pull request appears. Read the plan in the description aloud. | **P1 ending** |
| 6 | The workflow approval gate. Approve it. Checks start running. | **P2 opening** |
| 7 | CODEOWNERS review request arrives | P2 |
| 8 | Merge button disabled, with the stated reason visible | P2 |
| 9 | Try to merge anyway. It refuses. | **P2 ending** |
| 10 | Switch to the anti-pattern PR. Green build, no plan, `write-all` in the diff. | P3 |
| 11 | Back to the good PR. Walk the six-point rubric aloud. | P3 |
| 12 | Approve. Merge. | P3 |
| 13 | Walk the audit trail **backwards**: merge commit → approval → checks → commits → plan → issue | **P3 climax** |
| 14 | The deploy job waiting on the environment gate | P2 or P3 |

### Capture notes

- Full-screen capture. Zoom is applied later in Filmora, so do not zoom in the browser — it
  degrades the source for no benefit.
- Browser at 1920x1080, no bookmarks bar, no extensions visible, a clean profile.
- Keep the diff small enough to fit one screen without scrolling. If the agent returns something
  sprawling, close the PR, tighten the issue, and run it again.
- The agent's response is not deterministic. Budget for two or three attempts before you get a
  run clean enough to narrate.
- If the agent's plan is thin, do **not** edit it to look better. A mediocre real plan is more
  useful to the audience than a polished fake one, and Part 3 can review it honestly.
