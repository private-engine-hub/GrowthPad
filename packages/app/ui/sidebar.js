import { jsx as _jsx, jsxs as _jsxs } from "nativewind/jsx-runtime";
import { View, Pressable } from 'react-native';
import { Text, H3, Small } from './typography';
import { useRouter } from 'solito/navigation';
import { Layout, Settings, Activity, ListTree } from 'lucide-react-native';
import { cn } from '../utils';
import { APP_ROUTES } from '../navigation/routes';
const navItems = [
    { href: APP_ROUTES.dashboard.path, icon: Layout, label: 'Workboard' },
    { href: APP_ROUTES.planner.path, icon: ListTree, label: 'Strategy Map' },
    { href: APP_ROUTES.playbooks.path, icon: Activity, label: 'Playbooks' },
    { href: APP_ROUTES.settings.path, icon: Settings, label: 'Settings' },
];
export function Sidebar({ className }) {
    const { push } = useRouter();
    // Path detection would go here in a full app
    const currentPath = '/platform/workboard';
    return (_jsxs(View, { className: cn("bg-slate-50 border-r border-slate-200 h-full p-6", className), children: [_jsx(View, { className: "mb-10", children: _jsx(H3, { className: "text-blue-600 font-extrabold tracking-tighter", children: "GrowthPad" }) }), _jsx(View, { className: "flex-1 gap-2", children: navItems.map((item) => (_jsxs(Pressable, { onPress: () => push(item.href), className: cn("flex-row items-center gap-3 px-4 py-3 rounded-xl transition-all", currentPath === item.href ? "bg-white shadow-sm shadow-blue-100" : "active:bg-slate-100"), children: [_jsx(item.icon, { size: 20, color: currentPath === item.href ? "#2563eb" : "#64748b" }), _jsx(Text, { className: cn("font-semibold", currentPath === item.href ? "text-blue-700" : "text-slate-500"), children: item.label })] }, item.href))) }), _jsx(View, { className: "mt-auto border-t border-slate-200 pt-6", children: _jsxs(View, { className: "flex-row items-center gap-3", children: [_jsx(View, { className: "w-10 h-10 rounded-full bg-blue-100 items-center justify-center", children: _jsx(Text, { className: "text-blue-700 font-bold", children: "JD" }) }), _jsxs(View, { className: "flex-1", children: [_jsx(Text, { className: "font-bold text-slate-800 truncate", numberOfLines: 1, children: "John Doe" }), _jsx(Small, { className: "text-slate-500", children: "Founder Account" })] })] }) })] }));
}
