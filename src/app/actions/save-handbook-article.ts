"use server";

import { db } from "@/db";
import { handbook_articles } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function saveHandbookArticle(formData: FormData) {
    const title = formData.get("title") as string;
    const content_fr = formData.get("content_fr") as string;
    const content_kr = formData.get("content_kr") as string;
    const category = formData.get("category") as string;
    const required_role = formData.get("required_role") as string;
    // const is_published = formData.get("is_published") === "on"; // Simplified for now

    await db.insert(handbook_articles).values({
        tenant_id: "00000000-0000-0000-0000-000000000000", // Placeholder for demo, ideally from session
        title,
        content_fr,
        content_kr,
        category,
        required_role,
        is_published: true,
    });

    revalidatePath("/admin/handbook");
    revalidatePath("/admin/handbook/editor");

    return { success: true };
}
