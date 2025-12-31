"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createPaymentIntent } from "@/app/actions/payments";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Banknote, Landmark, Copy, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface TenantBankDetails {
    bank_name: string;
    bank_swift_code: string;
    bank_account_number: string;
    bank_beneficiary_name: string;
}

export default function WireForm({ bankDetails }: { bankDetails: TenantBankDetails }) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [record, setRecord] = useState<any>(null);
    const [formData, setFormData] = useState({
        email: "",
        amount: "",
        payment_type: "",
        reference_id: ""
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        const result = await createPaymentIntent({
            email: formData.email,
            amount: formData.amount,
            currency: "USD",
            payment_method: "wire_transfer",
            payment_type: formData.payment_type,
            reference_id: formData.reference_id
        });

        if (result.success) {
            setRecord(result.record);
            setStep(2);
        } else {
            alert("Failed to initialize payment. Please try again.");
        }
        setLoading(false);
    }

    if (step === 1) {
        return (
            <Card className="shadow-lg border-brand-blue/10">
                <CardHeader className="bg-brand-blue/5 border-b">
                    <CardTitle className="flex items-center text-brand-blue">
                        <Banknote className="mr-2 h-6 w-6" /> Declare Your Intent to Pay
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="type">Payment Type</Label>
                                <Select required onValueChange={(v) => setFormData({ ...formData, payment_type: v })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="property_tax">Property Tax</SelectItem>
                                        <SelectItem value="business_license">Business License</SelectItem>
                                        <SelectItem value="parking_ticket">Parking Ticket</SelectItem>
                                        <SelectItem value="utility_water">Water/Utility Bill</SelectItem>
                                        <SelectItem value="other">Other Contribution</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ref">Reference ID (e.g. Ticket #, Tax ID)</Label>
                                <Input
                                    id="ref"
                                    placeholder="Enter ID"
                                    required
                                    value={formData.reference_id}
                                    onChange={(e) => setFormData({ ...formData, reference_id: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount (USD)</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="0.00"
                                    required
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Your Email (for receipt delivery)</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                            {loading ? "Generating Instructions..." : "Get Wire Instructions"} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <Alert className="bg-amber-50 border-amber-200">
                <Info className="h-5 w-5 text-amber-600" />
                <AlertTitle className="text-amber-800 font-bold">CRITICAL: BANK MEMO REQUIRED</AlertTitle>
                <AlertDescription className="text-amber-700">
                    You MUST include the following code in the "Memo" or "Reference" field of your bank transfer.
                </AlertDescription>
            </Alert>

            {/* Memo Code Display */}
            <div className="bg-white border-2 border-dashed border-brand-blue p-8 rounded-2xl text-center">
                <p className="text-sm text-brand-blue uppercase font-bold tracking-widest mb-2">Transfer Memo Code</p>
                <h2 className="text-5xl font-mono font-black text-gray-900 mb-4">{record.generated_memo_code}</h2>
                <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(record.generated_memo_code)}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Code
                </Button>
            </div>

            {/* Bank Details */}
            <Card className="border-2 border-brand-blue/20">
                <CardHeader className="bg-brand-blue/5 border-b py-4">
                    <CardTitle className="text-lg flex items-center">
                        <Landmark className="mr-2 h-5 w-5" /> Bank Routing Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-2 border-b pb-2">
                        <span className="text-gray-500">Beneficiary Name</span>
                        <span className="font-semibold text-right">{bankDetails.bank_beneficiary_name}</span>
                    </div>
                    <div className="grid grid-cols-2 border-b pb-2">
                        <span className="text-gray-500">Bank Name</span>
                        <span className="font-semibold text-right">{bankDetails.bank_name}</span>
                    </div>
                    <div className="grid grid-cols-2 border-b pb-2">
                        <span className="text-gray-500">Account Number</span>
                        <span className="font-mono font-bold text-right">{bankDetails.bank_account_number}</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <span className="text-gray-500">SWIFT / BIC Code</span>
                        <span className="font-mono font-bold text-right">{bankDetails.bank_swift_code}</span>
                    </div>
                </CardContent>
            </Card>

            <div className="bg-gray-100 p-6 rounded-xl space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" /> What's Next?
                </h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm">
                    <li>Initiate the transfer from your bank app or branch.</li>
                    <li>Wait for the bank to provide a confirmation PDF or receipt.</li>
                    <li>Go to <strong>My Payments</strong> to upload that receipt.</li>
                </ol>
                <Button asChild variant="outline" className="w-full bg-white">
                    <Link href="/pay/history">Go to My Payments</Link>
                </Button>
            </div>
        </div>
    );
}
