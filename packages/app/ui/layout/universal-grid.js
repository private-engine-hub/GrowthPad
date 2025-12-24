import { jsx as _jsx } from "nativewind/jsx-runtime";
import { View, ScrollView } from 'react-native';
/**
 * UniversalGrid: A definitive solution for Columnar Layouts.
 *
 * WEB: Renders a pure HTML <div> with CSS Grid. Bypasses React Native Web layout engine.
 * NATIVE: Renders a ScrollView (horizontal pager) or Stack, optimized for touch.
 */
export function UniversalGrid({ children, className }) {
    // -------------------------------------------------------------------------
    // NATIVE IMPLEMENTATION: SCROLLVIEW / STACK
    // -------------------------------------------------------------------------
    return (_jsx(ScrollView, { className: `flex-1 ${className || ''}`, contentContainerStyle: { paddingBottom: 48 }, showsVerticalScrollIndicator: false, children: _jsx(View, { className: "flex-col gap-6", children: children }) }));
}
