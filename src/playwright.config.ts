import { defineConfig, devices } from '@playwright/test';
import devConfig from './config/env.development';

export default defineConfig({
  testDir: './src/tests',
  retries: 1,
  workers: 4,
  use: {
    baseURL: devConfig.BASE_URL,
    headless: false, // This setting runs browsers in headed mode (not headless)
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]], // Ensure HTML report is generated in playwright-report
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Other projects commented out
  ],
  // webServer config commented out
});
