"use server";

import { db } from "@/db";
import { payment_records } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function approvePayment(paymentId: string) {
    try {
        const session = await auth();
        if (!session || !session.user || session.user.role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        const tenantId = session.user.tenantId;

        // Verify record belongs to tenant and is in correct state
        const record = await db.query.payment_records.findFirst({
            where: and(
                eq(payment_records.id, paymentId),
                eq(payment_records.tenant_id, tenantId)
            )
        });

        if (!record) return { success: false, error: "Record not found" };
        if (record.status === "verified") return { success: false, error: "Already verified" };

        // Generate Quittance ID: QT-{Year}-{SequentialNumber}
        // For simplicity in this phase, we use a random number or count
        const year = new Date().getFullYear();
        const rand = Math.floor(1000 + Math.random() * 9000);
        const quittanceId = `QT-${year}-${rand}`;

        await db.update(payment_records)
            .set({
                status: "verified",
                official_quittance_id: quittanceId,
                verified_at: new Date(),
                updated_at: new Date(),
            })
            .where(eq(payment_records.id, paymentId));

        revalidatePath("/admin/finance");
        return { success: true, quittanceId };
    } catch (error) {
        console.error("Approve payment error:", error);
        return { success: false, error: "Failed to approve payment" };
    }
}

export async function rejectPayment(paymentId: string, reason: string) {
    try {
        const session = await auth();
        if (!session || !session.user || session.user.role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        const tenantId = session.user.tenantId;

        await db.update(payment_records)
            .set({
                status: "rejected",
                admin_notes: reason,
                updated_at: new Date(),
            })
            .where(
                and(
                    eq(payment_records.id, paymentId),
                    eq(payment_records.tenant_id, tenantId)
                )
            );

        revalidatePath("/admin/finance");
        return { success: true };
    } catch (error) {
        console.error("Reject payment error:", error);
        return { success: false, error: "Failed to reject payment" };
    }
}
