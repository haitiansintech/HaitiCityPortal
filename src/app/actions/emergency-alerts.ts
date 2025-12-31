"use server";

import { db } from "@/db";
import { emergency_alerts } from "@/db/schema";
import { gt, desc, eq } from "drizzle-orm";

export async function getActiveAlert() {
    const alerts = await db.query.emergency_alerts.findMany({
        where: gt(emergency_alerts.expires_at, new Date()),
        orderBy: [desc(emergency_alerts.created_at)],
        limit: 1,
    });

    return alerts.length > 0 ? alerts[0] : null;
}

export async function createEmergencyAlert(formData: FormData) {
    const message_fr = formData.get("message_fr") as string;
    const message_kr = formData.get("message_kr") as string;
    const severity = formData.get("severity") as string;
    const durationHours = parseInt(formData.get("duration") as string);

    if (!message_fr || !message_kr) return { success: false, message: "Missing fields" };

    const expires_at = new Date();
    expires_at.setHours(expires_at.getHours() + durationHours);

    await db.insert(emergency_alerts).values({
        tenant_id: "00000000-0000-0000-0000-000000000000", // Demo tenant
        message_fr,
        message_kr,
        severity,
        expires_at,
    });

    return { success: true };
}
