import React from 'react';

interface Incident {
    id: string;
    title: string;
    description: string;
}

const IncidentList: React.FC = () => {
    const [incidents, setIncidents] = React.useState<Incident[]>([]);

    React.useEffect(() => {
        const fetchIncidents = async () => {
            const response = await fetch('/api/incidents');
            const data = await response.json();
            setIncidents(data);
        };

        fetchIncidents();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Reported Incidents</h1>
            <ul className="space-y-2">
                {incidents.map((incident) => (
                    <li key={incident.id} className="border p-2 rounded">
                        <h2 className="font-semibold">{incident.title}</h2>
                        <p>{incident.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IncidentList;