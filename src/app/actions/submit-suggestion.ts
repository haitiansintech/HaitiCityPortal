"use server";

import { db } from "@/db";
import { facility_suggestions } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function submitSuggestion(formData: FormData) {
    const facilityId = formData.get("facilityId") as string;
    const communalSectionId = formData.get("communalSectionId") as string;
    const userContact = formData.get("userContact") as string;
    const honeypot = formData.get("confirm_email") as string; // Hidden field

    // 1. Anti-Spam Check
    if (honeypot) {
        // If the honeypot field is filled, it's a bot.
        // Return success to confuse the bot, but don't save.
        return { success: true };
    }

    if (!userContact || !facilityId) {
        throw new Error("Missing required fields");
    }

    // 2. Extract Suggested Data
    const suggestedData = {
        name: formData.get("name") as string,
        contact_phone: formData.get("contact_phone") as string,
        whatsapp_number: formData.get("whatsapp_number") as string,
        // Add other fields as needed
    };

    // 3. Save to Database
    await db.insert(facility_suggestions).values({
        facility_id: facilityId,
        communal_section_id: communalSectionId,
        suggested_data: suggestedData,
        user_contact_info: userContact,
        status: "new",
    });

    console.log("Suggestion submitted for facility:", facilityId);
    revalidatePath("/directory");

    return { success: true };
}
