import { useState } from 'react';
import axios from 'axios';
import FileUpload from '../../../../components/FileUpload.tsx';
import {Project, ProjectRecord} from "../../../../models/project.models.ts";
import ViewRecords from "../../../../components/ViewRecords.tsx"; // Import the FileUpload component



const CreateProject = () => {
    const [projectForm, setProjectForm] = useState({
        projectName: '',
        projectYear: new Date().getFullYear(),
        projectNotes: '',
    });
    const [jsonData, setJsonData] = useState<ProjectRecord[] | null>(null);

    const handleSaveClick = () => {
        console.log('Saving project...');
        const projectName = projectForm.projectName;
        const projectYear = projectForm.projectYear;
        const projectNotes = projectForm.projectNotes;

        // Ensure jsonData has data
        if (jsonData && jsonData.length > 0) {

            // Map through the jsonData array to format each record
            const projectRecords = jsonData.map((record: ProjectRecord, index: number) => ({
                position: index + 1,
                tract: record.tract,
                pin: record.pin,
                structure: record.structure,
                interest: record.interest,
                status: record.status,
                name: record.name,
                streetAddress: record.streetAddress,
                mailingAddress: record.mailingAddress,
                phoneNumber: record.phoneNumber,
                occupants: record.occupants,
                worksLand: record.worksLand,
                contacted: record.contacted,
                attempts: record.attempts,
                consultation: record.consultation,
                followUp: record.followUp,
                comments: record.comments,
                pageNo: record.pageNo,
                keepDelete: record.keepDelete,
                email: record.email,
                commodity: record.commodity,
                pipelineStatus: record.pipelineStatus,
            }));

            // Create the final project object to send
            const projectInput: Project = {
                name: projectName,
                year: projectYear,
                notes: projectNotes,
                projectRecords: projectRecords,  // Attach the processed project records
            };

            // Make a POST request to your local API endpoint
            axios.post(`http://127.0.0.1:8000/api/projects/create/`, projectInput)
                .then((response) => {
                    console.log('Project created successfully', response.data);
                    window.location.reload();  // Reload the page after success
                })
                .catch((error) => {
                    console.error('Error creating project', error);
                });
        } else {
            console.log("No project records to upload");
        }
    };

    return (
            <div className="form-container">
                <div className="input-wrapper">
                    <label className="form-label">Project Name:</label>
                    <input
                        type="text"
                        value={projectForm.projectName}
                        onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })}
                        className="form-input"
                    />
                </div>

                <div className="input-wrapper">
                    <label className="form-label">Year:</label>
                    <input
                        type="number"
                        value={projectForm.projectYear}
                        onChange={(e) => setProjectForm({
                            ...projectForm,
                            projectYear: parseInt(e.target.value, 10)
                        })}
                        className="form-input"
                    />
                </div>

                <div className="input-wrapper">
                    <label className="form-label">Project Notes:</label>
                    <input
                        type="text"
                        value={projectForm.projectNotes}
                        onChange={(e) => setProjectForm({ ...projectForm, projectNotes: e.target.value })}
                        className="form-input"
                    />
                </div>

                {/* File Upload Component */}
                <FileUpload setJsonData={setJsonData} />

                <button className="form-button" onClick={handleSaveClick}>
                    Create Project
                </button>

                <ViewRecords data={jsonData} />

            </div>


    );
};

export default CreateProject;