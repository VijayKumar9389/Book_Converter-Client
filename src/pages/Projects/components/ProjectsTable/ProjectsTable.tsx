import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useAuthContext} from "../../../../context/auth.context.tsx";
import {apiClient} from "../../../../utils/interceptors.ts";

// Define the type for a Project
interface Project {
    id: number;
    name: string;
    year: string;
    notes: string;
}

const ProjectsTable: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const auth = useAuthContext();

    const handleRowClick = (projectId: number) => {
        navigate(`/projects/${projectId}`);
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await apiClient.get('http://127.0.0.1:8000/api/projects/', {

                });
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="p-4">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <h1>Welcome {auth.username}</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border-b">ID</th>
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Year</th>
                            <th className="px-4 py-2 border-b">Notes</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projects.map((project) => (
                            <tr
                                key={project.id}
                                onClick={() => handleRowClick(project.id)}
                                className="cursor-pointer hover:bg-blue-50 transition duration-150 ease-in-out"
                            >
                                <td className="px-4 py-2 border-b text-center">{project.id}</td>
                                <td className="px-4 py-2 border-b text-center">{project.name}</td>
                                <td className="px-4 py-2 border-b text-center">{project.year}</td>
                                <td className="px-4 py-2 border-b text-center">{project.notes}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProjectsTable;