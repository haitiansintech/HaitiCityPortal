import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Eye, Wifi, Database, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("ImpactPage");
    return {
        title: `${t("title")} | Haiti City Portal`,
        description: t("subtitle"),
    };
}

export default async function ImpactPage() {
    const t = await getTranslations("ImpactPage");

    return (
        <div className="min-h-screen bg-canvas py-16 px-6">
            <div className="max-w-5xl mx-auto space-y-16">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl font-black text-ink-primary mb-6">{t("title")}</h1>
                    <p className="text-xl text-ink-secondary leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-l-4 border-l-brand-blue shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-blue-50 text-brand-blue rounded-xl">
                                <Eye className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl">{t("pillars.transparency.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-ink-secondary">{t("pillars.transparency.description")}</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl">{t("pillars.accountability.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-ink-secondary">{t("pillars.accountability.description")}</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                                <Wifi className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl">{t("pillars.digital.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-ink-secondary">{t("pillars.digital.description")}</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                <Database className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl">{t("pillars.data.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-ink-secondary">{t("pillars.data.description")}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Flow Visualization */}
                <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-weak shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-12">{t("flow.title")}</h2>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 max-w-4xl mx-auto relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2" />

                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center bg-white p-4">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-2xl font-black text-slate-400">1</div>
                            <h3 className="font-bold text-ink-primary mb-2">{t("flow.step1")}</h3>
                            <p className="text-sm text-ink-secondary w-48">{t("flow.step1Desc")}</p>
                        </div>

                        <ArrowRight className="md:hidden text-gray-300 h-8 w-8 rotate-90 md:rotate-0" />

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center bg-white p-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl font-black text-brand-blue">2</div>
                            <h3 className="font-bold text-ink-primary mb-2">{t("flow.step2")}</h3>
                            <p className="text-sm text-ink-secondary w-48">{t("flow.step2Desc")}</p>
                        </div>

                        <ArrowRight className="md:hidden text-gray-300 h-8 w-8 rotate-90 md:rotate-0" />

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center bg-white p-4">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-2xl font-black text-emerald-600">3</div>
                            <h3 className="font-bold text-ink-primary mb-2">{t("flow.step3")}</h3>
                            <p className="text-sm text-ink-secondary w-48">{t("flow.step3Desc")}</p>
                        </div>
                    </div>
                </div>

                {/* Legacy Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-black text-ink-primary mb-4">{t("leadership.title")}</h2>
                        <p className="text-lg text-ink-secondary mb-6 leading-relaxed">
                            {t("leadership.desc1")}
                        </p>
                        <p className="text-gray-600 mb-6">
                            {t("leadership.desc2")}
                        </p>
                    </div>
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
                            <ShieldCheck className="h-64 w-64" />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
                                {t("leadership.partnerBadge")}
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{t("leadership.partnerTitle")}</h3>
                            <p className="text-slate-300 mb-6">{t("leadership.partnerSubtitle")}</p>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-sm">{t("leadership.feature1")}</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-sm">{t("leadership.feature2")}</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-sm">{t("leadership.feature3")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
