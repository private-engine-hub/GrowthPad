import { jsx as _jsx, jsxs as _jsxs } from "nativewind/jsx-runtime";
import { View, ScrollView } from 'react-native';
export function PillarColumn({ header, children }) {
    return (
    // md:w-1/3 forces the 3-column split on Web
    // w-screen ensures the paging works correctly on Native
    _jsx(View, { className: "w-screen md:w-1/3 md:h-full p-2", children: _jsxs(View, { className: "flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden", children: [header && (_jsx(View, { className: "z-10 bg-white", children: header })), _jsx(ScrollView, { className: "flex-1", contentContainerClassName: "p-4 gap-4", showsVerticalScrollIndicator: false, children: children })] }) }));
}
