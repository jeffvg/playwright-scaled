import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import data from '../../data/loginTestData';

test.describe('@smoke Happy Path Login Tests With POM', () => {
  test('Valid user can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(data.validUser.username, data.validUser.password);
    expect(await loginPage.isLoggedIn()).toBe(true);
  });

  test('Invalid user cannot login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(data.invalidUser.username, data.invalidUser.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Your username is invalid!');
  });
});
