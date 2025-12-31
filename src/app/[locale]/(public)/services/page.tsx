import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import {
  FileText,
  Trash2,
  Store,
  CreditCard,
  AlertTriangle,
  Calendar,
  ArrowRight,
  MapPin,
  Info,
  Users,
  Banknote,
  Gavel,
  ShieldCheck,
  Building2,
  Brush,
  Truck
} from "lucide-react";

import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  return {
    title: `${t("title")} | Haiti City Portal`,
    description: t("description"),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesPage");

  const categories = [
    {
      title: t("categories.civic.title"),
      services: [
        { title: t("categories.civic.birthCertificates.title"), icon: <FileText className="h-6 w-6" />, href: "/services/birth-certificates", description: t("categories.civic.birthCertificates.description") },
        { title: t("categories.civic.idInfo.title"), icon: <Users className="h-6 w-6" />, href: "/services/national-id", description: t("categories.civic.idInfo.description") }
      ]
    },
    {
      title: t("categories.infrastructure.title"),
      services: [
        { title: t("categories.infrastructure.trash.title"), icon: <Trash2 className="h-6 w-6" />, href: "/services/trash", description: t("categories.infrastructure.trash.description") },
        { title: t("categories.infrastructure.permits.title"), icon: <Store className="h-6 w-6" />, href: "/services/permits", description: t("categories.infrastructure.permits.description") },
        { title: t("categories.infrastructure.report.title"), icon: <AlertTriangle className="h-6 w-6" />, href: "/report", description: t("categories.infrastructure.report.description") },
        { title: t("categories.infrastructure.directory.title"), icon: <Building2 className="h-6 w-6" />, href: "/directory", description: t("categories.infrastructure.directory.description") }
      ]
    },
    {
      title: t("categories.publicSpaces.title"),
      services: [
        { title: t("categories.publicSpaces.cleanup.title"), icon: <Brush className="h-6 w-6" />, href: "/services/cleanup", description: t("categories.publicSpaces.cleanup.description") },
        { title: t("categories.publicSpaces.towing.title"), icon: <Truck className="h-6 w-6" />, href: "/services/towing", description: t("categories.publicSpaces.towing.description") }
      ]
    },
    {
      title: t("categories.leadership.title"),
      services: [
        { title: t("categories.leadership.officials.title"), icon: <Users className="h-6 w-6" />, href: "/officials", description: t("categories.leadership.officials.description") },
        { title: t("categories.leadership.governance.title"), icon: <ShieldCheck className="h-6 w-6" />, href: "/services/governance", description: t("categories.leadership.governance.description") },
        { title: t("categories.leadership.council.title"), icon: <Gavel className="h-6 w-6" />, href: "/government/city-council", description: t("categories.leadership.council.description") }
      ]
    },
    {
      title: t("categories.finance.title"),
      services: [
        { title: t("categories.finance.pay.title"), icon: <CreditCard className="h-6 w-6" />, href: "/pay", description: t("categories.finance.pay.description") },
        { title: t("categories.finance.status.title"), icon: <Info className="h-6 w-6" />, href: "/tax/lookup", description: t("categories.finance.status.description") }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-canvas py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center md:text-left">
        <header className="mb-16">
          <h1 className="text-4xl font-extrabold text-ink-primary mb-4 tracking-tight">{t("title")}</h1>
          <p className="text-xl text-ink-secondary max-w-2xl">
            {t("description")}
          </p>
        </header>

        <div className="space-y-16">
          {categories.map((category) => (
            <section key={category.title}>
              <h2 className="text-2xl font-bold text-ink-primary mb-8 border-b-2 border-brand-blue/20 pb-2 inline-block">
                {category.title}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.services.map((service) => (
                  <Link key={service.title} href={service.href as any} className="group">
                    <Card className="h-full border-weak hover:border-brand-blue/50 transition-all hover:shadow-md bg-white">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                          {service.icon}
                        </div>
                        <CardTitle className="text-lg font-bold">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-ink-secondary">{service.description}</p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <span className="text-xs font-bold text-brand-blue flex items-center gap-1 group-hover:underline">
                          {t("viewDetails")} <ArrowRight className="h-3 w-3" />
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
