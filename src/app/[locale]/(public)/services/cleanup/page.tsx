import ServiceInfoPage from "@/components/ui/ServiceInfoPage";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Services.cleanup" });
    return {
        title: `${t("title")} | Haiti City Portal`,
        description: t("description"),
    };
}

export default async function CleanupPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Services.cleanup");

    return (
        <ServiceInfoPage
            title={t("title")}
            description={t("description")}
            steps={t.raw("steps") as string[]}
            documents={t.raw("documents") as string[]}
            fees={t("fees")}
            secondaryAction={
                <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                    <h3 className="text-lg font-semibold text-orange-900 mb-2">{t("reports.title")}</h3>
                    <p className="text-sm text-orange-800 mb-4">
                        {t("reports.description")}
                    </p>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white" asChild>
                        <Link href={"/report?issue=street_cleanup" as any}>
                            {t("reports.button")}
                        </Link>
                    </Button>
                </div>
            }
        />
    );
}
