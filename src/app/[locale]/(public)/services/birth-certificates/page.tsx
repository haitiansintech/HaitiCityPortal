import ServiceInfoPage from "@/components/ui/ServiceInfoPage";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Services.birthCertificates" });
    return {
        title: `${t("title")} | Haiti City Portal`,
        description: t("description"),
    };
}

export default async function BirthCertificatesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Services.birthCertificates");

    return (
        <ServiceInfoPage
            title={t("title")}
            description={t("description")}
            steps={t.raw("steps") as string[]}
            documents={t.raw("documents") as string[]}
            fees={t("fees")}
        />
    );
}
