import { View, Pressable } from 'react-native';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { useState } from 'react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <View className="flex-1 flex-row bg-white h-screen w-full">
            {/* 
              COLUMN 1: Desktop Sidebar
              - Fixed width (w-64 = 256px)
              - Hidden on mobile (hidden md:flex)
            */}
            <Sidebar className="hidden md:flex w-64 shrink-0" />

            {/* 
              COLUMN 2: Main Canvas/Workspace
              - Takes remaining space (flex-1)
              - Contains Topbar + Content Area
            */}
            <View className="flex-1 min-w-0 flex-col h-full">
                <Topbar onMenuClick={() => setIsMenuOpen(!isMenuOpen)} />

                {/* Workspace/Canvas Area */}
                <View className="flex-1 bg-slate-50 overflow-auto">
                    {children}
                </View>
            </View>

            {/* 
              COLUMN 3: (Optional) Detail Panel
              - Can be added here for job details, AI chat, etc.
              - Example: <DetailPanel className="hidden lg:flex w-80 shrink-0" />
            */}

            {/* Mobile Sidebar Overlay (Drawer) */}
            {isMenuOpen && (
                <View className="absolute inset-0 z-50 flex-row md:hidden">
                    <Sidebar className="flex w-64 shadow-2xl h-full bg-white" />
                    <Pressable
                        onPress={() => setIsMenuOpen(false)}
                        className="flex-1 bg-black/40"
                    />
                </View>
            )}
        </View>
    );
}
