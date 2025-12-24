import { useMemo } from 'react';
import { useQuery } from '../provider/query';
import { supabase } from '../provider/supabase';
/**
 * fetchWorkboard
 * Fetches the entire workboard state from Supabase.
 * Uses a nested select to retrieve the full hierarchy in one round trip.
 */
// fetchWorkboard: Retrieval of the 6-Layer Hierarchy (Mission -> Job)
export const fetchWorkboard = async () => {
    // 1. Fetch Hierarchy (Mission -> Jobs)
    const { data: missionsData, error: missionError } = await supabase
        .from('missions')
        .select(`
            id,
            title,
            description,
            status,
            moves (
                id,
                title,
                description,
                order,
                status,
                objectives (
                    id,
                    title,
                    status,
                    pillar_id,
                    theme_id,
                    initiatives (
                        id,
                        title,
                        description,
                        order,
                        status,
                        phases (
                            id,
                            title,
                            order,
                            jobs (
                                id,
                                title,
                                status,
                                ai_generated_assets
                            )
                        )
                    )
                )
            )
        `)
        .order('created_at', { ascending: true }); // Missions order
    // 2. Fetch DIM Tables
    const { data: pillarsData, error: pillarError } = await supabase
        .from('pillars')
        .select('id, title, description');
    const { data: themesData, error: themeError } = await supabase
        .from('themes')
        .select('id, title, color');
    if (missionError)
        throw new Error(missionError.message);
    if (pillarError)
        throw new Error(pillarError.message);
    if (themeError)
        throw new Error(themeError.message);
    // 3. Map & Sort Response
    const missions = missionsData.map((m) => ({
        id: m.id,
        title: m.title,
        description: m.description,
        status: m.status,
        moves: (m.moves || [])
            .sort((a, b) => a.order - b.order)
            .map((mv) => ({
            id: mv.id,
            title: mv.title,
            description: mv.description,
            order: mv.order,
            status: mv.status,
            objectives: (mv.objectives || [])
                .map((o) => ({
                id: o.id,
                title: o.title,
                status: o.status,
                pillarId: o.pillar_id,
                themeId: o.theme_id,
                initiatives: (o.initiatives || [])
                    .sort((a, b) => a.order - b.order)
                    .map((i) => ({
                    id: i.id,
                    title: i.title,
                    description: i.description,
                    order: i.order,
                    status: i.status,
                    phases: (i.phases || [])
                        .sort((a, b) => a.order - b.order)
                        .map((p) => ({
                        id: p.id,
                        title: p.title,
                        order: p.order,
                        jobs: (p.jobs || [])
                            .map((j) => ({
                            id: j.id,
                            title: j.title,
                            status: j.status,
                            aiGeneratedAssets: j.ai_generated_assets
                        }))
                    }))
                }))
            }))
        }))
    }));
    return {
        missions,
        pillars: pillarsData,
        themes: themesData
    };
};
/**
 * useWorkboard
 * The central hook for the GrowthPad Strategic Workboard.
 * Now powered by Supabase and TanStack Query.
 */
export function useWorkboard() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['workboard'],
        queryFn: fetchWorkboard
    });
    const missions = useMemo(() => data?.missions || [], [data]);
    const pillars = useMemo(() => data?.pillars || [], [data]);
    const themes = useMemo(() => data?.themes || [], [data]);
    return {
        missions,
        pillars,
        themes,
        isLoading,
        error
    };
}
