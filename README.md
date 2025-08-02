# Playwright – Scalability, Reusability, and Maintainability

This repository is a starter **Playwright project** with TypeScript, designed for **scalability, reusability, and maintainability**. It follows the practices with a Page Object Model (POM), modular folder structure, ESLint, Prettier, and a pre-configured CI pipeline using GitHub Actions.

The test project uses various test sites and API's to demonstrate the idea of starting a foundation for building robust test frameworks and scripts that support long-term quality goals with clear separation of concerns.

Test automation delivers the greatest value when it is ***reusable, maintainable, and scalable***. In today’s environment, teams strive to build software efficiently, automation helps maximize productivity and minimize rework by streamlining repetitive tasks. [Read more about this]()

---

## Project Structure
Benefits:
- Clear separation of concerns (tests, page objects, utilities, configs)
- Easy onboarding for new team members
```
playwright-project/
├── .github/workflows/ci.yml          # GitHub Actions workflow
├── src/
│   ├── config/                       # Environment configs
│   │   └── env.development.ts
│   ├── data/                         # Objects for tests
│   │   └── formTestData.ts
│   │   └── loginTestData.ts
│   │   └── ...
│   ├── pages/                        # Page Object Models
│   │   └── formPage.ts
│   │   └── LoginPage.ts
│   │   └── ...
│   ├── test-api-data/                # JSON files for payloads
│   │   └── post_request_body.json
│   ├── tests/
│   │   ├── api/                      # API tests
│   │       └── pw-booker-api-json-test.spec.ts
|   |       └── ...
│   │   ├── e2e/                      # End-to-end type tests
│   │   │   └── demo-todo-app.spec.ts
│   │   ├── functional/               # user-facing feature’s ~behavior
│   │   │   └── form.spec.ts
│   │   │   └── login.spec.ts
│   │   │   └── ...
│   │   ├── ui/                       # Visual/interactive elements
│   │   │   └── basic-ui-test.spec.ts
│   │   ├── wacg/                     # Accessibility tests
│   │   │   └── basic-ui-test.spec.ts
│   └── playwright.config.ts          # Playwright global config
├── .gitignore                        # Don’t track these items
├── eslint.config.ts                  # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Project documentation
```

---

## Getting Started

### 1️ Clone the Repository
```bash
git clone https://github.com/jeffvg/UPDATE-TODO.git
cd playwright-project
```

### 2️ Install Dependencies
```bash
yarn
```

### 3️ Install Playwright Browsers
```bash
npx playwright install
```

---

## Running Tests

### Run All Tests
```bash
npx playwright test
Or
yarn test
```

### Run Tests with a Specific Tag
```bash
npx playwright test --grep smoke
Or
yarn test test --grep smoke
```

### View The Test Report
After running tests, view the HTML report:
```bash
npx playwright show-report
```

---

## Key Features
- **Page Object Model (POM):** Clean, reusable, and modular codebase.
- **Environment Configuration:** Easily switch between environments (`config/env.development.ts`).
- **CI/CD Ready:** Pre-configured GitHub Actions workflow for automated test runs.
- **Test Data Management:** Centralized and data-driven approach.
- **Scalable Folder Structure:** Organizes tests, pages, and utilities for team collaboration.

---

## Continuous Integration (CI)
The GitHub Actions workflow runs tests on every **push** and **pull request** to the `main` branch.

Location: `.github/workflows/ci.yml`

---

## Resources
- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Useful Commands

| Command Description                         | Command                                                         |
|---------------------------------------------|-----------------------------------------------------------------|
| Run a specific test file                    | `npx playwright test tests/example.spec.ts`                     |
| Run tests in headed mode  (see the browser) | `npx playwright test --headed`                                  |
| Debug a test                                | `npx playwright test --debug`                                   |
| Run all test spec files                     | `npx playwright test`                                           |
| Start the interactive UI mode               | `npx playwright test --ui`                                      |
| Run tests only on Desktop Chrome            | `npx playwright test --project=chromium`                        |
| Generate tests with Codegen                 | `npx playwright codegen`                                        |
| Run test by tag name @api                   | `npx playwright test --grep api`                                |
| Run test by tag name @smoke                 | `npx playwright test --grep smoke`                              |
| Run test by tag name @wcag                  | `npx playwright test --grep wcag`                               |
| Run test by tag name @regression            | `npx playwright test --grep regression`                         |
| Run all test and exclude by tag             | `npx playwright test --grep regression --grep-invert`           |

Visit https://playwright.dev/docs/intro for more information.

---

## License
MIT License © 2025