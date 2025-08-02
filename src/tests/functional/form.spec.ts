import { test, expect } from '@playwright/test';
import { FormPage } from '../../pages/FormPage';
import data from '../../data/formTestData';

// This test is happy path of form submission
// It tests that a user can fill out the form and submit it successfully

test.describe('@smoke Happy Path Form Tests With POM', () => {
  test('user can submit the form successfully', async ({ page }) => {
    const formPage = new FormPage(page);
    await formPage.goto();
    await formPage.fillFirstName(data.fillFirstName.value);
    await formPage.fillLastName(data.fillLastName.value);
    await formPage.fillEmail(data.fillEmail.value);
    // Ensure the radio button is stable before clicking. Tricky test site with ads
    const maleRadio = formPage.getByRole('radio', {
      name: 'Male',
      exact: true,
    });
    await maleRadio.scrollIntoViewIfNeeded();
    await expect(maleRadio).toBeVisible();
    // Wait for the radio button to be stable before clicking
    await maleRadio.waitFor();
    await maleRadio.click({ force: true });
    await formPage.fillMobile(data.fillMobile.value);
    await formPage.locator('#dateOfBirthInput').click();
    await formPage
      .getByRole('option', { name: 'Choose Wednesday, July 30th,' })
      .click();
    await formPage.locator('.subjects-auto-complete__value-container').click();
    await formPage.locator('#subjectsInput').fill(data.selectSubject.value);
    await formPage.locator('#react-select-2-option-0').click();
    await formPage.getByText('Reading').click();
    await formPage.locator('#state svg').click();
    await formPage.getByText('NCR', { exact: true }).click();
    await formPage
      .locator(
        '#city > .css-yk16xz-control > .css-1wy0on6 > .css-tlfecz-indicatorContainer',
      )
      .click();
    await formPage.getByText('Delhi', { exact: true }).click();
    await formPage.getByRole('button', { name: 'Submit' }).click();
    // assert successful submission
    await expect(
      formPage.getByText('Thanks for submitting the form'),
    ).toBeVisible();
  });
});
