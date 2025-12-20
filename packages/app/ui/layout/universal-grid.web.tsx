import React from 'react';
import { Platform } from 'react-native';

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
export function UniversalGrid({ children, className }: UniversalGridProps) {
    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-start pb-12 ${className || ''}`}
            style={{
                display: 'grid',
                width: '100%',
            }}
        >
            {children}
        </div>
    );
}
