import { db } from "@/db";
import { facilities, tenants as tenantsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import FieldDashboardClient from "@/components/admin/FieldDashboardClient";

export const metadata = {
    title: "Field Reports | Haiti City Portal",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default async function FieldReportsPage() {
    const headersList = await headers();
    const subdomain = headersList.get("x-tenant-subdomain") || "demo";

    // Get tenant info
    const tenant = await db.query.tenants.findFirst({
        where: eq(tenantsTable.subdomain, subdomain),
    });

    if (!tenant) {
        return <div className="p-10 text-center">Tenant not found.</div>;
    }

    // Fetch all facilities for this tenant
    const allFacilities = await db.query.facilities.findMany({
        where: eq(facilities.tenant_id, tenant.id),
    });

    return (
        <div className="min-h-screen bg-canvas py-8 px-4 pb-32">
            <div className="max-w-md mx-auto space-y-6">
                <header className="mb-4">
                    <h1 className="text-3xl font-black text-ink-primary">Rapò Teren</h1>
                    <p className="text-ink-secondary font-medium">Verifye enfrastrikti nan zòn ou.</p>
                </header>

                <FieldDashboardClient facilities={allFacilities} />
            </div>
        </div>
    );
}
