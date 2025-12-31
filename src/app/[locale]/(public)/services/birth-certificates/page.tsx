import ServiceInfoPage from "@/components/ui/ServiceInfoPage";

export const metadata = {
    title: "Birth Certificates | Haiti City Portal",
    description: "Request an official extract from the National Archives (Archives Nationales d'Haïti).",
};

export default function BirthCertificatesPage() {
    return (
        <ServiceInfoPage
            title="Archives & Birth Certificates"
            description="Requesting an 'Extrait d'Archives' is a critical step for legal identification, passports, and school enrollment. We help facilitate the request between your local Mairie and the National Archives in Port-au-Prince."
            steps={[
                "Visit the Mairie (City Hall) with your birth notice or an old extract copy.",
                "Fill out the 'Demande d'Extrait' form provided by the civil registry officer.",
                "The Mairie will transmit your request to the National Archives (ANH).",
                "Once the extract is returned to the Mairie, you will be notified via SMS or phone.",
                "Pick up your official document at the City Hall office."
            ]}
            documents={[
                "Copy of original birth notice (Acte de Naissance/Déclaration)",
                "Previous extract copy (if available)",
                "National ID (CIN) of the person making the request",
                "Power of attorney (if requesting for someone else)"
            ]}
            fees="The standard fee for a birth certificate extract is 500 HTG. Expedited processing may incur additional municipal charges."
        />
    );
}
