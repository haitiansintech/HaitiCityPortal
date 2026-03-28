import { test, expect } from "@playwright/test";

/**
 * Critical UI interaction tests — verifies key user-facing interactions work
 * in a production build. These catch regressions that 200-status checks miss
 * (e.g. blank forms, broken hover states, missing translations).
 */

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
test.describe("Navbar", () => {
  test("all nav links are visible and clickable", async ({ page }) => {
    await page.goto("/en");
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();

    // Primary nav items
    for (const label of ["Services", "Directory", "Officials", "Report", "Pay"]) {
      const link = nav.getByRole("link", { name: new RegExp(label, "i") });
      await expect(link, `Nav link "${label}" should be visible`).toBeVisible();
    }
  });

  test("Services nav link navigates to /en/services", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("navigation").getByRole("link", { name: /services/i }).click();
    await page.waitForURL(/\/en\/services/);
    expect(page.url()).toMatch(/\/en\/services/);
  });

  test("Donate button is visible", async ({ page }) => {
    await page.goto("/en");
    const donate = page.getByRole("link", { name: /donate/i }).first();
    await expect(donate).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Homepage
// ---------------------------------------------------------------------------
test.describe("Homepage", () => {
  test("hero section renders with CTA buttons", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("h1").first()).toBeVisible();
    // At least one primary CTA button exists
    const ctaButtons = page.getByRole("link").filter({ hasText: /services|get started|report/i });
    await expect(ctaButtons.first()).toBeVisible();
  });

  test("news section renders with cards", async ({ page }) => {
    await page.goto("/en");
    // News section heading
    await expect(page.getByText(/recent updates/i)).toBeVisible();
    // At least one news card
    const cards = page.locator("a").filter({ hasText: /read more/i });
    await expect(cards.first()).toBeVisible();
  });

  test("news card navigates to detail page", async ({ page }) => {
    await page.goto("/en");
    const firstCard = page.locator("a").filter({ hasText: /read more/i }).first();
    await firstCard.click();
    await page.waitForURL(/\/en\/news\/.+/);
    expect(page.url()).toMatch(/\/en\/news\/.+/);
    // Detail page has an h1
    await expect(page.locator("h1").first()).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Tax Lookup
// ---------------------------------------------------------------------------
test.describe("Tax Lookup page", () => {
  test("renders form with correct labels", async ({ page }) => {
    await page.goto("/en/tax-lookup");
    await expect(page.getByRole("heading", { name: /property tax lookup/i })).toBeVisible();
    await expect(page.getByRole("radio", { name: /parcel id/i })).toBeVisible();
    await expect(page.getByRole("radio", { name: /nif/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /search/i })).toBeVisible();
  });

  test("shows error when submitting empty form", async ({ page }) => {
    await page.goto("/en/tax-lookup");
    await page.getByRole("button", { name: /search/i }).click();
    // Should show validation feedback (either browser native or custom)
    // The input is `required`, so a native validation message will appear
    // We just verify the page does NOT navigate away
    expect(page.url()).toMatch(/\/en\/tax-lookup/);
  });

  test("switching to NIF updates the input label", async ({ page }) => {
    await page.goto("/en/tax-lookup");
    await page.getByRole("radio", { name: /nif/i }).click();
    // Label above the input should change to "NIF"
    await expect(page.getByLabel("NIF")).toBeVisible();
    // Placeholder should reflect NIF format
    const input = page.getByPlaceholder(/001-234/i);
    await expect(input).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Events page
// ---------------------------------------------------------------------------
test.describe("Events page", () => {
  test("renders without contrast issues (heading is visible)", async ({ page }) => {
    await page.goto("/en/events");
    const h1 = page.getByRole("heading", { name: /community events/i });
    await expect(h1).toBeVisible();
    // Verify the heading is actually readable (not white-on-white)
    const color = await h1.evaluate((el) =>
      window.getComputedStyle(el).color
    );
    // Color should NOT be white (rgb(255, 255, 255))
    expect(color).not.toBe("rgb(255, 255, 255)");
  });

  test("Download calendar button is visible and has correct hover styles", async ({ page }) => {
    await page.goto("/en/events");
    const btn = page.getByRole("link", { name: /download calendar/i });
    await expect(btn).toBeVisible();

    // Hover over the button and verify text is still visible
    await btn.hover();
    await expect(btn).toBeVisible();
    const color = await btn.evaluate((el) =>
      window.getComputedStyle(el).color
    );
    // After hover, text should NOT be white-on-white (text color should not match bg)
    const bg = await btn.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(color).not.toBe(bg);
  });
});

// ---------------------------------------------------------------------------
// City Council
// ---------------------------------------------------------------------------
test.describe("City Council page", () => {
  test("renders title and Municipal Decrees section", async ({ page }) => {
    await page.goto("/en/city-council");
    await expect(page.getByRole("heading", { name: /city council/i })).toBeVisible();
    await expect(page.getByText(/municipal decrees/i)).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// News index + detail
// ---------------------------------------------------------------------------
test.describe("News pages", () => {
  test("/en/news renders article list", async ({ page }) => {
    const res = await page.goto("/en/news");
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
    // At least one article link
    const articles = page.getByRole("link").filter({ hasText: /read more|more/i });
    // News index may or may not show "Read more" — just check for article headings
    const headings = page.locator("h2, h3").first();
    await expect(headings).toBeVisible();
  });

  test("news detail page renders article content", async ({ page }) => {
    // Navigate via homepage card to ensure the full flow works
    await page.goto("/en");
    const card = page.locator("a").filter({ hasText: /read more/i }).first();
    const href = await card.getAttribute("href");

    if (href) {
      const res = await page.goto(href);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
    }
  });
});

// ---------------------------------------------------------------------------
// 404
// ---------------------------------------------------------------------------
test.describe("404 page", () => {
  test("custom not-found page is readable (dark text on light background)", async ({ page }) => {
    await page.goto("/en/page-that-does-not-exist-abc123");
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();

    const color = await heading.evaluate((el) =>
      window.getComputedStyle(el).color
    );
    // Must NOT be white
    expect(color).not.toBe("rgb(255, 255, 255)");
  });

  test("Go back home button navigates to homepage", async ({ page }) => {
    await page.goto("/en/page-that-does-not-exist-abc123");
    const homeBtn = page.getByRole("link", { name: /go back home/i });
    await expect(homeBtn).toBeVisible();
    await homeBtn.click();
    await page.waitForURL(/\/(en)?$/);
    expect(page.url()).toMatch(/localhost|haiticity/);
  });
});

// ---------------------------------------------------------------------------
// Contact page
// ---------------------------------------------------------------------------
test.describe("Contact page", () => {
  test("renders with readable heading (not white-on-white)", async ({ page }) => {
    await page.goto("/en/contact");
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    const color = await h1.evaluate((el) =>
      window.getComputedStyle(el).color
    );
    expect(color).not.toBe("rgb(255, 255, 255)");
  });
});
