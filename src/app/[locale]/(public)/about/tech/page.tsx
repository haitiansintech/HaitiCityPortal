import { InfoLayout } from "@/components/layout/InfoLayout";
import { Wifi, BadgeCheck, Database, FileJson, LucideIcon } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "TechManifesto" });
    return {
        title: `${t("title")} | Haiti City Portal`,
        description: t("subtitle"),
    };
}

export default async function TechManifestoPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "TechManifesto" });

    const pillars = [
        {
            title: t("pillars.2g.title"),
            description: t("pillars.2g.description"),
            icon: Wifi,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            title: t("pillars.accountability.title"),
            description: t("pillars.accountability.description"),
            icon: BadgeCheck,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            title: t("pillars.sovereignty.title"),
            description: t("pillars.sovereignty.description"),
            icon: Database,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
        },
        {
            title: t("pillars.transparency.title"),
            description: t("pillars.transparency.description"),
            icon: FileJson,
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
    ];

    return (
        <InfoLayout
            title={t("title")}
            className="max-w-5xl"
        >
            <div className="space-y-12">
                <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                    {t("subtitle")}
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.title}
                            className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-6 md:p-8 hover:bg-slate-50 hover:border-slate-200 transition-colors"
                        >
                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${pillar.bg} ${pillar.color}`}>
                                <pillar.icon className="h-6 w-6" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {pillar.title}
                                </h3>
                                <p className="text-slate-700 leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl bg-slate-900 p-8 md:p-12 text-center text-slate-300">
                    <p className="font-mono text-sm uppercase tracking-widest text-slate-500 mb-4">
                        {t("footer.established")}
                    </p>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {t("footer.title")}
                    </h2>
                    <p className="max-w-2xl mx-auto">
                        {t("footer.description")}
                    </p>
                </div>
            </div>
        </InfoLayout>
    );
}
