---
name: accessibility-release-review
description: "Use before merging a PR or cutting a release that touches TangyWebAi Vue views or components, or when asked for an accessibility check, a11y review, or release review. Reviews keyboard access, labels, focus behavior, and error messaging; read-only unless fixes are explicitly requested."
argument-hint: "Optional: specific view/component path(s) or PR scope to review"
---

# Accessibility Release Review

Read-only review of TangyWebAi Vue components for accessibility regressions before a release or merge.

## When to use

- Before merging a PR that adds or changes files under `TangyWebAi/src/views/` or `TangyWebAi/src/components/`.
- Before tagging a release.
- When the user asks for an "accessibility review", "a11y check", or "release review".

## Stance

- Report findings only. Do not edit any file unless the user explicitly asks for fixes in this session.
- State assumptions and any tooling gaps explicitly rather than skipping a check silently.

## Procedure

1. **Determine scope.** Use any file/component path or PR description given as an argument. Otherwise, scope to `.vue` files changed versus the base branch (`git diff --name-only` against `main` or the tracked upstream) under `TangyWebAi/src/`; if that yields nothing usable, scope to all files in `TangyWebAi/src/views/` and `TangyWebAi/src/components/`.
2. **Inspect each in-scope component** against the [accessibility checklist](./references/checklist.md), specifically:
   - Keyboard access: no click-only handlers, logical tab order, Escape closes dialogs/modals.
   - Labels: every form control has a visible `<label>` (linked via `for`/`id` or wrapping) or a justified `aria-label`; icon-only buttons have an accessible name.
   - Focus behavior: focus moves into opened dialogs and returns to the trigger on close; focus-visible states aren't suppressed.
   - Error/status messaging: validation and load errors are in the DOM with `role="alert"` or `role="status"` and readable text, not color/icon alone.
3. **Cross-check against the project's existing accessibility rules** in [vue-components.instructions.md](../../instructions/vue-components.instructions.md) — treat any deviation from those rules as a finding; do not restate the whole file in the report.
4. **Run available validation commands** from `TangyWebAi`:
   - `npm run type-check`
   - `npm test`
   There is no dedicated accessibility linter or automated checker (e.g. axe-core, pa11y, eslint-plugin-vuejs-accessibility) installed in this repo as of this writing — note this as missing tooling rather than treating the manual review as equivalent to automated coverage.
5. **Report using the exact template** in [report-template.md](./references/report-template.md). One row per finding, grouped by component/file, each with a severity.
6. If the user asks for fixes after seeing the report, exit read-only mode and make the smallest safe change per finding, following the repository's standard instructions and validation steps — do not bundle unrequested refactors into a fix pass.

## Output

Always end with the structured report from the template, including its "Assumptions & Missing Tooling" section.
