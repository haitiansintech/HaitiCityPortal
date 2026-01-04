import { headers } from "next/headers";
import { db } from "@/db";
import { service_requests, tenants } from "@/db/schema";
import { eq, and, desc, gte, sql } from "drizzle-orm";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Clock, FileText } from "lucide-react";
import DashboardMap from "@/components/admin/DashboardMap";
import LogoutButton from "@/components/auth/LogoutButton";
import AdminNav from "@/components/admin/AdminNav";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard",
  description: "Manage service requests and view analytics",
};

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const tenantId = session.user.tenantId;

  // Fetch tenant info for display (name/logo) from user's assigned tenant
  const tenantResult = await db
    .select()
    .from(tenants)
    .where(eq(tenants.id, tenantId))
    .limit(1);

  const tenant = tenantResult[0];

  if (!tenant) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Tenant not found or access denied.</h1>
      </div>
    );
  }

  // Double check that the subdomain matches the user's tenant (Optional but good)
  const headersList = await headers();
  const subdomainHeader = headersList.get("x-tenant-subdomain") || "demo";

  if (tenant.subdomain !== subdomainHeader) {
    // User is trying to access a different tenant's admin via subdomain spoofing orientation
    // We should probably redirect them to their actual tenant portal or show an error
    console.warn(`[Security] Tenant mismatch for user ${session.user.id}. Expected ${tenant.subdomain}, got ${subdomainHeader}`);
  }

  // Fetch KPIs
  const [openCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(service_requests)
    .where(and(eq(service_requests.tenant_id, tenantId), eq(service_requests.status, "open")));

  const [inProgressCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(service_requests)
    .where(and(eq(service_requests.tenant_id, tenantId), eq(service_requests.status, "acknowledged")));

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const [resolvedThisWeek] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(service_requests)
    .where(
      and(
        eq(service_requests.tenant_id, tenantId),
        eq(service_requests.status, "closed"),
        gte(service_requests.updated_datetime, weekAgo)
      )
    );

  // Fetch recent requests
  const recentRequests = await db
    .select({
      id: service_requests.id,
      service_name: service_requests.service_name,
      description: service_requests.description,
      status: service_requests.status,
      requested_datetime: service_requests.requested_datetime,
    })
    .from(service_requests)
    .where(eq(service_requests.tenant_id, tenantId))
    .orderBy(desc(service_requests.requested_datetime))
    .limit(5);

  // Fetch requests with locations for map
  const requestsWithLocation = await db
    .select({
      id: service_requests.id,
      service_name: service_requests.service_name,
      description: service_requests.description,
      status: service_requests.status,
      latitude: service_requests.latitude,
      longitude: service_requests.longitude,
    })
    .from(service_requests)
    .where(eq(service_requests.tenant_id, tenantId))
    .orderBy(desc(service_requests.requested_datetime))
    .limit(50);

  const stats = [
    {
      title: "Open Requests",
      value: openCount?.count || 0,
      icon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "In Progress",
      value: inProgressCount?.count || 0,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Resolved This Week",
      value: resolvedThisWeek?.count || 0,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Total Requests",
      value: (openCount?.count || 0) + (inProgressCount?.count || 0) + (resolvedThisWeek?.count || 0),
      icon: FileText,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Manage service requests for {tenant.name}
            </p>
          </div>
          <LogoutButton />
        </div>

        <AdminNav />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Activity and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest 5 service requests</CardDescription>
                </div>
                <Button asChild size="sm">
                  <Link href="/admin/requests">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {recentRequests.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No requests yet</p>
              ) : (
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <Link
                      key={request.id}
                      href={`/admin/requests/${request.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {request.service_name || "Service Request"}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {request.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {request.requested_datetime
                              ? new Date(request.requested_datetime).toLocaleString()
                              : "Unknown"}
                          </p>
                        </div>
                        <span
                          className={`ml-4 px-3 py-1 text-xs font-semibold rounded-full ${request.status === "open"
                            ? "bg-amber-100 text-amber-700"
                            : request.status === "acknowledged"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-emerald-100 text-emerald-700"
                            }`}
                        >
                          {request.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Live Map */}
          <Card>
            <CardHeader>
              <CardTitle>Live Map</CardTitle>
              <CardDescription>
                Recent requests with location data
              </CardDescription>
            </CardHeader>
            <CardContent>
              {requestsWithLocation.filter(r => r.latitude && r.longitude).length === 0 ? (
                <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No requests with location data</p>
                </div>
              ) : (
                <DashboardMap
                  markers={requestsWithLocation
                    .filter((r) => r.latitude && r.longitude)
                    .map((r) => ({
                      lat: r.latitude!,
                      lng: r.longitude!,
                      title: r.service_name || "Service Request",
                      description: r.description || "",
                      status: r.status || "open",
                      id: r.id,
                    }))}
                  height="400px"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
