import { WorkboardState, L0_Mission } from '../types';
/**
 * fetchWorkboard
 * Fetches the entire workboard state from Supabase.
 * Uses a nested select to retrieve the full hierarchy in one round trip.
 */
export declare const fetchWorkboard: () => Promise<WorkboardState>;
/**
 * useWorkboard
 * The central hook for the GrowthPad Strategic Workboard.
 * Now powered by Supabase and TanStack Query.
 */
export declare function useWorkboard(): {
    missions: L0_Mission[];
    pillars: import("../types").DIM_Pillar[];
    themes: import("../types").DIM_Theme[];
    isLoading: boolean;
    error: Error | null;
};
