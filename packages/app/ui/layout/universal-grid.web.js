import { jsx as _jsx } from "nativewind/jsx-runtime";
/**
 * UniversalGrid (Web Implementation)
 *
 * Renders a pure HTML <div> with CSS Grid.
 * Bypasses React Native Web layout engine completely for desktop layouts.
 */
export function UniversalGrid({ children, className }) {
    return (_jsx("div", { className: `grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-start pb-12 ${className || ''}`, style: {
            display: 'grid',
            width: '100%',
        }, children: children }));
}
