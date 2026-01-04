"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Hospital,
    School,
    Shield,
    Library,
    AlertTriangle,
    MapPin,
    Phone,
    Info,
    Search,
    Globe,
    MessageCircle,
    Mail,
    Facebook,
    TreePine,
    Landmark,
    Brush,
    Car
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import dynamic from "next/dynamic";
import { SectionFilter } from "@/components/officials/SectionFilter";
import { SuggestionModal } from "@/components/directory/SuggestionModal";

// Dynamically import map to avoid SSR issues with Leaflet
const DirectoryMap = dynamic(() => import("@/components/directory/DirectoryMap"), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-slate-100 animate-pulse rounded-3xl flex items-center justify-center font-medium text-slate-400">Loading Map...</div>
});

const CATEGORIES = [
    { id: "all", label: "All", icon: Search },
    { id: "health", label: "Health", icon: Hospital },
    { id: "education", label: "Education", icon: School },
    { id: "safety", label: "Safety", icon: Shield },
    { id: "library", label: "Library", icon: Library },
    { id: "emergency", label: "Emergency", icon: AlertTriangle },
    { id: "recreation", label: "Recreation", icon: TreePine },
    { id: "culture", label: "Culture", icon: Landmark },
    { id: "sanitation_street", label: "Street Cleanup", icon: Brush },
    { id: "transportation_impound", label: "Impound/Towing", icon: Car },
];

interface Facility {
    id: string;
    tenant_id: string;
    name: string;
    category: string;
    sub_category: string | null;
    communal_section_id: string | null;
    latitude: number | null;
    longitude: number | null;
    contact_phone: string | null;
    is_public: boolean | null;
    status: string;
    updated_at?: Date | string | null;
    last_verified_at?: Date | string | null;
    section?: { name: string } | null;
    whatsapp_number?: string | null;
    official_website?: string | null;
    email_address?: string | null;
    facebook_page?: string | null;
}

interface DirectoryClientProps {
    facilities: Facility[];
    sections: { id: string; name: string }[];
    activeSectionId?: string;
    activeCategory: string;
}

