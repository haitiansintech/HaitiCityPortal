"use client";

import React from 'react';
import { Link } from '@/i18n/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, FileText, CreditCard, HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ServiceInfoPageProps {
    title: string;
    description: string;
    steps: string[];
    documents: string[];
    fees: string;
    payLink?: string;
    secondaryAction?: React.ReactNode;
}

const ServiceInfoPage: React.FC<ServiceInfoPageProps> = ({
    title,
    description,
    steps,
    documents,
    fees,
    payLink = "/pay",
    secondaryAction
}) => {
    const t = useTranslations("ServiceInfo");
    const safeSteps = Array.isArray(steps) ? steps : [];
    const safeDocuments = Array.isArray(documents) ? documents : [];

    return (
        <div className="min-h-screen bg-canvas py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Button variant="ghost" asChild className="mb-8 p-0 hover:bg-transparent">
                    <Link href="/services" className="flex items-center text-ink-secondary hover:text-ink-primary transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {t("back")}
                    </Link>
                </Button>

                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-ink-primary mb-4">{title}</h1>
                    <p className="text-xl text-ink-secondary leading-relaxed">
                        {description}
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-ink-primary mb-4 flex items-center gap-2">
                                <CheckCircle2 className="h-6 w-6 text-brand-blue" />
                                {t("howToApply")}
                            </h2>
                            <div className="bg-white rounded-2xl p-6 border border-weak shadow-sm space-y-4">
                                {safeSteps.map((step, index) => (
                                    <div key={index} className="flex gap-4">
                                        <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-brand-blue font-bold text-sm">
                                            {index + 1}
                                        </span>
                                        <p className="text-ink-secondary pt-1">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-ink-primary mb-4 flex items-center gap-2">
                                <FileText className="h-6 w-6 text-brand-blue" />
                                {t("requiredDocuments")}
                            </h2>
                            <Card className="rounded-2xl border-weak shadow-sm">
                                <CardContent className="pt-6">
                                    <ul className="space-y-3">
                                        {safeDocuments.map((doc, index) => (
                                            <li key={index} className="flex items-start gap-3 text-ink-secondary">
                                                <div className="h-1.5 w-1.5 rounded-full bg-brand-blue mt-2 flex-shrink-0" />
                                                {doc}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-ink-primary mb-4 flex items-center gap-2">
                                <CreditCard className="h-6 w-6 text-brand-blue" />
                                {t("feesAndPayment")}
                            </h2>
                            <Card className="rounded-2xl border-brand-blue/20 bg-blue-50/30 overflow-hidden">
                                <CardContent className="pt-6">
                                    <p className="text-ink-secondary mb-6">{fees}</p>
                                    <Button asChild className="w-full bg-brand-blue hover:bg-action-hover text-white rounded-xl py-6">
                                        <Link href={payLink as any}>{t("payNow")}</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </section>

                        {secondaryAction && (
                            <section>
                                {secondaryAction}
                            </section>
                        )}

                        <section className="bg-white rounded-2xl p-6 border border-weak shadow-sm">
                            <h3 className="text-lg font-semibold text-ink-primary mb-2 flex items-center gap-2">
                                <HelpCircle className="h-5 w-5 text-ink-secondary" />
                                {t("needHelp")}
                            </h3>
                            <p className="text-sm text-ink-secondary mb-4">
                                {t("helpDescription")}
                            </p>
                            <Button variant="outline" asChild className="w-full border-weak hover:bg-canvas rounded-xl">
                                <Link href={"/contact" as any}>{t("contactSupport")}</Link>
                            </Button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceInfoPage;
