import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  FileText,
  Trash2,
  Store,
  CreditCard,
  AlertTriangle,
  Calendar,
  ArrowRight,
  MapPin,
  Phone,
  Info,
  Banknote,
  Users
} from "lucide-react";
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { db } from "@/db";
import { tenants } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const t = await getTranslations("HomePage");
  const common = await getTranslations("Common");
  const headersList = await headers();
  const subdomain = headersList.get("x-tenant-subdomain") || "demo";

  const tenant = await db.query.tenants.findFirst({
    where: eq(tenants.subdomain, subdomain),
  });

  const commonServices = [
    {
      icon: <FileText className="h-10 w-10 text-brand-blue" />,
      title: t("commonServices.birthCertificates.title"),
      description: t("commonServices.birthCertificates.description"),
      link: "/services/birth-certificates"
    },
    {
      icon: <Trash2 className="h-10 w-10 text-brand-blue" />,
      title: t("commonServices.trashPickup.title"),
      description: t("commonServices.trashPickup.description"),
      link: "/services/trash"
    },
    {
      icon: <Store className="h-10 w-10 text-brand-blue" />,
      title: t("commonServices.businessPermits.title"),
      description: t("commonServices.businessPermits.description"),
      link: "/services/permits"
    },
    {
      icon: <CreditCard className="h-10 w-10 text-brand-blue" />,
      title: t("commonServices.propertyTax.title"),
      description: t("commonServices.propertyTax.description"),
      link: "/tax/lookup"
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-brand-blue" />,
      title: t("commonServices.reportIssue.title"),
      description: t("commonServices.reportIssue.description"),
      link: "/report"
    },
    {
      icon: <Calendar className="h-10 w-10 text-brand-blue" />,
      title: t("commonServices.communityEvents.title"),
      description: t("commonServices.communityEvents.description"),
      link: "/events"
    },
    {
      icon: <Info className="h-10 w-10 text-brand-blue" />,
      title: t("commonServices.openData.title"),
      description: t("commonServices.openData.description"),
      link: "/data"
    },
  ];

  const quickActions = [
    { label: t("quickActions.reportPothole"), icon: <MapPin className="h-5 w-5" />, href: "/report" },
    { label: t("quickActions.payParking"), icon: <CreditCard className="h-5 w-5" />, href: "/pay" },
    { label: t("quickActions.trashSchedule"), icon: <Trash2 className="h-5 w-5" />, href: "/services/trash" },
    { label: t("quickActions.payFees"), icon: <Banknote className="h-5 w-5" />, href: "/pay" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": `Mairie de ${tenant?.name || "Haiti City Portal"}`,
    "alternateName": tenant?.name,
    "logo": tenant?.logo_url || "https://haiticityportal.com/logo.png", // Fallback URL
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+509-129",
      "contactType": "emergency",
      "availableLanguage": ["French", "Haitian Creole", "English", "Spanish"]
    }
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. HERO SECTION (Full Width) */}
      <section className="relative w-full bg-brand-blue/5 py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="mb-6 inline-flex rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand-blue shadow-sm border border-brand-blue/20">
              {t("hero.badge")}
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-ink-primary md:text-6xl lg:text-7xl">
              {t.rich("hero.title", {
                br: () => <br />,
                span: (chunks) => <span className="text-brand-blue">{chunks}</span>
              })}
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-ink-secondary md:text-xl">
              {t("hero.description")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row w-full sm:w-auto justify-center">
              <Button size="lg" className="h-12 px-8 text-lg font-semibold shadow-lg" asChild>
                <Link href="/report">{t("hero.reportBtn")}</Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg bg-white" asChild>
                <Link href="/pay">{t("hero.payBtn")}</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Abstract background elements for depth */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl" />
      </section>

      {/* 2. QUICK ACTION BAR (Boston Style - High Contrast) */}
      <section className="w-full bg-brand-blue py-8 border-y border-brand-blue">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {quickActions.map((action, idx) => (
              <QuickActionLink key={idx} href={action.href} icon={action.icon} label={action.label} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED SERVICES (Grid) */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 flex items-center justify-between border-b-4 border-brand-blue pb-4">
            <h2 className="text-3xl font-bold uppercase tracking-wide text-ink-primary">
              {t("services.title")}
            </h2>
            <Link href="/services" className="hidden text-brand-blue hover:underline font-semibold md:block">
              {t("services.viewAll")}
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {commonServices.map((service, index) => (
              <Link key={index} href={service.link} className="group block h-full">
                <Card className="h-full border-2 border-neutral-100 transition-all group-hover:border-brand-blue/50 group-hover:shadow-md">
                  <CardHeader>
                    <div className="mb-4 inline-flex rounded-lg bg-brand-blue/10 p-3 group-hover:bg-brand-blue/20">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-ink-primary group-hover:text-brand-blue">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-ink-secondary">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <span className="flex items-center text-sm font-bold text-brand-blue uppercase tracking-wider group-hover:underline">
                      {t("services.getStarted")} <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}

            {/* New Government Cards */}
            <Link href="/officials" className="group block h-full">
              <Card className="h-full border-2 border-neutral-100 transition-all group-hover:border-brand-blue/50 group-hover:shadow-md bg-blue-50/30">
                <CardHeader>
                  <div className="mb-4 inline-flex rounded-lg bg-brand-blue/10 p-3 group-hover:bg-brand-blue/20">
                    <Users className="h-10 w-10 text-brand-blue" />
                  </div>
                  <CardTitle className="text-xl font-bold text-ink-primary group-hover:text-brand-blue">
                    {t("commonServices.localOfficials.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-ink-secondary">{t("commonServices.localOfficials.description")}</p>
                </CardContent>
                <CardFooter>
                  <span className="flex items-center text-sm font-bold text-brand-blue uppercase tracking-wider group-hover:underline">
                    {t("services.viewDirectory")} <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/services/governance" className="group block h-full">
              <Card className="h-full border-2 border-neutral-100 transition-all group-hover:border-brand-blue/50 group-hover:shadow-md bg-blue-50/30">
                <CardHeader>
                  <div className="mb-4 inline-flex rounded-lg bg-brand-blue/10 p-3 group-hover:bg-brand-blue/20">
                    <Info className="h-10 w-10 text-brand-blue" />
                  </div>
                  <CardTitle className="text-xl font-bold text-ink-primary group-hover:text-brand-blue">
                    {t("commonServices.govGuide.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-ink-secondary">{t("commonServices.govGuide.description")}</p>
                </CardContent>
                <CardFooter>
                  <span className="flex items-center text-sm font-bold text-brand-blue uppercase tracking-wider group-hover:underline">
                    {t("services.learnMore")} <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full">View All Services</Button>
          </div>
        </div>
      </section>

      {/* Meet the Mayor Section */}
      {tenant?.mayor_name && (
        <section className="w-full bg-brand-blue/5 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-12 bg-white p-8 md:p-12 rounded-[2rem] border-2 border-brand-blue/10 shadow-xl">
              <div className="flex-shrink-0">
                {tenant.mayor_image_url ? (
                  <img
                    src={tenant.mayor_image_url}
                    alt={tenant.mayor_name}
                    className="h-48 w-48 md:h-64 md:w-64 rounded-3xl object-cover border-8 border-gray-50 shadow-2xl"
                  />
                ) : (
                  <div className="h-48 w-48 md:h-64 md:w-64 rounded-3xl bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-6xl shadow-inner">
                    {tenant.mayor_name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="text-center md:text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-blue font-bold text-xs uppercase tracking-widest border border-brand-blue/10">
                  {t("mayor.badge")}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-ink-primary leading-tight">
                  {t("mayor.title")} <br /><span className="text-brand-blue">{tenant.mayor_name}</span>
                </h2>
                <p className="text-lg md:text-xl text-ink-secondary leading-relaxed italic max-w-2xl">
                  "{tenant.mayor_bio || t("mayor.defaultBio")}"
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <Button asChild className="rounded-xl px-8 h-12 font-bold shadow-lg">
                    <Link href="/officials">{t("mayor.contactRep")}</Link>
                  </Button>
                  <div className="flex items-center gap-3 text-sm font-bold text-ink-secondary uppercase tracking-wider">
                    <div className="h-10 w-10 rounded-full border-2 border-brand-blue flex items-center justify-center">
                      <Image src="/logo-small.png" width={24} height={24} alt="HT" className="opacity-50" />
                    </div>
                    {t("mayor.office")}, {tenant.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. LATEST UPDATES (News) */}
      <section className="w-full bg-neutral-100 py-16 md:py-24 border-t border-neutral-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 border-b-4 border-neutral-300 pb-4">
            <h2 className="text-3xl font-bold uppercase tracking-wide text-ink-primary">
              {t("news.title")}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { date: "Feb 12, 2025", title: "Hurricane season readiness webinars", desc: "Weekly preparedness sessions with emergency management leaders." },
              { date: "Jan 28, 2025", title: "New sanitation pick-up pilot in Carrefour", desc: "Track pilot progress and report feedback directly in the portal." },
              { date: "Jan 15, 2025", title: "Community grant applications due March 15", desc: "Download the grant data pack and submit proposals digitally." }
            ].map((news, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-lg bg-white p-6 shadow-sm border border-neutral-200 hover:border-brand-blue/50">
                <span className="text-sm font-bold uppercase text-ink-secondary tracking-widest">{news.date}</span>
                <h3 className="text-xl font-bold text-brand-blue hover:underline cursor-pointer">
                  {news.title}
                </h3>
                <p className="text-ink-secondary">{news.desc}</p>
                <div className="mt-auto pt-4">
                  <span className="text-sm font-semibold text-brand-blue cursor-pointer hover:underline">{t("news.readMore")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
function QuickActionLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-white/10 p-4 text-white transition-colors hover:bg-white/20"
    >
      {icon}
      <span className="font-semibold">{label}</span>
    </Link>
  );
}
