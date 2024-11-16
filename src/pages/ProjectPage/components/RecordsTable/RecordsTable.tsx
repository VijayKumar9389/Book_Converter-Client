// ProjectRecords.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectRecordCard from './ProjectRecordCard.tsx';

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

interface ProjectRecordsProps {
    projectId: number;
}

const ProjectRecords: React.FC<ProjectRecordsProps> = ({ projectId }) => {
    const [records, setRecords] = useState<ProjectRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchProjectRecords = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get(`http://127.0.0.1:8000/api/projects/${projectId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRecords(response.data);
            } catch (error) {
                console.error('Error fetching project records:', error);
                setError('Failed to load project records');
            } finally {
                setLoading(false);
            }
        };

        fetchProjectRecords();
    }, [projectId]);

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Project Records</h1>

            {loading && (
                <div className="flex justify-center items-center text-blue-500">
                    <span>Loading...</span>
                </div>
            )}

            {error && (
                <div className="text-center text-red-500 font-semibold">{error}</div>
            )}

            {!loading && !error && records.length === 0 && (
                <div className="text-center text-gray-500">No records found for this project.</div>
            )}

            <div className="flex flex-col mt-6">
                {records.map((record) => (
                    <ProjectRecordCard key={record.pin} record={record} projectId={projectId}/>
                ))}
            </div>
        </div>
    );
};

export default ProjectRecords;