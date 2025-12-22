// packages/app/data.ts
// Single Source of Truth for the Strategic Workboard [MOCK DB]
// Expanded with diverse SMB Strategies (SaaS, Trade, Agency, Retail)

import { L1_Pillar, L1_PillarId, L5_Job, WorkboardState } from './types';

// --- L5: JOBS (Actionable Tasks) ---

// 1. MARKET PILLAR JOBS
const JOB_M_SAAS = [
    { id: 'job-m1', title: 'Analyze cancellation reasons (Last 12 Mo)', status: 'done', themeId: 't-retention', aiGeneratedAssets: false },
    { id: 'job-m2', title: '✨ AI Insight: Top 3 Churn Correlations', status: 'in_progress', themeId: 't-retention', aiGeneratedAssets: true },
    { id: 'job-m3', title: '✨ AI Draft: "Win-Back" Email Sequence', status: 'todo', themeId: 't-retention', aiGeneratedAssets: true },
    { id: 'job-m4', title: 'Setup 14-day inactivity alerts', status: 'todo', themeId: 't-retention', aiGeneratedAssets: false },
] as L5_Job[];

const JOB_M_SEO = [
    { id: 'job-m5', title: 'Audit NAP consistency across 50 directories', status: 'in_progress', themeId: 't-acquisition', aiGeneratedAssets: false },
    { id: 'job-m6', title: 'Gather 20 new Google Reviews from past clients', status: 'todo', themeId: 't-acquisition', aiGeneratedAssets: false },
    { id: 'job-m7', title: '✨ AI Draft: 10 Location-Specific Landing Pages', status: 'todo', themeId: 't-acquisition', aiGeneratedAssets: true },
    { id: 'job-m8', title: 'Publish optimized Google My Business post', status: 'todo', themeId: 't-acquisition', aiGeneratedAssets: false },
] as L5_Job[];

// 2. OPERATIONAL PILLAR JOBS
const JOB_O_FIELD = [
    { id: 'job-o1', title: 'Analyze historical drive-time data', status: 'done', themeId: 't-throughput', aiGeneratedAssets: false },
    { id: 'job-o2', title: '✨ AI Model: Route Density Clusters', status: 'in_progress', themeId: 't-throughput', aiGeneratedAssets: true },
    { id: 'job-o3', title: 'Deploy mobile work order system', status: 'todo', themeId: 't-throughput', aiGeneratedAssets: false },
    { id: 'job-o4', title: 'Setup "On My Way" SMS triggers', status: 'todo', themeId: 't-throughput', aiGeneratedAssets: false },
] as L5_Job[];

const JOB_O_HR = [
    { id: 'job-o5', title: 'Document SOPs for Account Manager Role', status: 'in_progress', themeId: 't-talent', aiGeneratedAssets: false },
    { id: 'job-o6', title: 'Record Loom walkthroughs for CRM tools', status: 'done', themeId: 't-talent', aiGeneratedAssets: false },
    { id: 'job-o7', title: '✨ AI Create: Onboarding Quiz from SOPs', status: 'todo', themeId: 't-talent', aiGeneratedAssets: true },
    { id: 'job-o8', title: 'Automate Slack Day 1 Welcome Workflow', status: 'todo', themeId: 't-talent', aiGeneratedAssets: false },
] as L5_Job[];

// 3. FINANCIAL PILLAR JOBS
const JOB_F_AGENCY = [
    { id: 'job-f1', title: 'Export 12 months overhead transactions', status: 'done', themeId: 't-margin', aiGeneratedAssets: false },
    { id: 'job-f2', title: '✨ AI Audit: Flag duplicate SaaS seats', status: 'in_progress', themeId: 't-margin', aiGeneratedAssets: true },
    { id: 'job-f3', title: 'Draft Value-Based Contract Templates', status: 'todo', themeId: 't-margin', aiGeneratedAssets: false },
    { id: 'job-f4', title: '✨ AI Benchmark: Competitor Pricing Analysis', status: 'todo', themeId: 't-margin', aiGeneratedAssets: true },
] as L5_Job[];

