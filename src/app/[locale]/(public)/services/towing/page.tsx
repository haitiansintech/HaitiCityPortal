import ServiceInfoPage from "@/components/ui/ServiceInfoPage";
import TowingLookup from "@/components/services/TowingLookup";

export const metadata = {
    title: "Towing & Impounds | Haiti City Portal",
    description: "Locate towed vehicles and understand impound fees.",
};

export default function TowingPage() {
    return (
        <ServiceInfoPage
            title="Towing & Impounds"
            description="The municipality enforces parking regulations to keep streets clear and safe. If your vehicle has been towed, use this service to locate it and understand the reclamation process."
            steps={[
                "Enter your license plate number below to check if your vehicle is in a municipal lot.",
                "Visit the specific impound lot listed in your search result.",
                "Present valid ID, Vehicle Registration, and Insurance.",
                "Pay the towing and storage fees (Cash or certified check)."
            ]}
            documents={[
                "Government issued ID (NIF/CIN)",
                "Original Vehicle Registration",
                "Proof of Insurance"
            ]}
            fees="Towing Fee: 3,500 HTG. Storage Fee: 500 HTG/day (First 24 hours free)."
            secondaryAction={<TowingLookup />}
        />
    );
}
