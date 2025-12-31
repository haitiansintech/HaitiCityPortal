"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface SectionFilterProps {
    sections: { id: string; name: string }[];
    currentSectionId?: string;
}

export function SectionFilter({ sections, currentSectionId }: SectionFilterProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleValueChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "all") {
            params.delete("sectionId");
        } else {
            params.set("sectionId", value);
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-4 w-full max-w-md">
            <div className="flex-shrink-0 bg-brand-blue/10 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-brand-blue" />
            </div>
            <Select
                onValueChange={handleValueChange}
                defaultValue={currentSectionId || "all"}
            >
                <SelectTrigger className="w-full bg-white rounded-2xl border-weak shadow-sm h-12 text-ink-primary font-medium">
                    <SelectValue placeholder="Select your Communal Section" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-2xl border-weak shadow-lg">
                    <SelectItem value="all" className="font-semibold text-brand-blue">All Communal Sections</SelectItem>
                    {sections.map((section) => (
                        <SelectItem key={section.id} value={section.id}>
                            {section.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
