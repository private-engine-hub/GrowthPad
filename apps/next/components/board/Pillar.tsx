'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

interface PillarProps {
    title: string
    description?: string
    icon?: React.ReactNode
    children: React.ReactNode
    className?: string
}

export function Pillar({ title, description, icon, children, className }: PillarProps) {
    const headerColor = getPillarHeaderColor(title)

    return (
        <Card className={cn("w-[350px] shrink-0 flex flex-col h-[calc(100vh-180px)] shadow-none bg-transparent border-none", className)}>
            {/* Chunky Capsule Header */}
            <div className="px-1 mb-3 flex items-center gap-2">
                <Badge className={cn("flex-1 justify-center rounded-full px-4 py-1.5 text-sm font-bold shadow-sm hover:shadow-md transition-all text-white border-none", headerColor)}>
                    {title}
                </Badge>
                <button className="h-8 w-8 rounded-full hover:bg-black/5 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">
                    <Plus className="h-5 w-5" />
                </button>
            </div>

            <CardContent className="p-0 flex-1 overflow-hidden min-h-0">
                {/* Independent Scroll Area for the Pillar */}
                <ScrollArea className="h-full w-full">
                    {/* Inner padding applied here so scrollbar is at edge */}
                    <div className="p-4 space-y-4">
                        {children}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

function getPillarHeaderColor(title: string) {
    if (title.includes("Financial")) return "bg-trello-red hover:bg-rose-600"
    if (title.includes("Operational")) return "bg-trello-yellow hover:bg-amber-500 text-slate-900"
    if (title.includes("Market")) return "bg-trello-green hover:bg-emerald-600"
    return "bg-slate-500"
}
