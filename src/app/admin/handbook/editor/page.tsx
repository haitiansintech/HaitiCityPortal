"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveHandbookArticle } from "@/app/actions/save-handbook-article";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function HandbookEditorPage() {
    const { toast } = useToast();
    const [pending, setPending] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setPending(true);
        try {
            await saveHandbookArticle(formData);
            toast({ title: "Atik Pibliye!", description: "Article has been saved to the handbook." });
            // Reset form?
        } catch (e) {
            toast({ title: "Error", description: "Failed to save article.", variant: "destructive" });
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-2xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-black text-ink-primary">Handbook CMS</h1>
                    <p className="text-ink-secondary">Create or edit protocols for municipal staff.</p>
                </header>

                <Card className="rounded-3xl border-2 border-weak shadow-sm bg-white">
                    <CardHeader>
                        <CardTitle>New Article</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="font-bold">Title (Internal Name)</Label>
                                <Input name="title" required placeholder="e.g., Hurricane Preparedness 2025" className="rounded-xl" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="font-bold">Category</Label>
                                    <Input name="category" required placeholder="Protocol" className="rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="required_role" className="font-bold">Access Role</Label>
                                    <select name="required_role" className="w-full h-10 rounded-xl border border-input bg-background px-3 py-2 text-sm">
                                        <option value="official">All Officials</option>
                                        <option value="finance_admin">Finance Dept</option>
                                        <option value="mayor">Mayor Only</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content_kr" className="font-bold text-brand-blue">Content (Kreyòl)</Label>
                                <Textarea name="content_kr" required placeholder="Ekri pwotokòl la an Kreyòl..." className="rounded-xl h-32" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content_fr" className="font-bold text-slate-500">Content (French - Optional)</Label>
                                <Textarea name="content_fr" placeholder="Version française..." className="rounded-xl h-32" />
                            </div>

                            <Button disabled={pending} type="submit" className="w-full bg-brand-blue font-bold rounded-xl h-12">
                                {pending ? "Publishing..." : "Publish Article"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
