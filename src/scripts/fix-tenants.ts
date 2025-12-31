import "dotenv/config";
import { db } from "../db/index";
import { tenants } from "../db/schema";
import { sql } from "drizzle-orm";

async function fixTenants() {
    console.log("🔧 Fixing tenant subdomains...\n");

    try {
        // First, let's see what's currently in the database
        const currentTenants = await db.select().from(tenants);

        console.log("CURRENT STATE:");
        console.log("=".repeat(60));
        currentTenants.forEach((t) => {
            console.log(`${t.name}: subdomain="${t.subdomain}"`);
        });
        console.log("=".repeat(60));
        console.log("");

        // Update each tenant's subdomain to the correct value
        console.log("Updating subdomains...\n");

        await db.update(tenants)
            .set({ subdomain: "demo" })
            .where(sql`id = '00000000-0000-0000-0000-000000000001'`);
        console.log("✅ Updated Demo City to 'demo'");

        await db.update(tenants)
            .set({ subdomain: "jacmel" })
            .where(sql`id = '00000000-0000-0000-0000-000000000002'`);
        console.log("✅ Updated Ville de Jacmel to 'jacmel'");

        await db.update(tenants)
            .set({ subdomain: "pap" })
            .where(sql`id = '00000000-0000-0000-0000-000000000003'`);
        console.log("✅ Updated Ville de Port-au-Prince to 'pap'");

        // Verify the updates
        console.log("\nNEW STATE:");
        console.log("=".repeat(60));
        const updatedTenants = await db.select().from(tenants);
        updatedTenants.forEach((t) => {
            console.log(`${t.name}: subdomain="${t.subdomain}"`);
        });
        console.log("=".repeat(60));
        console.log("\n✅ All tenants updated successfully!");

    } catch (error) {
        console.error("❌ Error:", error);
    }

    process.exit(0);
}

fixTenants();
