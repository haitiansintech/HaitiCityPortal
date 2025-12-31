"use server";

import { db } from "@/db";
import { payment_records, tenants } from "@/db/schema";
import { eq, or, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

function generateMemoCode(tenantSubdomain: string, type: string) {
    const prefix = tenantSubdomain.slice(0, 3).toUpperCase();
    const typeCode = type.slice(0, 3).toUpperCase();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${typeCode}-${random}`;
}

export async function createPaymentIntent(data: {
    email: string;
    amount: string;
    currency: string;
    payment_method: "moncash" | "wire_transfer";
    payment_type: string;
    reference_id?: string;
}) {
    try {
        const headersList = await headers();
        const subdomain = headersList.get("x-tenant-subdomain") || "demo";

        const tenant = await db.query.tenants.findFirst({
            where: eq(tenants.subdomain, subdomain)
        });

        if (!tenant) throw new Error("Tenant not found");

        const memoCode = generateMemoCode(subdomain, data.payment_type);

        const [record] = await db.insert(payment_records).values({
            tenant_id: tenant.id,
            email: data.email,
            amount: data.amount,
            currency: data.currency,
            payment_method: data.payment_method,
            payment_type: data.payment_type as any,
            reference_id: data.reference_id,
            generated_memo_code: memoCode,
            status: "pending_upload",
        }).returning();

        return { success: true, record };
    } catch (error) {
        console.error("Create payment intent error:", error);
        return { success: false, error: "Failed to create payment intent" };
    }
}

export async function uploadPaymentProof(id: string, proofUrl: string) {
    try {
        await db.update(payment_records)
            .set({
                proof_url: proofUrl,
                status: "pending_review",
                updated_at: new Date()
            })
            .where(eq(payment_records.id, id));

        revalidatePath("/pay/history");
        return { success: true };
    } catch (error) {
        console.error("Upload proof error:", error);
        return { success: false, error: "Failed to upload proof" };
    }
}

export async function searchPayments(query: string) {
    try {
        const headersList = await headers();
        const subdomain = headersList.get("x-tenant-subdomain") || "demo";

        const tenant = await db.query.tenants.findFirst({
            where: eq(tenants.subdomain, subdomain)
        });

        if (!tenant) throw new Error("Tenant not found");

        const records = await db.select()
            .from(payment_records)
            .where(
                and(
                    eq(payment_records.tenant_id, tenant.id),
                    or(
                        eq(payment_records.email, query),
                        eq(payment_records.generated_memo_code, query.toUpperCase())
                    )
                )
            )
            .orderBy(desc(payment_records.created_at));

        return { success: true, records };
    } catch (error) {
        console.error("Search payments error:", error);
        return { success: false, error: "Search failed" };
    }
}
