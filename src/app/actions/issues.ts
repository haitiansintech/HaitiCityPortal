"use server";

import { db } from "@/db";
import { issues } from "@/db/schema";

export async function createIssue(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const contactEmail = String(formData.get("contactEmail") ?? "").trim();

    if (!title) {
        return { error: "Please provide a title for the issue." };
    }

    try {
        await db.insert(issues).values({
            title,
            description: description || null,
            contact_email: contactEmail || null,
            status: "submitted",
        });
        return { success: true };
    } catch (error: any) {
        return { error: `Unable to submit issue: ${error.message}` };
    }
}
