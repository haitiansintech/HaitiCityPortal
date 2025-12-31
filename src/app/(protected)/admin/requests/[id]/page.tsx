import { headers } from "next/headers";
import { db } from "@/db";
import { service_requests, tenants } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, User, Mail, Phone, Calendar } from "lucide-react";
import StatusUpdateForm from "@/components/admin/StatusUpdateForm";
import DashboardMap from "@/components/admin/DashboardMap";
import { auth } from "@/auth";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    return {
        title: `Request ${id.slice(0, 8)}`,
        description: "View and manage service request",
    };
}

export default async function RequestDetailPage({ params }: PageProps) {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }

    const { id } = await params;

    // Fetch the specific request (strictly filtered by session.tenantId)
    const request = await db
        .select()
        .from(service_requests)
        .where(
            and(
                eq(service_requests.id, id),
                eq(service_requests.tenant_id, session.user.tenantId)
            )
        )
        .limit(1);

    if (!request || request.length === 0) {
        notFound();
    }

    const requestData = request[0];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <Button variant="ghost" asChild className="mb-6">
                    <Link href="/admin/requests">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Requests
                    </Link>
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Request Details */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">
                                            {requestData.service_name || "Service Request"}
                                        </CardTitle>
                                        <CardDescription className="mt-2">
                                            Request ID: <span className="font-mono">{requestData.id}</span>
                                        </CardDescription>
                                    </div>
                                    <span
                                        className={`px-4 py-2 text-sm font-semibold rounded-full ${requestData.status === "open"
                                            ? "bg-amber-100 text-amber-700"
                                            : requestData.status === "acknowledged"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-emerald-100 text-emerald-700"
                                            }`}
                                    >
                                        {requestData.status}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                                    <p className="text-gray-700 whitespace-pre-wrap">
                                        {requestData.description || "No description provided"}
                                    </p>
                                </div>

                                {requestData.service_code && (
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Service Code</h3>
                                        <p className="text-gray-700 font-mono">{requestData.service_code}</p>
                                    </div>
                                )}

                                {(requestData.latitude && requestData.longitude) && (
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            Location
                                        </h3>
                                        <div className="space-y-3">
                                            <DashboardMap
                                                markers={[{
                                                    lat: requestData.latitude,
                                                    lng: requestData.longitude,
                                                    title: requestData.service_name || "Service Request",
                                                    description: requestData.description || "",
                                                    status: requestData.status || "open",
                                                }]}
                                                height="250px"
                                                zoom={15}
                                            />
                                            <div className="text-sm space-y-1">
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Coordinates:</span>{" "}
                                                    {requestData.latitude.toFixed(6)}, {requestData.longitude.toFixed(6)}
                                                </p>
                                                {requestData.address && (
                                                    <p className="text-gray-600">
                                                        <span className="font-medium">Address:</span> {requestData.address}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        Submitted:{" "}
                                        {requestData.requested_datetime
                                            ? new Date(requestData.requested_datetime).toLocaleString()
                                            : "Unknown"}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Submitter Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Submitter Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {(requestData.first_name || requestData.last_name) && (
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">
                                            {requestData.first_name} {requestData.last_name}
                                        </span>
                                    </div>
                                )}
                                {requestData.email && (
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <a
                                            href={`mailto:${requestData.email}`}
                                            className="text-sm text-brand-blue hover:underline"
                                        >
                                            {requestData.email}
                                        </a>
                                    </div>
                                )}
                                {requestData.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <a
                                            href={`tel:${requestData.phone}`}
                                            className="text-sm text-brand-blue hover:underline"
                                        >
                                            {requestData.phone}
                                        </a>
                                    </div>
                                )}
                                {!requestData.first_name && !requestData.email && !requestData.phone && (
                                    <p className="text-sm text-gray-500">No contact information provided</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Status Update Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Update Status</CardTitle>
                                <CardDescription>Change the request status</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <StatusUpdateForm requestId={requestData.id} currentStatus={requestData.status || "open"} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
