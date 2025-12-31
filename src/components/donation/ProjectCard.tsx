"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Copy, ArrowRight, HeartHandshake } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface Project {
    id: string;
    title: string;
    description: string | null;
    target_amount: number;
    current_raised: number;
    status: string;
    code: string;
    image_url: string | null;
}

interface ProjectCardProps {
    project: Project;
    currency?: string;
}

export function ProjectCard({ project, currency = "USD" }: ProjectCardProps) {
    const percentage = Math.min(100, Math.round((project.current_raised / project.target_amount) * 100));
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        const memo = `JAC-DON-${project.code}`;
        navigator.clipboard.writeText(memo);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="rounded-[2.5rem] border-2 border-weak overflow-hidden group hover:border-brand-blue/30 transition-all bg-white shadow-xl hover:shadow-2xl">
            <div className="relative h-56 w-full overflow-hidden">
                {project.image_url ? (
                    <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                        <HeartHandshake className="h-16 w-16 text-slate-300" />
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-brand-blue shadow-lg">
                    {project.code}
                </div>
            </div>

            <CardContent className="p-8 space-y-6">
                <div>
                    <h3 className="text-2xl font-black text-ink-primary mb-2 leading-tight">{project.title}</h3>
                    <p className="text-ink-secondary text-sm leading-relaxed line-clamp-3">
                        {project.description}
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-ink-secondary/70">
                        <span>Raised: ${project.current_raised.toLocaleString()}</span>
                        <span>Goal: ${project.target_amount.toLocaleString()}</span>
                    </div>
                    <Progress value={percentage} className="h-3 rounded-full bg-slate-100" indicatorClassName="bg-brand-blue" />
                    <p className="text-right text-xs font-black text-brand-blue">{percentage}% Funded</p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-weak border-dashed space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ink-secondary uppercase tracking-wider">Donation Memo Code</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-[10px] uppercase font-bold text-brand-blue hover:text-brand-blue/80 hover:bg-blue-50"
                            onClick={copyToClipboard}
                        >
                            {copied ? "Copied!" : <span className="flex items-center gap-1"><Copy className="h-3 w-3" /> Copy</span>}
                        </Button>
                    </div>
                    <div className="font-mono text-center text-lg font-bold text-slate-700 bg-white py-2 rounded-xl border border-weak select-all">
                        JAC-DON-{project.code}
                    </div>
                    <p className="text-[10px] text-center text-ink-secondary/60 leading-tight">
                        Include this code in your wire transfer memo to route funds directly to this project.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
