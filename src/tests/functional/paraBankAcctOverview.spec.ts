import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/paraBankLoginPage';
import { loginTestData } from '../../data/paraBankTestData';
import { AccountOverviewPage } from '../../pages/paraBankAccountOverviewPage';

test.describe('@smoke Parabank Account Overview Tests With POM', () => {
  test('Valid login should redirect to account overview page', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      loginTestData.validUsername,
      loginTestData.validPassword,
    );
    const accountOverviewPage = new AccountOverviewPage(page);
    await accountOverviewPage.verifyLoaded();
    await expect(accountOverviewPage.title).toContainText('Accounts Overview');
    await expect(accountOverviewPage.accountTable).toBeVisible();
    await expect(page).toHaveURL(/\/overview/);
  });
});
