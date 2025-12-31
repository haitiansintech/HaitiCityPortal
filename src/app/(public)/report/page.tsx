import { headers } from "next/headers";
import { db } from "@/db";
import { services, tenants, communal_sections } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import ServiceRequestForm from "@/components/forms/ServiceRequestForm";

export const metadata = {
    title: "Report a Service Request",
    description: "Submit a service request to your municipal government",
};

export default async function ReportPage() {
    const headersList = await headers();
    const subdomainHeader = headersList.get("x-tenant-subdomain") || "demo";

    // Fetch tenant and their services/sections
    let availableServices: any[] = [];
    let availableSections: any[] = [];

    try {
        const tenant = await db
            .select()
            .from(tenants)
            .where(eq(tenants.subdomain, subdomainHeader))
            .limit(1);

        if (tenant.length > 0) {
            const tenantServices = await db
                .select({
                    id: services.id,
                    service_code: services.service_code,
                    service_name: services.service_name,
                })
                .from(services)
                .where(eq(services.tenant_id, tenant[0].id));

            availableServices = tenantServices;

            const sections = await db.query.communal_sections.findMany({
                where: eq(communal_sections.tenant_id, tenant[0].id),
                orderBy: [asc(communal_sections.name)],
            });
            availableSections = sections;
        }
    } catch (error) {
        console.error("Failed to fetch services:", error);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Report a Service Request
                    </h1>
                    <p className="text-lg text-gray-600">
                        Help us serve you better by reporting issues in your community.
                        Your request will be routed to the appropriate department.
                    </p>
                </div>

                <ServiceRequestForm services={availableServices} sections={availableSections} />

                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>
                        <strong>Offline Support:</strong> This form automatically saves your progress.
                        If you lose internet connection, your draft will be preserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
