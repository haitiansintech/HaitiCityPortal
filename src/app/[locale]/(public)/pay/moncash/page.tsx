import { Link } from "@/i18n/navigation";
import { headers } from "next/headers";
import { db } from "@/db";
import { tenants } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Smartphone, CheckCircle, Info } from "lucide-react";

export default async function MonCashPage() {
    const headersList = await headers();
    const subdomain = headersList.get("x-tenant-subdomain") || "demo";

    const tenant = await db.query.tenants.findFirst({
        where: eq(tenants.subdomain, subdomain)
    });

    if (!tenant) return <div>Tenant not found</div>;

    const merchantId = tenant.moncash_merchant_id || "DEMO-MERCHANT";

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/pay">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to options
                    </Link>
                </Button>

                <Card className="border-t-4 border-t-red-600 shadow-lg">
                    <CardHeader className="bg-red-50/50">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-red-600 rounded-lg">
                                <Smartphone className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl text-red-900">MonCash Payment</CardTitle>
                                <p className="text-red-700">Follow these steps carefully to pay locally.</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-8 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold mr-4">1</span>
                                <p className="text-lg text-gray-800 pt-1">Dial <span className="font-mono font-bold text-red-600">*202#</span> on your mobile phone.</p>
                            </div>
                            <div className="flex items-start">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold mr-4">2</span>
                                <p className="text-lg text-gray-800 pt-1">Select <span className="font-bold">Option 3</span> (Pay Merchant).</p>
                            </div>
                            <div className="flex items-start border-2 border-red-200 bg-red-50 p-4 rounded-xl">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold mr-4">3</span>
                                <div>
                                    <p className="text-sm text-red-600 uppercase font-black mb-1">Enter Merchant ID</p>
                                    <p className="text-3xl font-mono font-bold text-gray-900 tracking-wider">
                                        {merchantId}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold mr-4">4</span>
                                <p className="text-lg text-gray-800 pt-1">Enter the <span className="font-bold">Amount</span> and confirm with your PIN.</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                            <div className="flex items-center">
                                <Info className="h-5 w-5 text-blue-500 mr-2" />
                                <p className="text-sm text-blue-700 font-medium">Important: Take a screenshot of the confirmation SMS.</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button asChild size="lg" className="w-full h-14 text-lg bg-red-600 hover:bg-red-700">
                                <Link href="/pay/history">
                                    I Have Paid - Proceed to Upload <CheckCircle className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center mt-8 text-gray-500 text-sm">
                    Questions? Contact the {tenant.name} Treasury Department at outreach@{subdomain}.ht
                </p>
            </div>
        </div>
    );
}
