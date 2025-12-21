'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
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
                        <PhaseBlock key={phase.id} phase={phase} />
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

function PhaseBlock({ phase }: { phase: L4_Phase }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] h-5 px-1.5 uppercase tracking-wider text-slate-500 bg-white">
                    {phase.title}
                </Badge>
            </div>

            <div className="space-y-2">
                {phase.jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    )
}

function JobCard({ job }: { job: L5_Job }) {
    return (
        <div className={cn(
            "group flex items-start gap-3 p-3 rounded-md border bg-white hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer",
            job.status === 'done' && "opacity-60 bg-slate-50"
        )}>
            <div className="mt-0.5">
                {/* Reusing Status Icon for Job as well */}
                <StatusIcon status={job.status === 'done' ? 'completed' : job.status === 'in_progress' ? 'active' : 'paused'} size={14} />
            </div>
            <div className="flex-1 space-y-1">
                <p className={cn("text-xs font-medium text-slate-700 leading-snug", job.status === 'done' && "line-through decoration-slate-400")}>
                    {job.title}
                </p>
                {job.aiGeneratedAssets && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium bg-purple-50 text-purple-700 border border-purple-100">
                        AI Asset
                    </span>
                )}
            </div>
        </div>
    )
}

// --- UTILS ---

function StatusIcon({ status, size = 18 }: { status: string, size?: number }) {
    if (status === 'completed' || status === 'done') return <CheckCircle2 size={size} className="text-green-500" />
    if (status === 'active' || status === 'in_progress') return <Clock size={size} className="text-blue-500" />
    return <Circle size={size} className="text-slate-300" />
}
