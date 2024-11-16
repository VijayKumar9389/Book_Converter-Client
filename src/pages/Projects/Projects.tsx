import ProjectsTable from "./components/ProjectsTable/ProjectsTable.tsx";
import Dialog from "../../components/Dialog.tsx";
import CreateProject from "./components/CreateProject/CreateProject.tsx";
import { useState } from "react";

const Projects = () => {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const toggleDialog = () => {
        setShowDialog(!showDialog);
    }

    return (
        <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
            <div className="header flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
                <button
                    onClick={toggleDialog}
                    className="form-button bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Create Project
                </button>
            </div>
            <ProjectsTable />
            <Dialog
                element={<CreateProject />}
                heading="Create Project"
                isOpen={showDialog}
                toggle={toggleDialog}
            />
        </div>
    );
}

export default Projects;