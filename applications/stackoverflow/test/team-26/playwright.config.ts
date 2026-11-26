import { defineConfig } from '@playwright/test';

// Run from applications/stackoverflow/test:
//   BASE_URL=http://127.0.0.1:<port> npx playwright test -c team-26/playwright.config.ts
export default defineConfig({
  testDir: './tests',
  timeout: 90_000,
  workers: 1,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:3000',
    timezoneId: 'UTC',
    viewport: { width: 1280, height: 1000 },
    screenshot: 'only-on-failure',
  },
});
