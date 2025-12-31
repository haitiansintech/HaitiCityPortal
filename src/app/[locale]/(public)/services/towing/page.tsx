import ServiceInfoPage from "@/components/ui/ServiceInfoPage";
import TowingLookup from "@/components/services/TowingLookup";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Services.towing" });
    return {
        title: `${t("title")} | Haiti City Portal`,
        description: t("description"),
    };
}

export default async function TowingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Services.towing");

    return (
        <ServiceInfoPage
            title={t("title")}
            description={t("description")}
            steps={t.raw("steps") as string[]}
            documents={t.raw("documents") as string[]}
            fees={t("fees")}
            secondaryAction={<TowingLookup />}
        />
    );
}
