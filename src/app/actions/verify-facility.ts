"use server";

import { db } from "@/db";
import { facilities } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function verifyFacility(facilityId: string, status: string, userId: string = "00000000-0000-0000-0000-000000000000") {
    // Note: userId defaults to a placeholder/system ID since we don't have full auth context in this demo.
    // In a real app, we would get the session user ID.

    await db.update(facilities).set({
        status: status,
        // We cast to any because we are mocking the user ID for this demo if not provided, 
        // and valid foreign keys might restrict us if we don't have a real user session.
        // However, let's assume we pass a valid ID or null if allowed.
        // For now, let's just update the timestamp and status which is the core request.
        // If we strictly want to track USER ID, we need a valid user from the `users` table.
        // We will skip inserting `last_verified_by` if we don't have a guaranteed valid user to avoid FK constraints in this demo flow,
        // unless we are sure we have a valid admin ID.
        last_verified_at: new Date(),
    }).where(eq(facilities.id, facilityId));

    revalidatePath("/admin/field-reports");
    revalidatePath("/directory");

    return { success: true };
}
