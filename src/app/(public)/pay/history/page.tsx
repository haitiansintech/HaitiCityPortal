import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, History } from "lucide-react";
import PaymentSearchAndList from "@/components/payments/PaymentSearchAndList";

export default function HistoryPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Button asChild variant="ghost">
                        <Link href="/pay">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to options
                        </Link>
                    </Button>
                    <div className="flex items-center text-gray-500 font-semibold">
                        <History className="mr-2 h-5 w-5" /> Payment Portal
                    </div>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        My Payments & Receipts
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Search your records to upload proof of payment or download your official city quittance.
                    </p>
                </div>

                <PaymentSearchAndList />

                <div className="mt-16 bg-brand-blue/5 rounded-2xl p-8 border border-brand-blue/10">
                    <h3 className="font-bold text-brand-blue mb-4">Official Reconciliation Process</h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                        Once you upload your proof of payment, the City Treasury Department will verify the transaction against bank statements or MonCash reports. This manual process typically takes 1-3 business days. Once verified, your status will change to "Verified" and you can download your official digital quittance.
                    </p>
                </div>
            </div>
        </div>
    );
}
