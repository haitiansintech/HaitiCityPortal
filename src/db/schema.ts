import {
    pgTable,
    serial,
    text,
    timestamp,
    uuid,
    doublePrecision,
    boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    role: text("role").default("user"),
    municipality_code: text("municipality_code"),
    created_at: timestamp("created_at").defaultNow(),
});

export const issues = pgTable("issues", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    status: text("status").default("submitted"),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    contact_email: text("contact_email"),
    created_at: timestamp("created_at").defaultNow().notNull(),
});

export const events = pgTable("events", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    start_time: timestamp("start_time").notNull(),
    end_time: timestamp("end_time"),
    location: text("location"),
    created_at: timestamp("created_at").defaultNow(),
});

export const datasets = pgTable("datasets", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    category: text("category"),
    download_url: text("download_url"),
    created_at: timestamp("created_at").defaultNow(),
});
