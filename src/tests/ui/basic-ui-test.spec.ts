import { test, expect } from '@playwright/test';

// User Interface (UI) test checks the visual and interactive elements.
test.describe('@ui Tests for Playwright Getting Started Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Playwright Getting Started page before each test
    await page.goto('https://playwright.dev/');
  });

  test('Page title and header verification', async ({ page }) => {
    // Verify the page title
    await expect(page).toHaveTitle(/Playwright/);

    // Verify the main header is visible
    await expect(
      page.getByRole('heading', { name: /Playwright/ }),
    ).toBeVisible();
  });

  test('Navigate to Getting Started & verify headings', async ({ page }) => {
    // Click on the "Getting Started" link
    await page.getByRole('link', { name: 'Getting Started' }).click();

    // Verify the URL contains "intro"
    await expect(page).toHaveURL(/intro/);
    // Verify the "Installation" section header is visible
    await expect(
      page.getByRole('heading', { name: 'Installation' }),
    ).toBeVisible();
    // Verify the "Installing Playwright" section is visible
    await expect(
      page.getByRole('heading', { name: 'Installing Playwright' }),
    ).toBeVisible();
    // Verify the "HTML Test Reports" section is visible
    await expect(
      page.getByRole('heading', { name: 'HTML Test Reports' }),
    ).toBeVisible();
    // Verify the "HTML Test Reports" heading has an embedded hash link
    const htmlTestReportsHeading = await page.getByRole('heading', {
      name: 'HTML Test Reports',
    });
    const anchor = await htmlTestReportsHeading.locator('a[href^="#"]');
    await expect(anchor).toHaveAttribute('href', /#html-test-reports/);
  });
});
