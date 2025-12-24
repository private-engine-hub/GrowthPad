import { jsx as _jsx, jsxs as _jsxs } from "nativewind/jsx-runtime";
import { View, Pressable } from 'react-native';
import { Text } from './typography';
import { Bell, Search, Menu, User } from 'lucide-react-native';
import { cn } from '../utils';
export function Topbar({ onMenuClick, className }) {
    return (_jsxs(View, { className: cn("h-16 px-6 bg-white border-b border-slate-200 flex-row items-center justify-between", className), children: [_jsxs(View, { className: "flex-row items-center gap-4", children: [_jsx(Pressable, { onPress: onMenuClick, className: "lg:hidden p-2", children: _jsx(Menu, { size: 24, color: "#64748b" }) }), _jsxs(View, { className: "hidden md:flex flex-row items-center gap-2", children: [_jsx(Text, { className: "text-slate-400", children: "Dashboard" }), _jsx(Text, { className: "text-slate-300", children: "/" }), _jsx(Text, { className: "font-semibold text-slate-900", children: "Workboard" })] })] }), _jsxs(View, { className: "flex-row items-center gap-4", children: [_jsxs(View, { className: "hidden sm:flex bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-64 flex-row items-center", children: [_jsx(Search, { size: 16, color: "#94a3b8" }), _jsx(Text, { className: "text-slate-400 ml-2 text-sm", children: "Quick Search..." })] }), _jsx(Pressable, { className: "p-2 active:bg-slate-100 rounded-full", children: _jsx(Bell, { size: 20, color: "#64748b" }) }), _jsx(Pressable, { className: "w-8 h-8 rounded-full bg-slate-200 items-center justify-center", children: _jsx(User, { size: 16, color: "#64748b" }) })] })] }));
}
