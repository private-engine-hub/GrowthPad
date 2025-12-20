export type KanbanCard = {
    id: string
    title: string
    tag: string
}

export type KanbanColumn = {
    id: string
    title: string
    cards: KanbanCard[]
}

export const MOCK_BOARD: KanbanColumn[] = [
    {
        id: 'financial',
        title: 'Financial Health',
        cards: [
            { id: '1', title: 'Review Q4 Budget', tag: 'Finance' },
            { id: '2', title: 'Optimize AWS Spend', tag: 'Ops' },
        ],
    },
    {
        id: 'operational',
        title: 'Operational Efficiency',
        cards: [
            { id: '3', title: 'Streamline Onboarding', tag: 'HR' },
            { id: '4', title: 'Update Notion Docs', tag: 'Admin' },
            { id: '5', title: 'Quarterly Team Sync', tag: 'General' },
        ],
    },
    {
        id: 'market',
        title: 'Market Growth',
        cards: [
            { id: '6', title: 'Launch SEO Campaign', tag: 'Marketing' },
            { id: '7', title: 'Competitor Analysis', tag: 'Strategy' },
        ],
    },
]
