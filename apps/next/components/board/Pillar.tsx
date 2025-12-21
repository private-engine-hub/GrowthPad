'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface PillarProps {
    title: string
    description?: string
    icon?: React.ReactNode
    children: React.ReactNode
    className?: string
}

export function Pillar({ title, description, icon, children, className }: PillarProps) {
    return (
        <Card className={cn("w-[350px] shrink-0 flex flex-col h-[calc(100vh-180px)] border-t-4 border-t-primary shadow-md", className)}>
            <CardHeader className="pb-3 border-b bg-slate-50/50">
                <div className="flex items-center gap-2">
                    {icon}
                    <CardTitle className="text-lg font-bold tracking-tight text-slate-800">
                        {title}
                    </CardTitle>
                </div>
                {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </CardHeader>

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
