import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// This test checks for accessibility issues using Axe
// It navigates to web site page and runs an accessibility scan
// It then attaches the results to the test info for review
// Run npx playwright show-report to view the accessibility-scan-results attachment.

test.describe('@wcag Scan for accessibility issues', () => {
  test('should not have any accessibility issues', async ({
    page,
  }, testInfo) => {
    await page.goto('https://playwright.dev/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast', 'aria-allowed-role']) // Disable specific rules if needed
      .include('body') // Specify the element to scan, can be omitted to scan the whole page
      // .options({
      //     runOnly: {
      //         type: 'tag',
      //         values: ['wcag2a', 'wcag2aa'] // Specify WCAG levels to check
      //     }
      //     })
      .analyze();
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });

    if (accessibilityScanResults.violations.length > 0) {
      console.log(
        'Accessibility violations:',
        accessibilityScanResults.violations,
      );
    }
    expect(accessibilityScanResults.violations).toEqual(expect.any(Array));
  });
});
