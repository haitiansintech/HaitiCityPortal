import ServiceInfoPage from "@/components/ui/ServiceInfoPage";
import { Link } from "@/i18n/routing";
import { db } from "@/db";
import { services, tenants } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Construction Permits | Haiti City Portal",
    description: "Apply for building and construction permits (Permis de Construire).",
};

export default async function PermitsPage() {
    const locale = await getLocale();
    const headersList = await headers();
    const subdomain = headersList.get("x-tenant-subdomain") || "demo";

    // Fetch tenant
    const tenant = await db.query.tenants.findFirst({
        where: eq(tenants.subdomain, subdomain),
    });

    if (!tenant) return notFound();

    // Fetch service data (using 'permits' code, though might need to check seed for exact code)
    const serviceData = await db.query.services.findFirst({
        where: and(
            eq(services.tenant_id, tenant.id),
            eq(services.service_code, "permits")
        ),
    });

    // Fallback if permits not seeded yet
    const name = serviceData ? (serviceData.service_name as any)[locale] || (serviceData.service_name as any)["en"] : "Business Permits";
    const description = serviceData ? (serviceData.description as any)[locale] || (serviceData.description as any)["en"] : "Apply for or renew business licenses.";
    const requirements = serviceData ? (serviceData.requirements_json as any[])?.map(r => r.title) : [
        "Identity Document (NIF or CIN)",
        "Proof of address for the business",
        "Previous year quittance (for renewals)",
        "Notarized articles of incorporation (for companies)"
    ];
    const fees = serviceData?.base_fee_htg ? `${serviceData.base_fee_htg} HTG` : "Calculated based on business category and location.";

    return (
        <ServiceInfoPage
            title={name}
            description={description}
            steps={[
                "Create a professional profile on the Haiti City Portal.",
                "Upload digital scans of all required documents.",
                "Wait for preliminary review by the municipal commerce department.",
                "Pay the calculated patent/license fee online or at a local bank.",
                "Receive your digital permit via email or download from your dashboard."
            ]}
            documents={requirements}
            fees={fees}
        />
    );
}
