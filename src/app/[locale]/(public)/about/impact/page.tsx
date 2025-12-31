import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Eye, Wifi, Database, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Our Impact | Haiti City Portal",
    description: "Transparency, Accountability, Digital Transformation, and Data Access.",
};

export default function ImpactPage() {
    return (
        <div className="min-h-screen bg-canvas py-16 px-6">
            <div className="max-w-5xl mx-auto space-y-16">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl font-black text-ink-primary mb-6">Why This Matters</h1>
                    <p className="text-xl text-ink-secondary leading-relaxed">
                        We are building the digital infrastructure for a new era of civic trust.
                        Our platform empowers citizens and officials to work together through four core pillars.
                    </p>
                </div>

                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-l-4 border-l-brand-blue shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-blue-50 text-brand-blue rounded-xl">
                                <Eye className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl">Transparency</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-ink-secondary">
                                Real-time visibility into infrastructure funds. Every gourde collected and spent is tracked on a public open ledger, eliminating the shadows where corruption hides.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl">Accountability</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-ink-secondary">
                                Direct reporting loops. When a citizen reports a pothole or missing trash pickup, it goes directly to the dashboard of the responsible CASEC, creating a verifiable record of action (or inaction).
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                                <Wifi className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl">Digital Transformation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-ink-secondary">
                                Moving from paper to pixels. We are replacing fragile physiocal ledgers with decentralized, cloud-backed mobile databases that survive floods, fires, and political transitions.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                <Database className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl">Data Access</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-ink-secondary">
                                A Single Source of Truth. Whether it's birth certificate procedures or school locations, citizens shouldn't have to rely on rumors. We provide official, verified municipal data.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Flow Visualization */}
                <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-weak shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-12">The Flow of Trust</h2>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 max-w-4xl mx-auto relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2" />

                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center bg-white p-4">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-2xl font-black text-slate-400">1</div>
                            <h3 className="font-bold text-ink-primary mb-2">Citizen Report</h3>
                            <p className="text-sm text-ink-secondary w-48">Photo sent via 3G</p>
                        </div>

                        <ArrowRight className="md:hidden text-gray-300 h-8 w-8 rotate-90 md:rotate-0" />

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center bg-white p-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl font-black text-brand-blue">2</div>
                            <h3 className="font-bold text-ink-primary mb-2">Cloud Database</h3>
                            <p className="text-sm text-ink-secondary w-48">Stored securely</p>
                        </div>

                        <ArrowRight className="md:hidden text-gray-300 h-8 w-8 rotate-90 md:rotate-0" />

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center bg-white p-4">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-2xl font-black text-emerald-600">3</div>
                            <h3 className="font-bold text-ink-primary mb-2">CASEC Action</h3>
                            <p className="text-sm text-ink-secondary w-48">Verified & Resolved</p>
                        </div>
                    </div>
                </div>

                {/* Legacy Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-black text-ink-primary mb-4">A New Standard for Leadership</h2>
                        <p className="text-lg text-ink-secondary mb-6 leading-relaxed">
                            We aren't just tracking projects; we are documenting the professional legacy of the people building Haiti.
                        </p>
                        <p className="text-gray-600 mb-6">
                            Through our partnership with <strong>Vwa</strong>, every Mayor, ASEC, and CASEC gets a verified professional profile. 
                            This allows citizens to see their track record, past roles, and verified achievements—creating a permanent history of service.
                        </p>
                    </div>
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
                            <ShieldCheck className="h-64 w-64" />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
                                Strategic Partner
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Powered by Vwa</h3>
                            <p className="text-slate-300 mb-6">The definitive verification platform for Haitian professionals.</p>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-sm">Identity Verification</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-sm">Role Authentication</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-sm">Performance History</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
