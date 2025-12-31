import ServiceInfoPage from "@/components/ui/ServiceInfoPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
    title: "Street Cleanup | Haiti City Portal",
    description: "Report illegal dumping and street cleaning requests.",
};

export default function CleanupPage() {
    return (
        <ServiceInfoPage
            title="Street Cleanup"
            description="We are dedicated to keeping our boulevards and public spaces clean. Report illegal dumping or request sweeping for major events."
            steps={[
                "Identify the location of the litter or illegal dump.",
                "Take a photo if possible (safe to do so).",
                "Submit a report using the 'Report Street Litter' button below.",
                "A sanitation team will be dispatched within 48-72 hours."
            ]}
            documents={[
                "No documents required for reporting.",
                "For event cleanup requests: Event Permit Number."
            ]}
            fees="Reporting illegal dumping is free. Event cleanup services start at 5,000 HTG."
            secondaryAction={
                <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                    <h3 className="text-lg font-semibold text-orange-900 mb-2">See Trash or Debris?</h3>
                    <p className="text-sm text-orange-800 mb-4">
                        Help us keep the city clean by reporting large piles of trash, construction debris, or dead animals.
                    </p>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white" asChild>
                        <Link href="/report?issue=street_cleanup">
                            Report Street Litter
                        </Link>
                    </Button>
                </div>
            }
        />
    );
}
