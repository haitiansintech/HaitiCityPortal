import { db } from "@/db";
import { tenants, type Tenant } from "@/db/schema";
import { eq } from "drizzle-orm";

const FALLBACK_CREATED_AT = new Date("2025-01-01T00:00:00Z");

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

export async function getTenantBySubdomain(subdomain: string): Promise<Tenant> {
    try {
        const tenant = await db.query.tenants.findFirst({
            where: eq(tenants.subdomain, subdomain),
        });

        return tenant ?? FALLBACK_TENANT;
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.error("[tenant] Failed to load tenant", error);
        }
        return FALLBACK_TENANT;
    }
}
