---
description: "Analyze and plan a new feature before implementation, producing an implementation-ready specification."
argument-hint: "Describe the feature, user problem, expected behavior, and constraints"
agent: "agent"
model: Claude Sonnet 5 (copilot)
tools: ["read", "search", "web", "agent", "todo"]
---

Plan this feature without implementing it: ${input:feature}

1. Start from the requested user problem and inspect the nearest relevant files, symbols, tests, and project instructions. Read only enough code to understand the owning abstraction and existing patterns.
2. Identify ambiguities, missing decisions, dependencies, data-model implications, UI states, validation rules, error handling, accessibility needs, and likely compatibility risks. Ask focused clarifying questions only when the missing information prevents a useful plan; otherwise state explicit assumptions.
3. Define the smallest maintainable implementation that fits the existing architecture. Reuse existing services, utilities, components, models, and test patterns before proposing new abstractions or dependencies.
4. Specify the files or modules likely to change, the behavior each change owns, focused tests to add or update, and the narrowest validation commands to run first. Do not edit files or claim that the feature is implemented.
5. In the final response, use exactly these sections:

## Understanding

Summarize the user problem, intended behavior, assumptions, and unresolved questions.

## Requirements

List functional requirements, non-functional requirements, edge cases, and acceptance criteria in concrete terms.

## Implementation Plan

List the proposed changes in implementation order, including likely files, ownership boundaries, data flow, and test coverage.

## Validation

List the focused tests and project checks that should be run, including expected outcomes.

## Risks

List meaningful technical risks, compatibility concerns, and decisions that require approval before implementation.
