import { db } from "@/db";
import { officials, communal_sections } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { headers } from "next/headers";
import { tenants as tenantsTable } from "@/db/schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, MapPin, Info, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SectionFilter } from "@/components/officials/SectionFilter";
import { BilingualGuide } from "@/components/common/BilingualGuide";

export const metadata = {
    title: "Meet Your Officials | Haiti City Portal",
    description: "Directory of local elective bodies including CASECs, ASECs, and Town Delegates.",
};

export default async function OfficialsPage({
    searchParams,
}: {
    searchParams: Promise<{ sectionId?: string }>;
}) {
    const headersList = await headers();
    const subdomain = headersList.get("x-tenant-subdomain") || "demo";

    // Get tenant info
    const tenant = await db.query.tenants.findFirst({
        where: eq(tenantsTable.subdomain, subdomain),
    });

    if (!tenant) {
        return <div className="p-20 text-center">Tenant not found.</div>;
    }

    // Fetch all sections for the filter
    const sections = await db.query.communal_sections.findMany({
        where: eq(communal_sections.tenant_id, tenant.id),
        orderBy: [asc(communal_sections.name)],
    });

    const params = await searchParams;
    const activeSectionId = params.sectionId;

    // Fetch officials for this tenant, including their section info
    const allOfficials = await db.query.officials.findMany({
        where: eq(officials.tenant_id, tenant.id),
        with: {
            section: true,
        },
        orderBy: [asc(officials.role), asc(officials.name)],
    });

    const filteredOfficials = activeSectionId
        ? allOfficials.filter(o => o.communal_section_id === activeSectionId)
        : allOfficials;

    return (
        <div className="min-h-screen bg-canvas py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 text-center md:text-left space-y-4">
                    <BilingualGuide
                        variant="default"
                        title={{
                            en: "Meet Your Local Officials",
                            fr: "Rencontrez Vos Élus Locaux",
                            ht: "Rankontre Ofisyèl Lokal Ou yo"
                        }}
                        description={{
                            en: `Find and connect with your ${tenant.name} representatives. From the Central Mayor to your neighborhood CASEC and ASEC members.`,
                            fr: `Trouvez et contactez vos représentants de ${tenant.name}. Du Maire Central aux membres CASEC et ASEC de votre quartier.`,
                            ht: `Jwenn epi kontakte reprezantan ${tenant.name} ou yo. Soti nan Majistra Santral la rive nan manm CASEC ak ASEC nan katye w la.`
                        }}
                    />
                    <div className="pt-4 flex flex-wrap gap-4">
                        <Button asChild variant="outline" className="rounded-xl border-weak hover:bg-white shadow-sm">
                            <Link href="/services/governance" className="flex items-center gap-2">
                                <Info className="h-4 w-4" />
                                How Local Government Works
                            </Link>
                        </Button>
                    </div>
                </header>

                {/* Filter Section */}
                <div className="mb-10 p-8 bg-white rounded-[2rem] border-2 border-brand-blue/5 shadow-xl space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-ink-primary">Filter by Communal Section</h2>
                            <p className="text-sm text-ink-secondary tracking-tight">Select your neighborhood to see specific CASEC and ASEC members.</p>
                        </div>
                        <SectionFilter
                            sections={sections.map(s => ({ id: s.id, name: s.name }))}
                            currentSectionId={activeSectionId}
                        />
                    </div>
                </div>

                {/* Directory Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredOfficials.length === 0 ? (
                        <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-weak">
                            <Users className="h-12 w-12 text-ink-secondary mx-auto mb-4 opacity-20" />
                            <p className="text-ink-secondary">No officials found for this section yet.</p>
                        </div>
                    ) : (
                        filteredOfficials.map((official) => (
                            <Card key={official.id} className="rounded-3xl border-weak shadow-sm hover:shadow-md transition-all overflow-hidden bg-white group">
                                <CardHeader className="p-0 border-b border-weak">
                                    <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                        {official.photo_url ? (
                                            <img
                                                src={official.photo_url}
                                                alt={official.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-blue-50">
                                                <Users className="h-16 w-16 text-blue-200" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            <span className="bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                                                {official.role}
                                            </span>
                                            {official.is_president && (
                                                <span className="bg-amber-500 text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                                                    Council President
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div>
                                        <CardTitle className="text-xl font-bold text-ink-primary mb-1">{official.name}</CardTitle>
                                        <div className="flex items-center gap-1.5 text-sm font-medium text-ink-secondary italic">
                                            <MapPin className="h-4 w-4 text-brand-blue" />
                                            {official.section?.name || "Global"}
                                        </div>
                                    </div>

                                    <p className="text-sm text-ink-secondary line-clamp-3 min-h-[4.5rem]">
                                        {official.bio || "No biography available at this time."}
                                    </p>

                                    {official.whatsapp_number && (
                                        <Button asChild className="w-full rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold py-6 group">
                                            <a
                                                href={`https://wa.me/${official.whatsapp_number.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <MessageCircle className="h-5 w-5 fill-current" />
                                                Message on WhatsApp
                                            </a>
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
