import { jsx as _jsx, jsxs as _jsxs } from "nativewind/jsx-runtime";
import { View } from 'react-native';
import { Text } from 'app/ui/typography';
export function BoardCard({ title, tag }) {
    return (_jsxs(View, { className: "bg-white p-4 rounded-xl border border-slate-200 shadow-sm active:bg-blue-50", children: [_jsx(View, { className: "flex-row items-start justify-between gap-2", children: _jsx(Text, { className: "text-slate-900 font-medium flex-1 leading-snug", children: title }) }), _jsx(View, { className: "mt-3 flex-row", children: _jsx(View, { className: "bg-slate-100 px-2 py-1 rounded text-xs", children: _jsx(Text, { className: "text-xs text-slate-500 font-medium", children: tag }) }) })] }));
}
