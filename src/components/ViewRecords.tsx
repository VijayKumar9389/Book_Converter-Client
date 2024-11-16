import React from 'react';
import { ProjectRecord } from "../models/project.models.ts";

interface JsonDataDisplayProps {
    data: ProjectRecord[] | null; // Array of project records
    title?: string; // Optional title for the data display
}

const ViewRecords: React.FC<JsonDataDisplayProps> = ({ data, title }) => {

    // If data is null or empty, display a message
    if (!data || data.length === 0) {
        return (
            <div className="overflow-wrapper">
                <p className="text-gray-500 text-sm">No records available.</p>
            </div>
        );
    }

    return (
        <div className="overflow-wrapper p-4 bg-white rounded-lg shadow-md max-w-full">
            {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
            <div className="grid gap-6">
                {data.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="border rounded-lg p-4 shadow-sm bg-gray-50"
                    >
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(row).map(([key, value], cellIndex) => (
                                <div key={cellIndex} className="flex flex-col text-sm">
                                    <span className="font-medium text-gray-600">{key}</span>
                                    <span className="text-gray-800 break-words font-semibold">{value || "N/A"}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewRecords;