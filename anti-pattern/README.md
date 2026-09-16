# The anti-pattern branch

Prepared by hand, in advance. The agent never touches this branch.

This is the contrast shot in Part 3. Everything a lazy reviewer looks at says yes. Every item on
the six-point rubric says no.

## Why it has to look fine

The build must be **green**. If CI goes red, the audience concludes that the system caught it and
the argument evaporates. The entire point is that a passing build tells you almost nothing.

## Apply these changes on `demo/anti-pattern`

### 1. Widen the workflow token

In `.github/workflows/ci.yml`, replace the permissions block:

```yaml
# before
permissions:
  contents: read

# after
permissions: write-all
```

No justification comment. That absence is the tell.

### 2. Make a real but unnecessary change to `src/severity.ts`

Something small and defensible in isolation — for example, extracting the two weight tables into a
single combined lookup. It works. The tests pass. It was not asked for.

### 3. Change a test to fit the code

Modify one assertion in `src/severity.test.ts` so it matches the new implementation rather than the
requirement. This is the most important detail on the branch and the easiest to miss on camera, so
plan the zoom for it.

### 4. Add an unrelated file

Drop in a `.editorconfig` or reformat an untouched file. Scope creep, visible in the file count.

## The pull request description

Paste exactly this. Nothing more.

```text
Refactor severity lookup.
```

Four words. No Plan. No Scope. No Success criteria. No Rollback. The template was there; it was
deleted.

## Scoring it against the rubric, on camera

| Check | Verdict | Why |
| --- | --- | --- |
| Intent | ❌ | Four words. There is no plan to review. |
| Scope | ❌ | Four files changed. Nothing declared what should have changed. |
| Evidence | ⚠️ | Checks pass — but a test was edited to make them pass |
| Ownership | ❌ | `.github/workflows/` changed; CODEOWNERS review is the only thing standing between this and main |
| Policy | ❌ | `write-all` contradicts the repository's least-privilege default |
| Fallback | ❌ | Not stated |

## The line to say over this shot

> "Green build. Small diff. Reasonable-sounding title. If your review process is 'did CI pass',
> this merges. And the thing that just merged widened the permissions on the workflow that
> validates every future change."

## Do not

- Do not make the change malicious or obviously broken. Sabotage is easy to spot and teaches
  nothing. Plausible negligence is the realistic failure mode.
- Do not let this branch merge, even accidentally. Close the pull request on camera at the end of
  Part 3.
