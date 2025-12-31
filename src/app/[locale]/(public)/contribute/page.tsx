import { Button } from "@/components/ui/button";
import { Github, Heart, Users, Shield, BookOpen, Code2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Get Involved | Haiti City Portal",
    description: "Join the network. Developers, citizens, and officials building the future together.",
};

export default function ContributePage() {
    return (
        <div className="min-h-screen bg-canvas py-16 px-6">
            <div className="max-w-5xl mx-auto space-y-20">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl font-black text-ink-primary mb-6">Join the Movement</h1>
                    <p className="text-xl text-ink-secondary">
                        This isn't just a website. It's a collaborative effort to rebuild Haiti's digital sovereignty.
                        Here is how you can help.
                    </p>
                </div>

                {/* Section 1: For Developers */}
                <section className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-12 overflow-hidden relative">
                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-3 text-emerald-400 font-mono mb-4">
                            <Code2 className="h-5 w-5" />
                            <span>REL: v0.1.0-alpha</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-6">For Developers</h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            We are building on a modern stack (Next.js 14, Drizzle, Postgres) with a "Sovereign Source" license (BSL 1.1).
                            This ensures the code remains free for non-commercial city use while protecting it from corporate capture.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="outline" className="border-slate-600 hover:bg-slate-800 hover:text-white" asChild>
                                <a href="https://github.com/haitiansintech/HaitiCityPortal" target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" />
                                    View Source
                                </a>
                            </Button>
                            <Button variant="secondary" asChild className="bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                                <Link href="/about/tech">Read Engineering Manifesto</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Section 2: For Citizens */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-brand-blue">
                            <Heart className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-ink-primary mb-4">For Citizens</h2>
                        <h3 className="text-xl font-semibold text-ink-secondary mb-4">Help Spread the Word</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            The most powerful tool we have is community. If you know a neighbor struggling with city services, show them how to use the portal.
                        </p>
                        <ol className="space-y-4 mb-8">
                            <li className="flex gap-3">
                                <span className="font-bold text-brand-blue">1.</span>
                                <span>Save the hotline <strong>129</strong> in your phone.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-brand-blue">2.</span>
                                <span>Share the <strong>/directory</strong> link on WhatsApp groups.</span>
                            </li>
                        </ol>
                        <Button className="bg-brand-blue text-white rounded-full px-8">
                            Share on WhatsApp
                        </Button>
                    </div>
                    <div className="order-1 md:order-2 bg-blue-50 rounded-[2rem] h-80 flex items-center justify-center">
                        {/* Placeholder for illustration */}
                        <Users className="h-32 w-32 text-blue-200" />
                    </div>
                </section>

                {/* Section 3: For Officials */}
                <section className="bg-white border border-gray-200 rounded-[2rem] p-8 md:p-12 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="bg-amber-50 p-4 rounded-full text-amber-600 flex-shrink-0">
                            <Shield className="h-8 w-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-ink-primary mb-2">For Mayors & ASECs</h2>
                            <p className="text-ink-secondary mb-6">
                                Join the "Sovereign Source" network. We provide the software, hosting, and training for free to verified Haitian municipalities.
                                Digitizing your jurisdiction increases tax collection transparency and donor trust.
                            </p>
                            <Button variant="outline" asChild>
                                <a href="mailto:partners@haiticity.org">Request a Demo</a>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
