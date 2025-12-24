import { jsx as _jsx } from "nativewind/jsx-runtime";
import { View, ScrollView, Platform } from 'react-native';
export function UniversalCanvas({ children }) {
    if (Platform.OS === 'web') {
        return (
        // md:h-[calc(100vh-64px)] accounts for a standard SaaS header height
        // overflow-hidden prevents the body from scrolling, enforcing inner-pillar scrolling
        _jsx(View, { className: "flex-1 w-full md:h-screen md:overflow-hidden bg-slate-50", style: { flexDirection: 'row' }, children: children }));
    }
    // Native: Horizontal Pager
    return (_jsx(ScrollView, { horizontal: true, pagingEnabled: true, showsHorizontalScrollIndicator: false, className: "flex-1 bg-slate-50", children: children }));
}
