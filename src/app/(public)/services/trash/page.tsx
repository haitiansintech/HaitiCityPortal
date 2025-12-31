import ServiceInfoPage from "@/components/ui/ServiceInfoPage";

export const metadata = {
    title: "Trash & Sanitation | Haiti City Portal",
    description: "Municipal trash collection schedules and sanitation services.",
};

export default function TrashPage() {
    return (
        <ServiceInfoPage
            title="Trash Collection & Sanitation"
            description="Helping keep our city clean. We manage scheduled waste collection, public bin maintenance, and special refuse requests for residents and businesses."
            steps={[
                "Check the sanitation schedule for your specific neighborhood (Zone).",
                "Place your waste bins or bags at the designated curb points by 6:00 AM.",
                "Ensure sharp objects or hazardous waste are separated into marked containers.",
                "For bulky items like furniture, request a 'Pickup Spécial' at least 48 hours in advance."
            ]}
            documents={[
                "Utility bill or proof of residence (for new service registration)",
                "Business tax ID (for commercial sanitation accounts)"
            ]}
            fees="Standard residential pickup is included in your annual municipal service tax (CFPB). Special pickups for bulk items incur a 1,000 HTG flat fee."
        />
    );
}
