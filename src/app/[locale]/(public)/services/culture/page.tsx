import ServiceInfoPage from "@/components/ui/ServiceInfoPage";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Culture & Tourism | Haiti City Portal",
    description: "Discover local events, heritage sites, and cultural programs.",
};

export default function CulturePage() {
    return (
        <ServiceInfoPage
            title="Culture & Tourism"
            description="Our city is rich in history and vibrant traditions. From Carnival to patron saint festivals, the Culture Department ensures our heritage is preserved and celebrated."
            steps={[
                "Apply for event permits at least 30 days in advance.",
                "Register new cultural organizations with the Town Hall.",
                "Visit the 'Directory' to find museums and historical sites.",
                "Follow our official channels for live event streams."
            ]}
            documents={[
                "Event Permit Application Form",
                "Organization Registration (MAST)",
                "Site Usage Agreement"
            ]}
            fees="Public park usage fees vary by event size. Standard cultural registration is free."
            secondaryAction={
                <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                    <h3 className="text-lg font-semibold text-red-900 mb-2 flex items-center gap-2">
                        <Youtube className="h-6 w-6 text-red-600" />
                        Watch Live Events
                    </h3>
                    <p className="text-sm text-red-800 mb-4">
                        Missed a festival or town hall meeting? We stream key cultural events and announcements on our official YouTube channel.
                    </p>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white" asChild>
                        <a href="https://youtube.com/@CityHallJacmel" target="_blank" rel="noopener noreferrer">
                            Visit Our YouTube Channel
                        </a>
                    </Button>
                </div>
            }
        />
    );
}
