'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { L3_Objective, L4_Phase, L5_Job } from "app/types"
import { CheckCircle2, Circle, Clock } from "lucide-react"

// --- THE CASCADE COMPONENTS ---

interface ObjectiveCascadeProps {
    objective: L3_Objective
}

export function ObjectiveCascade({ objective }: ObjectiveCascadeProps) {
    return (
        <AccordionItem value={objective.id} className="border rounded-md bg-white px-0 shadow-sm mb-2">
            <AccordionTrigger className="px-3 hover:no-underline hover:bg-slate-50 rounded-t-md py-3">
                <div className="flex items-center gap-3 text-left">
                    <StatusIcon status={objective.status} />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">{objective.title}</span>
                        <div className="flex gap-2 mt-1">
                            {/* We could map tags here if they existed on L3 */}
                        </div>
                    </div>
                </div>
            </AccordionTrigger>

            <AccordionContent className="px-3 pt-2 pb-4 bg-slate-50/50 border-t">
                <div className="space-y-4 pl-2 border-l-2 border-slate-200 ml-2">
                    {objective.phases.map(phase => (
                        <div key={phase.id} className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[10px] uppercase tracking-widest text-muted-foreground border-slate-200 bg-white">
                                    {phase.title}
                                </Badge>
                            </div>
                            <div className="space-y-2">
                                {phase.jobs.map(job => (
                                    <JobCard key={job.id} job={job} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}



function JobCard({ job }: { job: L5_Job }) {
    return (
        <Card className={cn(
            "group relative bg-white p-3 rounded-lg shadow-sm border-b-2 border-slate-300 hover:shadow-md cursor-grab active:cursor-grabbing hover:-translate-y-0.5 transition-all duration-200 mb-2.5",
            job.status === 'done' && "opacity-60 bg-slate-50 border-slate-200 shadow-none hover:shadow-none cursor-default"
        )}>
            <div className="flex flex-col gap-2">

                {/* Title */}
                <p className={cn("text-sm font-semibold text-slate-700 leading-snug", job.status === 'done' && "line-through decoration-slate-400 font-medium")}>
                    {job.title}
                </p>

                {/* Footer: Joy & Avatars */}
                <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Trello Success Green AI Indicator */}
                        {job.aiGeneratedAssets && (
                            <span className="text-trello-green text-[10px] font-bold flex items-center gap-1">
                                ✨ AI Asset
                            </span>
                        )}
                        <StatusIcon status={job.status === 'done' ? 'completed' : job.status === 'in_progress' ? 'active' : 'paused'} size={14} />
                    </div>

                    {/* Stacked Avatar Placeholder */}
                    {!job.status && (
                        <div className="flex -space-x-1.5">
                            <div className="w-5 h-5 rounded-full bg-slate-200 border border-white" />
                            <div className="w-5 h-5 rounded-full bg-slate-300 border border-white" />
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}

// --- UTILS ---

function StatusIcon({ status, size = 18 }: { status: string, size?: number }) {
    if (status === 'completed' || status === 'done') return <CheckCircle2 size={size} className="text-green-500" />
    if (status === 'active' || status === 'in_progress') return <Clock size={size} className="text-blue-500" />
    return <Circle size={size} className="text-slate-300" />
}
