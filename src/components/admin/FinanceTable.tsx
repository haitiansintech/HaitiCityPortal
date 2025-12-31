"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Eye, CheckCircle2, XCircle, ExternalLink, ArrowRight } from "lucide-react";
import { approvePayment, rejectPayment } from "@/app/actions/finance";
import { useTransition } from "react";

export default function FinanceTable({ records }: { records: any[] }) {
    const [isPending, startTransition] = useTransition();
    const [selectedRecord, setSelectedRecord] = useState<any>(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [showRejectInput, setShowRejectInput] = useState(false);

    async function handleApprove() {
        if (!selectedRecord) return;
        startTransition(async () => {
            const result = await approvePayment(selectedRecord.id);
            if (result.success) {
                alert(`Approved! Quittance issued: ${result.quittanceId}`);
                setSelectedRecord(null);
            } else {
                alert(result.error);
            }
        });
    }

    async function handleReject() {
        if (!selectedRecord || !rejectionReason) return;
        startTransition(async () => {
            const result = await rejectPayment(selectedRecord.id, rejectionReason);
            if (result.success) {
                alert("Payment rejected.");
                setSelectedRecord(null);
                setRejectionReason("");
                setShowRejectInput(false);
            } else {
                alert(result.error);
            }
        });
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>User / Email</TableHead>
                        <TableHead>Memo Code</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {records.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                No records found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        records.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell className="text-xs">
                                    {new Date(record.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="font-medium text-xs">
                                    {record.email}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="font-mono text-[10px]">
                                        {record.generated_memo_code}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-bold">
                                    {record.amount} {record.currency}
                                </TableCell>
                                <TableCell className="capitalize text-xs">
                                    {record.payment_type.replace("_", " ")}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            record.status === "verified" ? "default" :
                                                record.status === "rejected" ? "destructive" : "secondary"
                                        }
                                        className="text-[10px]"
                                    >
                                        {record.status.replace("_", " ")}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedRecord(record);
                                                    setShowRejectInput(false);
                                                }}
                                            >
                                                <Eye className="h-4 w-4 mr-2" /> Review
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl">
                                            <DialogHeader>
                                                <DialogTitle>Review Payment Proof</DialogTitle>
                                                <DialogDescription>
                                                    Memo Code: {selectedRecord?.generated_memo_code}
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                                                <div className="space-y-4">
                                                    <div className="bg-muted p-4 rounded-lg space-y-2">
                                                        <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Record Details</p>
                                                        <div className="grid grid-cols-2 text-sm">
                                                            <span>Amount:</span>
                                                            <span className="font-bold">{selectedRecord?.amount} {selectedRecord?.currency}</span>
                                                        </div>
                                                        <div className="grid grid-cols-2 text-sm">
                                                            <span>Reference:</span>
                                                            <span className="font-mono">{selectedRecord?.reference_id || "None"}</span>
                                                        </div>
                                                        <div className="grid grid-cols-2 text-sm">
                                                            <span>User Email:</span>
                                                            <span className="truncate">{selectedRecord?.email}</span>
                                                        </div>
                                                    </div>

                                                    <div className="border rounded-lg p-2 aspect-video bg-black flex items-center justify-center">
                                                        {selectedRecord?.proof_url ? (
                                                            <img
                                                                src={selectedRecord.proof_url}
                                                                alt="Payment Proof"
                                                                className="max-h-full object-contain"
                                                            />
                                                        ) : (
                                                            <p className="text-white text-xs">No proof image uploaded yet.</p>
                                                        )}
                                                    </div>
                                                    {selectedRecord?.proof_url && (
                                                        <Button variant="link" asChild className="w-full">
                                                            <a href={selectedRecord.proof_url} target="_blank" rel="noreferrer">
                                                                View Full Size <ExternalLink className="ml-2 h-4 w-4" />
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>

                                                <div className="space-y-4">
                                                    {!showRejectInput ? (
                                                        <div className="space-y-4 pt-12">
                                                            <Button
                                                                onClick={handleApprove}
                                                                disabled={isPending || selectedRecord?.status === "verified"}
                                                                className="w-full bg-green-600 hover:bg-green-700 h-16 text-lg"
                                                            >
                                                                <CheckCircle2 className="mr-2 h-6 w-6" />
                                                                {isPending ? "Approving..." : "Approve & Issue Quittance"}
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => setShowRejectInput(true)}
                                                                disabled={isPending || selectedRecord?.status === "verified"}
                                                                className="w-full text-red-600 border-red-200 hover:bg-red-50 h-12"
                                                            >
                                                                <XCircle className="mr-2 h-4 w-4" /> Reject Payment
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-right-4">
                                                            <label className="text-sm font-bold">Reason for Rejection</label>
                                                            <Textarea
                                                                placeholder="e.g. Image blurry, Transaction not found in bank statement..."
                                                                value={rejectionReason}
                                                                onChange={(e) => setRejectionReason(e.target.value)}
                                                            />
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    variant="destructive"
                                                                    onClick={handleReject}
                                                                    disabled={isPending || !rejectionReason}
                                                                    className="flex-1"
                                                                >
                                                                    Confirm Rejection
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    onClick={() => setShowRejectInput(false)}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
