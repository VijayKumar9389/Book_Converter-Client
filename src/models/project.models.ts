export interface Project {
    name: string;
    year: number;
    notes: string;
    projectRecords: ProjectRecord[];
}

export interface ProjectRecord {
    position: number;
    tract: number;
    pin: string;
    structure: string;
    interest: string;
    status: string;
    name: string;
    streetAddress: string;
    mailingAddress: string;
    phoneNumber: string;
    occupants: number;
    worksLand: string;
    contacted: string;
    attempts: string;
    consultation: string;
    followUp: string;
    comments: string;
    pageNo: string;
    keepDelete: string;
    email: string;
    commodity: string;
    pipelineStatus: string;
}

