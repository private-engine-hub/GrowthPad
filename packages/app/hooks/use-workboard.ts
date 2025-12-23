import { useMemo } from 'react'
import { useQuery } from '../provider/query'
import { supabase } from '../provider/supabase'
import { WorkboardState, L1_Pillar, L1_PillarId, L3_Objective, L4_Phase, L5_Job } from '../types'

/**
 * fetchWorkboard
 * Fetches the entire workboard state from Supabase.
 * Uses a nested select to retrieve the full hierarchy in one round trip.
 */
export const fetchWorkboard = async (): Promise<WorkboardState> => {
    const { data, error } = await supabase
        .from('pillars')
        .select(`
            id,
            title,
            description,
            objectives (
                id,
                title,
                status,
                phases (
                    id,
                    title,
                    order,
                    jobs (
                        id,
                        title,
                        status,
                        theme_id,
                        ai_generated_assets
                    )
                )
            )
        `)
        .order('id') // Order pillars (or use a dedicated order field if available)

    if (error) {
        throw new Error(error.message)
    }

    // Map database snake_case to frontend camelCase
    const pillars: L1_Pillar[] = data.map((p: any) => ({
        id: p.id as L1_PillarId,
        title: p.title,
        description: p.description,
        objectives: p.objectives.map((o: any) => ({
            id: o.id,
            title: o.title,
            status: o.status,
            phases: o.phases
                .sort((a: any, b: any) => a.order - b.order)
                .map((ph: any) => ({
                    id: ph.id,
                    title: ph.title,
                    order: ph.order,
                    jobs: ph.jobs.map((j: any) => ({
                        id: j.id,
                        title: j.title,
                        status: j.status,
                        themeId: j.theme_id,
                        aiGeneratedAssets: j.ai_generated_assets
                    }))
                }))
        }))
    }))

    return { pillars }
}

/**
 * useWorkboard
 * The central hook for the GrowthPad Strategic Workboard.
 * Now powered by Supabase and TanStack Query.
 */
export function useWorkboard() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['workboard'],
        queryFn: fetchWorkboard
    })

    const pillars = useMemo(() => data?.pillars || [], [data])

    const getPillar = (id: L1_PillarId): L1_Pillar | undefined => {
        return pillars.find(p => p.id === id)
    }

    return {
        pillars,
        getPillar,
        isLoading,
        error
    }
}
