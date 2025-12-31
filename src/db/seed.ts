import "dotenv/config";
import { db } from "./index";
import { tenants, users, services, service_requests, events, datasets } from "./schema";
import { sql } from "drizzle-orm";
import bcrypt from "bcryptjs";


// Hardcoded IDs to match Middleware Mock
const DEMO_TENANT_ID = '00000000-0000-0000-0000-000000000001';
const JACMEL_TENANT_ID = '00000000-0000-0000-0000-000000000002';
const PAP_TENANT_ID = '00000000-0000-0000-0000-000000000003';

async function seed() {
    console.log("🌱 Seeding Multi-Tenant SaaS Database...");

    // 1. Seed Tenants
    console.log("Creating Tenants...");
    await db.insert(tenants).values([
        {
            id: DEMO_TENANT_ID,
            name: "Demo City",
            subdomain: "demo",
            primary_color: "#0369a1", // Sky Blue
        },
        {
            id: JACMEL_TENANT_ID,
            name: "Ville de Jacmel",
            subdomain: "jacmel",
            primary_color: "#e11d48", // Rose
        },
        {
            id: PAP_TENANT_ID,
            name: "Ville de Port-au-Prince",
            subdomain: "pap",
            primary_color: "#166534", // Green
        },
    ]).onConflictDoUpdate({
        target: tenants.id,
        set: {
            subdomain: sql`EXCLUDED.subdomain`,
            name: sql`EXCLUDED.name`,
            primary_color: sql`EXCLUDED.primary_color`,
        }
    });

    // 2. Seed Admin Users
    console.log("Creating Admin Users...");
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const jacmelPassword = await bcrypt.hash("password123", 10);

    // Demo City Admin
    await db.insert(users).values({
        tenant_id: DEMO_TENANT_ID,
        name: "Demo Admin",
        email: "admin@demo.city",
        password: hashedPassword,
        role: "admin",
    }).onConflictDoNothing();

    // Jacmel Admin
    await db.insert(users).values({
        tenant_id: JACMEL_TENANT_ID,
        name: "Jacmel Admin",
        email: "admin@jacmel.ht",
        password: jacmelPassword,
        role: "admin",
    }).onConflictDoNothing();

    // Port-au-Prince Admin
    await db.insert(users).values({
        tenant_id: PAP_TENANT_ID,
        name: "PAP Admin",
        email: "admin@pap.ht",
        password: jacmelPassword,
        role: "admin",
    }).onConflictDoNothing();

    // 3. Seed Services (Open311 Definitions) - FOR ALL TENANTS
    console.log("Creating Services for all tenants...");

    const baseServices = [
        {
            service_code: "pothole",
            service_name: { en: "Pothole Repair", ht: "Reparasyon Twou", fr: "Réparation de nid-de-poule" },
            description: { en: "Report a pothole in the road.", ht: "Rapòte yon twou nan lari a.", fr: "Signaler un nid-de-poule sur la route." },
            group: "Infrastructure"
        },
        {
            service_code: "trash",
            service_name: { en: "Trash Pickup Missed", ht: "Fatra Pa Ranmase", fr: "Ramassage des ordures manqué" },
            description: { en: "Trash was not picked up on schedule.", ht: "Kamyon fatra a pa pase.", fr: "Les ordures n'ont pas été ramassées." },
            group: "Sanitation"
        },
        {
            service_code: "lighting",
            service_name: { en: "Street Light Out", ht: "Limyè Lari Etenn", fr: "Lampadaire éteint" },
            description: { en: "Report a broken or non-functioning street light.", ht: "Rapòte yon limyè lari ki pa mache.", fr: "Signaler un lampadaire cassé ou non fonctionnel." },
            group: "Infrastructure"
        }
    ];

    // Create services for each tenant
    const allServices = [DEMO_TENANT_ID, JACMEL_TENANT_ID, PAP_TENANT_ID].flatMap(tenantId =>
        baseServices.map(service => ({
            tenant_id: tenantId,
            ...service
        }))
    );

    await db.insert(services).values(allServices).onConflictDoNothing();

    // 4. Seed Service Requests (Issues)
    console.log("Creating Service Requests...");
    await db.insert(service_requests).values([
        {
            tenant_id: DEMO_TENANT_ID,
            service_code: "001",
            service_name: "Pothole Repair",
            description: "Big pothole near the market entrance.",
            status: "open",
            latitude: 18.5395,
            longitude: -72.3385,
        }
    ]).onConflictDoNothing();

    // 5. Seed Events
    console.log("Creating Events...");
    const now = new Date();
    await db.insert(events).values([
        {
            tenant_id: DEMO_TENANT_ID,
            title: "Town Hall: Budget Planning",
            description: "Discussing fiscal year goals.",
            start_time: new Date(now.getTime() + 5 * 24 * 3600 * 1000),
            location: "City Hall Auditorium",
        },
    ]).onConflictDoNothing();

    // 6. Seed Datasets
    console.log("Creating Datasets...");
    await db.insert(datasets).values([
        {
            tenant_id: DEMO_TENANT_ID,
            title: "Public Spending 2024",
            category: "Finance",
            download_url: "https://example.com/data.csv"
        }
    ]).onConflictDoNothing();

    console.log("✅ Seeding complete.");
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
