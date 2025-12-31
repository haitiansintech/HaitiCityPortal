import { db } from "@/db";
import { facilities, communal_sections, tenants as tenantsTable } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { headers } from "next/headers";
import { Shield } from "lucide-react";
import DirectoryClient from "@/components/directory/DirectoryClient";

export const metadata = {
    title: "Public Infrastructure Directory | Haiti City Portal",
    description: "Directory of schools, hospitals, police stations, and emergency services.",
};

export default async function DirectoryPage({
    searchParams,
}: {
    searchParams: Promise<{ sectionId?: string; category?: string }>;
}) {
    const headersList = await headers();
    const subdomain = headersList.get("x-tenant-subdomain") || "demo";

    const tenant = await db.query.tenants.findFirst({
        where: eq(tenantsTable.subdomain, subdomain),
    });

    if (!tenant) return <div className="p-20 text-center">Tenant not found.</div>;

    const sections = await db.query.communal_sections.findMany({
        where: eq(communal_sections.tenant_id, tenant.id),
        orderBy: [asc(communal_sections.name)],
    });

    const params = await searchParams;
    const activeSectionId = params.sectionId;
    const activeCategory = params.category || "all";

    const allFacilities = await db.query.facilities.findMany({
        where: eq(facilities.tenant_id, tenant.id),
        with: {
            section: true,
        },
        orderBy: [asc(facilities.category), asc(facilities.name)],
    });

    // We pass the data to the client component which handles the interactive parts
    return (
        <main className="min-h-screen bg-canvas pb-20">
            {/* Hero Header */}
            <div className="bg-brand-blue text-white py-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-20" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                            <Shield className="h-6 w-6" />
                        </div>
                        <span className="text-white/80 font-bold uppercase tracking-widest text-xs">Infrastructure & Emergency</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                        City Infrastructure <br /><span className="text-white/60">Directory</span>
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl leading-relaxed font-medium">
                        Access vital public services, from healthcare and education to emergency safety response centers across your commune.
                    </p>
                </div>
            </div>

            <DirectoryClient
                facilities={allFacilities}
                sections={sections.map(s => ({ id: s.id, name: s.name }))}
                activeSectionId={activeSectionId}
                activeCategory={activeCategory}
            />
        </main>
    );
}
