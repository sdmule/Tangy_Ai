---
applyTo: "**/*.test.ts"
---

# Unit test conventions

- Use Vitest for all unit tests.
- Write one behavior per test and describe the behavior in the test name, not the function name.
- Mock the Firebase service layer, never Firestore APIs directly.
- Avoid snapshot tests; assert on rendered text or explicit values.
- Cover filtering, search, form validation, and data utilities; do not test framework internals.
- Keep each test file next to the unit it covers.
- Keep tests short, readable, and focused on real behavior.
