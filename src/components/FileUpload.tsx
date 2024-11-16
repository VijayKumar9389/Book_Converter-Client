import React from 'react';
import * as XLSX from 'xlsx';
import {ProjectRecord} from "../models/project.models.ts";

interface FileUploadProps {
    setJsonData: React.Dispatch<React.SetStateAction<ProjectRecord[] | null>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ setJsonData }) => {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file: File | undefined = event.target.files?.[0];
        if (!file) return;

        const reader: FileReader = new FileReader();

        reader.onload = (): void => {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, {type: 'array'});
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData: string[] = XLSX.utils.sheet_to_json(worksheet, {header: 1});

            const projectRecords: ProjectRecord[] = jsonData.slice(1).map((row: string, index: number): ProjectRecord => ({
                position: index + 1,
                tract: parseInt(row[0], 10) || 0,
                pin: row[1] || '',
                structure: row[2] || '',
                interest: row[3] || '',
                status: row[4] || '',
                name: row[5] || '',
                streetAddress: row[6] || '',
                mailingAddress: row[7] || '',
                phoneNumber: row[8] || '',
                occupants: parseInt(row[9], 10) || 0,
                worksLand: row[10] || '',
                contacted: row[11] || '',
                attempts: row[12] || '',
                consultation: row[13] || '',
                followUp: row[14] || '',
                comments: row[15] || '',
                email: row[16] || '',
                pageNo: row[17] || '',
                keepDelete: row[18] || '',
                commodity: row[19] || '',
                pipelineStatus: row[20] || '',
            }));

            setJsonData(projectRecords);
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="input-wrapper">
            <label>Upload File:</label>
            <input type="file" className="form-select" onChange={handleFileUpload}/>
        </div>
    );
};

export default FileUpload;