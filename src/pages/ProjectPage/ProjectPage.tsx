import {useState} from "react";
import {useParams} from "react-router-dom";
import RecordsTable from "./components/RecordsTable/RecordsTable.tsx";
import UploadCompletedRecords from "./components/UploadCompletedRecords.tsx";
import Dialog from "../../components/Dialog.tsx";

const ProjectPage = () => {
    const {projectId} = useParams();
    const [message, setMessage] = useState<string | null>(null); // To store success/error messages
    const [showDialog, setShowDialog] = useState<boolean>(false);

    if (!projectId) {
        return <div>Project ID not found</div>;
    }

    const ProjectId = parseInt(projectId, 10);

    const toggleDialog = () => {
        setShowDialog(!showDialog);
    }

    if (!projectId) {
        return <div>Project ID not found</div>;
    }

    const Id = parseInt(projectId, 10);

    const handleDeleteCompletedRecords = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/projects/completed-records/delete/${Id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                // If deletion is successful
                setMessage(data.message || "Completed records deleted successfully.");
            } else {
                // If something went wrong
                setMessage(data.error || "An error occurred while deleting completed records.");
            }
        } catch {
            // Handle any other errors, like network issues
            setMessage("An error occurred while connecting to the server.");
        }
    };

    const handleDownloadComparison = async () => {
        try {
            // Make a GET request to the comparison API
            const response = await fetch(`http://127.0.0.1:8000/api/projects/compare/${Id}/`, {
                method: 'GET',
            });

            if (response.ok) {
                // Create a download link for the Excel file
                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `project_comparison_${Id}.xlsx`;
                link.click();
            } else {
                const data = await response.json();
                setMessage(data.error || "An error occurred while generating the file.");
            }
        } catch {
            setMessage("An error occurred while connecting to the server.");
        }
    };

    return (
        <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
            {/* Page Heading */}
            <div className="flex items-center justify-between border-b-2 pb-4 mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Project {projectId}</h1>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button onClick={handleDeleteCompletedRecords}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Remove Completed Records
                    </button>

                    <button onClick={handleDownloadComparison}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Download Project Comparison
                    </button>

                    <button onClick={toggleDialog}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Upload Completed Records
                    </button>
                </div>
            </div>

            {/* Display the success or error message */}
            {message && <p className="text-sm text-green-500">{message}</p>}

            {/* Records Table */}
            <RecordsTable projectId={ProjectId} />

            {/* Upload Completed Records Form */}
            <Dialog
                heading="Upload Completed Records"
                element={<UploadCompletedRecords projectId={ProjectId} />}
                isOpen={showDialog}
                toggle={toggleDialog}
            />
        </div>
    );
};

export default ProjectPage;