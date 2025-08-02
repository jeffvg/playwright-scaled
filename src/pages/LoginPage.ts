import { Page } from '@playwright/test';
import devConfig from '../config/env.development';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(`${devConfig.BASE_URL}/login`);
  }

  async login(username: string, password: string) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('button[type="submit"]');
  }

  async isLoggedIn(): Promise<boolean> {
    return this.page.isVisible('.flash.success');
  }

  async getErrorMessage(): Promise<string> {
    const errorMessage = await this.page.textContent('.flash.error');
    return errorMessage ?? '';
  }
}
