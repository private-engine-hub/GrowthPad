export type JobStatus = 'todo' | 'in_progress' | 'done';
export interface Job {
    id: string;
    title: string;
    description?: string;
    status: JobStatus;
    whyNow: string;
    valueEst: string;
    steps: string[];
    checklist: string[];
    resourceType: 'email' | 'document' | 'spreadsheet' | 'script';
    phase: string;
}
export interface Objective {
    id: string;
    title: string;
    pillarId: string;
    themeId: string;
    jobs: Job[];
}
export interface Theme {
    id: string;
    title: string;
    pillarId: string;
    order: number;
}
export interface Pillar {
    id: string;
    title: string;
    description: string;
}
export declare const PILLARS: Pillar[];
export declare const THEMES: Theme[];
export declare const MOCK_OBJECTIVES: Objective[];
