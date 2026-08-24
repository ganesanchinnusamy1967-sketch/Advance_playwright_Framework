# Project Rule

Whenever a new test case is added, the following checks must be run before completion:

1. Type check
   - Run: npm run typecheck

2. Lint check
   - Run: npm run lint

3. Optional validation
   - Run the relevant Playwright test or targeted suite if needed

## Required workflow
- Add the new test case
- Run TypeScript validation
- Run lint validation
- Fix any issues if the commands fail
- Only then consider the test complete

## Argument rule
- If a new test case is added or modified, validation is mandatory before finishing the task
- Do not skip the required commands under any condition

## Notes
- This rule applies to every new test file or scenario added to the project.
- If a new folder or module is created, the same checks must still be followed.
