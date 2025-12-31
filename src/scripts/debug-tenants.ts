import "dotenv/config";
import { db } from "../db/index";
import { tenants } from "../db/schema";

async function debugTenants() {
    console.log("🔍 Fetching all tenants from database...\n");

    try {
        const allTenants = await db.select().from(tenants);

        console.log("=".repeat(60));
        console.log("CURRENT TENANTS IN DATABASE:");
        console.log("=".repeat(60));

        if (allTenants.length === 0) {
            console.log("⚠️  NO TENANTS FOUND IN DATABASE!");
            console.log("\nPlease run: npm run db:seed");
        } else {
            console.log(`Found ${allTenants.length} tenant(s):\n`);

            allTenants.forEach((tenant, index) => {
                console.log(`${index + 1}. ${tenant.name}`);
                console.log(`   ID: ${tenant.id}`);
                console.log(`   Subdomain: ${tenant.subdomain}`);
                console.log(`   Primary Color: ${tenant.primary_color}`);
                console.log(`   Created: ${tenant.created_at}`);
                console.log("");
            });
        }

        console.log("=".repeat(60));
    } catch (error) {
        console.error("❌ Error fetching tenants:", error);
    }

    process.exit(0);
}

debugTenants();
