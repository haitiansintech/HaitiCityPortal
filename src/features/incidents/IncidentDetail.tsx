import React from 'react';

interface IncidentDetailProps {
    incident: {
        id: string;
        title: string;
        description: string;
        location: string;
        date: string;
    };
}

const IncidentDetail: React.FC<IncidentDetailProps> = ({ incident }) => {
    return (
        <div className="p-4 border rounded shadow-md">
            <h2 className="text-xl font-bold">{incident.title}</h2>
            <p className="text-gray-700">{incident.description}</p>
            <p className="text-gray-500">Location: {incident.location}</p>
            <p className="text-gray-500">Date: {incident.date}</p>
        </div>
    );
};

export default IncidentDetail;