# Agent Instructions

## Required rule for all new test cases

Before any new test case is considered complete, the following checks are mandatory:

- Run: `npm run typecheck`
- Run: `npm run lint`
- Fix all issues before finalizing the work
- If relevant, run the specific Playwright test or suite
- Never skip validation for a new test case, even if the change looks minor

This is an organization rule for the repository and must be followed for every change related to tests.

## Argument rule

If a user asks to add or modify a test case, the required validation must be performed before the task is considered done.
