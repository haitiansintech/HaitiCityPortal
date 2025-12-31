"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Megaphone, Radio } from "lucide-react";
import { createEmergencyAlert } from "@/app/actions/emergency-alerts";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function EmergencyPage() {
    const { toast } = useToast();
    const [pending, setPending] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setPending(true);
        await createEmergencyAlert(formData);
        toast({ title: "Alert Sent", description: "All field agents will receive this message." });
        setPending(false);
    };

    return (
        <div className="min-h-screen bg-rose-50 py-12 px-6">
            <div className="max-w-xl mx-auto space-y-8">
                <header className="text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-4 animate-pulse">
                        <AlertCircle className="h-10 w-10 text-red-600" />
                    </div>
                    <h1 className="text-4xl font-black text-red-900 uppercase tracking-tight">Crisis Center</h1>
                    <p className="text-red-700 font-bold mt-2">Broadcast emergency alerts to all field staff.</p>
                </header>

                <Card className="rounded-3xl border-4 border-red-200 shadow-xl bg-white overflow-hidden">
                    <CardHeader className="bg-red-600 text-white p-6">
                        <CardTitle className="flex items-center gap-2 text-2xl font-black uppercase tracking-widest">
                            <Megaphone className="h-6 w-6" />
                            New Broadcast
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form action={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="font-bold text-red-900">Severity Level</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-slate-200 cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all has-[:checked]:bg-red-100 has-[:checked]:border-red-600">
                                        <input type="radio" name="severity" value="high" className="w-4 h-4 accent-red-600" defaultChecked />
                                        <span className="font-bold text-slate-700">High Priority</span>
                                    </label>
                                    <label className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-slate-200 cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all has-[:checked]:bg-red-600 has-[:checked]:text-white">
                                        <input type="radio" name="severity" value="critical" className="w-4 h-4 accent-white" />
                                        <span className="font-bold">CRITICAL</span>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold text-brand-blue">Message (Kreyòl)</Label>
                                <Textarea name="message_kr" placeholder="Gen gwo van ki ap vini..." className="border-2 border-slate-200 rounded-xl h-24 focus:border-brand-blue" required />
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold text-slate-500">Message (French)</Label>
                                <Textarea name="message_fr" placeholder="Vents forts attendus..." className="border-2 border-slate-200 rounded-xl h-24" required />
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold text-slate-700">Duration (Hours)</Label>
                                <select name="duration" className="w-full h-12 rounded-xl border-2 border-slate-200 px-3 font-bold bg-white">
                                    <option value="1">1 Hour</option>
                                    <option value="4">4 Hours</option>
                                    <option value="24" selected>24 Hours</option>
                                    <option value="48">48 Hours</option>
                                </select>
                            </div>

                            <Button disabled={pending} type="submit" className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-black text-lg uppercase tracking-widest rounded-xl shadow-lg shadow-red-200 hover:scale-[1.02] active:scale-95 transition-all">
                                {pending ? "Broadcasting..." : "BLAST ALERT"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
