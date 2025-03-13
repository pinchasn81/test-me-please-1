import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'cd client && npm install && npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  timeout: 30000,
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    }
  ],
  reporter: [
    ['list'],
    ['./playwright-html-reporter.js']
  ],
}); 