import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Gavel, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Services.cityCouncil" });
    return {
        title: `${t("title")} | Haiti City Portal`,
    };
}

export default async function CityCouncilPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Services.cityCouncil");

    return (
        <div className="min-h-screen bg-canvas py-16 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="text-center md:text-left space-y-4">
                    <div className="inline-flex p-3 rounded-2xl bg-brand-blue/10 text-brand-blue">
                        <Gavel className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl font-black text-ink-primary tracking-tight">
                        {t("title")}
                    </h1>
                    <p className="text-xl text-ink-secondary max-w-2xl">
                        {t("decrees")}
                    </p>
                </header>

                <Card className="rounded-[2.5rem] border-weak shadow-xl bg-white overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b border-weak px-8 py-6">
                        <CardTitle className="text-xl font-bold flex items-center gap-2 text-ink-primary">
                            <FileText className="h-5 w-5 text-brand-blue" />
                            {t("decrees")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-12 text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                            <FileText className="h-8 w-8" />
                        </div>
                        <p className="text-lg text-ink-secondary font-medium italic">
                            {t("noDecrees")}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
