"use client";

import { useState } from "react";
import { updateRequestStatus } from "@/app/actions/update-request-status";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";

interface StatusUpdateFormProps {
    requestId: string;
    currentStatus: string;
}

export default function StatusUpdateForm({ requestId, currentStatus }: StatusUpdateFormProps) {
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        const result = await updateRequestStatus(requestId, selectedStatus);

        if (result.success) {
            setMessage({ type: "success", text: result.message });
        } else {
            setMessage({ type: "error", text: result.message });
        }

        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="status" className="block text-sm font-medium mb-2">
                    New Status
                </label>
                <select
                    id="status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                    <option value="open">Open</option>
                    <option value="acknowledged">In Progress</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            {message && (
                <div
                    className={`p-3 rounded-md text-sm ${message.type === "success"
                        ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                        : "bg-rose-50 border border-rose-200 text-rose-700"
                        }`}
                >
                    {message.type === "success" && <CheckCircle2 className="inline h-4 w-4 mr-2" />}
                    {message.text}
                </div>
            )}

            <Button
                type="submit"
                disabled={isSubmitting || selectedStatus === currentStatus}
                className="w-full"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                    </>
                ) : (
                    "Update Status"
                )}
            </Button>
        </form>
    );
}
