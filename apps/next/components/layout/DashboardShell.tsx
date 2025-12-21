'use client'

import { LucideIcon, LayoutDashboard, BarChart3, Settings, HelpCircle, Layers, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface DashboardShellProps {
    children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
    return (
        <div className="flex h-screen w-full bg-background">
            {/* Sidebar (Fixed width) - Trello Blue */}
            <aside className="w-64 bg-trello-blue text-white hidden md:flex flex-col">
                <div className="flex items-center gap-2 font-black text-xl tracking-tight text-white/90">
                    <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-white" />
                    </div>
                    GrowthPad
                </div>

                {/* Glassy Search */}
                <div className="px-4 mb-2">
                    <div className="bg-white/10 backdrop-blur-sm rounded-md px-3 py-1.5 flex items-center gap-2 border border-white/5">
                        <span className="text-blue-100/70 text-sm">Search...</span>
                    </div>
                </div>

                <div className="flex-1 py-4 px-3 space-y-1">
                    <NavItem icon={LayoutDashboard} label="Workboard" href="/dashboard" active />
                    <NavItem icon={Layers} label="Playbooks" href="/dashboard/playbooks" />
                    <NavItem icon={BarChart3} label="Analytics" href="/dashboard/analytics" />
                </div>

                <div className="p-4 border-t border-white/10">
                    <div className="bg-white/10 rounded-lg p-3 mb-4 text-center">
                        <p className="text-xs font-semibold text-blue-50">Go Pro</p>
                    </div>
                    <NavItem icon={Settings} label="Settings" href="/dashboard/settings" />
                    <NavItem icon={HelpCircle} label="Help" href="/dashboard/help" />
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
                    <h1 className="font-semibold text-foreground">Strategic Command Center</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">Cameron M.</div>
                        <div className="h-8 w-8 rounded-full bg-muted"></div>
                    </div>
                </header>

                {/* The Panoramic Canvas - Trello Gray Atmosphere */}
                <div className="flex-1 overflow-auto p-6 bg-trello-gray">
                    <div className="mx-auto max-w-[1600px] h-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}

function NavItem({ icon: Icon, label, href, active }: { icon: LucideIcon, label: string, href: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                active
                    ? "bg-white/20 text-white shadow-sm"
                    : "text-blue-50/80 hover:bg-white/10 hover:text-white"
            )}
        >
            <Icon size={18} />
            {label}
        </Link>
    )
}
