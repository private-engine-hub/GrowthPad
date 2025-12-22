'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { L3_Objective, L4_Phase, L5_Job } from "app/types"
import { CheckCircle2, Circle, Clock, Flame, Zap, Sprout } from "lucide-react"

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
                        {/* We could map tags here if they existed on L3 */}
                    </div>
                </div>
            </AccordionTrigger>

            <AccordionContent className="px-3 pt-2 pb-4 bg-slate-50/50 border-t">
                <div className="space-y-4 pl-2 border-l-2 border-slate-200 ml-2">
                    {objective.phases.map(phase => (
                        <div key={phase.id} className="space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-medium uppercase text-slate-400 tracking-wide">
                                    {phase.title}
                                </span>
                            </div>
                            <div className="space-y-1"> {/* Reduced spacing for list density */}
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
    // Determine priority based on keywords or random if missing (Mock Logic)
    // In real app, this would be job.priority
    const getPriority = (title: string) => {
        const t = title.toLowerCase()
        if (t.includes('urgent') || t.includes('security') || t.includes('audit')) return 'high'
        if (t.includes('draft') || t.includes('model') || t.includes('optimization')) return 'medium'
        return 'low'
    }

    const priority = getPriority(job.title)

    return (
        <div className={cn(
            "group flex items-start gap-2 py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 hover:shadow-sm transition-all duration-200 cursor-pointer",
            job.status === 'done' && "opacity-50"
        )}>
            {/* Joyful Priority Icon */}
            <div className="shrink-0 mt-0.5">
                {priority === 'high' && <Flame size={14} className="text-rose-500 fill-rose-50" />}
                {priority === 'medium' && <Zap size={14} className="text-amber-500 fill-amber-50" />}
                {priority === 'low' && <Sprout size={14} className="text-emerald-500" />}
            </div>

            <p className={cn(
                "text-sm font-medium text-slate-700 break-words flex-1 min-w-0 leading-snug group-hover:text-slate-900 transition-colors",
                job.status === 'done' && "line-through decoration-slate-400 font-normal"
            )}>
                {job.title}
                {job.aiGeneratedAssets && (
                    <span className="ml-1.5 text-[10px] items-center inline-flex gap-0.5 text-green-600 font-bold opacity-80 group-hover:opacity-100">
                        ✨ AI
                    </span>
                )}
            </p>

            {/* Hidden Avatar on Hover (Optional Delight) */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex -space-x-1">
                <div className="w-4 h-4 rounded-full bg-slate-200 border border-white" />
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
