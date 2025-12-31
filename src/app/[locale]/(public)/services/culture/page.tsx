import ServiceInfoPage from "@/components/ui/ServiceInfoPage";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";
import { Link, routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Services.culture" });
    return {
        title: `${t("title")} | Haiti City Portal`,
        description: t("description"),
    };
}

export default async function CulturePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Services.culture");

    return (
        <ServiceInfoPage
            title={t("title")}
            description={t("description")}
            steps={t.raw("steps") as string[]}
            documents={t.raw("documents") as string[]}
            fees={t("fees")}
            secondaryAction={
                <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                    <h3 className="text-lg font-semibold text-red-900 mb-2 flex items-center gap-2">
                        <Youtube className="h-6 w-6 text-red-600" />
                        {t("youtube.title")}
                    </h3>
                    <p className="text-sm text-red-800 mb-4">
                        {t("youtube.description")}
                    </p>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white" asChild>
                        <a href="https://youtube.com/@CityHallJacmel" target="_blank" rel="noopener noreferrer">
                            {t("youtube.button")}
                        </a>
                    </Button>
                </div>
            }
        />
    );
}
