import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for Haiti City Portal production smoke tests.
 *
 * Two modes:
 *   - Local dev  : `npm run test:e2e`           — spins up `next dev` automatically
 *   - Production : `BASE_URL=https://… npm run test:e2e:prod` — tests against live URL, no server
 *
 * @see https://playwright.dev/docs/test-configuration
 */

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const IS_CI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests/e2e",

  /* Run tests in parallel — safe for read-only smoke tests */
  fullyParallel: true,
  /* Fail the build on CI if test.only is accidentally left in */
  forbidOnly: IS_CI,
  /* Retry once on CI to smooth over flaky network conditions */
  retries: IS_CI ? 1 : 0,
  /* Limit parallel workers on CI to avoid DB connection exhaustion */
  workers: IS_CI ? 2 : undefined,

  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  use: {
    baseURL: BASE_URL,
    /* Capture screenshot/trace only on failure */
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    /* Reasonable timeout for server-rendered pages */
    navigationTimeout: 15_000,
    actionTimeout: 10_000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  /* Start the Next.js dev server automatically when running locally */
  webServer: BASE_URL.startsWith("http://localhost")
    ? {
        command: "npm run dev",
        url: "http://localhost:3000",
        reuseExistingServer: !IS_CI,
        timeout: 60_000,
        stdout: "ignore",
        stderr: "pipe",
      }
    : undefined,
});
