import React from 'react';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Gavel, Users, ShieldCheck, UserCog, Building2 } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Services.governance" });
    return {
        title: `${t("title")} | Haiti City Portal`,
        description: t("intro"),
    };
}

export default async function GovernancePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Services.governance");

    const sections = [
        {
            key: 'mairie',
            icon: Building2,
            iconBg: 'bg-brand-blue'
        },
        {
            key: 'casec',
            icon: ShieldCheck,
            iconBg: 'bg-green-500'
        },
        {
            key: 'asec',
            icon: Gavel,
            iconBg: 'bg-amber-500'
        },
        {
            key: 'delegates',
            icon: UserCog,
            iconBg: 'bg-purple-500'
        }
    ];

    return (
        <div className="min-h-screen bg-canvas py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Button variant="ghost" asChild className="mb-8 p-0 hover:bg-transparent">
                    <Link href="/services" className="flex items-center text-ink-secondary hover:text-ink-primary transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {t("badge")}
                    </Link>
                </Button>

                <header className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-blue font-bold text-xs uppercase tracking-widest mb-6 border border-brand-blue/10">
                        {t("badge")}
                    </div>
                    <h1 className="text-5xl font-extrabold text-ink-primary mb-6 tracking-tight">{t("title")}</h1>
                    <p className="text-xl text-ink-secondary leading-relaxed">
                        {t("intro")}
                    </p>
                </header>

                <div className="space-y-16">
                    {sections.map(({ key, icon: Icon, iconBg }) => (
                        <section key={key} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className={`h-12 w-12 rounded-2xl ${iconBg} text-white flex items-center justify-center shadow-lg`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-bold text-ink-primary">{t(`sections.${key}.title`)}</h2>
                            </div>
                            <div className="prose prose-blue prose-lg text-ink-secondary max-w-none">
                                <p dangerouslySetInnerHTML={{ __html: t(`sections.${key}.description`) }} />
                                {(() => {
                                    const list = t.raw(`sections.${key}.list`);
                                    if (!Array.isArray(list) || list.length === 0) {
                                        return null;
                                    }
                                    return (
                                        <ul className="list-disc pl-6 space-y-2">
                                            {list.map((item, i) => (
                                                <li
                                                    key={i}
                                                    dangerouslySetInnerHTML={{
                                                        __html: typeof item === "string" ? item : (item as any).label,
                                                    }}
                                                />
                                            ))}
                                        </ul>
                                    );
                                })()}
                            </div>
                        </section>
                    ))}

                    <Card className="rounded-3xl border-brand-blue/20 bg-blue-50/50 p-8 text-center sm:p-12">
                        <CardContent className="p-0 space-y-6">
                            <h3 className="text-2xl font-extrabold text-ink-primary italic">{t("footer.quote")}</h3>
                            <p className="text-ink-secondary text-lg max-w-2xl mx-auto leading-relaxed">
                                {t("footer.ctaText")}
                            </p>
                            <Button asChild className="rounded-2xl bg-brand-blue hover:bg-action-hover text-white px-10 py-7 font-bold text-lg shadow-xl hover:shadow-brand-blue/20 transform transition active:scale-95">
                                <Link href="/officials" className="flex items-center gap-2">
                                    <Users className="h-6 w-6" />
                                    {t("footer.ctaButton")}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
