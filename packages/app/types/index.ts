// 6-Layer Strategic Hierarchy (v4.0)
// Mission -> Move -> Objective -> Initiative -> Phase -> Job

// DIM: Pillar (Business Vertical)
export interface DIM_Pillar {
    id: 'financial' | 'operational' | 'market';
    title: string;
    description: string;
}

// DIM: Theme (Strategic Intent)
export interface DIM_Theme {
    id: string;
    title: string;
    color: string;
}

// L0: Mission
export interface L0_Mission {
    id: string;
    title: string;
    description?: string;
    status: 'active' | 'completed' | 'paused';
    moves: L1_Move[];
}

// L1: Move (Strategy/Tactic)
export interface L1_Move {
    id: string;
    title: string;
    description?: string;
    order: number;
    status: 'active' | 'completed' | 'paused';
    objectives: L2_Objective[];
}

// L2: Objective
export interface L2_Objective {
    id: string;
    title: string;
    status: 'active' | 'completed' | 'paused';
    pillarId?: string; // Link to DIM_Pillar
    themeId?: string;  // Link to DIM_Theme
    initiatives: L3_Initiative[];
}

// L3: Initiative
export interface L3_Initiative {
    id: string;
    title: string;
    description?: string;
    order: number;
    status: 'active' | 'completed' | 'paused';
    phases: L4_Phase[];
}

// L4: Phase
export interface L4_Phase {
    id: string;
    title: string;
    order: number;
    jobs: L5_Job[];
}

// L5: Job
export interface L5_Job {
    id: string;
    title: string;
    status: 'todo' | 'in_progress' | 'review' | 'done';
    aiGeneratedAssets?: boolean;
}

// The Unified Workboard State
export interface WorkboardState {
    missions: L0_Mission[];
    pillars?: DIM_Pillar[]; // Optional lookups
    themes?: DIM_Theme[];   // Optional lookups
}
