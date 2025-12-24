'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronDown, Flame, Zap, Sprout, Plus, MoreHorizontal, Target, Layers, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWorkboard } from "app/hooks/use-workboard"
import { L0_Mission, L1_Move, L2_Objective, L3_Initiative, L4_Phase, L5_Job, DIM_Pillar, DIM_Theme } from "app/types"
import { Badge } from "@/components/ui/badge"

// --- Main Component ---

export function StrategicStack() {
    const { missions, pillars, themes } = useWorkboard()

    if (!missions || missions.length === 0) return (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400">
            <Layers size={48} className="mb-4 opacity-50" />
            <p>No strategy defined yet.</p>
        </div>
    )

    return (
        <div className="w-full space-y-20 pb-20">
            <div className="flex items-center justify-between px-4 md:px-0">
                <h2 className="text-xl font-black text-slate-800 tracking-tighter">Strategy Map</h2>
                <Badge variant="outline" className="text-xs font-semibold text-slate-500 bg-white">
                    Interactive Tree View
                </Badge>
            </div>

            {missions.map((mission) => (
                <MissionTree
                    key={mission.id}
                    mission={mission}
                    pillars={pillars || []}
                    themes={themes || []}
                />
            ))}
        </div>
    )
}

function MissionTree({ mission, pillars, themes }: { mission: L0_Mission, pillars: DIM_Pillar[], themes: DIM_Theme[] }) {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-0">
            {/* L0: Mission Header (Root) */}
            <div className="relative z-20 flex flex-col items-start text-left mb-0 pl-8">
                <div className="flex items-center gap-3 mb-2">
                    <Target className="text-trello-yellow" size={16} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">The North Star</span>
                </div>
                <h1 className="text-3xl lg:text-5xl font-black text-trello-yellow tracking-tighter uppercase leading-[0.9] mb-3 drop-shadow-sm max-w-4xl">
                    {mission.title}
                </h1>
                {mission.description && (
                    <p className="text-slate-500 font-light text-base leading-relaxed italic opacity-80 max-w-2xl">
                        "{mission.description}"
                    </p>
                )}

                {/* Horizontal Anchor Line */}
                <div className="w-full mt-6 relative pb-1">
                    <div className="h-[3px] w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="absolute left-0 top-0 h-full w-24 bg-trello-yellow" />
                    </div>
                </div>
            </div>

            {/* The Main Tree Structure */}
            {/* margin-left-[24px] puts the left edge of this container at 24px.
                border-l-[3px] sits on that edge.
                So the border occupies x:24px to x:27px.
                The absolute div above is left-[24px] width-[3px], so x:24px to x:27px.
                They should technically align.
                The disjoint functionality might come from 'h-8' gap or 'pt-6'.
                We will pull this up with -mt to close any gap.
            */}
            <div className="ml-[32px] border-l-[3px] border-slate-400 pb-12 -mt-1 relative z-10">
                <ul className="space-y-6 pt-6">
                    {mission.moves.map((move, index) => (
                        <MoveNode
                            key={move.id}
                            move={move}
                            pillars={pillars}
                            themes={themes}
                            index={index}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

// --- Recursive Nodes ---

function MoveNode({ move, pillars, themes, index }: { move: L1_Move, pillars: DIM_Pillar[], themes: DIM_Theme[], index: number }) {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <li className="relative pl-10">
            {/* Horizontal Connector: From Main Spine (left: -3px roughly) to Card */}
            {/* The parent <ul> has border-l-[3px]. We are inside that border context. */}
            <div className="absolute left-0 top-[2.2rem] w-10 h-[3px] bg-slate-400" />

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative z-20 hover:border-slate-300 transition-colors">
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-start gap-4 p-5 cursor-pointer hover:bg-slate-50/50 transition-colors select-none"
                >
                    <button className="mt-1 text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 rounded-md p-0.5">
                        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md">
                                Move #{move.order || index + 1}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{move.objectives.length} Objectives</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 leading-tight tracking-tight">{move.title}</h3>
                        {move.description && (
                            <p className="text-sm text-slate-500 font-light leading-relaxed mt-1 line-clamp-2">{move.description}</p>
                        )}
                    </div>
                </div>

                {/* Nested Objectives */}
                {isOpen && (
                    <div className="border-t border-slate-100 bg-slate-50/30 p-4 pl-0">
                        {/* We create a nested UL for objectives */}
                        {/* Use a visual spine inside the Move Card area */}
                        {/* CHANGED: Removed border-dashed, made it solid for continuity */}
                        <div className="ml-[3.5rem] border-l-[2px] border-slate-300 pl-8 space-y-4 py-2">
                            {move.objectives.map(obj => (
                                <ObjectiveNode
                                    key={obj.id}
                                    objective={obj}
                                    pillars={pillars}
                                    themes={themes}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </li>
    )
}

function ObjectiveNode({ objective, pillars, themes }: { objective: L2_Objective, pillars: DIM_Pillar[], themes: DIM_Theme[] }) {
    const [isOpen, setIsOpen] = useState(true)
    const pillar = pillars.find(p => p.id === objective.pillarId)
    const theme = themes.find(t => t.id === objective.themeId)

    return (
        <div className="relative group/obj">
            {/* Horizontal Connector from Dashed Spine */}
            <div className="absolute -left-[32px] top-[1.5rem] w-8 h-[2px] bg-slate-300" />

            <div className="bg-white rounded-lg border border-slate-200/60 shadow-sm hover:shadow-md transition-all">
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-start gap-3 p-4 cursor-pointer hover:bg-slate-50/50"
                >
                    <button className="mt-0.5 text-slate-400 hover:text-slate-600 transition-colors">
                        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>

                    <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {pillar && (
                                <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-500 border-slate-200 bg-slate-50/50 h-5 px-1.5">
                                    {pillar.title}
                                </Badge>
                            )}
                            {theme && (
                                <div className="flex items-center gap-1.5 px-1.5 h-5 rounded-full bg-slate-100/50 border border-slate-100">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.color }} />
                                    <span className="text-[9px] font-bold uppercase text-slate-600">{theme.title}</span>
                                </div>
                            )}
                        </div>
                        <h4 className="text-base font-bold text-slate-800 leading-snug group-hover/obj:text-trello-blue transition-colors">
                            {objective.title}
                        </h4>
                    </div>
                </div>

                {/* Nested Initiatives */}
                {isOpen && objective.initiatives.length > 0 && (
                    <div className="border-t border-slate-50 bg-slate-50/20 p-2">
                        {/* Initiative List */}
                        <div className="ml-[1.4rem] border-l-[2px] border-slate-200 pl-6 space-y-2 py-2">
                            {objective.initiatives.map(init => (
                                <InitiativeNode key={init.id} initiative={init} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function InitiativeNode({ initiative }: { initiative: L3_Initiative }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative group/init">
            {/* Connector from Initiative Spine */}
            <div className="absolute -left-[24px] top-[1.1rem] w-6 h-[2px] bg-slate-200" />

            <div className="border border-slate-100 bg-white rounded-md overflow-hidden transition-all hover:border-slate-200 hover:shadow-sm">
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-50"
                >
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    <span className="text-sm font-semibold text-slate-700 leading-tight flex-1" >
                        {initiative.title}
                    </span>
                </div>

                {/* Phases & Jobs */}
                {isOpen && (
                    <div className="border-t border-slate-50 bg-slate-50/50 p-3 pl-8 space-y-4">
                        {initiative.phases.length === 0 ? (
                            <p className="text-xs text-slate-400 italic">No phases defined.</p>
                        ) : (
                            initiative.phases.map(phase => (
                                <PhaseGroup key={phase.id} phase={phase} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

function PhaseGroup({ phase }: { phase: L4_Phase }) {
    return (
        <div className="relative">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider bg-white border border-slate-100 px-1.5 py-0.5 rounded shadow-sm">
                    {phase.title}
                </span>
                <div className="h-px bg-slate-200/50 flex-1" />
            </div>
            <div className="space-y-2">
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
            "group flex items-center gap-3 px-3 py-2 bg-white rounded border border-slate-200/60 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer relative",
            job.status === 'done' && "bg-slate-50 opacity-60"
        )}>
            <div className={cn(
                "absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full transition-colors",
                priority === 'high' && "bg-rose-500",
                priority === 'medium' && "bg-amber-500",
                priority === 'low' && "bg-emerald-500",
            )} />

            <div className="shrink-0 ml-1">
                {priority === 'high' && <Flame size={12} className="text-rose-500" />}
                {priority === 'medium' && <Zap size={12} className="text-amber-500" />}
                {priority === 'low' && <Sprout size={12} className="text-emerald-500" />}
            </div>

            <span className={cn(
                "text-xs font-medium text-slate-700 leading-snug flex-1",
                job.status === 'done' && "line-through text-slate-400"
            )}>
                {job.title}
            </span>

            {job.aiGeneratedAssets && (
                <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-px rounded-full border border-green-100 flex items-center gap-0.5">
                    ✨ AI
                </span>
            )}
        </div>
    )
}
