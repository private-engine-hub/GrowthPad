/// <reference types="react" />
import { type KanbanCard } from './board-card';
export declare function BoardColumn({ title, cards, }: {
    title: string;
    cards: KanbanCard[];
}): JSX.Element;
