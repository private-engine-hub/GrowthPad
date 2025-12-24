import React from 'react';
interface UniversalGridProps {
    children: React.ReactNode;
    className?: string;
}
/**
 * UniversalGrid (Web Implementation)
 *
 * Renders a pure HTML <div> with CSS Grid.
 * Bypasses React Native Web layout engine completely for desktop layouts.
 */
export declare function UniversalGrid({ children, className }: UniversalGridProps): JSX.Element;
export {};
