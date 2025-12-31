import {
    pgTable,
    text,
    timestamp,
    uuid,
    boolean,
    jsonb,
    doublePrecision,
    index,
    primaryKey,
} from "drizzle-orm/pg-core";
import { relations, sql, InferSelectModel } from "drizzle-orm";

// -------------------------------------------------------------------------
// 1. Tenants (Foundation)
// -------------------------------------------------------------------------
export const tenants = pgTable("tenants", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    subdomain: text("subdomain").notNull().unique(), // e.g., 'jacmel' or 'localhost'
    logo_url: text("logo_url"),
    primary_color: text("primary_color"), // Custom branding per city

    // Financial Routing (Phase 1: Manual Reconciliation)
    moncash_merchant_id: text("moncash_merchant_id"),
    bank_name: text("bank_name"),
    bank_swift_code: text("bank_swift_code"),
    bank_account_number: text("bank_account_number"),
    bank_beneficiary_name: text("bank_beneficiary_name"),
    whatsapp_number: text("whatsapp_number"),

    // Mayor / Leadership Info
    mayor_name: text("mayor_name"),
    mayor_bio: text("mayor_bio"),
    mayor_image_url: text("mayor_image_url"),

    created_at: timestamp("created_at").defaultNow().notNull(),
});

export type Tenant = InferSelectModel<typeof tenants>;

// -------------------------------------------------------------------------
// 2. Users (Scoped to Tenant or Global?)
// Users are typically scoped to a tenant in this model.
// -------------------------------------------------------------------------
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    tenant_id: uuid("tenant_id")
        .references(() => tenants.id)
        .notNull(),
    name: text("name"),
    email: text("email").notNull(), // Unique per tenant? Or global?
    password: text("password").notNull(),
    role: text("role").default("user"), // 'admin', 'user', 'superadmin'
    municipality_code: text("municipality_code"), // Legacy, can keep or remove. Keeping for compatibility if needed.
    created_at: timestamp("created_at").defaultNow(),
}, (table) => ({
    // Email should probably be unique per tenant if users are isolated, or global if SSO. 
    // For now simple unique index with tenant_id might be safer or just rely on manual checks for phase 1.
    // Let's make it unique global for simplicity to start.
    emailIdx: index("users_email_idx").on(table.email),
    tenantIdx: index("users_tenant_idx").on(table.tenant_id),
}));

// -------------------------------------------------------------------------
// 3. Open311 / Service Requests (Replaces 'Issues')
// -------------------------------------------------------------------------

// Represents a type of request (e.g., "Pothole")
export const services = pgTable(
    "services",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        tenant_id: uuid("tenant_id")
            .references(() => tenants.id)
            .notNull(),
        service_code: text("service_code").notNull(),

        // Multilingual Fields (JSONB)
        service_name: jsonb("service_name").notNull(),
        description: jsonb("description"),

        metadata: boolean("metadata").default(false).notNull(),
        type: text("type").default("realtime"),
        keywords: jsonb("keywords"),
        group: text("group"),

        created_at: timestamp("created_at").defaultNow().notNull(),
        updated_at: timestamp("updated_at").defaultNow(),
    },
    (table) => ({
        tenantIdx: index("services_tenant_idx").on(table.tenant_id),
        codeIdx: index("services_code_idx").on(table.tenant_id, table.service_code),
    })
);

// Defines custom attributes for a service
export const service_definitions = pgTable(
    "service_definitions",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        tenant_id: uuid("tenant_id")
            .references(() => tenants.id)
            .notNull(),
        service_code: text("service_code").notNull(),

        variable: boolean("variable").notNull(),
        code: text("code").notNull(),
        datatype: text("datatype").notNull(),
        required: boolean("required").default(false).notNull(),
        datatype_description: text("datatype_description"),
        order: doublePrecision("order").default(0),
        description: jsonb("description").notNull(),
        values: jsonb("values"),

        created_at: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => ({
        tenantIdx: index("svc_def_tenant_idx").on(table.tenant_id),
        serviceIdx: index("svc_def_service_idx").on(table.tenant_id, table.service_code),
    })
);

