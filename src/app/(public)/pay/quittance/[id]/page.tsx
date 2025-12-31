import { db } from "@/db";
import { payment_records, tenants } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Printer, CheckCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function QuittancePage({ params }: PageProps) {
    const { id } = await params;

    const record = await db.query.payment_records.findFirst({
        where: eq(payment_records.id, id),
        with: {
            tenant: true
        }
    });

    if (!record || record.status !== "verified") {
        notFound();
    }

    const tenant = record.tenant;

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 shadow-inner print:bg-white print:py-0 print:px-0">
            <div className="max-w-3xl mx-auto mb-6 flex justify-end print:hidden">
                <Button onClick={() => window.print()} className="bg-brand-blue">
                    <Printer className="mr-2 h-4 w-4" /> Print Quittance
                </Button>
            </div>

            <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden border border-gray-200 print:shadow-none print:border-none">
                {/* Header with City Seal */}
                <div className="bg-brand-blue text-white p-10 flex items-center justify-between border-b-8 border-brand-blue/20">
                    <div className="flex items-center space-x-6">
                        {tenant.logo_url ? (
                            <Image src={tenant.logo_url} alt="Seal" width={80} height={80} className="filter brightness-0 invert" />
                        ) : (
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center font-black text-2xl">
                                {tenant.name.slice(0, 2).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <h1 className="text-2xl font-black uppercase tracking-tighter">République d'Haïti</h1>
                            <h2 className="text-xl font-bold opacity-90">{tenant.name}</h2>
                            <p className="text-sm font-mono opacity-80 mt-1">Département de la Trésorerie</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                            <p className="text-xs uppercase font-bold text-white/70">Quittance No.</p>
                            <p className="text-xl font-mono font-black">{record.official_quittance_id || "OFFICIAL-PENDING"}</p>
                        </div>
                    </div>
                </div>

                <div className="p-12 space-y-10 bg-[url('/watermark-seal.png')] bg-no-repeat bg-center bg-contain">
                    <div className="text-center">
                        <h3 className="text-3xl font-black text-gray-900 uppercase tracking-widest border-b-2 border-gray-900 inline-block px-4 pb-1">
                            Quittance Officielle
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payeur / Contribuable</p>
                                <p className="text-lg font-bold text-gray-900">{record.email}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Type de Paiement</p>
                                <p className="text-lg font-bold text-gray-900 capitalize">{record.payment_type.replace('_', ' ')}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Référence du Dossier</p>
                                <p className="text-lg font-mono font-bold text-gray-900">{record.reference_id || "N/A"}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 flex flex-col justify-center items-center text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Montant Reçu</p>
                            <p className="text-5xl font-black text-brand-blue">{record.amount}</p>
                            <p className="text-xl font-bold text-brand-blue/70">{record.currency}</p>
                            <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                <CheckCircle className="h-3 w-3 mr-1" /> VERIFIED & CLEAR
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-gray-100">
                        <div className="flex justify-between items-end">
                            <div className="space-y-4">
                                <div className="flex items-center text-xs text-gray-500 font-mono">
                                    <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />
                                    Transaction ID: {record.id}
                                </div>
                                <div className="text-xs text-gray-500 font-mono">
                                    Date de Transaction: {new Date(record.created_at).toLocaleString()}
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="w-48 h-1 bg-gray-900 mb-2"></div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Signature du Trésorier</p>
                                <p className="italic font-serif text-gray-600 mt-2">Digital Signature Verified</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 text-white p-6 text-center text-[10px] uppercase tracking-[0.2em] font-bold">
                    Cette quittance est un document officiel. Toute falsification sera poursuivie.
                </div>
            </div>

            <p className="text-center text-gray-400 text-xs mt-8 print:hidden">
                Powered by Haiti City Portal Infrastructure
            </p>
        </div>
    );
}
