'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronDown, Flame, Zap, Sprout, Plus, MoreHorizontal, Target, Layers, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWorkboard } from "app/hooks/use-workboard"
import { L0_Mission, L1_Move, L2_Objective, L3_Initiative, L4_Phase, L5_Job, DIM_Pillar, DIM_Theme } from "app/types"
import { Badge } from "@/components/ui/badge"

export function StrategicStack() {
    const { missions, pillars, themes } = useWorkboard()

    if (!missions || missions.length === 0) return (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400">
            <Layers size={48} className="mb-4 opacity-50" />
            <p>No strategy defined yet.</p>
        </div>
    )

    return (
        <div className="w-full space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-800 tracking-tighter">Strategy Map</h2>
                <div className="flex gap-2">
                    <span className="text-xs font-semibold text-slate-400">Interactive Tree View</span>
                </div>
            </div>

            {missions.map((mission) => (
                <MissionRow
                    key={mission.id}
                    mission={mission}
                    pillars={pillars || []}
                    themes={themes || []}
                />
            ))}
        </div>
    )
}

function MissionRow({ mission, pillars, themes }: { mission: L0_Mission, pillars: DIM_Pillar[], themes: DIM_Theme[] }) {
    return (
        <div className="space-y-6">
            {/* L0: Mission Header */}
            <div className="bg-trello-yellow text-slate-900 p-6 rounded-xl shadow-lg border border-yellow-500/20">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-900/10 rounded-lg">
                        <Target className="text-slate-900" size={24} />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">Mission</div>
                        <h3 className="text-2xl font-black tracking-tighter">{mission.title}</h3>
                        {mission.description && (
                            <p className="text-slate-800/70 mt-2 text-sm leading-relaxed max-w-2xl font-light">{mission.description}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* L1: Moves */}
            <div className="space-y-4 pl-4 border-l-2 border-slate-100/50">
                {mission.moves.map(move => (
                    <MoveRow
                        key={move.id}
                        move={move}
                        pillars={pillars}
                        themes={themes}
                    />
                ))}
            </div>
        </div>
    )
}

function MoveRow({ move, pillars, themes }: { move: L1_Move, pillars: DIM_Pillar[], themes: DIM_Theme[] }) {
    const [isExpanded, setIsExpanded] = useState(true)

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            {/* L1 Header */}
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 transition-colors border-l-4 border-l-indigo-500"
            >
                <div className={cn("transition-transform duration-200", isExpanded ? "rotate-90" : "rotate-0")}>
                    <ChevronRight size={18} className="text-slate-400" />
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">
                            Move #{move.order}
                        </span>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">{move.title}</h3>
                    </div>
                    {move.description && (
                        <p className="text-xs text-slate-500 mt-1 pl-[105px] truncate font-light">{move.description}</p>
                    )}
                </div>

                <Badge variant="secondary" className="font-bold border-none bg-slate-100 text-slate-600">
                    {move.objectives.length} Objectives
                </Badge>
            </div>

            {/* Expansion Content (Objectives) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-slate-100"
                    >
                        <div className="p-6 space-y-8 bg-slate-50/30">
                            {move.objectives.map(obj => (
                                <ObjectiveNode
                                    key={obj.id}
                                    objective={obj}
                                    pillars={pillars}
                                    themes={themes}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function ObjectiveNode({ objective, pillars, themes }: { objective: L2_Objective, pillars: DIM_Pillar[], themes: DIM_Theme[] }) {
    // Resolve DIMs
    const pillar = pillars.find(p => p.id === objective.pillarId)
    const theme = themes.find(t => t.id === objective.themeId)

    // Determine status color
    const statusColor = objective.status === 'completed' ? 'bg-green-500' : 'bg-blue-500';

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
                    {/* L2 Header */}
                    <div className="flex items-start justify-between border-b border-dashed border-slate-200 pb-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-base font-bold text-slate-800 tracking-tight">{objective.title}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                                {pillar && (
                                    <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-500 border-slate-200 bg-white">
                                        {pillar.title}
                                    </Badge>
                                )}
                                {theme && (
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100/50 border border-slate-100">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.color }} />
                                        <span className="text-[10px] font-bold uppercase text-slate-600">{theme.title}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Children (Initiatives) */}
                    <div className="space-y-6 pl-2">
                        {objective.initiatives.map(init => (
                            <InitiativeNode key={init.id} initiative={init} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function InitiativeNode({ initiative }: { initiative: L3_Initiative }) {
    return (
        <div className="relative pl-6">
            {/* L-Shape Connector */}
            <div className="absolute left-0 top-3 w-4 h-px bg-slate-300" />
            <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 -mt-2" />

            <div className="space-y-3 bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-indigo-400 rounded-full" />
                    <h5 className="text-sm font-bold text-slate-700">{initiative.title}</h5>
                </div>

                {/* Phases */}
                <div className="pl-4 space-y-4 pt-2">
                    {initiative.phases.map(phase => (
                        <PhaseNode key={phase.id} phase={phase} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function PhaseNode({ phase }: { phase: L4_Phase }) {
    return (
        <div className="relative">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider bg-slate-50 px-1.5 py-0.5 rounded">
                    {phase.title}
                </span>
                <div className="h-px bg-slate-100 flex-1" />
            </div>

            <div className="flex flex-col space-y-2">
                {phase.jobs.map(job => (
                    <JobLeaf key={job.id} job={job} />
                ))}
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
            "group flex items-center gap-3 px-3 py-2.5 bg-white rounded-md border border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer relative",
            job.status === 'done' && "bg-slate-50 opacity-60"
        )}>
            {/* Priority Indicator Line */}
            <div className={cn(
                "absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full",
                priority === 'high' && "bg-rose-500",
                priority === 'medium' && "bg-amber-500",
                priority === 'low' && "bg-emerald-500",
            )} />

            {/* Icon */}
            <div className="shrink-0 ml-1.5">
                {priority === 'high' && <Flame size={14} className="text-rose-500" />}
                {priority === 'medium' && <Zap size={14} className="text-amber-500" />}
                {priority === 'low' && <Sprout size={14} className="text-emerald-500" />}
            </div>

            <span className={cn(
                "text-sm font-normal text-slate-700 leading-snug flex-1",
                job.status === 'done' && "line-through text-slate-400"
            )}>
                {job.title}
            </span>

            {/* Right Side Meta Group */}
            <div className="flex items-center gap-4 transition-opacity duration-200">
                {job.aiGeneratedAssets && (
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100 flex items-center gap-1">
                        ✨ AI
                    </span>
                )}

                {/* Mock Status */}
                <div className="flex items-center gap-1.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full", job.status === 'done' ? "bg-green-500" : "bg-amber-400")}></span>
                </div>

                {/* Context Menu */}
                <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100">
                    <MoreHorizontal size={16} />
                </button>
            </div>
        </div>
    )
}
