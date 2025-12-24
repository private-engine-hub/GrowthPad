export type KanbanCard = {
    id: string;
    title: string;
    tag: string;
};
export type KanbanColumn = {
    id: string;
    title: string;
    cards: KanbanCard[];
};
export declare const MOCK_BOARD: KanbanColumn[];
