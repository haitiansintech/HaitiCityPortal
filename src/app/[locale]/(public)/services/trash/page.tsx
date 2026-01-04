import ServiceInfoPage from "@/components/ui/ServiceInfoPage";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
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
    const t = await getTranslations({ locale, namespace: "HomePage.services" }); // Re-using homepage metadata namespace for consistency
    return {
        title: "Trash & Sanitation | Haiti City Portal",
        description: "Municipal trash collection schedules and sanitation services.",
    };
}

export default async function TrashPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Services.trash");
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
            steps={t.raw("steps") as string[]}
            documents={requirements}
            fees={fees}
            secondaryAction={
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">{t("reports.title")}</h3>
                    <p className="text-sm text-amber-800 mb-4">
                        {t("reports.description")}
                    </p>
                    <Button variant="outline" className="w-full border-amber-300 text-amber-900 hover:bg-amber-100" asChild>
                        <Link href={"/report?issue=missed_pickup" as any}>
                            {t("reports.button")}
                        </Link>
                    </Button>
                </div>
            }
        />
    );
}
