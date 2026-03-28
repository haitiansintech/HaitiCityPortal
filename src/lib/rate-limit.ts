/**
 * Simple in-process rate limiter — src/lib/rate-limit.ts
 *
 * Uses a sliding-window counter stored in a module-level Map.
 * Works for single-instance deployments (local dev, single Vercel region).
 * For multi-region production, swap the Map for an Upstash Redis store.
 *
 * Usage (in an API route):
 *
 *   import { rateLimit } from "@/lib/rate-limit";
 *
 *   export async function POST(request: Request) {
 *     const ip = request.headers.get("x-forwarded-for") ?? "unknown";
 *     const { ok, retryAfter } = rateLimit(ip, { limit: 10, windowMs: 60_000 });
 *     if (!ok) {
 *       return Response.json(
 *         { error: "Too many requests. Try again later." },
 *         { status: 429, headers: { "Retry-After": String(retryAfter) } }
 *       );
 *     }
 *     // … handle request
 *   }
 */

interface RateLimitOptions {
  /** Maximum number of requests allowed within the window. */
  limit: number;
  /** Rolling window duration in milliseconds. */
  windowMs: number;
}

interface RateLimitResult {
  /** true if the request is within the limit. */
  ok: boolean;
  /** Seconds until the client may retry (only set when ok === false). */
  retryAfter?: number;
  /** How many requests remain in the current window. */
  remaining: number;
}

interface WindowEntry {
  count: number;
  resetAt: number;
}

// Module-level store — persists for the lifetime of the Node.js process.
const store = new Map<string, WindowEntry>();

// Clean up expired entries every 5 minutes to avoid unbounded memory growth.
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) store.delete(key);
  }
}, 5 * 60_000).unref(); // .unref() prevents this timer from blocking process exit

/**
 * Check and increment the rate-limit counter for a given key.
 *
 * @param key       - Typically the client IP address.
 * @param options   - { limit, windowMs }
 */
export function rateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    // Start a new window
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
    return { ok: false, retryAfter, remaining: 0 };
  }

  return { ok: true, remaining: limit - existing.count };
}

/**
 * Pre-configured limiters for common use cases.
 * Import these directly instead of calling rateLimit() with custom options.
 */
export const limiters = {
  /** Public search / lookup endpoints — 30 requests per minute per IP. */
  search: (ip: string) => rateLimit(ip, { limit: 30, windowMs: 60_000 }),

  /** Form submission endpoints — 10 requests per minute per IP. */
  form: (ip: string) => rateLimit(ip, { limit: 10, windowMs: 60_000 }),

  /** Auth endpoints — 5 attempts per 15 minutes per IP. */
  auth: (ip: string) => rateLimit(ip, { limit: 5, windowMs: 15 * 60_000 }),
};
