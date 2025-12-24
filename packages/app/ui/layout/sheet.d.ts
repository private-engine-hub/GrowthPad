import React from 'react';
interface SheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    snapPoints?: string[];
}
export declare function Sheet({ isOpen, onClose, children, title, snapPoints }: SheetProps): JSX.Element | null;
export {};
