import { InfoLayout } from "@/components/layout/InfoLayout";
import { Wifi, BadgeCheck, Database, FileJson, LucideIcon } from "lucide-react";

export const dynamic = "force-static";

interface Pillar {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

const pillars: Pillar[] = [
    {
        title: "2G-First Design",
        description: "We optimize for the lowest common denominator of Haitian connectivity. If a page doesn't load on an Edge network in a rural communal section, it is a bug.",
        icon: Wifi,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
    },
    {
        title: "Professional Accountability",
        description: "Every municipal official is linked to a verified Vwa profile, turning local governance into a professional career path.",
        icon: BadgeCheck,
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        title: "Data Sovereignty",
        description: "Built with BSL 1.1, this platform ensures that Haitian municipal data belongs to the municipality, not foreign commercial entities.",
        icon: Database,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
    },
    {
        title: "Transparency as Code",
        description: "Audit logs and fee structures are baked into the UI, making corruption harder to hide and success easier to see.",
        icon: FileJson,
        color: "text-amber-600",
        bg: "bg-amber-50",
    },
];

export default function TechManifestoPage() {
    return (
        <InfoLayout
            title="The Sovereign Source Manifesto"
            className="max-w-5xl"
        >
            <div className="space-y-12">
                <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                    We are not just building software; we are building institutions. Our technical choices reflect our commitment to Haiti's autonomy, resilience, and dignity.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.title}
                            className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-6 md:p-8 hover:bg-slate-50 hover:border-slate-200 transition-colors"
                        >
                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${pillar.bg} ${pillar.color}`}>
                                <pillar.icon className="h-6 w-6" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {pillar.title}
                                </h3>
                                <p className="text-slate-700 leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl bg-slate-900 p-8 md:p-12 text-center text-slate-300">
                    <p className="font-mono text-sm uppercase tracking-widest text-slate-500 mb-4">
                        EST. 2025
                    </p>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Built for Haiti. Owned by Haiti.
                    </h2>
                    <p className="max-w-2xl mx-auto">
                        This repository is available under the Business Source License 1.1, ensuring that while the code is open for distinct inspection, its commercial value remains sovereign to the Haitian people.
                    </p>
                </div>
            </div>
        </InfoLayout>
    );
}
