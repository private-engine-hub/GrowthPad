import React from 'react';
interface UniversalGridProps {
    children: React.ReactNode;
    className?: string;
}
/**
 * UniversalGrid: A definitive solution for Columnar Layouts.
 *
 * WEB: Renders a pure HTML <div> with CSS Grid. Bypasses React Native Web layout engine.
 * NATIVE: Renders a ScrollView (horizontal pager) or Stack, optimized for touch.
 */
export declare function UniversalGrid({ children, className }: UniversalGridProps): JSX.Element;
export {};
