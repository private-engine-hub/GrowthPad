import { View, Pressable } from 'react-native';
import { Text, H3, Small } from './typography';
import { useRouter } from 'solito/navigation';
import { Layout, Users, Settings, Activity, Shield, ListTree } from 'lucide-react-native';
import { cn } from '../utils';

import { APP_ROUTES } from '../navigation/routes';

const navItems = [
    { href: APP_ROUTES.dashboard.path, icon: Layout, label: 'Workboard' },
    { href: APP_ROUTES.planner.path, icon: ListTree, label: 'Strategy Map' },
    { href: APP_ROUTES.playbooks.path, icon: Activity, label: 'Playbooks' },
    { href: APP_ROUTES.settings.path, icon: Settings, label: 'Settings' },
];

export function Sidebar({ className }: { className?: string }) {
    const { push } = useRouter();
    // Path detection would go here in a full app
    const currentPath = '/platform/workboard';

    return (
        <View className={cn("bg-slate-50 border-r border-slate-200 h-full p-6", className)}>
            <View className="mb-10">
                <H3 className="text-blue-600 font-extrabold tracking-tighter">GrowthPad</H3>
            </View>

            <View className="flex-1 gap-2">
                {navItems.map((item) => (
                    <Pressable
                        key={item.href}
                        onPress={() => push(item.href)}
                        className={cn(
                            "flex-row items-center gap-3 px-4 py-3 rounded-xl transition-all",
                            currentPath === item.href ? "bg-white shadow-sm shadow-blue-100" : "active:bg-slate-100"
                        )}
                    >
                        <item.icon
                            size={20}
                            color={currentPath === item.href ? "#2563eb" : "#64748b"}
                        />
                        <Text className={cn(
                            "font-semibold",
                            currentPath === item.href ? "text-blue-700" : "text-slate-500"
                        )}>
                            {item.label}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <View className="mt-auto border-t border-slate-200 pt-6">
                <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
                        <Text className="text-blue-700 font-bold">JD</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="font-bold text-slate-800 truncate" numberOfLines={1}>John Doe</Text>
                        <Small className="text-slate-500">Founder Account</Small>
                    </View>
                </View>
            </View>
        </View>
    );
}
