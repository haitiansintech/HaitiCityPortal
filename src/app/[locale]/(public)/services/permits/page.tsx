import ServiceInfoPage from "@/components/ui/ServiceInfoPage";
import { routing } from "@/i18n/routing";
import { db } from "@/db";
import { services, tenants } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "ServicesPage.categories.infrastructure.permits" });
    return {
        title: `${t("title")} | Haiti City Portal`,
        description: t("description"),
    };
}

export default async function PermitsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Services.permits");
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
    const name = serviceData ? (serviceData.service_name as any)[locale] || (serviceData.service_name as any)["en"] : t("title");
    const description = serviceData ? (serviceData.description as any)[locale] || (serviceData.description as any)["en"] : t("description");

    // Mapping keys to localized labels for requirements
    const requirementLabels: Record<string, string> = t.raw("requirements");
    const requirements = serviceData ? (serviceData.requirements_json as any[])?.map(r => r.title) : [
        requirementLabels.id,
        requirementLabels.address,
        requirementLabels.quittance,
        requirementLabels.articles
    ];

    const fees = serviceData?.base_fee_htg ? `${serviceData.base_fee_htg} HTG` : "Calculated based on business category and location.";

    return (
        <ServiceInfoPage
            title={name}
            description={description}
            steps={t.raw("steps") as string[]}
            documents={requirements}
            fees={fees}
        />
    );
}
