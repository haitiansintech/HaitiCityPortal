/**
 * Multi-tenant resolution utilities.
 *
 * Every public request carries a subdomain (extracted by middleware) that
 * identifies which city ("tenant") is being served. This module resolves
 * that subdomain to a full Tenant record from the database.
 *
 * If the database is unreachable, or if no matching tenant is found, the
 * code falls back to FALLBACK_TENANT so that the UI can still render instead
 * of crashing. This graceful-degrade strategy is intentional for resilience
 * during cold starts or local development without a live DB connection.
 */

import { db } from "@/db";
import { tenants, type Tenant } from "@/db/schema";
import { eq } from "drizzle-orm";

const FALLBACK_CREATED_AT = new Date("2025-01-01T00:00:00Z");

/**
 * The fallback tenant used when the database is unavailable or the requested
 * subdomain does not match any row in the `tenants` table.
 *
 * This constant exists so that Server Components and API routes always receive
 * a well-typed Tenant object — they never need to null-check the result of
 * getTenantBySubdomain. The "demo" subdomain is also what middleware assigns
 * to bare localhost / root production domains, so FALLBACK_TENANT doubles as
 * the default city for unauthenticated development sessions.
 */
export const FALLBACK_TENANT: Tenant = {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Haiti City Portal (System)",
    subdomain: "demo",
    logo_url: null,
    primary_color: "#0284c7",
    moncash_merchant_id: null,
    bank_name: null,
    bank_swift_code: null,
    bank_account_number: null,
    bank_beneficiary_name: null,
    whatsapp_number: null,
    mayor_name: null,
    mayor_bio: null,
    mayor_image_url: null,
    created_at: FALLBACK_CREATED_AT,
};

/**
 * Resolves a subdomain string to the corresponding Tenant database record.
 *
 * @param subdomain - The city subdomain extracted from the incoming request
 *   host (e.g. "jacmel", "portauprince", or "demo" for the root domain).
 *   This value is injected by middleware via the `x-tenant-subdomain` header
 *   and is trusted within the server-side call chain.
 *
 * @returns A Promise that resolves to the matching Tenant row, or to
 *   FALLBACK_TENANT when:
 *   - No tenant with that subdomain exists in the database, OR
 *   - The database query throws (e.g. connection unavailable during cold start
 *     or local development without a live Neon instance).
 *
 * The try/catch fallback strategy is deliberate: rather than crashing the
 * entire page render when the DB is temporarily unavailable, the application
 * degrades gracefully by serving the default tenant configuration. In
 * production the warning is suppressed; in development it is printed to the
 * console so engineers can see that the fallback was triggered.
 */
export async function getTenantBySubdomain(subdomain: string): Promise<Tenant> {
    try {
        const tenant = await db.query.tenants.findFirst({
            where: eq(tenants.subdomain, subdomain),
        });

        // Return the matched tenant, or FALLBACK_TENANT if no row was found
        return tenant ?? FALLBACK_TENANT;
    } catch (error) {
        // DB unavailable (e.g. no DATABASE_URL in local dev, cold-start timeout,
        // or Neon's serverless connection pool not yet warmed up). Rather than
        // propagating the error and rendering a 500 page, we degrade gracefully
        // to the fallback tenant so the UI remains functional.
        if (process.env.NODE_ENV !== "production") {
            console.warn("[tenant] DB unavailable, using fallback tenant:", error instanceof Error ? error.message : error);
        }
        return FALLBACK_TENANT;
    }
}
