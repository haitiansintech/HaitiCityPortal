import { db } from "@/db";
import { projects, tenants as tenantsTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { ProjectCard } from "@/components/donation/ProjectCard";
import { HeartHandshake, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Donate to Infrastructure | Haiti City Portal",
    description: "Directly fund verifiable public projects in your city.",
};

export default async function DonatePage() {
    const headersList = await headers();
    const subdomain = headersList.get("x-tenant-subdomain") || "demo";

    // Get tenant info
    const tenant = await db.query.tenants.findFirst({
        where: eq(tenantsTable.subdomain, subdomain),
    });

    if (!tenant) {
        return <div className="p-20 text-center">Tenant not found.</div>;
    }

    // Fetch projects
    const allProjects = await db.query.projects.findMany({
        where: eq(projects.tenant_id, tenant.id),
        orderBy: [desc(projects.created_at)],
    });

    return (
        <div className="min-h-screen bg-canvas">
            {/* Hero Section */}
            <div className="bg-slate-900 text-white py-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-blue font-bold text-xs uppercase tracking-widest mb-6 border border-white/10">
                        <HeartHandshake className="h-4 w-4" />
                        Trust-Based Philanthropy
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Fund Real Change in <span className="text-brand-blue">{tenant.name}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Every donation is tracked on our public ledger. Specific projects, specific goals, transparent results.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button asChild size="lg" className="rounded-full bg-brand-blue hover:bg-blue-600 text-white font-bold px-8">
                            <Link href="#projects">View Active Projects</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full border-white/20 text-white hover:bg-white/10 hover:border-white/40 bg-transparent font-bold px-8">
                            <Link href="/transparency">View Public Ledger</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div id="projects" className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allProjects.length > 0 ? (
                        allProjects.map((project) => (
                            <ProjectCard key={project.id} project={project as any} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <HeartHandshake className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-500">No active fundraising campaigns at this moment.</h3>
                            <p className="text-slate-400">Check back soon for new infrastructure initiatives.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* How It Works */}
            <div className="bg-white border-y border-weak py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black text-center mb-16 text-ink-primary">How Your Donation Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-3xl flex items-center justify-center mx-auto text-2xl font-black">1</div>
                            <h3 className="font-bold text-lg">Select a Project</h3>
                            <p className="text-sm text-ink-secondary">Choose a specific initiative that matters to you. From solar lights to school repairs.</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-3xl flex items-center justify-center mx-auto text-2xl font-black">2</div>
                            <h3 className="font-bold text-lg">Use the Memo Code</h3>
                            <p className="text-sm text-ink-secondary">Include the unique project code in your bank wire or MonCash transfer memo.</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-3xl flex items-center justify-center mx-auto text-2xl font-black">3</div>
                            <h3 className="font-bold text-lg">Track Impact</h3>
                            <p className="text-sm text-ink-secondary">Watch the progress bar rise and verify your contribution on the verified ledger.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
