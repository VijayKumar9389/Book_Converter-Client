import React, { useState, useEffect } from 'react';
import axios from "axios";

interface ProjectRecord {
    position: number;
    tract: number;
    pin: string;
    structure: string;
    interest: string;
    status: string;
    name: string;
    street_address: string;
    mailing_address: string;
    phone_number: string;
    occupants: number;
    works_land: string;
    contacted: string;
    attempts: string;
    consultation: string;
    follow_up: string;
    comments: string;
    page_no: string;
    keep_delete: string;
    email: string;
    commodity: string;
    pipeline_status: string;
}

interface ProjectRecordCardProps {
    record: ProjectRecord;
    projectId: number;
}

const ProjectRecordCard: React.FC<ProjectRecordCardProps> = ({ record, projectId }) => {
    const [completedRecord, setCompletedRecord] = useState<ProjectRecord | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompletedRecord = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/projects/completed-records/${projectId}/${record.position}/`);
                if (response.data.length > 0) {
                    setCompletedRecord(response.data[0]);
                } else {
                    setCompletedRecord(null);
                    setError("No completed record found.");
                }
            } catch (error) {
                console.error('Error fetching completed project record:', error);
                setError('Failed to load completed project record');
            }
            setLoading(false);
        };
        fetchCompletedRecord();
    }, [projectId, record.position]);

    const renderField = (label: string, originalValue: any, updatedValue: any | null) => {
        const isNew = updatedValue === undefined || updatedValue === null; // Field is new if there's no updated value
        const isDifferent = !isNew && originalValue !== updatedValue; // Field is different if there's an updated value and it's changed

        // If there's no completed record, just show the original value
        const displayValue = isNew ? originalValue : updatedValue;

        return (
            <p className="flex flex-col text-gray-600">
                <strong>{label}:</strong>{" "}
                <span className={isDifferent ? 'text-red-500 font-semibold' : ''}>{displayValue}</span>
                {isDifferent && (
                    <span className="text-sm text-gray-500 line-through">
                    (was: {originalValue})
                </span>
                )}
            </p>
        );
    };

    return (
        <div className="bg-white mt-2 rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">{record.name}</h3>

            {loading && <p>Loading completed record...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {renderField("Tract", record.tract, completedRecord?.tract)}
                {renderField("Structure", record.structure, completedRecord?.structure)}
                {renderField("Status", record.status, completedRecord?.status)}
                {renderField("Phone", record.phone_number, completedRecord?.phone_number)}
                {renderField("Street Address", record.street_address, completedRecord?.street_address)}
                {renderField("Mailing Address", record.mailing_address, completedRecord?.mailing_address)}
                {renderField("Occupants", record.occupants, completedRecord?.occupants)}
                {renderField("Works Land", record.works_land, completedRecord?.works_land)}
                {renderField("Contacted", record.contacted, completedRecord?.contacted)}
                {renderField("Attempts", record.attempts, completedRecord?.attempts)}
                {renderField("Consultation", record.consultation, completedRecord?.consultation)}
                {renderField("Follow-up", record.follow_up, completedRecord?.follow_up)}
                {renderField("Email", record.email, completedRecord?.email)}
            </div>
        </div>
    );
};

export default ProjectRecordCard;