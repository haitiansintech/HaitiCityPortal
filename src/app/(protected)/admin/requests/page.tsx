import { db } from "@/db";
import { service_requests } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import LogoutButton from "@/components/auth/LogoutButton";
import RequestFilter from "@/components/admin/RequestFilter";

export const metadata = {
    title: "Manage Requests",
    description: "View and manage all service requests",
};

interface PageProps {
    searchParams: Promise<{ status?: string }>;
}

export default async function AdminRequestsPage({ searchParams }: PageProps) {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "admin") {
        redirect("/login");
    }

    const tenantId = session.user.tenantId;
    const params = await searchParams;
    const filterStatus = params.status;

    // Build query conditions
    const conditions = [eq(service_requests.tenant_id, tenantId)];
    if (filterStatus && filterStatus !== "all") {
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
                    <div className="flex items-center gap-4">
                        <RequestFilter initialStatus={filterStatus || "all"} />
                        <LogoutButton />
                    </div>
                </div>

                <AdminNav />

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
                                    <tbody className="divide-y divide-gray-100">
                                        {requests.map((request) => (
                                            <tr
                                                key={request.id}
                                                className="hover:bg-gray-50 transition-colors cursor-pointer"
                                                onClick={() => window.location.href = `/admin/requests/${request.id}`}
                                            >
                                                <td className="p-4 text-xs font-mono text-gray-500">{request.id.slice(0, 8)}...</td>
                                                <td className="p-4 font-medium text-gray-900">{request.service_name}</td>
                                                <td className="p-4 text-gray-600 max-w-xs truncate">{request.description}</td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${request.status === "open" ? "bg-amber-100 text-amber-800" :
                                                            request.status === "acknowledged" ? "bg-blue-100 text-blue-800" :
                                                                "bg-green-100 text-green-800"
                                                        }`}>
                                                        {request.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm text-gray-500">
                                                    {new Date(request.requested_datetime).toLocaleDateString()}
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
