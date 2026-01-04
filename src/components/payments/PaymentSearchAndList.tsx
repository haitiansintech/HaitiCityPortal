"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { searchPayments, uploadPaymentProof } from "@/app/actions/payments";
import { Search, FileUp, Clock, CheckCircle, Download, ExternalLink, AlertTriangle, Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function PaymentSearchAndList() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState<any[]>([]);
    const [searched, setSearched] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [verificationCodes, setVerificationCodes] = useState<{ [key: string]: string }>({});

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        // Initial search is usually by email or direct memo code
        const result = await searchPayments(query);
        if (result.success) {
            setRecords(result.records || []);
        }
        setSearched(true);
        setLoading(false);
    }

    async function handleVerifyRecord(recordId: string, email: string) {
        const code = verificationCodes[recordId];
        if (!code) return;

        setLoading(true);
        // Verification search: search by email + provide verification code
        const result = await searchPayments(email, code);
        if (result.success) {
            const updatedRecord = result.records?.find((r: any) => r.id === recordId);
            if (updatedRecord?.isFullAccess) {
                setRecords(prev => prev.map(r => r.id === recordId ? updatedRecord : r));
            } else {
                alert("Incorrect Memo Code. Please check your records.");
            }
        }
        setLoading(false);
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, id: string) {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setSuccessMessage(null);

        // Simulated upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const dummyUrl = `https://storage.haiticityportal.ht/proofs/${id}.jpg`;
        const result = await uploadPaymentProof(id, dummyUrl);

        if (result.success) {
            setSuccessMessage("Receipt Uploaded! We will review it shortly.");
            handleSearch({ preventDefault: () => { } } as any);
        } else {
            alert("Failed to upload proof. Please try again.");
        }
        setLoading(false);
    }

    function triggerFileInput(id: string) {
        const input = document.getElementById(`file-upload-${id}`) as HTMLInputElement;
        if (input) input.click();
    }

    return (
        <div className="space-y-8">
            <Card className="border-2 border-brand-blue/10">
                <CardHeader>
                    <CardTitle className="text-xl">Find Your Record</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <Input
                            placeholder="Enter Email or Memo Code (e.g. JAC-TAX-1234)"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit" disabled={loading}>
                            {loading ? "Searching..." : <><Search className="mr-2 h-4 w-4" /> Search</>}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {successMessage && (
                <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
            )}

            <div className="space-y-4">
                {searched && records.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed">
                        <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                        <h3 className="text-lg font-bold">No records found</h3>
                        <p className="text-gray-500">Check your spelling or memo code and try again.</p>
                    </div>
                )}

                {records.map((record) => (
                    <Card key={record.id} className="overflow-hidden border-l-4 border-l-brand-blue">
                        <div className="md:flex">
                            <div className="p-6 flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="outline" className="font-mono">{record.generated_memo_code}</Badge>
                                    <span className="text-sm text-gray-500">{new Date(record.created_at).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1 capitalize">
                                    {record.payment_type.replace('_', ' ')}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Amount: <span className="font-bold text-gray-900">
                                        {record.isFullAccess ? `${record.amount} ${record.currency}` : `${record.amount} ${record.currency} (Locked)`}
                                    </span>
                                </p>

                                {!record.isFullAccess && (
                                    <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-lg mb-4">
                                        <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-2 flex items-center">
                                            <AlertTriangle className="mr-1 h-3 w-3" /> Security: Limited View
                                        </p>
                                        <p className="text-xs text-blue-700 mb-3">
                                            This record belongs to <strong>{record.email}</strong>. Entering your <strong>Memo Code</strong> unlocks full details and payment proof uploads.
                                        </p>
                                        <div className="flex gap-2">
                                            <Input
                                                size={1}
                                                placeholder="Enter Memo Code"
                                                className="h-8 text-sm bg-white"
                                                value={verificationCodes[record.id] || ""}
                                                onChange={(e) => setVerificationCodes({ ...verificationCodes, [record.id]: e.target.value })}
                                            />
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 text-xs border-brand-blue text-brand-blue hover:bg-brand-blue/5"
                                                onClick={() => handleVerifyRecord(record.id, record.email)}
                                                disabled={loading}
                                            >
                                                Verify
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center space-x-4">
                                    {record.status === "pending_upload" && (
                                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 flex items-center">
                                            <Clock className="mr-1 h-3 w-3" /> Proof Required
                                        </Badge>
                                    )}
                                    {record.status === "pending_review" && (
                                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 flex items-center">
                                            <Clock className="mr-1 h-3 w-3" /> Under Review
                                        </Badge>
                                    )}
                                    {record.status === "verified" && (
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 flex items-center">
                                            <CheckCircle className="mr-1 h-3 w-3" /> Verified
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l min-w-[200px]">
                                {!record.isFullAccess ? (
                                    <div className="text-center text-xs text-gray-400">
                                        <Clock className="mx-auto h-6 w-6 mb-2 opacity-20" />
                                        Verify to interact
                                    </div>
                                ) : (
                                    <>
                                        {record.status === "pending_upload" && (
                                            <>
                                                <input
                                                    type="file"
                                                    id={`file-upload-${record.id}`}
                                                    className="hidden"
                                                    accept="image/*,.pdf"
                                                    onChange={(e) => handleFileChange(e, record.id)}
                                                />
                                                <Button
                                                    onClick={() => triggerFileInput(record.id)}
                                                    className="w-full"
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</>
                                                    ) : (
                                                        <><FileUp className="mr-2 h-4 w-4" /> Upload Proof</>
                                                    )}
                                                </Button>
                                            </>
                                        )}
                                        {record.status === "pending_review" && (
                                            <div className="text-center text-sm text-gray-500">
                                                <p>Proof Submitted</p>
                                                {record.proof_url && (
                                                    <a href={record.proof_url} target="_blank" className="text-brand-blue flex items-center justify-center mt-2">
                                                        View <ExternalLink className="ml-1 h-3 w-3" />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                        {record.status === "verified" && (
                                            <Button asChild variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                                                <Link href={`/pay/quittance/${record.id}`}>
                                                    <Download className="mr-2 h-4 w-4" /> Get Quittance
                                                </Link>
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
