import { test, expect } from "@playwright/test";

/**
 * i18n smoke tests — verifies all four supported locales route correctly
 * and render locale-appropriate content without intl errors.
 *
 * Locales: en (English), fr (French), ht (Haitian Creole), es (Spanish)
 */

const LOCALES = [
  { code: "en", homeHeading: /demo city/i,  navServices: /services/i },
  { code: "fr", homeHeading: /demo city/i,  navServices: /services/i },
  { code: "ht", homeHeading: /demo city/i,  navServices: /sèvis/i },
  { code: "es", homeHeading: /demo city/i,  navServices: /servicios/i },
];

for (const locale of LOCALES) {
  test.describe(`Locale: ${locale.code}`, () => {
    test("homepage renders without MISSING_MESSAGE errors", async ({ page }) => {
      const consoleMsgs: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error" || msg.text().includes("MISSING_MESSAGE")) {
          consoleMsgs.push(msg.text());
        }
      });

      const res = await page.goto(`/${locale.code}`);
      expect(res?.status()).toBe(200);

      // No intl errors in console
      const intlErrors = consoleMsgs.filter((m) =>
        m.includes("MISSING_MESSAGE") || m.includes("FORMATTING_ERROR") || m.includes("No intl context")
      );
      expect(intlErrors, `Intl errors on /${locale.code}: ${intlErrors.join(", ")}`).toHaveLength(0);

      // h1 is visible (page is not blank)
      await expect(page.locator("h1").first()).toBeVisible();
    });

    test("navbar renders in correct language", async ({ page }) => {
      await page.goto(`/${locale.code}`);
      const nav = page.locator("nav");
      await expect(nav).toBeVisible();
      await expect(nav).toContainText(locale.navServices);
    });

    test("services page renders", async ({ page }) => {
      const res = await page.goto(`/${locale.code}/services`);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
    });

    test("about/impact page renders without FORMATTING_ERROR", async ({ page }) => {
      const consoleMsgs: string[] = [];
      page.on("console", (msg) => consoleMsgs.push(msg.text()));

      const res = await page.goto(`/${locale.code}/about/impact`);
      expect(res?.status()).toBe(200);

      const formattingErrors = consoleMsgs.filter((m) => m.includes("FORMATTING_ERROR"));
      expect(formattingErrors, `FORMATTING_ERROR on /${locale.code}/about/impact`).toHaveLength(0);
    });

    test("contribute page renders without FORMATTING_ERROR", async ({ page }) => {
      const consoleMsgs: string[] = [];
      page.on("console", (msg) => consoleMsgs.push(msg.text()));

      const res = await page.goto(`/${locale.code}/contribute`);
      expect(res?.status()).toBe(200);

      const formattingErrors = consoleMsgs.filter((m) => m.includes("FORMATTING_ERROR"));
      expect(formattingErrors, `FORMATTING_ERROR on /${locale.code}/contribute`).toHaveLength(0);
    });
  });
}

test("language switcher changes locale", async ({ page }) => {
  await page.goto("/en");

  // Open the language selector (the <select> in the top bar)
  const langSelect = page.locator("select").first();
  await expect(langSelect).toBeVisible();

  // Switch to French
  await langSelect.selectOption("fr");

  // Should navigate to /fr
  await page.waitForURL(/\/fr/, { timeout: 5_000 });
  expect(page.url()).toMatch(/\/fr/);

  // Switch to Haitian Creole
  await langSelect.selectOption("ht");
  await page.waitForURL(/\/ht/, { timeout: 5_000 });
  expect(page.url()).toMatch(/\/ht/);
});

test("non-English service page falls back to English MDX when locale file absent", async ({ page }) => {
  // This asserts the fallback system works — pages should not 404 or error
  // even for locales that don't have every MDX variant
  const res = await page.goto("/ht/services/culture");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1").first()).toBeVisible();
});
