import { Page, Locator } from '@playwright/test';

export class TransferFundsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly amountInput: Locator;
  readonly fromAccountDropdown: Locator;
  readonly toAccountDropdown: Locator;
  readonly transferButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1.title').first();
    this.amountInput = page.locator('input#amount, input[name="amount"]');
    this.fromAccountDropdown = page.locator(
      'input#fromAccountId,input[name="fromAccountId"]',
    );
    this.toAccountDropdown = page.locator(
      'input#toAccountId,input[name="toAccountId"]',
    );
    this.transferButton = page.locator('input[type="submit"]');
    this.confirmationMessage = page.locator('.title').nth(1);
  }

  async navigate() {
    await this.page.click('a[href*="transfer.htm"]');
  }

  async verifyLoaded() {
    await this.title.waitFor({ state: 'visible' });
  }

  async transferFunds(amount: string) {
    await this.amountInput.fill(amount);
    await this.transferButton.click();
  }

  async verifyTransferSuccess() {
    await this.confirmationMessage.waitFor({ state: 'visible' });
  }
}
