import React from 'react';
import { View, ScrollView, Platform, StyleSheet } from 'react-native';

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
export function UniversalGrid({ children, className }: UniversalGridProps) {
    // -------------------------------------------------------------------------
    // NATIVE IMPLEMENTATION: SCROLLVIEW / STACK
    // -------------------------------------------------------------------------
    return (
        <ScrollView
            className={`flex-1 ${className || ''}`}
            contentContainerStyle={{ paddingBottom: 48 }}
            showsVerticalScrollIndicator={false}
        >
            <View className="flex-col gap-6">
                {children}
            </View>
        </ScrollView>
    );
}
