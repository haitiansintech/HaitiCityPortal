import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Info } from "lucide-react";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Services.nationalID" });
    return {
        title: `${t("title")} | Haiti City Portal`,
    };
}

export default async function NationalIDPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Services.nationalID");

    return (
        <div className="min-h-[70vh] bg-canvas py-24 px-6 flex items-center justify-center">
            <div className="max-w-2xl w-full text-center space-y-8 p-12 bg-white rounded-[3rem] border-2 border-brand-blue/10 shadow-xl">
                <div className="mx-auto w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center text-brand-blue">
                    <Info className="h-10 w-10" />
                </div>
                <h1 className="text-4xl font-black text-ink-primary tracking-tight">
                    {t("title")}
                </h1>
                <div className="bg-blue-50 border border-brand-blue/20 rounded-2xl p-6">
                    <p className="text-xl text-ink-secondary leading-relaxed font-medium">
                        {t("comingSoon")}
                    </p>
                </div>
                <p className="text-sm text-ink-secondary/60 font-bold uppercase tracking-widest">
                    Coming Soon / Byento / Bientôt
                </p>
            </div>
        </div>
    );
}
