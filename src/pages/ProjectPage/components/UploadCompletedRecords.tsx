import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from '../../../components/FileUpload.tsx';
import {ProjectRecord} from "../../../models/project.models.ts";
import ViewRecords from "../../../components/ViewRecords.tsx"; // Adjust path as needed

interface UploadCompletedRecordsProps {
    projectId: number;
}

const UploadCompletedRecords: React.FC<UploadCompletedRecordsProps> = ({ projectId }) => {
    const [completedProjectRecords, setCompletedProjectRecords] = useState<ProjectRecord[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = () => {
        if (!completedProjectRecords || completedProjectRecords.length === 0) {
            setError('No records to submit');
            return;
        }

        setLoading(true);
        setError(null);

        axios.post(`http://127.0.0.1:8000/api/projects/completed-records/${projectId}/`, { completedProjectRecords })
            .then(response => {
                alert('Completed project records added successfully');
                console.log('Response:', response.data);
                setCompletedProjectRecords([]);  // Reset the records after successful submission
            })
            .catch(err => {
                setError('Error uploading completed project records');
                console.error('Error:', err);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="form-container">
            <h3 className="form-label">Upload Completed Project Records</h3>

            <FileUpload setJsonData={setCompletedProjectRecords}/>

            <button onClick={handleSubmit} disabled={loading} className="form-button mt-4">
                {loading ? 'Uploading...' : 'Submit'}
            </button>

            <ViewRecords data={completedProjectRecords} />


            {error && <p className="form-error">{error}</p>}
        </div>
    );
};

export default UploadCompletedRecords;