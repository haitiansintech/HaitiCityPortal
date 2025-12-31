import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Gavel, Users, ShieldCheck, UserCog, Building2 } from 'lucide-react';

export const metadata = {
    title: "Understanding Local Governance | Haiti City Portal",
    description: "Learn about the roles and responsibilities of CASECs, ASECs, and other local elective bodies.",
};

export default function GovernancePage() {
    return (
        <div className="min-h-screen bg-canvas py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Button variant="ghost" asChild className="mb-8 p-0 hover:bg-transparent">
                    <Link href="/services" className="flex items-center text-ink-secondary hover:text-ink-primary transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to services
                    </Link>
                </Button>

                <header className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-blue font-bold text-xs uppercase tracking-widest mb-6 border border-brand-blue/10">
                        Governance Guide
                    </div>
                    <h1 className="text-5xl font-extrabold text-ink-primary mb-6 tracking-tight">How Your Local Government Works</h1>
                    <p className="text-xl text-ink-secondary leading-relaxed">
                        In Haiti, local governance is decentralized into "Communes" and "Communal Sections." Understanding who does what helps you get the right services and hold your representatives accountable.
                    </p>
                </header>

                <div className="space-y-16">
                    {/* The Mairie */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-lg">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-ink-primary">The Municipal Council (Mairie)</h2>
                        </div>
                        <div className="prose prose-blue prose-lg text-ink-secondary max-w-none">
                            <p>
                                Led by a <strong>Principal Mayor</strong> and two Deputy Mayors, the municipal council manages the entire city (Commune). They oversee urban planning, tax collection, public safety, and major infrastructure projects.
                            </p>
                        </div>
                    </section>

                    {/* CASEC */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-green-500 text-white flex items-center justify-center shadow-lg">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-ink-primary">CASEC (Executive Council)</h2>
                        </div>
                        <div className="prose prose-blue prose-lg text-ink-secondary max-w-none">
                            <p>
                                The <strong>Administrative Council of the Communal Section (CASEC)</strong> is a 3-member executive team elected to manage a specific rural or urban section of the city.
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Executive Authority:</strong> They execute the budget and manage small local projects (wells, local roads, sanitation).</li>
                                <li><strong>Public Record:</strong> They can verify documents and provide certifications for residents in their section.</li>
                                <li><strong>Mediation:</strong> Often acting as first-responders for local disputes and social harmony.</li>
                            </ul>
                        </div>
                    </section>

                    {/* ASEC */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg">
                                <Gavel className="h-6 w-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-ink-primary">ASEC (Assembly)</h2>
                        </div>
                        <div className="prose prose-blue prose-lg text-ink-secondary max-w-none">
                            <p>
                                The <strong>Assembly of the Communal Section (ASEC)</strong> is a deliberative body of 7 to 11 members. While CASEC is the "executive," ASEC is the "checks and balances."
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Oversight:</strong> They approve the local development plan and oversee CASEC's spending.</li>
                                <li><strong>Representation:</strong> They represent the voice of the specific neighborhoods within the section.</li>
                                <li><strong>Policy:</strong> They debate and vote on local guidelines for land use and community resources.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Town Delegates */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center shadow-lg">
                                <UserCog className="h-6 w-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-ink-primary">Town Delegates</h2>
                        </div>
                        <div className="prose prose-blue prose-lg text-ink-secondary max-w-none">
                            <p>
                                Town Delegates (Délégués de Ville) are administrative assistants appointed to bridge the gap between specific city neighborhoods and the central Mairie office.
                            </p>
                        </div>
                    </section>

                    <Card className="rounded-3xl border-brand-blue/20 bg-blue-50/50 p-8 text-center sm:p-12">
                        <CardContent className="p-0 space-y-6">
                            <h3 className="text-2xl font-extrabold text-ink-primary italic">"A government closer to the people."</h3>
                            <p className="text-ink-secondary text-lg max-w-2xl mx-auto leading-relaxed">
                                Get to know your specific representatives and start a conversation today using our directory.
                            </p>
                            <Button asChild className="rounded-2xl bg-brand-blue hover:bg-action-hover text-white px-10 py-7 font-bold text-lg shadow-xl hover:shadow-brand-blue/20 transform transition active:scale-95">
                                <Link href="/officials" className="flex items-center gap-2">
                                    <Users className="h-6 w-6" />
                                    Meet Your Officials
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
