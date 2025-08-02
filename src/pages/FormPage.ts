import { Page } from '@playwright/test';

export class FormPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.page.evaluate(() => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: 1920,
      });
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 1080,
      });
    });
    await this.page.addInitScript(() => {
      window.addEventListener('resize', (e) => {
        e.preventDefault();
        window.resizeTo(1920, 1080);
      });
    });
  }

  public locator(selector: string) {
    return this.page.locator(selector);
  }

  public getByRole(
    role: Parameters<Page['getByRole']>[0],
    options?: Parameters<Page['getByRole']>[1],
  ) {
    return this.page.getByRole(role, options);
  }

  public getByLabel(text: string, options?: Parameters<Page['getByLabel']>[1]) {
    return this.page.getByLabel(text, options);
  }

  public getByText(text: string, options?: Parameters<Page['getByText']>[1]) {
    return this.page.getByText(text, options);
  }

  async fillFirstName(firstName: string) {
    await this.page.fill('#firstName', firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.fill('#lastName', lastName);
  }

  async fillEmail(userEmail: string) {
    await this.page.fill('#userEmail', userEmail);
  }

  async selectGender(gender: string) {
    await this.page.selectOption('#gender', gender);
  }

  async fillMobile(userNumber: string) {
    await this.page.fill('#userNumber', userNumber);
  }

  async selectDateOfBirth(date: string) {
    await this.page.fill('#dateOfBirth', date);
  }

  async selectSubject(subject: string) {
    await this.page.fill('#subject', subject);
  }

  async selectHobby(hobby: string) {
    await this.page.fill('#hobby', hobby);
  }

  async selectState(state: string) {
    await this.page.fill('#state', state);
  }

  async selectCity(city: string) {
    await this.page.fill('#city', city);
  }

  async submit() {
    await this.page.click('#submit');
  }
}
