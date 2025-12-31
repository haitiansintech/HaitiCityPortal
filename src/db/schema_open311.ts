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
import { relations, sql } from "drizzle-orm";

// -------------------------------------------------------------------------
// 1. Tenants (Foundation)
// -------------------------------------------------------------------------
export const tenants = pgTable("tenants", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    subdomain: text("subdomain").notNull().unique(), // e.g., 'jacmel'
    logo_url: text("logo_url"),
    created_at: timestamp("created_at").defaultNow().notNull(),
});

// -------------------------------------------------------------------------
// 2. Services (Open311 GET /services.json)
// -------------------------------------------------------------------------
// Represents a type of request (e.g., "Pothole", "Trash Missed")
export const services = pgTable(
    "services",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        tenant_id: uuid("tenant_id")
            .references(() => tenants.id)
            .notNull(),
        service_code: text("service_code").notNull(), // User-facing ID, e.g. "001"

        // Multilingual Fields (JSONB: { "en": "Pothole", "ht": "Twou nan wout" })
        service_name: jsonb("service_name").notNull(),
        description: jsonb("description"),

        metadata: boolean("metadata").default(false).notNull(), // true if attributes required
        type: text("type").default("realtime"), // realtime | batch | blackbox
        keywords: jsonb("keywords"), // array of strings for search
        group: text("group"), // e.g. "Sanitation"

        created_at: timestamp("created_at").defaultNow().notNull(),
        updated_at: timestamp("updated_at").defaultNow(),
    },
    (table) => ({
        tenantIdx: index("services_tenant_idx").on(table.tenant_id),
        codeIdx: index("services_code_idx").on(table.tenant_id, table.service_code),
    })
);

// -------------------------------------------------------------------------
// 3. Service Definitions (Open311 GET /services/{code}.json)
// -------------------------------------------------------------------------
// Defines custom attributes/form fields for a service
export const service_definitions = pgTable(
    "service_definitions",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        tenant_id: uuid("tenant_id")
            .references(() => tenants.id)
            .notNull(),
        service_code: text("service_code").notNull(),

        // The definition of the attribute
        variable: boolean("variable").notNull(), // true for user input
        code: text("code").notNull(), // field name e.g., "bulk_item_type"
        datatype: text("datatype").notNull(), // string | number | datetime | text | singlevaluelist | multivaluelist
        required: boolean("required").default(false).notNull(),
        datatype_description: text("datatype_description"), // Validation Help
        order: doublePrecision("order").default(0),

        // Multilingual Labels (JSONB: { "ht": "Ki kalite fatra?", "en": "Type of trash?" })
        description: jsonb("description").notNull(),

        // For singlevaluelist/multivaluelist options (JSONB: [{key: "sofa", name: {en: "Sofa", ht: "Kanape"}}])
        values: jsonb("values"),

        created_at: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => ({
        tenantIdx: index("svc_def_tenant_idx").on(table.tenant_id),
        serviceIdx: index("svc_def_service_idx").on(table.tenant_id, table.service_code),
    })
);