// Actual Service Requests (The "Issues")
export const service_requests = pgTable(
    "service_requests",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        tenant_id: uuid("tenant_id")
            .references(() => tenants.id)
            .notNull(),

        service_code: text("service_code").notNull(),
        service_name: text("service_name"),

        latitude: doublePrecision("latitude"),
        longitude: doublePrecision("longitude"),
        address: text("address"),
        address_id: text("address_id"),
        zipcode: text("zipcode"),

        email: text("email"),
        first_name: text("first_name"),
        last_name: text("last_name"),
        phone: text("phone"),
        account_id: text("account_id"),

        description: text("description"),
        media_url: text("media_url"),

        status: text("status").default("open").notNull(),
        status_notes: text("status_notes"),
        agency_responsible: text("agency_responsible"),
        service_notice: text("service_notice"),

        requested_datetime: timestamp("requested_datetime").defaultNow().notNull(),
        updated_datetime: timestamp("updated_datetime").defaultNow(),
        expected_datetime: timestamp("expected_datetime"),

        communal_section_id: uuid("communal_section_id").references(() => communal_sections.id),
        idempotency_key: text("idempotency_key"),
    },
    (table) => ({
        tenantIdx: index("sr_tenant_idx").on(table.tenant_id),
        geoIdx: index("sr_geo_idx").on(table.latitude, table.longitude),
        statusIdx: index("sr_status_idx").on(table.status),
        serviceIdx: index("sr_service_idx").on(table.service_code),
        idempotencyIdx: index("sr_idempotency_idx").on(table.tenant_id, table.idempotency_key),
    })
);

// Answers to attributes
export const service_attributes = pgTable(
    "service_attributes",
    {
        service_request_id: uuid("service_request_id")
            .references(() => service_requests.id)
            .notNull(),
        tenant_id: uuid("tenant_id")
            .references(() => tenants.id)
            .notNull(),
        service_code: text("service_code"),
        attribute_code: text("attribute_code").notNull(),
        value: text("value"),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.service_request_id, table.attribute_code] }),
        tenantIdx: index("sa_tenant_idx").on(table.tenant_id),
    })
);

// -------------------------------------------------------------------------
// 4. Payments Implementation
// -------------------------------------------------------------------------

