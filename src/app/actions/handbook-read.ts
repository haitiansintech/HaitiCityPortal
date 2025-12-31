"use server";

import { db } from "@/db";
import { handbook_reads } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function markArticleAsRead(articleId: string) {
    // In a real app, get user ID from session. 
    // For demo, we'll use a hardcoded user ID or just insert a record if not exists.
    const MOCK_USER_ID = "00000000-0000-0000-0000-000000000000"; // Ideally fetch from DB seed

    // Using a fake ID might fail foreign key constraints if that user doesn't exist.
    // I entered 'users' in the seed? Yes, but I need a valid ID. 
    // Let's assume the client passes it or we pick the first user.
    // For safety in this demo, I will fetch a user first.

    const user = await db.query.users.findFirst();
    if (!user) return { success: false, message: "No user found" };

    await db.insert(handbook_reads).values({
        user_id: user.id,
        article_id: articleId,
        read_at: new Date(),
    });

    revalidatePath("/admin/handbook");
    return { success: true };
}
