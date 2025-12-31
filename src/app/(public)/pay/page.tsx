import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Smartphone, History, ArrowRight } from "lucide-react";

export default function PaymentPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Payments & Contributions
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Securely pay your municipal taxes, fines, or contribute to city projects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Local Payment */}
                    <Card className="hover:shadow-xl transition-shadow border-2 border-transparent hover:border-brand-blue/20">
                        <CardHeader className="text-center">
                            <div className="mx-auto bg-brand-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                <Smartphone className="h-8 w-8 text-brand-blue" />
                            </div>
                            <CardTitle className="text-2xl">I am in Haiti</CardTitle>
                            <CardDescription>
                                Pay using MonCash USSD or Mobile App
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center pb-8">
                            <Button asChild size="lg" className="w-full">
                                <Link href="/pay/moncash" className="flex items-center">
                                    Continue with MonCash <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Diaspora Payment */}
                    <Card className="hover:shadow-xl transition-shadow border-2 border-transparent hover:border-brand-blue/20">
                        <CardHeader className="text-center">
                            <div className="mx-auto bg-brand-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                <Globe className="h-8 w-8 text-brand-blue" />
                            </div>
                            <CardTitle className="text-2xl">I am Abroad</CardTitle>
                            <CardDescription>
                                International Bank Wire / SWIFT Transfer
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center pb-8">
                            <Button asChild size="lg" variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue/5">
                                <Link href="/pay/wire" className="flex items-center">
                                    Get Wire Instructions <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-12 text-center">
                    <Button asChild variant="ghost" className="text-gray-600 hover:text-brand-blue">
                        <Link href="/pay/history" className="flex items-center">
                            <History className="mr-2 h-4 w-4" /> Check Payment Status / Upload Receipt
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
