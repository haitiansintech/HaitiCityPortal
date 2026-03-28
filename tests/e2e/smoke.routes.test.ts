import { test, expect } from "@playwright/test";

/**
 * Route smoke tests — every public page must:
 *   1. Return HTTP 200 (no 404 / 500)
 *   2. Render a visible <h1> (no blank or skeleton-only page)
 *   3. Not surface a Next.js error overlay
 *
 * Run against local dev: npm run test:e2e
 * Run against production: BASE_URL=https://yourdomain.com npm run test:e2e:prod
 */

/** All public English routes that should render a real page. */
const PUBLIC_ROUTES = [
  // Core
  { path: "/en",                      h1: /demo city|home|bienvenue|akèy/i },
  { path: "/en/services",             h1: /services/i },
  { path: "/en/directory",            h1: /directory|annuaire/i },
  { path: "/en/officials",            h1: /officials|élus|ofisyèl/i },
  // News
  { path: "/en/news",                 h1: /updates|news|nouvèl/i },
  // About
  { path: "/en/about/vision",         h1: /vision/i },
  { path: "/en/about/impact",         h1: /impact/i },
  { path: "/en/about/tech",           h1: /tech|manifesto/i },
  { path: "/en/about/roadmap",        h1: /roadmap/i },
  // Services
  { path: "/en/services/birth-certificates", h1: /birth|archives/i },
  { path: "/en/services/cleanup",     h1: /cleanup|clean/i },
  { path: "/en/services/culture",     h1: /culture/i },
  { path: "/en/services/towing",      h1: /towing/i },
  { path: "/en/services/national-id", h1: /national.id|id card/i },
  { path: "/en/services/trash",       h1: /trash|waste/i },
  { path: "/en/services/permits",     h1: /permits/i },
  { path: "/en/services/governance",  h1: /governance/i },
  // Government
  { path: "/en/city-council",         h1: /city council/i },
  // Finance
  { path: "/en/tax-lookup",           h1: /tax lookup/i },
  // Community
  { path: "/en/events",               h1: /events/i },
  { path: "/en/report",               h1: /report/i },
  // Legal
  { path: "/en/legal/privacy",        h1: /privacy/i },
  { path: "/en/legal/terms",          h1: /terms/i },
  // Contact + contribute
  { path: "/en/contact",              h1: /contact/i },
  { path: "/en/contribute",           h1: /contribut/i },
];

for (const route of PUBLIC_ROUTES) {
  test(`GET ${route.path} — renders without error`, async ({ page }) => {
    const response = await page.goto(route.path);

    // 1. HTTP status must be 200
    expect(response?.status(), `Expected 200 for ${route.path}`).toBe(200);

    // 2. Page must contain a matching h1
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible({ timeout: 8_000 });
    await expect(h1).toHaveText(route.h1);

    // 3. No Next.js error overlay
    const errorOverlay = page.locator(
      "[data-nextjs-dialog], #__next_error__, [class*='nextjs-toast-errors']"
    );
    await expect(errorOverlay).toHaveCount(0);
  });
}

test("unknown route returns 404 page", async ({ page }) => {
  const response = await page.goto("/en/this-page-does-not-exist-xyz");
  // Next.js serves the not-found page with a 404 status
  expect(response?.status()).toBe(404);
  // Our custom not-found.tsx renders "Page not found"
  await expect(page.locator("body")).toContainText(/page not found/i);
});

test("root / redirects to /en", async ({ page }) => {
  const response = await page.goto("/");
  // After redirect, final URL should be under /en
  expect(page.url()).toMatch(/\/en/);
  expect(response?.status()).toBe(200);
});
