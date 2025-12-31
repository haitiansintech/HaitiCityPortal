import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Milestone, Map, Database, Smartphone, Globe, Lock, MessageSquare, ThumbsUp } from "lucide-react";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "RoadmapPage" });
    return {
        title: `${t("title")} | Haiti City Portal`,
        description: t("description"),
    };
}

export default async function RoadmapPage() {
    const t = await getTranslations("RoadmapPage");

    return (
        <div className="min-h-screen bg-canvas py-16 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-ink-primary mb-4">{t("title")}</h1>
                    <p className="text-xl text-ink-secondary">
                        {t("description")}
                    </p>
                </div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {/* Next Month */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <Smartphone className="w-5 h-5" />
                        </div>
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border-l-4 border-l-emerald-500">
                            <CardHeader className="p-0 mb-4">
                                <div className="flex justify-between items-start">
                                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-2">{t("timeline.month.badge")}</Badge>
                                </div>
                                <CardTitle className="text-xl">{t("timeline.month.title")}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 text-ink-secondary space-y-2">
                                <p>{t("timeline.month.desc")}</p>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li>{t("timeline.month.item1")}</li>
                                    <li>{t("timeline.month.item2")}</li>
                                    <li>{t("timeline.month.item3")}</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Next Quarter */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <Map className="w-5 h-5" />
                        </div>
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border-l-4 border-l-blue-500">
                            <CardHeader className="p-0 mb-4">
                                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-2">{t("timeline.quarter.badge")}</Badge>
                                <CardTitle className="text-xl">{t("timeline.quarter.title")}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 text-ink-secondary space-y-2">
                                <p>{t("timeline.quarter.desc")}</p>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li>{t("timeline.quarter.item1")}</li>
                                    <li>{t("timeline.quarter.item2")}</li>
                                    <li>{t("timeline.quarter.item3")}</li>
                                    <li>{t("timeline.quarter.item4")}</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Future Vision */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <Lock className="w-5 h-5" />
                        </div>
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border-l-4 border-l-purple-500">
                            <CardHeader className="p-0 mb-4">
                                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 mb-2">{t("timeline.vision.badge")}</Badge>
                                <CardTitle className="text-xl">{t("timeline.vision.title")}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 text-ink-secondary space-y-2">
                                <p>{t("timeline.vision.desc")}</p>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li>{t("timeline.vision.item1")}</li>
                                    <li>{t("timeline.vision.item2")}</li>
                                    <li>{t("timeline.vision.item3")}</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Community Feedback Loop */}
                <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-200 text-center space-y-6">
                    <h2 className="text-2xl font-bold text-ink-primary">{t("feedback.title")}</h2>
                    <p className="text-ink-secondary max-w-2xl mx-auto">
                        {t("feedback.description")}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://github.com/haitiansintech/HaitiCityPortal/discussions/categories/general"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-slate-300 text-slate-700 font-bold shadow-sm hover:bg-slate-50 transition-colors"
                        >
                            <MessageSquare className="mr-2 h-5 w-5" />
                            {t("feedback.join")}
                        </a>
                        <a
                            href="https://github.com/haitiansintech/HaitiCityPortal/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-blue text-white font-bold shadow-md hover:bg-blue-700 transition-colors"
                        >
                            <ThumbsUp className="mr-2 h-5 w-5" />
                            {t("feedback.upvote")}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
