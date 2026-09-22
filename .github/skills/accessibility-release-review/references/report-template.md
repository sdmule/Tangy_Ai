# Accessibility Release Review Report Template

Use this structure exactly for every review. Keep it read-only — do not describe changes as already made unless fixes were explicitly requested and applied in this session.

---

## Scope

State which files/components were reviewed and how the scope was determined (explicit request, git diff, or full views/components sweep).

## Findings

| Component/File                | Category       | Finding                                        | Severity |
| ----------------------------- | -------------- | ---------------------------------------------- | -------- |
| e.g. `src/views/MenuView.vue` | Focus behavior | Modal open does not move focus into the dialog | High     |

Categories: Keyboard access · Labels and names · Focus behavior · Status/error messaging · Structure.
Severity: High (blocks a user from completing a task) · Medium (usable but degraded) · Low (polish/best practice).

If no findings in a category, state "No findings" rather than omitting the category.

## Validation Run

List each command executed (e.g. `npm run type-check`, `npm test`) from `TangyWebAi`, and its result. State clearly if a command could not be run.

## Assumptions & Missing Tooling

- State any assumptions made about scope or intended behavior.
- State any accessibility tooling that is not installed in this repo (e.g. no automated axe/pa11y/eslint accessibility linter as of this review) and that findings above are from manual inspection only.

## Recommended Next Step

One sentence: whether this is release-ready, needs fixes first, or needs a scope clarification.
