'use client'

import { useState } from "react"
import { LucideIcon, LayoutDashboard, BarChart3, Settings, HelpCircle, Layers, Zap, Search, Star, Share2, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

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
                    className="absolute -right-3 top-7 h-7 w-7 bg-white rounded-full text-trello-blue flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform cursor-pointer z-50 border-2 border-slate-100"
                >
                    {isCollapsed ? <ChevronRight size={16} strokeWidth={2.5} /> : <ChevronLeft size={16} strokeWidth={2.5} />}
                </button>

                {/* Content Wrapper for Internal Clipping */}
                <div className={cn("flex flex-col h-full overflow-hidden", isCollapsed ? "p-2 items-center" : "p-4")}>

                    <div className={cn("flex flex-col gap-4 mb-6 transition-all duration-300", isCollapsed ? "items-center" : "")}>
                        <SidebarBrand isCollapsed={isCollapsed} />
                        <SidebarSearch isCollapsed={isCollapsed} />
                    </div>

                    <div className="flex-1 py-4 space-y-1">
                        <NavItem icon={LayoutDashboard} label="Workboard" href="/dashboard" active isCollapsed={isCollapsed} />
                        <NavItem icon={Layers} label="Playbooks" href="/dashboard/playbooks" isCollapsed={isCollapsed} />
                        <NavItem icon={BarChart3} label="Analytics" href="/dashboard/analytics" isCollapsed={isCollapsed} />
                    </div>

                    <div className={cn("mt-auto pt-6 border-t border-white/10 w-full", isCollapsed ? "flex flex-col items-center border-none pt-2" : "")}>
                        <PremiumCard isCollapsed={isCollapsed} />

                        <div className="space-y-0.5 w-full">
                            <NavItem icon={Settings} label="Settings" href="/dashboard/settings" isCollapsed={isCollapsed} />
                            <NavItem icon={HelpCircle} label="Help" href="/dashboard/help" isCollapsed={isCollapsed} />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="bg-background border-b border-border sticky top-0 z-10">
                    {/* Zone 1: Utility & Title */}
                    <div className="flex items-center justify-between px-8 py-4">
                        <h1 className="text-2xl font-black tracking-tight text-slate-800">Playbook Canvas</h1>
                        <div className="flex items-center gap-4">
                            <button className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-500 transition-colors">
                                <Share2 className="h-5 w-5" />
                            </button>
                            <button className="h-9 w-9 rounded-full bg-trello-blue text-white flex items-center justify-center hover:bg-blue-700 shadow-sm hover:shadow transition-all">
                                <Plus className="h-5 w-5" />
                            </button>
                            <div className="h-6 w-px bg-slate-200 mx-1" />
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden sm:block">
                                    <div className="text-sm font-bold text-slate-700">Cameron M.</div>
                                    <div className="text-[10px] text-slate-500 font-medium tracking-wide">CEO</div>
                                </div>
                                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-white shadow-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Zone 2: Navigation Tabs */}
                    <div className="px-8 flex items-center gap-6 text-sm font-medium border-t border-slate-50">
                        <TabItem label="By Status" active />
                        <TabItem label="By Growth Pillar" />
                        <TabItem label="My Tasks" count={12} />
                        <TabItem label="Backlog" />
                    </div>
                </header>

                {/* The Panoramic Canvas */}
                <div className="flex-1 overflow-auto bg-trello-gray p-8">
                    <div className="mx-auto max-w-[1700px] h-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}


// Helper Components for Readability (Cleanliness > Complexity)

function SidebarBrand({ isCollapsed }: { isCollapsed: boolean }) {
    return (
        <div className={cn("flex items-center tracking-tight text-white transition-all", isCollapsed ? "justify-center px-0" : "gap-3 font-black text-xl px-2")}>
            <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-inner shrink-0">
                <Zap className="h-5 w-5 text-white fill-white" />
            </div>
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden animate-in fade-in duration-300">GrowthPad</span>}
        </div>
    )
}

function SidebarSearch({ isCollapsed }: { isCollapsed: boolean }) {
    if (isCollapsed) {
        return (
            <button className="h-9 w-9 rounded-full bg-black/10 hover:bg-white/10 flex items-center justify-center text-blue-100 hover:text-white transition-colors">
                <Search className="h-4 w-4" />
            </button>
        )
    }

    return (
        <div className="relative group animate-in fade-in duration-300">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-blue-200 group-hover:text-white transition-colors" />
            </div>
            <input
                type="text"
                placeholder="Search..."
                className="w-full bg-black/10 hover:bg-black/20 focus:bg-white/10 text-sm text-white placeholder:text-blue-200 rounded-full py-2 pl-9 pr-4 transition-all border border-transparent focus:border-white/20 focus:outline-none focus:ring-0"
            />
        </div>
    )
}

function PremiumCard({ isCollapsed }: { isCollapsed: boolean }) {
    if (isCollapsed) {
        return (
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-white/10 to-blue-600/20 border border-white/10 flex items-center justify-center mb-4 cursor-pointer hover:bg-white/20 transition-all">
                <Star className="h-4 w-4 text-trello-yellow fill-trello-yellow" />
            </div>
        )
    }

    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-blue-600/20 border border-white/10 p-4 mb-2 group cursor-pointer hover:border-white/20 transition-all animate-in fade-in zoom-in-95 duration-300">
            <div className="absolute -right-2 -top-2 h-16 w-16 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />
            <div className="flex items-center justify-between relative z-10">
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-white">Go Pro</span>
                    <span className="text-[10px] text-blue-100/80">Unlock Strategy AI</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Star className="h-4 w-4 text-trello-yellow fill-trello-yellow" />
                </div>
            </div>
        </div>
    )
}

function NavItem({ icon: Icon, label, href, active, isCollapsed }: { icon: LucideIcon, label: string, href: string, active?: boolean, isCollapsed?: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 group h-10",
                active
                    ? "bg-white/20 text-white shadow-sm"
                    : "text-blue-50/80 hover:bg-white/10 hover:text-white",
                isCollapsed && "justify-center px-0 w-10 mx-auto"
            )}
            title={isCollapsed ? label : undefined}
        >
            <Icon size={18} className={cn("shrink-0", isCollapsed && "group-hover:scale-110 transition-transform")} />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden animate-in fade-in duration-200">{label}</span>}
        </Link>
    )
}

function TabItem({ label, active, count }: { label: string, active?: boolean, count?: number }) {
    return (
        <button className={cn(
            "relative py-3 text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2",
            active && "text-trello-blue font-bold"
        )}>
            {label}
            {count && (
                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                    {count}
                </span>
            )}
            {active && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-trello-blue rounded-t-full" />
            )}
        </button>
    )
}
