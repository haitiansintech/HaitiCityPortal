import { db } from "@/db";
import { projects, payment_records, tenants as tenantsTable } from "@/db/schema";
import { eq, and, like, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, AlertTriangle, ShieldCheck, DollarSign } from "lucide-react";
import { publishAudit } from "@/app/actions/publish-audit";

export const metadata = {
    title: "Mayor's Audit Review | Haiti City Portal",
};

export default async function AuditReviewPage() {
    const headersList = await headers();
    const subdomain = headersList.get("x-tenant-subdomain") || "demo";

    const tenant = await db.query.tenants.findFirst({
        where: eq(tenantsTable.subdomain, subdomain),
    });

    if (!tenant) return <div>Tenant not found</div>;

    // Fetch Projects
    const allProjects = await db.query.projects.findMany({
        where: eq(projects.tenant_id, tenant.id),
    });

    // Helper to get verified total for a project
    const getVerifiedTotal = async (code: string) => {
        // We want to verify that all money marked 'verified' is also 'is_public_ledger'.
        // If there is money that is 'verified' but 'is_public_ledger=false', that's the discrepancy.

        const records = await db.query.payment_records.findMany({
            where: and(
                eq(payment_records.status, 'verified'),
                like(payment_records.generated_memo_code, `%${code}%`)
            )
        });

        // The total amount that SHOULD be on the ledger (sum of all verified records)
        return records.reduce((sum, r) => sum + parseFloat(r.amount), 0);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-purple-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Finance Dept</span>
                            <span className="text-purple-700 bg-purple-100 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-widest">Restricted</span>
                        </div>
                        <h1 className="text-3xl font-black text-ink-primary">Audit Review Dashboard</h1>
                        <p className="text-ink-secondary font-medium">Reconcile and publish financial data to the public transparency ledger.</p>
                    </div>
                </header>

                <div className="grid gap-6">
                    {await Promise.all(allProjects.map(async (project) => {
                        const verifiedTotal = await getVerifiedTotal(project.code);
                        const isSynced = verifiedTotal <= project.current_raised; // Simple check: IF verified total is not greater than what we show, we are good.

                        return (
                            <Card key={project.id} className={`rounded-3xl border-2 shadow-sm overflow-hidden ${isSynced ? 'border-weak bg-white' : 'border-amber-200 bg-amber-50/30'}`}>
                                <CardHeader className="border-b border-weak pb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                                            <CardDescription className="font-mono text-xs mt-1">CODE: {project.code}</CardDescription>
                                        </div>
                                        {isSynced ? (
                                            <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                                <CheckCircle2 className="h-4 w-4" />
                                                Synced
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1 text-amber-700 font-bold text-xs uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full border border-amber-200 animate-pulse">
                                                <AlertTriangle className="h-4 w-4" />
                                                Action Required
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                                        <div className="space-y-1">
                                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Public Ledger (Current)</div>
                                            <div className="text-2xl font-black text-slate-800">${project.current_raised.toLocaleString()}</div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="text-xs font-bold uppercase tracking-widest text-brand-blue">Internal Audit (Actual)</div>
                                            <div className="text-3xl font-black text-brand-blue">${verifiedTotal.toLocaleString()}</div>
                                            {!isSynced && (
                                                <div className="text-xs font-bold text-emerald-600">
                                                    +${(verifiedTotal - project.current_raised).toLocaleString()} New Funds
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-end">
                                            {isSynced ? (
                                                <Button disabled variant="outline" className="rounded-xl opacity-50 font-bold">
                                                    Up to Date
                                                </Button>
                                            ) : (
                                                <form action={async () => {
                                                    "use server";
                                                    await publishAudit(project.id, project.code);
                                                }}>
                                                    <Button className="bg-brand-blue hover:bg-blue-700 text-white rounded-xl h-12 px-6 font-bold shadow-lg shadow-blue-200">
                                                        <ShieldCheck className="mr-2 h-5 w-5" />
                                                        Publish to Ledger
                                                    </Button>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    }))}
                </div>
            </div>
        </div>
    );
}