export default function DirectoryClient({
    facilities,
    sections,
    activeSectionId,
    activeCategory
}: DirectoryClientProps) {
    const filteredFacilities = facilities.filter(f => {
        const matchesSection = !activeSectionId || f.communal_section_id === activeSectionId;
        const matchesCategory = activeCategory === "all" || f.category === activeCategory;
        return matchesSection && matchesCategory;
    });

    return (
        <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
            {/* Filters Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                {/* Section Filter Card */}
                <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white overflow-hidden p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-bold text-ink-primary">Select Neighborhood</h3>
                            <p className="text-sm text-ink-secondary">Showing services for specific areas</p>
                        </div>
                        <SectionFilter
                            sections={sections}
                            currentSectionId={activeSectionId}
                        />
                    </div>
                </Card>

                {/* Category Filter Card */}
                <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-2xl bg-white overflow-hidden p-8">
                    <div className="flex flex-col h-full justify-between gap-6">
                        <div>
                            <h3 className="text-lg font-bold text-ink-primary">Category Filter</h3>
                            <p className="text-sm text-ink-secondary">Quickly find specific public facilities</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                const isActive = activeCategory === cat.id;
                                return (
                                    <Button
                                        key={cat.id}
                                        asChild
                                        variant={isActive ? "default" : "outline"}
                                        className={`rounded-2xl h-14 px-6 border-2 transition-all group ${isActive
                                            ? "bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/30"
                                            : "bg-white border-brand-blue/10 text-ink-primary hover:border-brand-blue/30 hover:bg-brand-blue/5"
                                            }`}
                                    >
                                        <Link href={`/directory?category=${cat.id}${activeSectionId ? `&sectionId=${activeSectionId}` : ''}`}>
                                            <Icon className={`h-5 w-5 mr-3 ${isActive ? "text-white" : "text-brand-blue"}`} />
                                            <span className="font-bold">{cat.label}</span>
                                        </Link>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Map Section */}
            <Card className="rounded-[3rem] border-none shadow-2xl bg-white overflow-hidden mb-12 border-4 border-white">
                <div className="p-8 border-b border-weak flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-brand-blue p-2 rounded-lg">
                            <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-black text-ink-primary tracking-tight uppercase">Interactive Service Map</h2>
                    </div>
                    <div className="px-4 py-2 bg-brand-blue/10 rounded-full text-brand-blue font-bold text-xs uppercase tracking-widest">
                        {filteredFacilities.length} Points Found
                    </div>
                </div>
                <DirectoryMap facilities={filteredFacilities} />
            </Card>

            {/* Facilities List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFacilities.length > 0 ? (
                    filteredFacilities.map((f) => (
                        <Card key={f.id} className="rounded-[2rem] border-weak shadow-sm hover:shadow-xl transition-all bg-white group overflow-hidden border-2 hover:border-brand-blue/20">
                            <div className={`h-3 w-full ${f.category === 'emergency' || f.category === 'safety' ? 'bg-rose-500' :
                                f.category === 'recreation' ? 'bg-emerald-500' :
                                    f.category === 'culture' ? 'bg-purple-500' :
                                        'bg-brand-blue'
                                }`} />
                            <CardHeader className="p-8 pb-4">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="bg-slate-100 p-3 rounded-2xl text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                                        {CATEGORIES.find(c => c.id === f.category)?.icon && (() => {
                                            const Icon = CATEGORIES.find(c => c.id === f.category)!.icon;
                                            return <Icon className="h-6 w-6" />;
                                        })()}
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${f.status === 'operational'
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        : 'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                        {f.status.replace('_', ' ')}
                                    </div>
                                </div>
                                <CardTitle className="text-2xl font-bold tracking-tight text-ink-primary leading-tight hover:text-brand-blue transition-colors">
                                    {f.name}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-1.5 font-bold text-brand-blue/60 italic text-sm mt-2">
                                    <MapPin className="h-4 w-4" />
                                    {f.section?.name || 'Central District'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 pt-4 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-black uppercase tracking-tighter text-ink-secondary/50">
                                        <span>Sub-Category</span>
                                        <span>Public Status</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-ink-primary">{f.sub_category || 'General Service'}</span>
                                        <span className="font-bold text-ink-primary">{f.is_public ? 'State-run' : 'Private'}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="grid grid-cols-4 gap-2">
                                        {/* Phone Button (Primary) */}
                                        {f.contact_phone && (
                                            <Button
                                                asChild
                                                className={`col-span-2 rounded-xl h-12 font-bold text-sm transition-transform active:scale-95 ${f.category === 'safety' || f.category === 'emergency'
                                                    ? 'bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-200 text-white'
                                                    : 'bg-slate-900 hover:bg-ink-primary shadow-lg shadow-slate-200 text-white'
                                                    }`}
                                            >
                                                <a href={`tel:${f.contact_phone}`} className="flex items-center justify-center gap-2">
                                                    <Phone className="h-4 w-4" />
                                                    Call
                                                </a>
                                            </Button>
                                        )}

                                        {/* WhatsApp Button */}
                                        {f.whatsapp_number && (
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="rounded-xl h-12 border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:border-emerald-300 transition-all active:scale-95"
                                            >
                                                <a
                                                    href={`https://wa.me/${f.whatsapp_number.replace(/[^0-9]/g, '')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="Chat on WhatsApp"
                                                >
                                                    <MessageCircle className="h-5 w-5 fill-current" />
                                                </a>
                                            </Button>
                                        )}

                                        {/* Website/Facebook Button */}
                                        {(f.official_website || f.facebook_page) && (
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="rounded-xl h-12 border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:border-blue-300 transition-all active:scale-95"
                                            >
                                                <a
                                                    href={f.official_website || f.facebook_page || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="Visit Official Link"
                                                >
                                                    {f.facebook_page ? <Facebook className="h-5 w-5 fill-current" /> : <Globe className="h-5 w-5" />}
                                                </a>
                                            </Button>
                                        )}

                                        {/* Email Button */}
                                        {f.email_address && (
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="rounded-xl h-12 border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-all active:scale-95"
                                            >
                                                <a href={`mailto:${f.email_address}`} title="Send Email">
                                                    <Mail className="h-5 w-5" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>

                                    <SuggestionModal facility={f} />
                                </div>
                                {(f.last_verified_at || f.updated_at) && (
                                    <div className="pt-4 mt-2 border-t border-weak/50 text-center">
                                        <p className="text-[10px] font-medium text-ink-secondary/60 uppercase tracking-widest flex items-center justify-center gap-1">
                                            <Shield className="h-3 w-3 text-emerald-500 fill-current" />
                                            Verified on {new Date(f.last_verified_at || f.updated_at!).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-4 border-dashed border-weak/50">
                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="h-10 w-10 text-weak" />
                        </div>
                        <h3 className="text-3xl font-bold text-ink-primary mb-2">No facilities found</h3>
                        <p className="text-ink-secondary max-w-sm mx-auto font-medium">Try adjusting your filters to find services in other categories or neighborhoods.</p>
                        <Button asChild variant="link" className="mt-8 text-brand-blue font-bold text-lg">
                            <Link href="/directory">Clear all filters</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div >
    );
}
