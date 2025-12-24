import { jsx as _jsx, jsxs as _jsxs } from "nativewind/jsx-runtime";
import { View, ScrollView } from 'react-native';
import { Text, H3 } from 'app/ui/typography';
import { BoardCard } from './board-card';
export function BoardColumn({ title, cards, }) {
    return (_jsxs(View, { className: "w-80 h-full bg-slate-50/50 border-r border-slate-200/60 p-4 flex-col gap-4", children: [_jsxs(View, { className: "flex-row items-center justify-between pb-2 border-b border-slate-200/50", children: [_jsx(H3, { className: "text-base font-bold text-slate-800", children: title }), _jsx(View, { className: "bg-slate-200 rounded-full px-2 py-0.5", children: _jsx(Text, { className: "text-xs font-bold text-slate-600", children: cards.length }) })] }), _jsxs(ScrollView, { className: "flex-1", contentContainerStyle: { gap: 12, paddingBottom: 24 }, showsVerticalScrollIndicator: false, children: [cards.map((card) => (_jsx(BoardCard, { ...card }, card.id))), _jsx(View, { className: "border-2 border-dashed border-slate-200 rounded-xl p-3 items-center justify-center mt-2", children: _jsx(Text, { className: "text-slate-400 font-medium text-sm", children: "+ Add Item" }) })] })] }));
}
