'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronDown, Flame, Zap, Sprout, Plus, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWorkboard } from "app/hooks/use-workboard"
import { L1_Pillar, L3_Objective, L4_Phase, L5_Job } from "app/types"
import { Badge } from "@/components/ui/badge"

export function StrategicStack() {
    const { pillars } = useWorkboard()

    if (!pillars) return null

    return (
        <div className="w-full space-y-4 pb-20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Strategy Map</h2>
                <div className="flex gap-2">
                    <span className="text-xs font-medium text-slate-400">Interactive Tree View</span>
                </div>
            </div>

            {pillars.map((pillar) => (
                <PillarRow key={pillar.id} pillar={pillar} />
            ))}
        </div>
    )
}

function PillarRow({ pillar }: { pillar: L1_Pillar }) {
    const [isExpanded, setIsExpanded] = useState(true)

    const colorMap: Record<string, string> = {
        'financial': 'border-l-rose-500 bg-rose-50/10',
        'operational': 'border-l-amber-500 bg-amber-50/10',
        'market': 'border-l-emerald-500 bg-emerald-50/10'
    }

    const badgeMap: Record<string, string> = {
        'financial': 'bg-rose-100 text-rose-700',
        'operational': 'bg-amber-100 text-amber-700',
        'market': 'bg-emerald-100 text-emerald-700'
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            {/* L1 Header Row */}
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    "flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 transition-colors border-l-4",
                    colorMap[pillar.id] || 'border-l-slate-400'
                )}
            >
                <div className={cn("transition-transform duration-200", isExpanded ? "rotate-90" : "rotate-0")}>
                    <ChevronRight size={18} className="text-slate-400" />
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-800">{pillar.title}</h3>
                        <Badge variant="secondary" className={cn("font-bold border-none", badgeMap[pillar.id])}>
                            {pillar.objectives.length} Objectives
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Expansion Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-slate-100"
                    >
                        <div className="p-6 space-y-6 bg-slate-50/30">
                            {pillar.objectives.map(obj => (
                                <ObjectiveNode key={obj.id} objective={obj} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function ObjectiveNode({ objective }: { objective: L3_Objective }) {
    // Determine status color
    const statusColor = objective.status === 'completed' ? 'bg-green-500' : 'bg-slate-300';

    return (
        <div className="relative group">
            {/* The Vertical Spine Line */}
            <div className="absolute left-[19px] top-8 bottom-0 w-px bg-slate-200 group-last:hidden" />

            <div className="flex items-start gap-4">
                {/* Visual Anchor */}
                <div className="relative z-10 shrink-0 mt-1">
                    <div className={cn("w-2.5 h-2.5 rounded-full ring-4 ring-white", statusColor)} />
                </div>

                <div className="flex-1 space-y-4">
                    {/* L3 Header */}
                    <div className="flex items-baseline justify-between border-b border-dashed border-slate-200 pb-2">
                        <h4 className="text-sm font-bold text-slate-800">{objective.title}</h4>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{objective.phases.length} Phases</span>
                    </div>

                    {/* Children (Phases) */}
                    <div className="space-y-6 pl-2">
                        {objective.phases.map(phase => (
                            <PhaseNode key={phase.id} phase={phase} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function PhaseNode({ phase }: { phase: L4_Phase }) {
    return (
        <div className="relative pl-6">
            {/* L-Shape Connector */}
            <div className="absolute left-0 top-3 w-4 h-px bg-slate-300" />
            <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 -mt-2" />

            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider bg-slate-100 px-1.5 py-0.5 rounded">
                        {phase.title}
                    </span>
                    <div className="h-px bg-slate-100 flex-1" />
                </div>

                <div className="flex flex-col space-y-2">
                    {phase.jobs.map(job => (
                        <JobLeaf key={job.id} job={job} />
                    ))}
                    {/* Add Job Button (Row Style) */}
                    <button className="flex items-center gap-3 px-3 py-2 rounded-md border border-dashed border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all group w-full">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200">
                            <Plus size={12} />
                        </div>
                        <span className="text-xs font-medium">Add Job</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

function JobLeaf({ job }: { job: L5_Job }) {
    const getPriority = (title: string) => {
        const t = title.toLowerCase()
        if (t.includes('urgent') || t.includes('security') || t.includes('audit')) return 'high'
        if (t.includes('draft') || t.includes('model') || t.includes('optimization')) return 'medium'
        return 'low'
    }
    const priority = getPriority(job.title)

    return (
        <div className={cn(
            "group flex items-center gap-3 px-3 py-2 bg-white rounded-md border border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer relative",
            job.status === 'done' && "bg-slate-50 opacity-60"
        )}>
            {/* Priority Indicator Line */}
            <div className={cn(
                "absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full",
                priority === 'high' && "bg-rose-500",
                priority === 'medium' && "bg-amber-500",
                priority === 'low' && "bg-emerald-500",
            )} />

            {/* Joy Icon */}
            <div className="shrink-0 ml-1.5">
                {priority === 'high' && <Flame size={14} className="text-rose-500" />}
                {priority === 'medium' && <Zap size={14} className="text-amber-500" />}
                {priority === 'low' && <Sprout size={14} className="text-emerald-500" />}
            </div>

            <span className={cn(
                "text-sm font-medium text-slate-700 leading-snug flex-1",
                job.status === 'done' && "line-through text-slate-400"
            )}>
                {job.title}
            </span>

            {/* Right Side Meta Group */}
            <div className="flex items-center gap-4 transition-opacity duration-200">
                {job.aiGeneratedAssets && (
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100 flex items-center gap-1">
                        ✨ AI Insight
                    </span>
                )}

                {/* Mock Status */}
                <div className="flex items-center gap-1.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full", job.status === 'done' ? "bg-green-500" : "bg-amber-400")}></span>
                    <span className="text-xs font-medium text-slate-500">{job.status === 'done' ? 'Complete' : 'On Track'}</span>
                </div>

                {/* Mock Avatar */}
                <div className="w-6 h-6 rounded-full bg-indigo-100 border border-white shadow-sm flex items-center justify-center text-[9px] font-bold text-indigo-600">
                    CM
                </div>

                <div className="h-4 w-px bg-slate-200" />

                {/* Context Menu */}
                <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={16} />
                </button>
            </div>
        </div>
    )
}
