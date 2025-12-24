export interface DIM_Pillar {
    id: 'financial' | 'operational' | 'market';
    title: string;
    description: string;
}
export interface DIM_Theme {
    id: string;
    title: string;
    color: string;
}
export interface L0_Mission {
    id: string;
    title: string;
    description?: string;
    status: 'active' | 'completed' | 'paused';
    moves: L1_Move[];
}
export interface L1_Move {
    id: string;
    title: string;
    description?: string;
    order: number;
    status: 'active' | 'completed' | 'paused';
    objectives: L2_Objective[];
}
export interface L2_Objective {
    id: string;
    title: string;
    status: 'active' | 'completed' | 'paused';
    pillarId?: string;
    themeId?: string;
    initiatives: L3_Initiative[];
}
export interface L3_Initiative {
    id: string;
    title: string;
    description?: string;
    order: number;
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
    aiGeneratedAssets?: boolean;
}
export interface WorkboardState {
    missions: L0_Mission[];
    pillars?: DIM_Pillar[];
    themes?: DIM_Theme[];
}
