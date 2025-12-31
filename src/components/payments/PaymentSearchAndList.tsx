"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { searchPayments, uploadPaymentProof } from "@/app/actions/payments";
import { Search, FileUp, Clock, CheckCircle, Download, ExternalLink, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function PaymentSearchAndList() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState<any[]>([]);
    const [searched, setSearched] = useState(false);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        const result = await searchPayments(query);
        if (result.success) {
            setRecords(result.records || []);
        }
        setSearched(true);
        setLoading(false);
    }

    async function handleSimulatedUpload(id: string) {
        // Mocking upload for this phase
        const dummyUrl = `https://storage.haiticityportal.ht/proofs/${id}.jpg`;
        const result = await uploadPaymentProof(id, dummyUrl);
        if (result.success) {
            // Refresh results
            handleSearch({ preventDefault: () => { } } as any);
        }
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
                                    Amount: <span className="font-bold text-gray-900">{record.amount} {record.currency}</span>
                                </p>

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

                            <div className="bg-gray-50 p-6 flex items-center justify-center border-t md:border-t-0 md:border-l min-w-[200px]">
                                {record.status === "pending_upload" && (
                                    <Button onClick={() => handleSimulatedUpload(record.id)} className="w-full">
                                        <FileUp className="mr-2 h-4 w-4" /> Upload Proof
                                    </Button>
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
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
