import { headers } from "next/headers";
import { db } from "@/db";
import { service_requests, tenants } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Manage Requests",
    description: "View and manage all service requests",
};

interface PageProps {
    searchParams: Promise<{ status?: string }>;
}

export default async function AdminRequestsPage({ searchParams }: PageProps) {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }

    const tenantId = session.user.tenantId;
    const params = await searchParams;
    const filterStatus = params.status;


    // Build query conditions
    const conditions = [eq(service_requests.tenant_id, tenantId)];
    if (filterStatus) {
        conditions.push(eq(service_requests.status, filterStatus));
    }

    // Fetch requests
    const requests = await db
        .select({
            id: service_requests.id,
            service_name: service_requests.service_name,
            service_code: service_requests.service_code,
            description: service_requests.description,
            status: service_requests.status,
            requested_datetime: service_requests.requested_datetime,
            email: service_requests.email,
        })
        .from(service_requests)
        .where(and(...conditions))
        .orderBy(desc(service_requests.requested_datetime))
        .limit(50);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Service Requests</h1>
                        <p className="text-gray-600 mt-2">
                            Viewing {requests.length} request{requests.length !== 1 ? "s" : ""}
                        </p>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
                            Filter by Status:
                        </label>
                        <select
                            id="status-filter"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                            defaultValue={filterStatus || "all"}
                            onChange={(e) => {
                                const value = e.target.value;
                                const url = value === "all" ? "/admin/requests" : `/admin/requests?status=${value}`;
                                window.location.href = url;
                            }}
                        >
                            <option value="all">All Statuses</option>
                            <option value="open">Open</option>
                            <option value="acknowledged">In Progress</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                </div>

                {/* Requests Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Requests</CardTitle>
                        <CardDescription>Click on a request to view details and update status</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {requests.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">No requests found</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left p-4 font-semibold text-gray-700">ID</th>
                                            <th className="text-left p-4 font-semibold text-gray-700">Service Type</th>
                                            <th className="text-left p-4 font-semibold text-gray-700">Description</th>
                                            <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                                            <th className="text-left p-4 font-semibold text-gray-700">Submitted</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requests.map((request) => (
                                            <tr
                                                key={request.id}
                                                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                                                onClick={() => (window.location.href = `/admin/requests/${request.id}`)}
                                            >
                                                <td className="p-4">
                                                    <Link
                                                        href={`/admin/requests/${request.id}`}
                                                        className="text-brand-blue hover:underline font-mono text-sm"
                                                    >
                                                        {request.id.slice(0, 8)}...
                                                    </Link>
                                                </td>
                                                <td className="p-4">
                                                    <span className="font-medium">
                                                        {request.service_name || request.service_code || "N/A"}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <p className="text-sm text-gray-600 line-clamp-2 max-w-md">
                                                        {request.description}
                                                    </p>
                                                </td>
                                                <td className="p-4">
                                                    <span
                                                        className={`px-3 py-1 text-xs font-semibold rounded-full ${request.status === "open"
                                                            ? "bg-amber-100 text-amber-700"
                                                            : request.status === "acknowledged"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "bg-emerald-100 text-emerald-700"
                                                            }`}
                                                    >
                                                        {request.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm text-gray-600">
                                                    {request.requested_datetime
                                                        ? new Date(request.requested_datetime).toLocaleDateString()
                                                        : "Unknown"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
