'use client'

import { useState } from "react"
import { LucideIcon, LayoutDashboard, BarChart3, Settings, HelpCircle, Layers, Zap, Search, Star, Share2, Plus, ChevronLeft, ChevronRight, ListTree, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { AppLink } from "../navigation/AppLink"
import { APP_ROUTES, RouteKey } from "app/navigation/routes"

interface DashboardShellProps {
    children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div className="flex h-screen w-full bg-background">
            {/* Sidebar (Collapsible) - Trello Blue */}
            <aside
                className={cn(
                    "bg-trello-blue text-white hidden md:flex flex-col relative transition-all duration-300 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.4)] z-20",
                    isCollapsed ? "w-20" : "w-72"
                )}
            >
                {/* Toggle Button - Now Overflow Safe */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-6 bg-trello-blue border border-white/20 text-white p-1 rounded-full shadow-md z-30 hover:bg-blue-700 transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                {/* Header / Brand */}
                <div className="h-14 flex items-center px-4 border-b border-white/10 shrink-0">
                    <div className={cn("flex items-center gap-2 overflow-hidden transition-all", isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
                        <div className="p-1.5 bg-white/10 rounded-lg">
                            <Zap className="text-trello-yellow fill-trello-yellow transform -rotate-12" size={20} />
                        </div>
                        <span className="font-bold text-lg tracking-tight whitespace-nowrap">GrowthPad</span>
                    </div>
                    {isCollapsed && (
                        <div className="mx-auto">
                            <Zap className="text-trello-yellow fill-trello-yellow" size={24} />
                        </div>
                    )}
                </div>

                {/* Search Area */}
                <div className={cn("p-4 transition-all duration-300", isCollapsed ? "px-2" : "px-4")}>
                    <div className={cn(
                        "bg-white/10 rounded-md flex items-center transition-all group hover:bg-white/20 border border-transparent hover:border-white/10 focus-within:bg-white focus-within:text-slate-900 overflow-hidden",
                        isCollapsed ? "justify-center h-10 w-10 mx-auto cursor-pointer" : "h-9 px-3"
                    )}>
                        <Search size={16} className={cn("shrink-0", isCollapsed ? "text-white" : "text-blue-100 group-focus-within:text-slate-500 mr-2")} />
                        {!isCollapsed && (
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none text-sm placeholder:text-blue-200/70 text-white focus:text-slate-900 w-full"
                            />
                        )}
                    </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-2 px-2 custom-scrollbar">
                    <div className="space-y-1 mb-6">
                        <NavItem icon={Home} label="Home" route="home" isCollapsed={isCollapsed} />
                        <NavItem icon={LayoutDashboard} label="Workboard" route="dashboard" isCollapsed={isCollapsed} />
                        <NavItem icon={ListTree} label="Strategy Map" route="planner" isCollapsed={isCollapsed} />
                        <NavItem icon={Layers} label="Playbooks" route="playbooks" isCollapsed={isCollapsed} />
                        <NavItem icon={BarChart3} label="Analytics" route="analytics" isCollapsed={isCollapsed} />
                    </div>

                    {!isCollapsed && (
                        <>
                            <div className="px-4 py-2 text-xs font-bold text-blue-200/60 uppercase tracking-wider">
                                System
                            </div>
                            <div className="space-y-1 mb-6">
                                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-50/80 rounded-md hover:bg-white/10 hover:text-white transition-colors">
                                    <Settings size={18} />
                                    <span>Settings</span>
                                </Link>
                                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-50/80 rounded-md hover:bg-white/10 hover:text-white transition-colors">
                                    <HelpCircle size={18} />
                                    <span>Support</span>
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer / Profile */}
                <div className="p-3 bg-black/10 shrink-0">
                    {!isCollapsed ? (
                        <PremiumCard />
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">
                                <Star className="h-4 w-4 text-trello-yellow fill-trello-yellow" />
                            </div>
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white/20" />
                        </div>
                    )}

                    {!isCollapsed && (
                        <div className="mt-3 flex items-center gap-3 px-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white/20 shrink-0" />
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-bold truncate">Cameron W.</span>
                                <span className="text-xs text-blue-200 truncate">Growth Owner</span>
                            </div>
                            <button className="ml-auto text-blue-200 hover:text-white">
                                <Settings size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-trello-gray relative">
                {/* Top Header / Control Strip */}
                <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded bg-gradient-to-br from-trello-blue to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                            G
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <h1 className="text-sm font-bold text-slate-800">Growth Strategy 2025</h1>
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wide border border-slate-200">
                                    Public
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                <span>Updated 2m ago</span>
                                <span>•</span>
                                <span className="text-trello-green flex items-center gap-1">
                                    <Zap size={10} className="fill-trello-green" /> All Systems Nominal
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Zone 2: Navigation Tabs */}
                    <div className="hidden lg:flex items-center gap-1 h-full">
                        <TabItem label="Board" active />
                        <TabItem label="Timeline" count={4} />
                        <TabItem label="Calendar" />
                        <TabItem label="Dashboard" />
                    </div>

                    {/* Zone 3: Global Actions */}
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-7 w-7 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                    U{i}
                                </div>
                            ))}
                            <button className="h-7 w-7 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors">
                                <Plus size={14} />
                            </button>
                        </div>
                        <div className="h-4 w-px bg-slate-300 mx-2" />
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded text-xs font-bold transition-colors">
                            <Share2 size={14} />
                            Share
                        </button>
                        <button className="bg-trello-blue hover:bg-blue-700 text-white px-4 py-1.5 rounded text-xs font-bold shadow-sm transition-all flex items-center gap-2">
                            <Zap size={14} className="fill-white" />
                            Run Simulation
                        </button>
                    </div>
                </header>

                {/* Content Canvas */}
                <div className="flex-1 overflow-hidden relative p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}

function SidebarBrand({ isCollapsed }: { isCollapsed: boolean }) {
    return (
        <div className="h-14 flex items-center px-4 border-b border-white/10 shrink-0">
            <div className={cn("flex items-center gap-2 overflow-hidden transition-all", isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
                <div className="p-1.5 bg-white/10 rounded-lg">
                    <Zap className="text-trello-yellow fill-trello-yellow transform -rotate-12" size={20} />
                </div>
                <span className="font-bold text-lg tracking-tight whitespace-nowrap">GrowthPad</span>
            </div>
            {isCollapsed && (
                <div className="mx-auto">
                    <Zap className="text-trello-yellow fill-trello-yellow" size={24} />
                </div>
            )}
        </div>
    )
}

function PremiumCard() {
    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-blue-600/20 border border-white/10 p-4 mb-2 group cursor-pointer hover:border-white/20 transition-all animate-in fade-in zoom-in-95 duration-300">
            <div className="absolute -right-2 -top-2 h-16 w-16 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />
            <div className="flex items-center justify-between relative z-10">
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-white">Go Pro</span>
                    <span className="text-xs text-blue-100/80">Unlock Strategy AI</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Star className="h-4 w-4 text-trello-yellow fill-trello-yellow" />
                </div>
            </div>
        </div>
    )
}

function NavItem({ icon: Icon, label, route, isCollapsed }: { icon: LucideIcon, label: string, route: RouteKey, isCollapsed?: boolean }) {
    return (
        <AppLink
            route={route}
            className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 group h-10 text-blue-50/80 hover:bg-white/10 hover:text-white"
            )}
            activeClassName="bg-white/20 text-white shadow-sm"
            title={isCollapsed ? label : undefined}
        >
            <Icon size={18} className={cn("shrink-0", isCollapsed && "group-hover:scale-110 transition-transform")} />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden animate-in fade-in duration-200">{label}</span>}
        </AppLink>
    )
}

// Main Content Area
// Added 'gap-0' to remove spacing between header and content, but keeping 'bg-trello-gray'
// The gap issue mentioned by the user is likely about the content area needing some padding from the sidebar if it looks too flush.
// But technically, the sidebar and content are flex siblings.
// I'll add 'p-4' to the Content Canvas for breathing room if the user wants "gap spacing vs sidebar" for the inner workboard.
// Or if they mean the header/sidebar, that's already handled by flex.
// Based on "inner workboard canvas is doesnt have a gap spacing vs sidebar", I will ensure the content container has padding.

function TabItem({ label, active, count }: { label: string, active?: boolean, count?: number }) {
    return (
        <button className={cn(
            "relative px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2",
            active
                ? "bg-blue-50 text-trello-blue shadow-sm ring-1 ring-blue-100"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        )}>
            {label}
            {count && (
                <span className={cn(
                    "ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold",
                    active ? "bg-white text-trello-blue" : "bg-slate-200 text-slate-600"
                )}>
                    {count}
                </span>
            )}
        </button>
    )
}
