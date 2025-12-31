"use server";

import { db } from "@/db";
import { projects, payment_records, audit_snapshots } from "@/db/schema";
import { eq, like, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function publishAudit(projectId: string, projectCode: string) {
    // 1. Find all verified but NOT yet public records
    const newRecords = await db.query.payment_records.findMany({
        where: and(
            eq(payment_records.status, 'verified'),
            eq(payment_records.is_public_ledger, false),
            like(payment_records.generated_memo_code, `%${projectCode}%`)
        )
    });

    if (newRecords.length === 0) {
        return { success: true, message: "No new funds to publish" };
    }

    // 2. Calculate Total of New Funds
    const newTotal = newRecords.reduce((sum, record) => {
        return sum + parseFloat(record.amount);
    }, 0);

    // 3. Get Current Project Total
    const project = await db.query.projects.findFirst({
        where: eq(projects.id, projectId)
    });

    if (!project) throw new Error("Project not found");

    const newProjectTotal = (project.current_raised || 0) + newTotal;

    // 4. Update Project Total
    await db.update(projects).set({
        current_raised: newProjectTotal,
    }).where(eq(projects.id, projectId));

    // 5. Mark Records as Public Ledger
    // Note: Drizzle doesn't support bulk update with 'inArray' easily in all drivers without specific syntax, 
    // but iterating for now is safe for small batches. 
    // Optimization: db.update(payment_records).set({is_public: true}).where(inArray(payment_records.id, ids))

    for (const record of newRecords) {
        await db.update(payment_records).set({
            is_public_ledger: true,
            is_public: true, // Maintain backwards compatibility if needed
        }).where(eq(payment_records.id, record.id));
    }

    // 6. Create Audit Snapshot
    await db.insert(audit_snapshots).values({
        tenant_id: project.tenant_id,
        project_id: projectId,
        snapshot_total: newProjectTotal,
        new_funds_added: newTotal,
    });

    console.log(`Audit Published for ${projectCode}: Added $${newTotal}. Snapshot created.`);

    revalidatePath("/admin/finance/audit-review");
    revalidatePath("/transparency");
    revalidatePath("/donate");

    return { success: true, added: newTotal };
}
