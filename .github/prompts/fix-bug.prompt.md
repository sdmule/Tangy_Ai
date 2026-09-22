---
description: "Investigate and fix a reported bug with the smallest safe code change, then report the cause and update."
argument-hint: "Describe the bug, expected behavior, and any error output"
agent: "agent"
model: Claude Sonnet 5 (copilot)
tools: ["read", "edit", "execute", "search", "web", "agent", "todo"]
---

Investigate and fix this bug: ${input:bug}

1. Start from the most relevant failing behavior, error, test, file, or symbol. Read only enough nearby code to form one falsifiable root-cause hypothesis and identify the cheapest check that can disprove it.
2. Preserve existing architecture, public APIs, and unrelated user changes. Follow all applicable repository and path-specific instructions.
3. Fix the root cause with the smallest safe, maintainable code change. Do not refactor adjacent code, add dependencies, or expand scope unless required to resolve the bug safely.
4. Add or update a focused test when the bug affects testable behavior. Run the narrowest relevant validation first, then any required project validation when practical.
5. In the final response, use exactly these sections:

## What was wrong

State the confirmed root cause and the affected behavior.

## What changed

List the minimal files and behavior updated.

## Verification

List the commands or checks run and their results. Clearly state anything that could not be run.
