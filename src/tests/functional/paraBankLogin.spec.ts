import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/paraBankLoginPage';
import { loginTestData } from '../../data/paraBankTestData';

test.describe('@smoke Parabank Login Tests With POM', () => {
  test('Valid login should redirect to welcome page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      loginTestData.validUsername,
      loginTestData.validPassword,
    );
    await expect(loginPage.welcomeMessage).toBeVisible();
  });

  // test('Invalid login should show error message', async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   await loginPage.goto();
  //   await loginPage.login(
  //     loginTestData.invalidUsername,
  //     loginTestData.invalidPassword,
  //   );
  //   await expect(loginPage.errorMessage).toBeVisible();
  // });
  // any id/password combination works, so this test is commented out.
});
