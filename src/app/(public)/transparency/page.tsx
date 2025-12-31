import { db } from "@/db";
import { projects, tenants as tenantsTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, TrendingUp, DollarSign } from "lucide-react";

export const metadata = {
    title: "Transparency Ledger | Haiti City Portal",
    description: "Public tracking of all infrastructure donations and expenditures.",
};

export default async function TransparencyPage() {
    const headersList = await headers();
    const subdomain = headersList.get("x-tenant-subdomain") || "demo";

    // Get tenant info
    const tenant = await db.query.tenants.findFirst({
        where: eq(tenantsTable.subdomain, subdomain),
    });

    if (!tenant) {
        return <div className="p-20 text-center">Tenant not found.</div>;
    }

    // Fetch projects for summary stats
    const allProjects = await db.query.projects.findMany({
        where: eq(projects.tenant_id, tenant.id),
    });

    const totalRaised = allProjects.reduce((acc, curr) => acc + curr.current_raised, 0);
    const totalGoal = allProjects.reduce((acc, curr) => acc + curr.target_amount, 0);

    return (
        <div className="min-h-screen bg-canvas py-16 px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl font-black text-ink-primary mb-4">Open Ledger</h1>
                    <p className="text-ink-secondary text-lg">
                        We believe in radical transparency. Every cent donated to city projects is tracked here publicly.
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="rounded-[2rem] border-weak shadow-lg bg-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-ink-secondary uppercase tracking-widest">Total Raised</CardTitle>
                            <DollarSign className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-ink-primary">${totalRaised.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1 text-emerald-600 font-bold">+12% from last month</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-[2rem] border-weak shadow-lg bg-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-ink-secondary uppercase tracking-widest">Active Projects</CardTitle>
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-ink-primary">{allProjects.length}</div>
                            <p className="text-xs text-muted-foreground mt-1">Across 3 communal sections</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-[2rem] border-weak shadow-lg bg-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-ink-secondary uppercase tracking-widest">Trust Score</CardTitle>
                            <ShieldCheck className="h-4 w-4 text-brand-blue" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-ink-primary">98/100</div>
                            <p className="text-xs text-muted-foreground mt-1">Based on verified outcomes</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Ledger Table */}
                <Card className="rounded-[2.5rem] border-weak shadow-xl bg-white overflow-hidden">
                    <CardHeader className="px-8 pt-8 pb-4">
                        <CardTitle className="text-xl font-bold">Recent Project Funding</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableCaption className="pb-4">A list of all project fund balances.</TableCaption>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="pl-8 font-bold">Project Name</TableHead>
                                    <TableHead className="font-bold">Status</TableHead>
                                    <TableHead className="font-bold">Target</TableHead>
                                    <TableHead className="text-right pr-8 font-bold">Raised</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allProjects.map((project) => (
                                    <TableRow key={project.id} className="hover:bg-slate-50 transition-colors">
                                        <TableCell className="pl-8 font-medium">{project.title}</TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 capitalize">
                                                {project.status.replace('_', ' ')}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-ink-secondary">${project.target_amount.toLocaleString()}</TableCell>
                                        <TableCell className="text-right pr-8 font-bold text-emerald-600">${project.current_raised.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
