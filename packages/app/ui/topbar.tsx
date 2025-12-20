import { View, Pressable } from 'react-native';
import { Text } from './typography';
import { Bell, Search, Menu, User } from 'lucide-react-native';
import { cn } from '../utils';

export function Topbar({ onMenuClick, className }: { onMenuClick?: () => void, className?: string }) {
    return (
        <View className={cn("h-16 px-6 bg-white border-b border-slate-200 flex-row items-center justify-between", className)}>
            <View className="flex-row items-center gap-4">
                <Pressable onPress={onMenuClick} className="lg:hidden p-2">
                    <Menu size={24} color="#64748b" />
                </Pressable>
                <View className="hidden md:flex flex-row items-center gap-2">
                    <Text className="text-slate-400">Dashboard</Text>
                    <Text className="text-slate-300">/</Text>
                    <Text className="font-semibold text-slate-900">Workboard</Text>
                </View>
            </View>

            <View className="flex-row items-center gap-4">
                <View className="hidden sm:flex bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-64 flex-row items-center">
                    <Search size={16} color="#94a3b8" />
                    <Text className="text-slate-400 ml-2 text-sm">Quick Search...</Text>
                </View>

                <Pressable className="p-2 active:bg-slate-100 rounded-full">
                    <Bell size={20} color="#64748b" />
                </Pressable>

                <Pressable className="w-8 h-8 rounded-full bg-slate-200 items-center justify-center">
                    <User size={16} color="#64748b" />
                </Pressable>
            </View>
        </View>
    );
}
