# Advance Playwright Framework

This repository is an advanced Playwright-based automation framework built with TypeScript and modular project structure. It includes browser test configuration, environment-based URLs, custom reporting, logger support, reusable test data, page objects, and a validation rule for all new test cases.

## Overview

The framework is designed for scalable UI and API test automation and follows a clean structure:

- modular source organization under `src/`
- Playwright config with browser and environment support
- custom reporter and built-in Playwright reporting
- environment variable support using `dotenv`
- TypeScript path aliases for maintainable imports
- mandatory validation for every new test case

## Project structure

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
└── node_modules/
```

## Key features

- Playwright multi-browser config for Chromium, Firefox, and WebKit support
- Base URL resolution from environment variables such as `BASE_URL`, `TTA_ENV`, `QA_BASE_URL`, `DEV_BASE_URL`, etc.
- Reporter setup for:
  - custom HTML reporter
  - HTML report
  - JSON report
  - Allure report
  - list reporter
- TypeScript strict configuration and path aliases
- Winston logger with `logger` and `createLogger(scope)` support
- Validation guidance for new tests

## Important rules

Every time a new test case is added or modified, the following must be done before finishing:

```bash
npm run typecheck
npm run lint
```

If needed, also run the relevant Playwright suite or test.

This rule is documented in:

- `.github/copilot-instructions.md`
- `AGENTS.md`
- `rule/README.md`

## Common commands

```bash
npm install
npx playwright test
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --debug
npm run typecheck
npm run lint
npm run test:report
npm run build
npm run clean
```

## Environment setup

The framework supports environment-based configuration through `.env` and env variables such as:

```bash
TTA_ENV=qa
BASE_URL=https://app.thetestingacademy.com
```

## Notes

This project structure is intended to support a real-world advanced automation framework and is meant to be expanded with page objects, fixtures, API helpers, and reusable utilities.
