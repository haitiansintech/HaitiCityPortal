import Link from "next/link";
import { headers } from "next/headers";
import { db } from "@/db";
import { tenants } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe } from "lucide-react";
import WireForm from "@/components/payments/WireForm";

export default async function WirePage() {
    const headersList = await headers();
    const subdomain = headersList.get("x-tenant-subdomain") || "demo";

    const tenant = await db.query.tenants.findFirst({
        where: eq(tenants.subdomain, subdomain)
    });

    if (!tenant) return <div>Tenant not found</div>;

    const bankDetails = {
        bank_name: tenant.bank_name || "DEMO BANK",
        bank_swift_code: tenant.bank_swift_code || "DEMOSWIFT",
        bank_account_number: tenant.bank_account_number || "000000000",
        bank_beneficiary_name: tenant.bank_beneficiary_name || "DEMO CITY MAIRIE",
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Button asChild variant="ghost">
                        <Link href="/pay">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to options
                        </Link>
                    </Button>
                    <div className="flex items-center text-brand-blue font-semibold">
                        <Globe className="mr-2 h-5 w-5" /> Diaspora Portal
                    </div>
                </div>

                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        International Wire Transfer
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Follow the steps below to securely transfer funds to the {tenant.name} municipal account.
                    </p>
                </div>

                <WireForm bankDetails={bankDetails} />

                <p className="text-center mt-12 text-gray-400 text-xs uppercase tracking-widest font-bold">
                    Regulated by the Central Bank of Haiti (BRH)
                </p>
            </div>
        </div>
    );
}
