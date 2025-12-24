import { jsx as _jsx } from "nativewind/jsx-runtime";
import { View, Platform } from 'react-native';
import { cn } from '../../utils';
export function Surface({ className, children, ...props }) {
    if (Platform.OS === 'web') {
        const isGrid = className?.includes('grid');
        return (
        // @ts-ignore - div is valid in React Native Web contexts
        _jsx("div", { className: cn(isGrid ? "grid" : "flex flex-col", "relative", className), ...props, children: children }));
    }
    return (_jsx(View, { className: cn("flex-1", className), ...props, children: children }));
}
