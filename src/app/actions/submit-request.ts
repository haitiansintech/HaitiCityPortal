"use server";

import { headers } from "next/headers";
import { db } from "@/db";
import { service_requests, tenants } from "@/db/schema";
import { z } from "zod";
import { eq, and } from "drizzle-orm";

// Validation schema for Open311 service requests
const ServiceRequestSchema = z.object({
    service_code: z.string().min(1, "Service code is required"),
    communal_section_id: z.string().min(1, "Communal section is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    address: z.string().optional(),
    email: z.string().email().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    phone: z.string().optional(),
    media_url: z.string().url().optional(),
    idempotency_key: z.string().optional(), // For offline sync deduplication
});

export type ServiceRequestInput = z.infer<typeof ServiceRequestSchema>;

export async function submitServiceRequest(input: ServiceRequestInput) {
    try {
        // SECURITY: Read tenant subdomain from server-side header (set by middleware)
        const headersList = await headers();
        const subdomainHeader = headersList.get("x-tenant-subdomain") || "demo";

        // Resolve tenant by subdomain
        const tenant = await db
            .select()
            .from(tenants)
            .where(eq(tenants.subdomain, subdomainHeader))
            .limit(1);

        if (!tenant || tenant.length === 0) {
            return {
                success: false,
                message: "Invalid tenant. Please refresh the page.",
            };
        }

        const tenantId = tenant[0].id;

        // Validate input
        const validatedData = ServiceRequestSchema.parse(input);

        // Check for duplicate submission via idempotency key
        if (validatedData.idempotency_key) {
            const existing = await db
                .select()
                .from(service_requests)
                .where(
                    and(
                        eq(service_requests.tenant_id, tenantId),
                        eq(service_requests.idempotency_key, validatedData.idempotency_key)
                    )
                )
                .limit(1);

            if (existing.length > 0) {
                return {
                    success: true,
                    message: "Request already submitted",
                    requestId: existing[0].id,
                };
            }
        }

        // Insert the service request
        const [newRequest] = await db
            .insert(service_requests)
            .values({
                tenant_id: tenantId,
                service_code: validatedData.service_code,
                communal_section_id: validatedData.communal_section_id,
                service_name: null, // Could be looked up from services table
                description: validatedData.description,
                latitude: validatedData.latitude,
                longitude: validatedData.longitude,
                address: validatedData.address,
                email: validatedData.email,
                first_name: validatedData.first_name,
                last_name: validatedData.last_name,
                phone: validatedData.phone,
                media_url: validatedData.media_url,
                idempotency_key: validatedData.idempotency_key,
                status: "open",
            })
            .returning({ id: service_requests.id });

        return {
            success: true,
            message: "Service request submitted successfully",
            requestId: newRequest.id,
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                message: "Validation failed",
                errors: error.issues,
            };
        }

        console.error("Failed to submit service request:", error);
        return {
            success: false,
            message: "Failed to submit request. Please try again.",
        };
    }
}
