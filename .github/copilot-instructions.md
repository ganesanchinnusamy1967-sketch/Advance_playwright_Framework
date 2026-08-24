# Copilot Instructions

## Mandatory validation rule

Whenever a new test case is added, do the following before marking it complete:

1. Run type checking: `npm run typecheck`
2. Run linting: `npm run lint`
3. Fix any errors before finishing the task
4. If needed, run the relevant Playwright test or targeted suite
5. Do not skip the validation step even if the change seems small

This rule applies to every new test file, scenario, fixture, page object, or test helper added to the project.

## Argument rule

If someone asks you to add or change a test case, you must always validate it with the required checks before concluding the task.
