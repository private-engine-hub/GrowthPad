
export type L1_PillarId = 'financial' | 'operational' | 'market';

export interface L1_Pillar {
    id: L1_PillarId;
    title: string;
    description: string;
    objectives: L3_Objective[]; // L2 Themes are often implicit or tags on logical groups
}

export interface L2_Theme {
    id: string;
    title: string;
    color: string;
}

export interface L3_Objective {
    id: string;
    title: string;
    status: 'active' | 'completed' | 'paused';
    phases: L4_Phase[];
}

export interface L4_Phase {
    id: string;
    title: string;
    order: number;
    jobs: L5_Job[];
}

export interface L5_Job {
    id: string;
    title: string;
    status: 'todo' | 'in_progress' | 'review' | 'done';
    themeId?: string; // Link to L2
    aiGeneratedAssets?: boolean;
}

// The Unified Workboard State
export interface WorkboardState {
    pillars: L1_Pillar[];
}
