import ServiceInfoPage from "@/components/ui/ServiceInfoPage";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { db } from "@/db";
import { services, tenants } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Trash & Sanitation | Haiti City Portal",
    description: "Municipal trash collection schedules and sanitation services.",
};

export default async function TrashPage() {
    const locale = await getLocale();
    const t = await getTranslations("HomePage.services");
    const headersList = await headers();
    const subdomain = headersList.get("x-tenant-subdomain") || "demo";

    // Fetch tenant
    const tenant = await db.query.tenants.findFirst({
        where: eq(tenants.subdomain, subdomain),
    });

    if (!tenant) return notFound();

    // Fetch service data
    const serviceData = await db.query.services.findFirst({
        where: and(
            eq(services.tenant_id, tenant.id),
            eq(services.service_code, "trash")
        ),
    });

    if (!serviceData) return notFound();

    const name = (serviceData.service_name as any)[locale] || (serviceData.service_name as any)["en"];
    const description = (serviceData.description as any)[locale] || (serviceData.description as any)["en"];
    const requirements = (serviceData.requirements_json as any[])?.map(r => r.title) || [];
    const fees = serviceData.base_fee_htg
        ? `${serviceData.base_fee_htg} HTG`
        : "Standard residential pickup is included in municipal tax.";

    return (
        <ServiceInfoPage
            title={name}
            description={`${description} ${serviceData.pickup_schedule ? `Schedule: ${serviceData.pickup_schedule}` : ""}`}
            steps={[
                "Check the sanitation schedule for your specific neighborhood (Zone).",
                "Place your waste bins or bags at the designated curb points by 6:00 AM.",
                "Ensure sharp objects or hazardous waste are separated into marked containers.",
                "For bulky items like furniture, request a 'Pickup Spécial' at least 48 hours in advance."
            ]}
            documents={requirements}
            fees={fees}
            secondaryAction={
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">Trash not picked up?</h3>
                    <p className="text-sm text-amber-800 mb-4">
                        If your bin was out by 6:00 AM and was missed, please let us know immediately.
                    </p>
                    <Button variant="outline" className="w-full border-amber-300 text-amber-900 hover:bg-amber-100" asChild>
                        <Link href="/report?issue=missed_pickup">
                            Report a Missed Pickup
                        </Link>
                    </Button>
                </div>
            }
        />
    );
}