const JOB_F_CASH = [
    { id: 'job-f5', title: 'Revise MSA Payment Terms (Net 15)', status: 'done', themeId: 't-cashflow', aiGeneratedAssets: false },
    { id: 'job-f6', title: '✨ AI Draft: Polite Late Payment Reminders', status: 'todo', themeId: 't-cashflow', aiGeneratedAssets: true },
    { id: 'job-f7', title: 'Migrate invoicing to Stripe Auto-Charge', status: 'in_progress', themeId: 't-cashflow', aiGeneratedAssets: false },
] as L5_Job[];

// --- L1-L4: HIERARCHY CONSTRUCTION ---

export const PILLARS: L1_Pillar[] = [
    {
        id: 'market',
        title: 'Market Growth',
        description: 'Context - Reputation, Share, and Brand',
        objectives: [
            {
                id: 'obj-churn',
                title: 'Reduce Gross Churn to < 2%',
                status: 'active',
                phases: [
                    { id: 'ph-churn-diag', title: 'Phase 1: Diagnosis', order: 1, jobs: [JOB_M_SAAS[0], JOB_M_SAAS[1]] },
                    { id: 'ph-churn-auto', title: 'Phase 2: Automation', order: 2, jobs: [JOB_M_SAAS[2], JOB_M_SAAS[3]] },
                ]
            },
            {
                id: 'obj-seo',
                title: 'Dominate Local Search (SEO)',
                status: 'active',
                phases: [
                    { id: 'ph-seo-audit', title: 'Phase 1: Cleanup', order: 1, jobs: [JOB_M_SEO[0], JOB_M_SEO[1]] },
                    { id: 'ph-seo-content', title: 'Phase 2: Expansion', order: 2, jobs: [JOB_M_SEO[2], JOB_M_SEO[3]] },
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
                id: 'obj-capacity',
                title: 'Increase Service Capacity 30%',
                status: 'active',
                phases: [
                    { id: 'ph-ops-route', title: 'Phase 1: Optimization', order: 1, jobs: [JOB_O_FIELD[0], JOB_O_FIELD[1]] },
                    { id: 'ph-ops-tech', title: 'Phase 2: Enablement', order: 2, jobs: [JOB_O_FIELD[2], JOB_O_FIELD[3]] },
                ]
            },
            {
                id: 'obj-onboard',
                title: 'Reduce Onboarding to 5 Days',
                status: 'active',
                phases: [
                    { id: 'ph-hr-std', title: 'Phase 1: Standardization', order: 1, jobs: [JOB_O_HR[0], JOB_O_HR[1]] },
                    { id: 'ph-hr-auto', title: 'Phase 2: Automation', order: 2, jobs: [JOB_O_HR[2], JOB_O_HR[3]] },
                ]
            }
        ]
    },
    {
        id: 'financial',
        title: 'Financial Health',
        description: 'Fuel - Cash, Margin, Profit',
        objectives: [
            {
                id: 'obj-profit',
                title: 'Reach 35% Net Margin',
                status: 'active',
                phases: [
                    { id: 'ph-fin-audit', title: 'Phase 1: Audit', order: 1, jobs: [JOB_F_AGENCY[0], JOB_F_AGENCY[1]] },
                    { id: 'ph-fin-price', title: 'Phase 2: Pricing', order: 2, jobs: [JOB_F_AGENCY[2], JOB_F_AGENCY[3]] },
                ]
            },
            {
                id: 'obj-cash',
                title: 'Reduce AR to 30 Days',
                status: 'active',
                phases: [
                    { id: 'ph-cash-pol', title: 'Phase 1: Policy', order: 1, jobs: [JOB_F_CASH[0], JOB_F_CASH[1]] },
                    { id: 'ph-cash-tool', title: 'Phase 2: Tooling', order: 2, jobs: [JOB_F_CASH[2]] },
                ]
            }
        ]
    }
];

export const WORKBOARD_STATE: WorkboardState = {
    pillars: PILLARS
};
