import { db } from "@/db";
import { facilities, tenants as tenantsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BilingualGuide } from "@/components/common/BilingualGuide";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const t = await getTranslations("Facility");
    return {
        title: `${t("aboutFacility")} | Haiti City Portal`,
    };
}

export default async function FacilityPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const t = await getTranslations("Facility");
    const headersList = await headers();
    const subdomain = headersList.get("x-tenant-subdomain") || "demo";

    const tenant = await db.query.tenants.findFirst({
        where: eq(tenantsTable.subdomain, subdomain),
    });

    if (!tenant) return notFound();

    const facility = await db.query.facilities.findFirst({
        where: eq(facilities.id, id),
    });

    if (!facility) return notFound();

    // JSON-LD Schema
    const schemaType = facility.category === "health" ? "MedicalOrganization" : "GovernmentOrganization";
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": schemaType,
        "name": facility.name,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": tenant.name,
            "addressCountry": "HT"
        },
        "telephone": facility.contact_phone,
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": facility.latitude,
            "longitude": facility.longitude
        },
        // Mocking opening hours for demo; in production this would be in DB
        "openingHours": "Mo-Fr 08:00-16:00"
    };

    return (
        <div className="min-h-screen bg-canvas py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/directory" className="text-sm font-semibold text-brand-blue hover:underline mb-6 block">
                    {t("backToDirectory")}
                </Link>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                <div className="bg-white rounded-[2rem] border-2 border-weak shadow-lg overflow-hidden">
                    <div className="bg-brand-blue/5 p-8 border-b border-weak">
                        <div className="flex justify-between items-start">
                            <div>
                                <Badge className="mb-2 bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 border-none">
                                    {facility.category.toUpperCase()}
                                </Badge>
                                <h1 className="text-3xl font-black text-ink-primary">{facility.name}</h1>
                                <p className="text-ink-secondary font-medium mt-1">{facility.sub_category}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="p-4 bg-slate-50 rounded-xl border border-weak flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-brand-blue mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-ink-primary text-sm uppercase tracking-wide">{t("location")}</h3>
                                    <p className="text-ink-secondary">
                                        Lat: {facility.latitude?.toFixed(4)}<br />
                                        Long: {facility.longitude?.toFixed(4)}
                                    </p>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${facility.latitude},${facility.longitude}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs font-bold text-brand-blue hover:underline mt-2 inline-block"
                                    >
                                        {t("viewOnMap")}
                                    </a>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-xl border border-weak flex items-start gap-3">
                                <Phone className="h-5 w-5 text-brand-blue mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-ink-primary text-sm uppercase tracking-wide">{t("contact")}</h3>
                                    <p className="text-ink-secondary font-mono text-lg">
                                        {facility.contact_phone || t("noPhone")}
                                    </p>
                                    {facility.contact_phone && (
                                        <a href={`tel:${facility.contact_phone}`} className="text-xs font-bold text-brand-blue hover:underline mt-2 inline-block">
                                            {t("clickToCall")}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Amenities & Fee Section for Culture/Recreation */}
                    {(facility.amenities || facility.entry_fee) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 pt-0">
                            {facility.entry_fee && (
                                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                    <h3 className="font-bold text-emerald-800 text-sm uppercase tracking-wide mb-1">{t("entryFee")}</h3>
                                    <p className="font-black text-2xl text-emerald-900">{facility.entry_fee}</p>
                                </div>
                            )}
                            {!!facility.amenities && Array.isArray(facility.amenities) && (
                                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                                    <h3 className="font-bold text-indigo-800 text-sm uppercase tracking-wide mb-2">{t("amenities")}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {facility.amenities.map((item: string, idx: number) => (
                                            <Badge key={idx} variant="secondary" className="bg-white text-indigo-700 border border-indigo-100">
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Additional Info Section */}
                    <div className="border-t border-weak pt-6 px-8 pb-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                            <h3 className="font-bold text-ink-primary text-lg">{t("aboutFacility")}</h3>
                            {(facility.category === 'culture' || facility.category === 'recreation') && (
                                <Button variant="destructive" size="sm" asChild className="rounded-full font-bold">
                                    <Link href={`/report?facility=${facility.id}&type=preservation`}>
                                        {t("reportAlert")}
                                    </Link>
                                </Button>
                            )}
                        </div>
                        <p className="text-ink-secondary">
                            {t("officialNotice", { tenant: tenant.name })}
                            <br />
                            {t("emergencyNotice")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
