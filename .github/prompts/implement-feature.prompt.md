---
description: "Implement an approved feature specification with focused changes, tests, and validation."
argument-hint: "Provide the approved feature requirements or reference the approved plan"
agent: "agent"
model: Claude Sonnet 5 (copilot)
tools: ["read", "edit", "execute", "search", "web", "agent", "todo"]
---

Implement this approved feature: ${input:requirements}

1. Treat the supplied requirements as the source of truth. Start from the most relevant file, symbol, test, or implementation-plan item and inspect only enough nearby code to confirm the owning path and existing conventions.
2. Before editing, state one concise implementation hypothesis, the smallest change that will test it, and the cheapest focused validation that could disprove it. Resolve contradictions or blocking ambiguities before making code changes.
3. Preserve existing architecture, public APIs, unrelated user changes, and repository conventions. Reuse existing typed models, services, utilities, components, and dependencies. Do not add dependencies or refactor adjacent code unless the approved requirements require it.
4. Implement the smallest maintainable change in the appropriate layers. Include loading, empty, success, validation, error, and accessibility states where the feature needs them. Keep Firebase access in the service layer and follow all applicable scoped instructions.
5. Add or update focused tests for changed behavior. After the first substantive edit, run the narrowest relevant test, type check, lint, or build validation before making further changes. Repair failures in the same slice and rerun that focused check.
6. Run broader project validation when practical, report failures that are unrelated to this feature, and do not claim success for checks that were not run. Do not commit changes or modify unrelated files.
7. In the final response, use exactly these sections:

## What Was Implemented

Summarize the feature behavior delivered and any approved assumptions used.

## Files Changed

List the minimal files changed and the responsibility of each change.

## Verification

List every focused and broader command or check run, with results. Clearly state anything that could not be run.

## Notes

Mention remaining risks, follow-up decisions, or known unrelated failures. If none remain, say so.
