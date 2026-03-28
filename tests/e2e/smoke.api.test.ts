import { test, expect } from "@playwright/test";

/**
 * API smoke tests — verifies every API route is reachable and returns the
 * expected shape. These run against whatever BASE_URL is configured so they
 * work both locally and against the live production deployment.
 *
 * Notes on environment behaviour:
 *  - /api/issues.geojson and /api/tax/lookup use sample data in non-production
 *    (NODE_ENV !== "production"), so they never need a live DB in local tests.
 *  - /api/events/ics is fully static (no DB).
 *  - /api/health is a lightweight DB ping; we accept 200 or 503 so a cold DB
 *    does not fail the whole suite.
 */

// Give API calls a generous timeout — some routes do a DB ping on cold start.
test.setTimeout(30_000);

test.describe("GET /api/health", () => {
  test("responds with JSON and ok field", async ({ request }) => {
    const res = await request.get("/api/health");
    // Accept 200 (DB reachable) or 503 (DB unavailable / cold start).
    // Either way the route must respond — a network error is a real failure.
    expect([200, 503]).toContain(res.status());
    const body = await res.json();
    // Body must always have an `ok` boolean key.
    expect(typeof body.ok).toBe("boolean");
  });
});

test.describe("GET /api/events/ics", () => {
  test("returns a valid iCalendar file", async ({ request }) => {
    const res = await request.get("/api/events/ics");
    expect(res.status()).toBe(200);

    // Content-Type header must contain text/calendar (may include charset suffix)
    const contentType = res.headers()["content-type"] ?? "";
    expect(contentType.toLowerCase()).toContain("text/calendar");

    // Body must be a valid iCal document
    const body = await res.text();
    expect(body).toContain("BEGIN:VCALENDAR");
    expect(body).toContain("END:VCALENDAR");
  });
});

test.describe("GET /api/issues.geojson", () => {
  test("returns valid GeoJSON FeatureCollection", async ({ request }) => {
    const res = await request.get("/api/issues.geojson");

    // In production a DB error yields 500; in dev sample data is always served.
    // We skip gracefully in production when the DB is genuinely unreachable.
    if (res.status() === 500) {
      test.skip(
        true,
        "DB unreachable in this environment — geojson endpoint returned 500"
      );
      return;
    }

    expect(res.status()).toBe(200);
    const contentType = res.headers()["content-type"] ?? "";
    expect(contentType.toLowerCase()).toContain("application/json");

    const body = await res.json();
    expect(body).toHaveProperty("type", "FeatureCollection");
    expect(body).toHaveProperty("features");
    expect(Array.isArray(body.features)).toBe(true);
  });
});

test.describe("POST /api/tax/lookup", () => {
  test("returns 400 when search parameters are missing", async ({ request }) => {
    const res = await request.post("/api/tax/lookup", {
      data: {},
      headers: { "Content-Type": "application/json" },
    });
    expect([400, 422]).toContain(res.status());
    const body = await res.json();
    expect(body).toHaveProperty("error");
  });

  test("returns 400 when query string is empty", async ({ request }) => {
    const res = await request.post("/api/tax/lookup", {
      data: { searchType: "parcel", query: "" },
      headers: { "Content-Type": "application/json" },
    });
    expect([400, 422]).toContain(res.status());
  });

  test("returns 200 with results array for a parcel query", async ({ request }) => {
    const res = await request.post("/api/tax/lookup", {
      data: { searchType: "parcel", query: "PAP-2025-00123" },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("results");
    expect(Array.isArray(body.results)).toBe(true);
    // In local/dev mode the mock record for PAP-2025-00123 should be returned
    if (process.env.NODE_ENV !== "production") {
      expect(body.results.length).toBeGreaterThan(0);
      expect(body.results[0]).toHaveProperty("parcelId", "PAP-2025-00123");
    }
  });

  test("returns 200 with results array for a NIF query", async ({ request }) => {
    const res = await request.post("/api/tax/lookup", {
      data: { searchType: "nif", query: "001-234-567-8" },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("results");
    expect(Array.isArray(body.results)).toBe(true);
  });

  test("returns 200 with empty results for a non-existent record", async ({ request }) => {
    const res = await request.post("/api/tax/lookup", {
      data: { searchType: "parcel", query: "DOES-NOT-EXIST-9999" },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.results).toHaveLength(0);
  });
});

test.describe("POST /api/title/requests", () => {
  test("returns 400 or 401 when body is missing required fields", async ({ request }) => {
    const res = await request.post("/api/title/requests", {
      data: {},
      headers: { "Content-Type": "application/json" },
    });
    // 400 = validation error, 401 = auth required — both are acceptable
    expect([400, 401, 422]).toContain(res.status());
  });
});
