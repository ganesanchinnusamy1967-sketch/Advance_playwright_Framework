# Phase 1 – Advanced Playwright Framework Setup Guide

This phase captures the setup and decisions made while building the advanced Playwright automation framework. It is intended to help students and contributors understand the project structure, configuration, validation rules, and best practices used in this repository.

## 1. Project goal

The purpose of this framework is to build a scalable, real-world Playwright project that supports:

- UI automation
- E2E validation
- API test support
- custom reporting
- reusable test utilities
- modular folder structure
- strict TypeScript checking and linting

## 2. Initial project setup

The project was created with:

- Node.js + TypeScript
- Playwright Test
- dotenv for environment variables
- custom reporter support
- Winston logger integration
- modular folder architecture under `src/`

The key package configuration was added in `package.json` so the project can run multiple command types, such as:

```bash
npm run test
npm run test:ui
npm run test:e2e
npm run test:chromium
npm run test:firefox
npm run test:debug
npm run test:p0
npm run test:p1
npm run test:report
npm run lint
npm run typecheck
npm run format
npm run format:fix
npm run build
npm run clean
```

## 3. Project structure

The final repository structure is as follows:

```text
Advance_playwright_Framework/
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/
├── docs/
│   └── phase1/
│       └── phase1-project-setup-guide.md
├── rule/
│   └── README.md
├── src/
│   ├── api/
│   ├── config/
│   ├── fixtures/
│   ├── pages/
│   ├── testdata/
│   ├── tests/
│   └── utils/
├── AGENTS.md
├── .env
├── .gitignore
├── CustomTTAReporter.ts
├── Dockerfile
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── README.md
├── allure-results/
├── logs/
├── playwright-report/
├── test-results/
├── tta-report/
├── node_modules/
└── package-lock.json
```

## 4. Why the project was moved under src

The project was reorganized to keep code modular and production-like. Moving the files under `src/` helps separate application/test code from project config, generated reports, logs, and outputs.

This also makes it easier to:

- structure tests by feature or layer
- isolate page objects and fixtures
- manage reusable utilities
- keep root folders clean

## 5. Playwright configuration

The `playwright.config.ts` file was configured with:

- `testDir: './src/tests'`
- environment-based base URL resolution
- browser project setup
- reporters for:
  - custom reporter
  - HTML report
  - JSON output
  - Allure output
  - list output
- screenshot, video, and trace settings
- action and navigation timeout settings

Important fix applied during setup:

- reporter path was corrected to match the moved source structure
- invalid or empty config files were fixed
- the project was validated using `npx playwright test --list`

## 6. TypeScript configuration

The `tsconfig.json` file was updated to support the project structure and path aliases. It includes:

- ES2022 target
- CommonJS module
- Node types
- strict mode
- `baseUrl: "."`
- path aliases such as:
  - `@src/*`
  - `@tests/*`
  - `@pages/*`
  - `@utils/*`
  - `@fixtures/*`
  - `@config/*`
  - `@api/*`
  - `@testdata/*`

This helps keep imports consistent and less error-prone as the framework grows.

## 7. Logger setup

A logger utility was added using Winston. It includes:

- shared logger for framework-wide messages
- child logger with scope-specific labels
- console output and file output
- log level from `LOG_LEVEL` environment variable
- default level: `info`

Example usage:

```ts
import logger, { createLogger } from '../utils/logger';

logger.info('Framework started');
const pageLogger = createLogger('LoginPage');
pageLogger.info('User clicked login button');
```

## 8. Validation rule for new tests

This is a mandatory rule for the repository.

Whenever a new test case is added or changed, you must run:

```bash
npm run typecheck
npm run lint
```

If necessary, run the relevant Playwright test or targeted suite before finishing the task.

This rule is also recorded in:

- `.github/copilot-instructions.md`
- `AGENTS.md`
- `rule/README.md`

## 9. Why this matters

This validation rule helps prevent:

- TypeScript errors
- lint issues
- broken imports
- failing project builds
- broken CI checks

It keeps the framework stable as students add new tests and features.

## 10. Best practices used in this framework

- Keep test code under `src/tests`
- Use page objects under `src/pages`
- Use test data under `src/testdata`
- Keep reusable utilities under `src/utils`
- Keep environment config under `src/config`
- Use aliases instead of long relative imports when possible
- Always validate after new test work

## 11. Summary

This phase created the foundation of an advanced Playwright framework that is organized, maintainable, and ready for real project use. The framework includes:

- modular structure
- Playwright config
- TypeScript setup
- path aliases
- logger support
- custom reporting
- validation rules

## 12. Next steps

The next phases can include:

- adding page object classes
- creating reusable fixtures
- adding API test helpers
- implementing data-driven testing
- adding CI/CD pipeline checks
- integrating richer reporting and dashboards

This guide is meant to act as a reference for students learning how to build a professional automation framework step by step.
