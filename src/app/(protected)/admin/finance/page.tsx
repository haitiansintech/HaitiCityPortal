import { db } from "@/db";
import { payment_records } from "@/db/schema";
import { eq, and, desc, ne } from "drizzle-orm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FinanceTable from "@/components/admin/FinanceTable";

export const metadata = {
    title: "Finance Dashboard | Admin",
    description: "Review and verify city payments",
};

export default async function FinanceDashboardPage() {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "admin") {
        redirect("/login");
    }

    const tenantId = session.user.tenantId;

    // Fetch all records for the tenant
    const allRecords = await db.query.payment_records.findMany({
        where: eq(payment_records.tenant_id, tenantId),
        orderBy: [desc(payment_records.created_at)],
    });

    const pending = allRecords.filter(r => r.status === "pending_review" || r.status === "pending_upload");
    const verified = allRecords.filter(r => r.status === "verified");
    const rejected = allRecords.filter(r => r.status === "rejected");

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Finance Administration</h1>
                <p className="text-muted-foreground mt-2">
                    Review payment proofs and issue official municipal quittances.
                </p>
            </div>

            <Tabs defaultValue="pending" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="pending" className="relative">
                        Pending Review
                        {pending.length > 0 && (
                            <span className="ml-2 bg-brand-blue text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                {pending.length}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="verified">Verified History</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payments Awaiting Review</CardTitle>
                            <CardDescription>
                                Match these records against your bank statements or MonCash reports.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FinanceTable records={pending} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="verified" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Verified Payments</CardTitle>
                            <CardDescription>
                                History of all approved transactions and issued quittances.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FinanceTable records={verified} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="rejected" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rejected Payments</CardTitle>
                            <CardDescription>
                                Records that were denied due to missing or invalid proof.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FinanceTable records={rejected} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
