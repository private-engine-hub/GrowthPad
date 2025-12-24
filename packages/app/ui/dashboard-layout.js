import { jsx as _jsx, jsxs as _jsxs } from "nativewind/jsx-runtime";
import { View, Pressable } from 'react-native';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { useState } from 'react';
export function DashboardLayout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (_jsxs(View, { className: "flex-1 flex-row bg-white h-screen w-full", children: [_jsx(Sidebar, { className: "hidden md:flex w-64 shrink-0" }), _jsxs(View, { className: "flex-1 min-w-0 flex-col h-full", children: [_jsx(Topbar, { onMenuClick: () => setIsMenuOpen(!isMenuOpen) }), _jsx(View, { className: "flex-1 bg-slate-50 overflow-auto", children: children })] }), isMenuOpen && (_jsxs(View, { className: "absolute inset-0 z-50 flex-row md:hidden", children: [_jsx(Sidebar, { className: "flex w-64 shadow-2xl h-full bg-white" }), _jsx(Pressable, { onPress: () => setIsMenuOpen(false), className: "flex-1 bg-black/40" })] }))] }));
}
