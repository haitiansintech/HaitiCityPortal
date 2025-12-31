import "dotenv/config";
import { db } from "./index";
import { tenants, users, services, service_requests, events, datasets, officials, communal_sections, facilities } from "./schema";
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
            moncash_merchant_id: "JACMEL-MAIRIE",
            bank_name: "Banque Nationale de Crédit (BNC)",
            bank_swift_code: "BNCHHTPP",
            bank_account_number: "2460009999",
            bank_beneficiary_name: "Mairie de Jacmel",
            whatsapp_number: "+50937012345",
            mayor_name: "Mackenson Célestin",
            mayor_bio: "Dedicated to the cultural and infrastructure development of Jacmel since 2016.",
            mayor_image_url: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200",
        },
        {
            id: PAP_TENANT_ID,
            name: "Ville de Port-au-Prince",
            subdomain: "pap",
            primary_color: "#166534", // Green
            moncash_merchant_id: "PAP-RECETTES",
            bank_name: "Unibank",
            bank_swift_code: "UNIBHTPP",
            bank_account_number: "1010202033",
            bank_beneficiary_name: "Mairie de Port-au-Prince",
            whatsapp_number: "+50938054321",
            mayor_name: "Lucsonne Janvier",
            mayor_bio: "Serving the capital with a focus on sanitation and civic engagement.",
            mayor_image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
        },
    ]).onConflictDoUpdate({
        target: tenants.id,
        set: {
            subdomain: sql`EXCLUDED.subdomain`,
            name: sql`EXCLUDED.name`,
            primary_color: sql`EXCLUDED.primary_color`,
            moncash_merchant_id: sql`EXCLUDED.moncash_merchant_id`,
            bank_name: sql`EXCLUDED.bank_name`,
            bank_swift_code: sql`EXCLUDED.bank_swift_code`,
            bank_account_number: sql`EXCLUDED.bank_account_number`,
            bank_beneficiary_name: sql`EXCLUDED.bank_beneficiary_name`,
            whatsapp_number: sql`EXCLUDED.whatsapp_number`,
            mayor_name: sql`EXCLUDED.mayor_name`,
            mayor_bio: sql`EXCLUDED.mayor_bio`,
            mayor_image_url: sql`EXCLUDED.mayor_image_url`,
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
        {
            tenant_id: JACMEL_TENANT_ID,
            title: "Festival du Film de Jacmel",
            description: "An annual celebration of cinema in the heart of Jacmel.",
            start_time: new Date(now.getTime() + 10 * 24 * 3600 * 1000),
            location: "Place Toussaint Louverture",
        },
        {
            tenant_id: JACMEL_TENANT_ID,
            title: "Mairie Mobile: Secteur Bel-Air",
            description: "Submitting service requests and paying taxes directly in your neighborhood.",
            start_time: new Date(now.getTime() + 2 * 24 * 3600 * 1000),
            location: "Place Congres, Bel-Air",
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

    // 7. Seed Communal Sections
    console.log("Creating Communal Sections...");

    // Jacmel Sections (Official 11 sections)
    const jacmelSections = [
        { id: '11111111-1111-1111-1111-111111111101', tenant_id: JACMEL_TENANT_ID, name: "1ère Bas de Cap-Rouge", code: "01" },
        { id: '11111111-1111-1111-1111-111111111102', tenant_id: JACMEL_TENANT_ID, name: "2ème Bas de Cap-Rouge", code: "02" },
        { id: '11111111-1111-1111-1111-111111111103', tenant_id: JACMEL_TENANT_ID, name: "3ème Vanternier", code: "03" },
        { id: '11111111-1111-1111-1111-111111111104', tenant_id: JACMEL_TENANT_ID, name: "4ème La Montagne", code: "04" },
        { id: '11111111-1111-1111-1111-111111111105', tenant_id: JACMEL_TENANT_ID, name: "5ème Grande Rivière", code: "05" },
        { id: '11111111-1111-1111-1111-111111111106', tenant_id: JACMEL_TENANT_ID, name: "6ème Normande", code: "06" },
        { id: '11111111-1111-1111-1111-111111111107', tenant_id: JACMEL_TENANT_ID, name: "7ème Coq Chante", code: "07" },
        { id: '11111111-1111-1111-1111-111111111108', tenant_id: JACMEL_TENANT_ID, name: "8ème Cap-Rouge", code: "08" },
        { id: '11111111-1111-1111-1111-111111111109', tenant_id: JACMEL_TENANT_ID, name: "9ème Marbial", code: "09" },
        { id: '11111111-1111-1111-1111-111111111110', tenant_id: JACMEL_TENANT_ID, name: "10ème Haut Marbial", code: "10" },
        { id: '11111111-1111-1111-1111-111111111111', tenant_id: JACMEL_TENANT_ID, name: "11ème Grande Rivière de Jacmel", code: "11" },
    ];

    // PAP Sections
    const papSections = [
        { id: '22222222-2222-2222-2222-222222222201', tenant_id: PAP_TENANT_ID, name: "Martissant", code: "03" },
        { id: '22222222-2222-2222-2222-222222222202', tenant_id: PAP_TENANT_ID, name: "Turgeau", code: "01" },
    ];

    await db.insert(communal_sections).values([...jacmelSections, ...papSections]).onConflictDoNothing();

    // 9. Seed Facilities
    console.log("Creating Facilities...");
    await db.insert(facilities).values([
        // Jacmel
        {
            tenant_id: JACMEL_TENANT_ID,
            name: "Hôpital Saint-Michel",
            category: "health",
            sub_category: "Urgent Care",
            communal_section_id: '11111111-1111-1111-1111-111111111105', // 5è Grande Rivière
            latitude: 18.2346,
            longitude: -72.5350,
            contact_phone: "+50928172233",
            is_public: true,
            status: "operational",
        },
        {
            tenant_id: JACMEL_TENANT_ID,
            name: "Commissariat de Jacmel",
            category: "safety",
            sub_category: "Commissariat",
            communal_section_id: '11111111-1111-1111-1111-111111111105',
            latitude: 18.2356,
            longitude: -72.5360,
            contact_phone: "+50931221144",
            is_public: true,
            status: "operational",
        },
        {
            tenant_id: JACMEL_TENANT_ID,
            name: "Lycée Pinchinat",
            category: "education",
            sub_category: "High School",
            communal_section_id: '11111111-1111-1111-1111-111111111105',
            latitude: 18.2360,
            longitude: -72.5340,
            contact_phone: "+50928150000",
            is_public: true,
            status: "operational",
        },
        // Port-au-Prince
        {
            tenant_id: PAP_TENANT_ID,
            name: "Hôpital de l'Université d'État d'Haïti (HUEH)",
            category: "health",
            sub_category: "Public Hospital",
            communal_section_id: '22222222-2222-2222-2222-222222222202', // Turgeau
            latitude: 18.5430,
            longitude: -72.3396,
            contact_phone: "+50937112211",
            is_public: true,
            status: "limited_services",
        },
        {
            tenant_id: PAP_TENANT_ID,
            name: "Commissariat de Port-au-Prince",
            category: "safety",
            sub_category: "Commissariat",
            communal_section_id: '22222222-2222-2222-2222-222222222202',
            latitude: 18.5445,
            longitude: -72.3380,
            contact_phone: "+50938112222",
            is_public: true,
            status: "operational",
        },
    ]).onConflictDoNothing();

    console.log("✅ Seeding complete.");
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
