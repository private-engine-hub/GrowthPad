'use client'

import { LucideIcon, LayoutDashboard, BarChart3, Settings, HelpCircle, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface DashboardShellProps {
    children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
    return (
        <div className="flex h-screen w-full bg-background">
            {/* Sidebar (Fixed width) */}
            <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-border">
                    <span className="font-bold text-lg tracking-tight">
                        GrowthPad
                    </span>
                </div>

                <div className="flex-1 py-6 px-4 space-y-1">
                    <NavItem icon={LayoutDashboard} label="Workboard" href="/dashboard" active />
                    <NavItem icon={Layers} label="Playbooks" href="/dashboard/playbooks" />
                    <NavItem icon={BarChart3} label="Analytics" href="/dashboard/analytics" />
                </div>

                <div className="p-4 border-t border-border">
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

                {/* The Panoramic Canvas */}
                <div className="flex-1 overflow-auto p-6 bg-muted/10">
                    {children}
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
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
        >
            <Icon size={18} />
            {label}
        </Link>
    )
}
