import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/paraBankLoginPage';
import { loginTestData } from '../../data/paraBankTestData';
import { TransferFundsPage } from '../../pages/paraBankTransferFundsPage';

test.describe('@smoke Parabank Transfer Funds Tests With POM', () => {
  test('Valid user should redirect to transfer funds page', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      loginTestData.validUsername,
      loginTestData.validPassword,
    );
    const transferFundsPage = new TransferFundsPage(page);
    await transferFundsPage.navigate();
    await transferFundsPage.verifyLoaded();
    await expect(transferFundsPage.title).toContainText('Transfer Funds');
  });
  test('User should transfer funds successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      loginTestData.validUsername,
      loginTestData.validPassword,
    );
    const transferFundsPage = new TransferFundsPage(page);
    await transferFundsPage.navigate();
    await transferFundsPage.verifyLoaded();
    await transferFundsPage.amountInput.fill('100');
    // Assuming the accounts are valid for transfer - current logged-in user from test data has at least two accounts.
    // Indexes are zero-based, so 0 is the first account and 1 is the second.- transferFunds('100', 0, 1)
    // first account - locator('select[name="fromAccountId"]'
    // second account - locator('select[name="toAccountId"]')
    // Make sure the dropdowns have at least two accounts, or this specific test will fail
    // await transferFundsPage.transferFunds('100', 0, 1);
    await transferFundsPage.transferButton.click();
    await transferFundsPage.verifyTransferSuccess();
    await expect(transferFundsPage.confirmationMessage).toContainText(
      'Transfer Complete',
    );
    // test could continue and verify the account balances if needed using the Account Overview Page
    // For now, we just check the transfer complete confirmation message.
  });
});
