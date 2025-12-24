/// <reference types="react" />
export type KanbanCard = {
    id: string;
    title: string;
    tag: string;
};
export declare function BoardCard({ title, tag }: {
    title: string;
    tag: string;
}): JSX.Element;
