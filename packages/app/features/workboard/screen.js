import { jsx as _jsx, jsxs as _jsxs } from "nativewind/jsx-runtime";
import { ScrollView, View } from 'react-native';
import { Text, H1, H3, Small } from '../../ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { PILLARS, THEMES, MOCK_OBJECTIVES } from '../../data';
import { cn } from '../../utils';
import { useState } from 'react';
export function WorkboardScreen() {
    return (_jsxs(ScrollView, { className: "flex-1 bg-slate-50 p-4", children: [_jsxs(View, { className: "mb-6", children: [_jsx(H1, { className: "text-slate-900", children: "Growth Workboard" }), _jsx(Text, { className: "text-slate-500", children: "Unified Strategic Command Center" })] }), _jsx(View, { className: "gap-6 pb-12", children: PILLARS.map((pillar) => (_jsxs(View, { className: "gap-4", children: [_jsxs(View, { className: "rounded-lg bg-[#0052cc] p-3 shadow-sm", children: [_jsx(H3, { className: "text-white", children: pillar.title }), _jsx(Small, { className: "text-blue-100", children: pillar.description })] }), THEMES.filter((t) => t.pillarId === pillar.id).map((theme) => {
                            const themeObjectives = MOCK_OBJECTIVES.filter((o) => o.themeId === theme.id);
                            if (themeObjectives.length === 0)
                                return null;
                            return (_jsxs(Card, { className: "border-l-4 border-l-blue-500", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-lg text-slate-700", children: theme.title }) }), _jsx(CardContent, { children: _jsx(Accordion, { className: "gap-2", children: themeObjectives.map((objective) => (_jsx(ObjectiveItem, { objective: objective }, objective.id))) }) })] }, theme.id));
                        })] }, pillar.id))) })] }));
}
function ObjectiveItem({ objective }) {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs(AccordionItem, { className: "border-none", children: [_jsx(AccordionTrigger, { isOpen: isOpen, onClick: () => setIsOpen(!isOpen), children: _jsx(Text, { className: "font-semibold text-slate-800", children: objective.title }) }), _jsx(AccordionContent, { isOpen: isOpen, children: _jsx(View, { className: "gap-3 pt-2", children: objective.jobs.map((job) => (_jsx(JobCard, { job: job }, job.id))) }) })] }));
}
function JobCard({ job }) {
    return (_jsxs(View, { className: "rounded-md border border-slate-200 bg-white p-3 shadow-sm", children: [_jsxs(View, { className: "flex-row justify-between", children: [_jsx(Text, { className: "font-medium text-slate-900", children: job.title }), _jsx(StatusBadge, { status: job.status })] }), _jsx(Small, { className: "mt-1 text-slate-500", children: job.valueEst }), _jsxs(View, { className: "mt-2 bg-slate-100 p-2 rounded", children: [_jsx(Small, { className: "text-slate-600 font-medium", children: "Next Step:" }), _jsx(Text, { className: "text-xs text-slate-500", children: job.steps[0] })] })] }));
}
function StatusBadge({ status }) {
    const colors = {
        todo: 'bg-slate-100 text-slate-600',
        in_progress: 'bg-blue-100 text-blue-700',
        done: 'bg-green-100 text-green-700',
    };
    // We can't put text classes on View, so we split or just use View styles
    // Simpler: Just styled View + Text
    const bgColors = {
        todo: 'bg-slate-100',
        in_progress: 'bg-blue-100',
        done: 'bg-green-100',
    };
    const textColors = {
        todo: 'text-slate-600',
        in_progress: 'text-blue-700',
        done: 'text-green-700',
    };
    return (_jsx(View, { className: cn("rounded-full px-2 py-0.5", bgColors[status]), children: _jsx(Text, { className: cn("text-xs font-medium", textColors[status]), children: status.replace('_', ' ') }) }));
}
