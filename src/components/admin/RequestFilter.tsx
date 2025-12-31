"use client";

import { useRouter } from "next/navigation";

export default function RequestFilter({ initialStatus }: { initialStatus: string }) {
    const router = useRouter();

    return (
        <div className="flex items-center gap-4">
            <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
                Filter by Status:
            </label>
            <select
                id="status-filter"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-sm"
                defaultValue={initialStatus}
                onChange={(e) => {
                    const value = e.target.value;
                    const url = value === "all" ? "/admin/requests" : `/admin/requests?status=${value}`;
                    router.push(url);
                }}
            >
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="acknowledged">In Progress</option>
                <option value="closed">Closed</option>
            </select>
        </div>
    );
}
