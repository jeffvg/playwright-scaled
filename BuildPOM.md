# Building a Page Object Model (POM) 

Here is a strategy to build a POM with no prior knowledge of the codebase and only based off the application’s UI itself, not the internal source code.

## How to Build a POM Without Codebase Access

### 1. Explore the Application UI (Like a User)
- Navigate through key workflows (e.g., login, search, cart, forms)
- Identify common screens and repeated components
- Document important UI elements and user flows

🛠️ **Use browser dev tools to inspect elements**:
- Get locators (IDs, classes, text, etc.)
- Note dynamic content or behaviors

### 2. Define Logical Page Objects
For each screen or section, create a corresponding Page Object.

| Page/Section          | POM Class Name     |
|-------------------------------|------------|
| Login screen          | LoginPage          |
| Dashboard             | DashboardPage      |
| User profile modal    | ProfileComponent   |
| Forgot password page  | ForgotPasswordPage |

### 3. Structure the POM Files
Example (TypeScript + Playwright):
```
Project
├── src/
│   ├── pages/
│   │   └── DashboardPage.ts
│   │   └── LoginPage.ts
│   │   └── ProfileComponent.ts
│   │   └── ...
```

### 4. Build Methods Based on UI Behavior
Start with basic POM skeleton:

```
// LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Tip: Use Playwright Codegen to generate locators and flows automatically:

- npx playwright codegen https://your-app.com

### 5. Use POM in a test with hard coded values
```
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test('User can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('user@example.com', 'securePass123');
  expect(await loginPage.isLoggedIn()).toBe(true);
});
```
OR

### Use POM in a test with imported test data
```
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import data from '../../utils/loginTestData';

test('User can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(data.validUser.username, data.validUser.password);
  expect(await loginPage.isLoggedIn()).toBe(true);
});
```
```
// loginTestData.ts

export default {
  validUser: {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
  },
  invalidUser: {
    username: 'invalid',
    password: 'wrongpass',
  },
};
```

### Iterate as you learn more
- Refactor POMs when you discover better locators or reusable logic
- Split large POMs into smaller components (e.g., Navbar, Sidebar)
- Add assertions and helper utilities for common patterns

### Summary
You don't need access to the codebase to build effective POMs — just the running app, browser dev tools, and a clear test objective. Focus on UI elements, user workflows, and logical structure, and let Playwright handle the rest.