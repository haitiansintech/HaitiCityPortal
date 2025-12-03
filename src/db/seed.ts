import { db } from "./index";
import { users, issues, events, datasets } from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
    console.log("Seeding database...");

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await db.insert(users).values({
        name: "Admin User",
        email: "admin@haiticity.org",
        password: hashedPassword,
        role: "admin",
        municipality_code: "HT-01",
    }).onConflictDoNothing();

    // Create sample issues
    await db.insert(issues).values([
        {
            title: "Streetlight outage on Rue Capois",
            description: "Streetlight in front of the market has been out for two weeks.",
            status: "in_progress",
            latitude: 18.5395,
            longitude: -72.3385,
        },
        {
            title: "Blocked drainage near Avenue Christophe",
            description: "Debris blocking the drainage channel after recent storms.",
            status: "submitted",
            latitude: 18.551,
            longitude: -72.335,
        },
    ]).onConflictDoNothing();

    // Create sample events
    const now = new Date();
    await db.insert(events).values([
        {
            title: "Town Hall: Port-au-Prince Waterfront Plan",
            description: "Join the planning team to review proposed waterfront improvements.",
            start_time: new Date(now.getTime() + 5 * 24 * 3600 * 1000),
            end_time: new Date(now.getTime() + 5 * 24 * 3600 * 1000 + 90 * 60000),
            location: "City Hall Auditorium",
        },
    ]).onConflictDoNothing();

    // Create sample datasets
    await db.insert(datasets).values([
        {
            title: "Road repair schedule",
            description: "Weekly updates on roadway maintenance.",
            category: "Infrastructure",
            download_url: "https://example.com/datasets/road-repairs.csv",
        },
    ]).onConflictDoNothing();

    console.log("Seeding complete.");
    process.exit(0);
}

seed().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
