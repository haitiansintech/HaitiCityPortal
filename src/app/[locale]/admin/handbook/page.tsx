import { db } from "@/db";
import { handbook_articles, tenants as tenantsTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { markArticleAsRead } from "@/app/actions/handbook-read";
import { BookOpen, ShieldAlert, Lock, UserCheck, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const metadata = {
    title: "Municipal Handbook | Haiti City Portal",
};

export default async function HandbookPage() {
    const headersList = await headers();
    const subdomain = headersList.get("x-tenant-subdomain") || "demo";

    // Get tenant info
    const tenant = await db.query.tenants.findFirst({
        where: eq(tenantsTable.subdomain, subdomain),
    });

    if (!tenant) {
        return <div className="p-10 text-center">Tenant not found.</div>;
    }

    // Fetch Articles
    const articles = await db.query.handbook_articles.findMany({
        where: eq(handbook_articles.tenant_id, tenant.id),
        orderBy: [desc(handbook_articles.created_at)],
    });

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <header>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Internal</span>
                        <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Knowledge Base</span>
                    </div>
                    <h1 className="text-3xl font-black text-ink-primary">Municipal Handbook</h1>
                    <p className="text-ink-secondary font-medium">Official protocols, guides, and standards for city administration.</p>
                </header>

                <div className="grid gap-6">
                    {articles.map((article) => (
                        <Card key={article.id} className="rounded-3xl border-2 border-weak shadow-sm overflow-hidden bg-white group hover:border-brand-blue/30 transition-all">
                            <CardHeader className="pb-3 border-b border-weak bg-slate-50/50">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                            <BookOpen className="h-5 w-5 text-brand-blue" />
                                            {article.title}
                                        </CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest bg-white">
                                                {new Date(article.created_at).toLocaleDateString()}
                                            </Badge>
                                            <RoleBadge role={article.required_role} />
                                        </div>
                                    </div>
                                    <MarkReadButton id={article.id} />
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 prose prose-sm prose-slate max-w-none">
                                <div className="p-4 bg-blue-50/50 rounded-xl mb-4 border border-blue-100">
                                    <h4 className="text-xs font-black text-brand-blue uppercase tracking-widest mb-2">Kreyòl</h4>
                                    <ReactMarkdown>{article.content_kr}</ReactMarkdown>
                                </div>
                                {article.content_fr && (
                                    <div className="p-4 bg-slate-50 rounded-xl border border-weak">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Français</h4>
                                        <ReactMarkdown>{article.content_fr}</ReactMarkdown>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Helper component for 'Mark as Read'
function MarkReadButton({ id }: { id: string }) {
    return (
        <form action={async () => {
            "use server";
            await markArticleAsRead(id);
        }}>
            <Button variant="outline" size="sm" className="h-8 gap-1 text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                <CheckCircle2 className="h-4 w-4" />
                Mark Read
            </Button>
        </form>
    );
}

function RoleBadge({ role }: { role: string }) {
    let color = "bg-slate-100 text-slate-600 border-slate-200";
    let icon = <UserCheck className="h-3 w-3 mr-1" />;

    if (role === 'finance_admin') {
        color = "bg-purple-50 text-purple-700 border-purple-200";
        icon = <Lock className="h-3 w-3 mr-1" />;
    } else if (role === 'mayor') {
        color = "bg-amber-50 text-amber-700 border-amber-200";
        icon = <ShieldAlert className="h-3 w-3 mr-1" />;
    }

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${color}`}>
            {icon}
            Access: {role.replace('_', ' ')}
        </span>
    );
}