export const payment_records = pgTable("payment_records", {
    id: uuid("id").defaultRandom().primaryKey(),
    tenant_id: uuid("tenant_id").references(() => tenants.id).notNull(),
    user_id: uuid("user_id").references(() => users.id),
    email: text("email").notNull(), // Required for guest flow and receipt delivery

    amount: text("amount").notNull(), // Using text to avoid decimal precision issues in JS, handle with Big.js or similar
    currency: text("currency").notNull(), // 'USD', 'HTG'

    payment_method: text("payment_method").notNull(), // 'moncash', 'wire_transfer'
    payment_type: text("payment_type").notNull(), // 'property_tax', 'business_license', etc.

    reference_id: text("reference_id"), // Ticket #, Property ID
    generated_memo_code: text("generated_memo_code").notNull(), // JAC-TAX-8821

    status: text("status").default("pending_upload").notNull(),
    proof_url: text("proof_url"),
    official_quittance_id: text("official_quittance_id"),
    admin_notes: text("admin_notes"),

    verified_at: timestamp("verified_at"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow(),
}, (table) => ({
    tenantIdx: index("payments_tenant_idx").on(table.tenant_id),
    emailIdx: index("payments_email_idx").on(table.email),
    memoIdx: index("payments_memo_idx").on(table.generated_memo_code),
}));

// -------------------------------------------------------------------------
// 5. Other Modules (Events, Datasets) - Tenant Scoped
// -------------------------------------------------------------------------
export const events = pgTable("events", {
    id: uuid("id").defaultRandom().primaryKey(),
    tenant_id: uuid("tenant_id").references(() => tenants.id).notNull(),
    title: text("title").notNull(),
    description: text("description"),
    start_time: timestamp("start_time").notNull(),
    end_time: timestamp("end_time"),
    location: text("location"),
    created_at: timestamp("created_at").defaultNow(),
});

export const communal_sections = pgTable("communal_sections", {
    id: uuid("id").defaultRandom().primaryKey(),
    tenant_id: uuid("tenant_id").references(() => tenants.id).notNull(),
    name: text("name").notNull(),
    code: text("code"),
    created_at: timestamp("created_at").defaultNow(),
});

export const officials = pgTable("officials", {
    id: uuid("id").defaultRandom().primaryKey(),
    tenant_id: uuid("tenant_id").references(() => tenants.id).notNull(),
    name: text("name").notNull(),
    role: text("role").notNull(), // 'Mayor', 'CASEC', 'ASEC', 'Town Delegate'
    communal_section_id: uuid("communal_section_id").references(() => communal_sections.id),
    is_president: boolean("is_president").default(false),
    bio: text("bio"),
    whatsapp_number: text("whatsapp_number"),
    photo_url: text("photo_url"),
    created_at: timestamp("created_at").defaultNow(),
});

export const datasets = pgTable("datasets", {
    id: uuid("id").defaultRandom().primaryKey(),
    tenant_id: uuid("tenant_id").references(() => tenants.id).notNull(),
    title: text("title").notNull(),
    description: text("description"),
    category: text("category"),
    download_url: text("download_url"),
    created_at: timestamp("created_at").defaultNow(),
});

export const facilities = pgTable("facilities", {
    id: uuid("id").defaultRandom().primaryKey(),
    tenant_id: uuid("tenant_id").references(() => tenants.id).notNull(),
    name: text("name").notNull(),
    category: text("category").notNull(), // 'health', 'education', 'safety', 'library', 'emergency'
    sub_category: text("sub_category"), // e.g., 'Commissariat', 'Urgent Care'
    communal_section_id: uuid("communal_section_id").references(() => communal_sections.id),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    contact_phone: text("contact_phone"),
    is_public: boolean("is_public").default(true),
    status: text("status").default("operational").notNull(), // 'operational', 'limited_services', 'closed'
    created_at: timestamp("created_at").defaultNow(),
});

// -------------------------------------------------------------------------
// RELATIONS
// -------------------------------------------------------------------------
export const tenantsRelations = relations(tenants, ({ many }) => ({
    users: many(users),
    services: many(services),
    requests: many(service_requests),
    payments: many(payment_records),
    facilities: many(facilities),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
    tenant: one(tenants, {
        fields: [services.tenant_id],
        references: [tenants.id],
    }),
    definitions: many(service_definitions),
}));

export const serviceDefinitionsRelations = relations(service_definitions, ({ one }) => ({
    tenant: one(tenants, {
        fields: [service_definitions.tenant_id],
        references: [tenants.id],
    }),
    service: one(services, {
        fields: [service_definitions.service_code, service_definitions.tenant_id],
        references: [services.service_code, services.tenant_id],
    }),
}));

export const serviceRequestsRelations = relations(service_requests, ({ one, many }) => ({
    tenant: one(tenants, {
        fields: [service_requests.tenant_id],
        references: [tenants.id],
    }),
    section: one(communal_sections, {
        fields: [service_requests.communal_section_id],
        references: [communal_sections.id],
    }),
    attributes: many(service_attributes),
}));

export const serviceAttributesRelations = relations(service_attributes, ({ one }) => ({
    request: one(service_requests, {
        fields: [service_attributes.service_request_id],
        references: [service_requests.id],
    }),
}));

export const paymentRecordsRelations = relations(payment_records, ({ one }) => ({
    tenant: one(tenants, {
        fields: [payment_records.tenant_id],
        references: [tenants.id],
    }),
    user: one(users, {
        fields: [payment_records.user_id],
        references: [users.id],
    }),
}));

export const eventsRelations = relations(events, ({ one }) => ({
    tenant: one(tenants, {
        fields: [events.tenant_id],
        references: [tenants.id],
    }),
}));

export const communalSectionsRelations = relations(communal_sections, ({ one, many }) => ({
    tenant: one(tenants, {
        fields: [communal_sections.tenant_id],
        references: [tenants.id],
    }),
    officials: many(officials),
    requests: many(service_requests),
    facilities: many(facilities),
}));

export const officialsRelations = relations(officials, ({ one }) => ({
    tenant: one(tenants, {
        fields: [officials.tenant_id],
        references: [tenants.id],
    }),
    section: one(communal_sections, {
        fields: [officials.communal_section_id],
        references: [communal_sections.id],
    }),
}));

export const facilitiesRelations = relations(facilities, ({ one }) => ({
    tenant: one(tenants, {
        fields: [facilities.tenant_id],
        references: [tenants.id],
    }),
    section: one(communal_sections, {
        fields: [facilities.communal_section_id],
        references: [communal_sections.id],
    }),
}));
