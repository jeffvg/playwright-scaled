import { Page, Locator } from '@playwright/test';

export class AccountOverviewPage {
  readonly page: Page;
  readonly title: Locator;
  readonly accountTable: Locator;

  constructor(page: Page) {
    this.page = page;
    // there are multiple h1.title elements, select the first one workaround
    // to avoid ambiguity in the locator:
    this.title = page.locator('h1.title').first();
    this.accountTable = page.locator('#accountTable');
  }

  async verifyLoaded() {
    await this.title.waitFor({ state: 'visible' });
    await this.accountTable.waitFor({ state: 'visible' });
  }
}
