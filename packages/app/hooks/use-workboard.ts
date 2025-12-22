import { useMemo } from 'react'
import { WORKBOARD_STATE } from '../data'
import { WorkboardState, L1_Pillar, L1_PillarId } from '../types'

/**
 * useWorkboard
 * The central hook for the GrowthPad Strategic Workboard.
 * Currently consumes local mock data. When ready for Supabase,
 * replace this with the TanStack Query implementation.
 */
export function useWorkboard() {
    const data: WorkboardState = WORKBOARD_STATE

    const pillars = useMemo(() => data.pillars, [data.pillars])

    const getPillar = (id: L1_PillarId): L1_Pillar | undefined => {
        return pillars.find(p => p.id === id)
    }

    return {
        pillars,
        getPillar,
        isLoading: false,
        error: null
    }
}
