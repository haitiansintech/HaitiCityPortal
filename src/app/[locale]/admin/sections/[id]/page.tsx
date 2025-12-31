import { db } from "@/db";
import { facility_suggestions, facilities, communal_sections } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Shield, Phone, Globe, Mail } from "lucide-react";
import { revalidatePath } from "next/cache";

export const metadata = {
    title: "Section Admin | Haiti City Portal",
};

// Server Action for Approval
async function approveSuggestion(suggestionId: string, facilityId: string, data: any) {
    "use server";

    // 1. Update Facility
    await db.update(facilities).set({
        ...data,
        updated_at: new Date(),
        last_verified_at: new Date(),
    }).where(eq(facilities.id, facilityId));

    // 2. Mark Suggestion as Approved
    await db.update(facility_suggestions).set({
        status: "approved",
    }).where(eq(facility_suggestions.id, suggestionId));

    revalidatePath(`/admin/sections`);
    revalidatePath(`/directory`);
}

async function rejectSuggestion(suggestionId: string) {
    "use server";
    await db.update(facility_suggestions).set({
        status: "rejected",
    }).where(eq(facility_suggestions.id, suggestionId));
    revalidatePath(`/admin/sections`);
}

export default async function SectionAdminPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: sectionId } = await params;

    // Fetch Section Info
    const section = await db.query.communal_sections.findFirst({
        where: eq(communal_sections.id, sectionId),
    });

    if (!section) return notFound();

    // Fetch Pending Suggestions
    const suggestions = await db.query.facility_suggestions.findMany({
        where: and(
            eq(facility_suggestions.communal_section_id, sectionId),
            eq(facility_suggestions.status, "new")
        ),
        with: {
            facility: true,
        },
        orderBy: [desc(facility_suggestions.created_at)],
    });

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-5xl mx-auto space-y-8">
                <header className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Admin Mode</span>
                            <span className="text-slate-500 font-mono text-xs">{section.code}</span>
                        </div>
                        <h1 className="text-3xl font-black text-ink-primary">
                            {section.name} Verification Dashboard
                        </h1>
                        <p className="text-ink-secondary mt-1">
                            Review user-submitted updates for facilities in your jurisdiction.
                        </p>
                    </div>
                </header>

                <div className="grid gap-6">
                    {suggestions.length === 0 ? (
                        <Card className="py-16 text-center border-dashed border-2 bg-white">
                            <Shield className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-400">All caught up!</h3>
                            <p className="text-slate-400">No pending suggestions for this section.</p>
                        </Card>
                    ) : (
                        suggestions.map((suggestion) => {
                            const suggested = suggestion.suggested_data as any;
                            const facility = suggestion.facility;

                            return (
                                <Card key={suggestion.id} className="rounded-3xl border-l-4 border-l-brand-blue shadow-md overflow-hidden bg-white">
                                    <CardHeader className="bg-slate-50 border-b border-weak">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl font-bold">{facility?.name}</CardTitle>
                                                <CardDescription className="flex items-center gap-2 mt-1">
                                                    Author Contact: <span className="font-mono font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">{suggestion.user_contact_info}</span>
                                                </CardDescription>
                                            </div>
                                            <div className="px-3 py-1 bg-yellow-100 text-yellow-700 font-bold text-xs rounded-full uppercase tracking-widest">
                                                Pending Review
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="grid grid-cols-2 divide-x divide-weak">
                                            {/* Current Data */}
                                            <div className="p-6 space-y-4 bg-slate-50/50">
                                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Current Data</h4>
                                                <DataRow icon={Phone} label="Phone" value={facility?.contact_phone || "Not set"} />
                                                <DataRow icon={Globe} label="Website" value={facility?.official_website || "Not set"} />
                                                <DataRow icon={Phone} label="WhatsApp" value={facility?.whatsapp_number || "Not set"} />
                                            </div>

                                            {/* Proposed Changes */}
                                            <div className="p-6 space-y-4 bg-yellow-50/30">
                                                <h4 className="text-xs font-black uppercase tracking-widest text-brand-blue mb-4">Suggested Changes</h4>

                                                {suggested.contact_phone !== facility?.contact_phone && (
                                                    <DataRow icon={Phone} label="Phone" value={suggested.contact_phone} highlight />
                                                )}
                                                {suggested.whatsapp_number !== facility?.whatsapp_number && (
                                                    <DataRow icon={Phone} label="WhatsApp" value={suggested.whatsapp_number} highlight />
                                                )}
                                                {/* Add more fields logic as needed */}

                                                <div className="pt-6 flex gap-3">
                                                    <form action={approveSuggestion.bind(null, suggestion.id, facility!.id, suggested)}>
                                                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 rounded-xl font-bold">
                                                            <Check className="h-4 w-4" />
                                                            Approve & Update
                                                        </Button>
                                                    </form>
                                                    <form action={rejectSuggestion.bind(null, suggestion.id)}>
                                                        <Button variant="destructive" className="rounded-xl gap-2 font-bold opacity-90 hover:opacity-100">
                                                            <X className="h-4 w-4" />
                                                            Reject
                                                        </Button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

function DataRow({ icon: Icon, label, value, highlight }: { icon: any, label: string, value: string, highlight?: boolean }) {
    return (
        <div className={`p-3 rounded-xl border ${highlight ? 'bg-white border-brand-blue/30 shadow-sm' : 'border-transparent'}`}>
            <div className="flex items-center gap-2 mb-1">
                <Icon className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
            </div>
            <div className={`font-medium ${highlight ? 'text-brand-blue font-bold' : 'text-slate-700'}`}>{value}</div>
        </div>
    );
}
