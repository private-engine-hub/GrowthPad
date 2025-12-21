// packages/app/data.ts
// Single Source of Truth for the Strategic Workboard [MOCK DB]
import { L1_Pillar, L1_PillarId, L2_Theme, L3_Objective, L4_Phase, L5_Job, WorkboardState } from './types';

// --- MOCK DATA GENERATORS ---

const FINANCIAL_JOBS: L5_Job[] = [
    {
        id: 'job-1',
        title: 'Implement Net-45 Vendor Terms',
        status: 'in_progress',
        themeId: 'cash-flow',
        aiGeneratedAssets: true
    },
    {
        id: 'job-2',
        title: 'Audit Subscription Spend',
        status: 'todo',
        themeId: 'profitability',
        aiGeneratedAssets: false
    }
];

const OPS_JOBS: L5_Job[] = [
    {
        id: 'job-3',
        title: 'Implement "Stay Interviews"',
        status: 'todo',
        themeId: 'talent',
        aiGeneratedAssets: true
    }
];

const MARKET_JOBS: L5_Job[] = [
    {
        id: 'job-4',
        title: 'The Google Review QR Code Push',
        status: 'done',
        themeId: 'brand',
        aiGeneratedAssets: true
    },
    {
        id: 'job-5',
        title: 'Reactivate Dormant Leads',
        status: 'todo',
        themeId: 'sales',
        aiGeneratedAssets: true
    }
];

// --- HIERARCHY CONSTRUCTION ---

export const PILLARS: L1_Pillar[] = [
    {
        id: 'financial',
        title: 'Financial Health',
        description: 'Fuel - Cash, Margin, Profit',
        objectives: [
            {
                id: 'obj-1',
                title: 'Unlock Working Capital',
                status: 'active',
                phases: [
                    {
                        id: 'phase-1',
                        title: 'Diagnosis',
                        order: 1,
                        jobs: [FINANCIAL_JOBS[1]]
                    },
                    {
                        id: 'phase-2',
                        title: 'Execution',
                        order: 2,
                        jobs: [FINANCIAL_JOBS[0]]
                    }
                ]
            }
        ]
    },
    {
        id: 'operational',
        title: 'Operational Efficiency',
        description: 'The Machine - Efficiency, Quality, Speed',
        objectives: [
            {
                id: 'obj-2',
                title: 'Reduce Staff Churn',
                status: 'active',
                phases: [
                    {
                        id: 'phase-3',
                        title: 'Diagnosis',
                        order: 1,
                        jobs: [OPS_JOBS[0]]
                    }
                ]
            }
        ]
    },
    {
        id: 'market',
        title: 'Market Growth',
        description: 'The Context - Reputation, Share, Brand',
        objectives: [
            {
                id: 'obj-3',
                title: 'Boost Brand Reputation',
                status: 'active',
                phases: [
                    {
                        id: 'phase-4',
                        title: 'Execution',
                        order: 1,
                        jobs: [MARKET_JOBS[0]]
                    }
                ]
            },
            {
                id: 'obj-4',
                title: 'Reignite Pipeline',
                status: 'active',
                phases: [
                    {
                        id: 'phase-5',
                        title: 'Execution',
                        order: 1,
                        jobs: [MARKET_JOBS[1]]
                    }
                ]
            }
        ]
    }
];

export const WORKBOARD_STATE: WorkboardState = {
    pillars: PILLARS
};
