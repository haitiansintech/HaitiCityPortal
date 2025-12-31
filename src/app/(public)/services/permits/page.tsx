import ServiceInfoPage from "@/components/ui/ServiceInfoPage";

export const metadata = {
    title: "Construction Permits | Haiti City Portal",
    description: "Apply for building and construction permits (Permis de Construire).",
};

export default function PermitsPage() {
    return (
        <ServiceInfoPage
            title="Construction & Building Permits"
            description="All new constructions, renovations, or structural changes within the municipal boundaries require a legal 'Permis de Construire' to ensure safety and urban planning compliance."
            steps={[
                "Prepare your architectural plans and land ownership documents.",
                "Submit a formal application to the Engineering Department (Génie Municipal).",
                "A site inspection will be scheduled by a municipal engineer.",
                "Pay the permit fees based on the square footage and project type.",
                "Your permit will be issued once the plans are approved and fees are cleared."
            ]}
            documents={[
                "Proof of ownership (certified title or notarized deed)",
                "Three copies of architectural and structural plans",
                "Copy of CIN/NIF of the owner",
                "Engineering certificate for projects over 150sqm"
            ]}
            fees="Permit fees vary by project size. Residential permits start at 25 HTG per square meter. Commercial projects are assessed separately."
        />
    );
}
