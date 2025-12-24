'use client'

import { useWorkboard } from "app/hooks/use-workboard"
import { Badge } from "@/components/ui/badge"
import { Target, ArrowRight, Zap, Flag, CheckCircle2 } from "lucide-react"
import { L0_Mission, L1_Move, L2_Objective, L3_Initiative, DIM_Pillar, DIM_Theme } from "app/types"

export function StrategyTreemap() {
    const { missions, pillars, themes } = useWorkboard()

    if (!missions || missions.length === 0) return (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400">
            <Target size={48} className="mb-4 opacity-50" />
            <p>No strategy defined yet.</p>
        </div>
    )

    return (
        <div className="flex flex-col h-full bg-slate-50/50 overflow-x-auto overflow-y-hidden">
            <div className="min-w-max p-8 mx-auto">
                {missions.map(mission => (
                    <MissionTreemap
                        key={mission.id}
                        mission={mission}
                        pillars={pillars}
                        themes={themes}
                    />
                ))}
            </div>
        </div>
    )
}

function MissionTreemap({ mission, pillars, themes }: { mission: L0_Mission, pillars: DIM_Pillar[], themes: DIM_Theme[] }) {
    const moveCount = mission.moves.length;

    return (
        <div className="flex flex-col items-center">
            {/* L0: Mission Node (Root) - Premium Plaque style */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="bg-white border-t-8 border-t-trello-yellow px-8 py-8 rounded-2xl shadow-xl max-w-4xl text-center relative z-20 overflow-hidden">
                    {/* Subtle Background Mark */}
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] select-none pointer-events-none text-trello-yellow">
                        <Target size={80} />
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-4 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                        <Target className="text-trello-yellow fill-trello-yellow/10" size={12} />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Strategic Intent</span>
                    </div>

                    <h1 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9] mb-3 drop-shadow-sm">
                        {mission.title}
                    </h1>

                    {mission.description && (
                        <p className="text-slate-500 font-light text-lg leading-relaxed italic opacity-80 max-w-2xl mx-auto">
                            "{mission.description}"
                        </p>
                    )}


                </div>

                {/* The "Spine" Line Dropping Down */}
                {moveCount > 0 && (
                    <div className="w-0.5 h-12 bg-slate-300 relative z-10" />
                )}
            </div>

            {/* L1: Moves Columns (The Tree) */}
            <div className="flex gap-8 items-start pt-0 relative">

                {/* 
                   The "Rail" - Horizontal Connector Line 
                   We position this relative to the flex container or each item.
                   To act as a true tree, we need a line spanning from the Center-of-First-Move to Center-of-Last-Move.
                */}

                {mission.moves.map((move, index) => {
                    const isFirst = index === 0;
                    const isLast = index === moveCount - 1;
                    const isOnly = moveCount === 1;

                    return (
                        <div key={move.id} className="flex flex-col items-center relative w-[400px]">

                            {/* Connector Lines Layer */}
                            {!isOnly && (
                                <>
                                    {/* The Horizontal Rail Segments */}
                                    {/* If First: Rail goes Right (50% to 100%) */}
                                    {isFirst && <div className="absolute top-0 right-0 w-1/2 h-0.5 bg-slate-300" />}

                                    {/* If Last: Rail goes Left (0% to 50%) */}
                                    {isLast && <div className="absolute top-0 left-0 w-1/2 h-0.5 bg-slate-300" />}

                                    {/* If Middle: Rail spans full (0% to 100%) */}
                                    {!isFirst && !isLast && <div className="absolute top-0 w-full h-0.5 bg-slate-300" />}

                                    {/* The Vertical Drop from Rail to Card */}
                                    <div className="absolute top-0 w-0.5 h-6 bg-slate-300" />
                                </>
                            )}

                            {/* Single Item Case: Just a drop line, no rail */}
                            {isOnly && (
                                <div className="absolute -top-12 w-0.5 h-12 bg-slate-300" />
                            )}

                            {/* Spacing for connector height */}
                            <div className={isOnly ? "h-0" : "h-6"} />

                            {/* Move Card */}
                            <div className="w-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative z-20">
                                {/* Move Header */}
                                <div className="p-5 border-b border-slate-100 bg-slate-50/30">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md">
                                            Move #{move.order || index + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2 tracking-tight">{move.title}</h3>
                                    {move.description && (
                                        <p className="text-sm text-slate-500 font-light leading-relaxed">{move.description}</p>
                                    )}
                                </div>

                                {/* Body */}
                                <div className="flex-1 p-4 space-y-4 bg-slate-50/30">
                                    {move.objectives.length === 0 ? (
                                        <div className="text-center py-8 text-slate-400 text-sm italic">
                                            No objectives defined
                                        </div>
                                    ) : (
                                        move.objectives.map(obj => (
                                            <ObjectiveCard
                                                key={obj.id}
                                                objective={obj}
                                                pillars={pillars}
                                                themes={themes}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function ObjectiveCard({ objective, pillars, themes }: { objective: L2_Objective, pillars: DIM_Pillar[], themes: DIM_Theme[] }) {
    // Resolve DIMs
    const pillar = pillars.find(p => p.id === objective.pillarId)
    const theme = themes.find(t => t.id === objective.themeId)

    return (
        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200/60 hover:shadow-md hover:border-slate-300 transition-all group">
            {/* Objective Header */}
            <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-3">
                    {pillar && (
                        <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-500 border-slate-200 bg-slate-50/50">
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
                <h4 className="text-base font-bold text-slate-800 leading-snug tracking-tight group-hover:text-trello-blue transition-colors">
                    {objective.title}
                </h4>
            </div>

            {/* Initiatives List */}
            {objective.initiatives.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-slate-50">
                    {objective.initiatives.map(init => (
                        <div key={init.id} className="flex items-start gap-2.5">
                            <ArrowRight className="text-slate-300 shrink-0 mt-1" size={14} />
                            <span className="text-sm text-slate-600 font-medium leading-relaxed">
                                {init.title}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
