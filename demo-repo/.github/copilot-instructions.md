# Instructions for coding agents

## Always state a plan first

Before changing any file, write a plan into the pull request description using the
four headings from `.github/pull_request_template.md`: **Plan**, **Scope**,
**Success criteria**, **Rollback / escalation**.

Do not leave any of those four sections empty. A reviewer decides whether to read the
diff based on the plan, so an empty plan makes the pull request unreviewable.

## Stay inside the stated scope

Only change files you listed under **Scope**. If you discover during the work that
another file must change, update the Scope section and say why. Do not silently widen
the changeset.

Unrelated formatting, dependency bumps, and refactors belong in a separate pull request.

## Do not weaken the checks

Never change these without saying so explicitly in the plan and calling it out at the
top of the pull request description:

- `.github/workflows/**` — especially any `permissions:` block
- `.github/CODEOWNERS`
- `tsconfig.json` strictness settings

Never widen workflow token permissions. `permissions: contents: read` is the default in
this repository and jobs should elevate only if the task genuinely requires it, with a
one-line justification in the workflow file.

## Tests

Do not modify existing tests to make a change pass. If a test is wrong, say so in the
plan and explain why before changing it.

If the change alters behaviour, add a test for the new behaviour. Run `npm run lint`,
`npm run build` and `npm test` before opening the pull request.

## Project shape

- `src/` — TypeScript source, compiled to `dist/`
- Tests live next to source as `*.test.ts` and run on the compiled output via `node --test`
- No runtime dependencies. Keep it that way.
