import { test, expect } from "@playwright/test";

/**
 * API smoke tests — verifies every API route is reachable and returns the
 * expected shape. These run against whatever BASE_URL is configured so they
 * work both locally and against the live production deployment.
 */

test.describe("GET /api/health", () => {
  test("returns 200 with ok:true", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ ok: true });
  });
});

test.describe("GET /api/events/ics", () => {
  test("returns a valid iCalendar file", async ({ request }) => {
    const res = await request.get("/api/events/ics");
    expect(res.status()).toBe(200);
    const contentType = res.headers()["content-type"] ?? "";
    expect(contentType).toMatch(/text\/calendar/i);
    const body = await res.text();
    expect(body).toContain("BEGIN:VCALENDAR");
    expect(body).toContain("END:VCALENDAR");
  });
});

test.describe("GET /api/issues.geojson", () => {
  test("returns valid GeoJSON FeatureCollection", async ({ request }) => {
    const res = await request.get("/api/issues.geojson");
    expect(res.status()).toBe(200);
    const contentType = res.headers()["content-type"] ?? "";
    expect(contentType).toMatch(/application\/json/i);
    const body = await res.json();
    expect(body).toHaveProperty("type", "FeatureCollection");
    expect(body).toHaveProperty("features");
    expect(Array.isArray(body.features)).toBe(true);
  });
});

test.describe("POST /api/tax/lookup", () => {
  test("returns 400 when body is missing", async ({ request }) => {
    const res = await request.post("/api/tax/lookup", { data: {} });
    expect([400, 422]).toContain(res.status());
  });

  test("returns 200 with results array for valid parcel query", async ({ request }) => {
    const res = await request.post("/api/tax/lookup", {
      data: { searchType: "parcel", query: "PAP-2025-00001" },
    });
    // Could be 200 with empty results or 200 with data — either is fine
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("results");
    expect(Array.isArray(body.results)).toBe(true);
  });

  test("returns 200 with results array for valid NIF query", async ({ request }) => {
    const res = await request.post("/api/tax/lookup", {
      data: { searchType: "nif", query: "001-000-000-0" },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("results");
    expect(Array.isArray(body.results)).toBe(true);
  });
});

test.describe("POST /api/title/requests", () => {
  test("returns 400 when body is missing required fields", async ({ request }) => {
    const res = await request.post("/api/title/requests", { data: {} });
    expect([400, 422, 401]).toContain(res.status());
  });
});
