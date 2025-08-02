import { Page, Locator } from '@playwright/test';
import { loginSelectors } from '../data/paraBankTestData';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly welcomeMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(loginSelectors.usernameInput);
    this.passwordInput = page.locator(loginSelectors.passwordInput);
    this.loginButton = page.locator(loginSelectors.loginButton);
    this.welcomeMessage = page.locator(loginSelectors.welcomeMessage);
    this.errorMessage = page.locator(loginSelectors.errorMessage);
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
