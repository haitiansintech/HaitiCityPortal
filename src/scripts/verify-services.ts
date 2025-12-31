import "dotenv/config";
import { db } from "../db/index";
import { services, tenants } from "../db/schema";
import { eq } from "drizzle-orm";

async function verifyServices() {
    console.log("🔍 Verifying services for all tenants...\n");

    try {
        // Get all tenants
        const allTenants = await db.select().from(tenants);

        console.log("=".repeat(60));

        for (const tenant of allTenants) {
            const tenantServices = await db
                .select()
                .from(services)
                .where(eq(services.tenant_id, tenant.id));

            console.log(`\n${tenant.name} (${tenant.subdomain}):`);
            console.log(`  Tenant ID: ${tenant.id}`);
            console.log(`  Services Count: ${tenantServices.length}`);

            if (tenantServices.length > 0) {
                console.log(`  Services:`);
                tenantServices.forEach((s, idx) => {
                    console.log(`    ${idx + 1}. ${s.service_name?.en || s.service_code} (code: ${s.service_code})`);
                });
            } else {
                console.log(`  ⚠️  NO SERVICES FOUND!`);
            }
        }

        console.log("\n" + "=".repeat(60));
    } catch (error) {
        console.error("❌ Error:", error);
    }

    process.exit(0);
}

verifyServices();
