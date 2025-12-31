"use server";

import { db } from "@/db";
import { service_requests } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function updateRequestStatus(requestId: string, newStatus: string) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return {
                success: false,
                message: "Authentication required",
            };
        }

        const tenantId = session.user.tenantId;

        // Verify the request belongs to this tenant (security check strictly using session tenantId)
        const request = await db
            .select()
            .from(service_requests)
            .where(
                and(
                    eq(service_requests.id, requestId),
                    eq(service_requests.tenant_id, tenantId)
                )
            )
            .limit(1);

        if (!request || request.length === 0) {
            return {
                success: false,
                message: "Request not found or access denied",
            };
        }

        // Update the status
        await db
            .update(service_requests)
            .set({
                status: newStatus,
                updated_datetime: new Date(),
            })
            .where(eq(service_requests.id, requestId));

        // Revalidate the pages
        revalidatePath("/admin/requests");
        revalidatePath(`/admin/requests/${requestId}`);

        return {
            success: true,
            message: "Status updated successfully",
        };
    } catch (error) {
        console.error("Failed to update status:", error);
        return {
            success: false,
            message: "Failed to update status",
        };
    }
}
