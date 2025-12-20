// packages/app/data.ts
// Single Source of Truth for the Strategic Workboard [MOCK DB]

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

export const PILLARS: Pillar[] = [
    { id: 'financial', title: 'Financial', description: 'Fuel - Cash, Margin, Profit' },
    { id: 'operational', title: 'Operational', description: 'The Machine - Efficiency, Quality, Speed' },
    { id: 'market', title: 'Market', description: 'The Context - Reputation, Share, Brand' },
];

export const THEMES: Theme[] = [
    { id: 'cash-flow', title: 'Cash Flow Management', pillarId: 'financial', order: 1 },
    { id: 'profitability', title: 'Profitability Optimization', pillarId: 'financial', order: 2 },
    { id: 'talent', title: 'Talent & Culture', pillarId: 'operational', order: 1 },
    { id: 'brand', title: 'Brand & Reputation', pillarId: 'market', order: 1 },
    { id: 'sales', title: 'Sales Performance', pillarId: 'market', order: 2 },
];

export const MOCK_OBJECTIVES: Objective[] = [
    {
        id: 'obj-1',
        title: 'Unlock Working Capital',
        pillarId: 'financial',
        themeId: 'cash-flow',
        jobs: [
            {
                id: 'job-1',
                title: 'Implement Net-45 Vendor Terms',
                status: 'in_progress',
                whyNow: 'Cash conversion cycle is lagging.',
                valueEst: '+$15k/mo',
                steps: [
                    'Identify top 5 vendors by spend volume.',
                    'Review current contracts for renegotiation clauses.',
                    'Draft request letter citing 2-year payment history.'
                ],
                checklist: [
                    'Vendor list exported',
                    'Payment history compiled',
                    'Letter sent to key contacts'
                ],
                resourceType: 'email',
                phase: 'Execution'
            },
            {
                id: 'job-2',
                title: 'Audit Subscription Spend',
                status: 'todo',
                whyNow: 'OpEx creep detected.',
                valueEst: '+$2k/mo',
                steps: [
                    'Export last 3 months of credit card statements.',
                    'Highlight all recurring software charges.',
                    'Flag duplicates or unused seats.'
                ],
                checklist: [
                    'Statements exported',
                    'Unused tools canceled',
                    'Downgraded non-critical seats'
                ],
                resourceType: 'spreadsheet',
                phase: 'Diagnosis'
            },
        ],
    },
    {
        id: 'obj-2',
        title: 'Reduce Staff Churn',
        pillarId: 'operational',
        themeId: 'talent',
        jobs: [
            {
                id: 'job-3',
                title: 'Implement "Stay Interviews"',
                status: 'todo',
                whyNow: 'Q4 attrition risk high.',
                valueEst: 'Retention',
                steps: [
                    'Schedule 1:1s with key high-performers.',
                    'Ask: "What would make you leave?"',
                    'Action one quick-win feedback item immediately.'
                ],
                checklist: [
                    'Meetings scheduled',
                    'Feedback documented',
                    'Quick-win implemented'
                ],
                resourceType: 'script',
                phase: 'Diagnosis'
            },
        ],
    },
    {
        id: 'obj-3',
        title: 'Boost Google Reputation',
        pillarId: 'market',
        themeId: 'brand',
        jobs: [
            {
                id: 'job-4',
                title: 'The Google Review QR Code Push',
                status: 'done',
                whyNow: 'Competitor X has more reviews.',
                valueEst: '+10 Leads/mo',
                steps: [
                    'Generate deep link to Google Review form.',
                    'Create QR code using free tool.',
                    'Print cards for front desk / invoices.'
                ],
                checklist: [
                    'Link generated',
                    'QR Code tested',
                    'Cards printed'
                ],
                resourceType: 'document',
                phase: 'Execution'
            },
        ],
    },
    {
        id: 'obj-4',
        title: 'Reactivate Dormant Leads',
        pillarId: 'market',
        themeId: 'sales',
        jobs: [
            {
                id: 'job-5',
                title: 'Reactivate Dormant Leads',
                status: 'todo',
                whyNow: 'Pipeline is thin for Q1.',
                valueEst: '+$20k Revenue',
                steps: [
                    'Filter CRM for leads > 6 months old.',
                    'Draft "Are you still looking?" 9-word email.',
                    'Send in batches of 50.'
                ],
                checklist: [
                    'List exported',
                    'Email drafted',
                    'Campaign launched'
                ],
                resourceType: 'email',
                phase: 'Execution'
            }
        ]
    }
];
