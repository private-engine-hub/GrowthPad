'use client';
import { jsx as _jsx, jsxs as _jsxs } from "nativewind/jsx-runtime";
import { ScrollView, View } from 'react-native';
import { BoardColumn } from './board-column';
import { MOCK_BOARD } from './data';
import { H1, Text } from 'app/ui/typography';
export function BoardScreen() {
    return (_jsxs(View, { className: "flex-1 bg-white h-screen", children: [_jsxs(View, { className: "px-6 py-4 border-b border-slate-100 flex-row items-center justify-between z-10 bg-white/90 blur-lg backdrop-blur shadow-sm", children: [_jsxs(View, { children: [_jsx(H1, { className: "text-xl md:text-2xl font-black text-slate-900 tracking-tight", children: "GrowthPad" }), _jsx(Text, { className: "text-slate-500 text-sm hidden md:flex", children: "Strategic Playbook Canvas" })] }), _jsx(View, { className: "flex-row gap-3", children: _jsx(View, { className: "h-8 w-8 rounded-full bg-blue-500 justify-center items-center", children: _jsx(Text, { className: "text-white font-bold text-xs", children: "CM" }) }) })] }), _jsxs(ScrollView, { horizontal: true, className: "flex-1 bg-slate-50", contentContainerStyle: { padding: 0 }, showsHorizontalScrollIndicator: true, children: [MOCK_BOARD.map((col) => (_jsx(BoardColumn, { title: col.title, cards: col.cards }, col.id))), _jsx(View, { className: "w-6" })] })] }));
}