// -------------------------------------------------------------------------
// 4. Service Requests (Open311 POST /requests.json)
// -------------------------------------------------------------------------
export const service_requests = pgTable(
    "service_requests",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        tenant_id: uuid("tenant_id")
            .references(() => tenants.id)
            .notNull(),

        // Categorization
        service_code: text("service_code").notNull(),
        service_name: text("service_name"), // Snapshot of name at submission (fallback)

        // Location
        latitude: doublePrecision("latitude"),
        longitude: doublePrecision("longitude"),
        address: text("address"),
        address_id: text("address_id"),
        zipcode: text("zipcode"),

        // Contact
        email: text("email"),
        first_name: text("first_name"),
        last_name: text("last_name"),
        phone: text("phone"),
        account_id: text("account_id"), // Link to user table auth id if signed in

        // Details
        description: text("description"),
        media_url: text("media_url"),

        // Status
        status: text("status").default("open").notNull(), // open | closed | acknowledged
        status_notes: text("status_notes"),
        agency_responsible: text("agency_responsible"),
        service_notice: text("service_notice"),

        // Timestamps
        requested_datetime: timestamp("requested_datetime").defaultNow().notNull(),
        updated_datetime: timestamp("updated_datetime").defaultNow(),
        expected_datetime: timestamp("expected_datetime"),

        // Offline / Sync
        idempotency_key: text("idempotency_key"), // Client-gen unique key to dedupe
    },
    (table) => ({
        tenantIdx: index("sr_tenant_idx").on(table.tenant_id),
        geoIdx: index("sr_geo_idx").on(table.latitude, table.longitude),
        statusIdx: index("sr_status_idx").on(table.status),
        serviceIdx: index("sr_service_idx").on(table.service_code),
        idempotencyIdx: index("sr_idempotency_idx").on(table.tenant_id, table.idempotency_key),
    })
);

// -------------------------------------------------------------------------
// 5. Service Attributes (Answers to Definitions)
// -------------------------------------------------------------------------
// Storing the actual values for the custom fields
export const service_attributes = pgTable(
    "service_attributes",
    {
        service_request_id: uuid("service_request_id")
            .references(() => service_requests.id)
            .notNull(),
        tenant_id: uuid("tenant_id")
            .references(() => tenants.id)
            .notNull(),
        service_code: text("service_code"), // Redundant but useful for queries

        // The specific answer
        attribute_code: text("attribute_code").notNull(), // Links to definition
        value: text("value"), // The user's answer (string or JSON stringified)
    },
    (table) => ({
        pk: primaryKey({ columns: [table.service_request_id, table.attribute_code] }), // One answer per attribute per request
        tenantIdx: index("sa_tenant_idx").on(table.tenant_id),
    })
);

// -------------------------------------------------------------------------
// RELATIONS
// -------------------------------------------------------------------------

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
    attributes: many(service_attributes),
}));

export const serviceAttributesRelations = relations(service_attributes, ({ one }) => ({
    request: one(service_requests, {
        fields: [service_attributes.service_request_id],
        references: [service_requests.id],
    }),
}));

// -------------------------------------------------------------------------
// TYPESCRIPT INTERFACES (API PAYLOADS)
// -------------------------------------------------------------------------

// GET /services.json Response Item
export interface ServiceResponse {
    service_code: string;
    service_name: string; // Localized
    description: string;  // Localized
    metadata: boolean;
    type: 'realtime' | 'batch' | 'blackbox';
    keywords: string[];
    group: string;
}

// GET /services/{code}.json Response (Definition)
export interface ServiceDefinitionResponse {
    service_code: string;
    attributes: Array<{
        variable: boolean;
        code: string;
        datatype: 'string' | 'number' | 'datetime' | 'text' | 'singlevaluelist' | 'multivaluelist';
        required: boolean;
        datatype_description: string;
        order: number;
        description: string; // Localized
        values?: Array<{ key: string; name: string }>; // Options
    }>;
}

// POST /requests.json Payload
export interface CreateServiceRequest {
    service_code: string;
    lat?: number;
    long?: number;
    address_string?: string;
    address_id?: string;
    email?: string;
    device_id?: string;
    account_id?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    description?: string;
    media_url?: string;
    idempotency_key?: string; // For offline sync
    // Dynamic attributes
    [key: `attribute[${string}]`]: string | number; // Open311 format like attribute[code]=value
}

// GET /requests.json Response Item
export interface ServiceRequestResponse {
    service_request_id: string; // UUID
    status: 'open' | 'closed' | 'acknowledged';
    status_notes?: string;
    service_name?: string;
    service_code?: string;
    description?: string;
    agency_responsible?: string;
    service_notice?: string;
    requested_datetime: string; // ISO
    updated_datetime?: string; // ISO
    address?: string;
    lat?: number;
    long?: number;
    media_url?: string;
}
