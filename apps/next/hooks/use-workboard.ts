import { useQuery } from '@tanstack/react-query'
import { fetchWorkboard } from 'app/hooks/use-workboard' // We will export the raw fetcher from the package
import { WorkboardState } from 'app/types'

/**
 * useWorkboard (Shell Version)
 * Instantiated inside the Next.js App, using the Next.js App's React Query instance.
 */
export function useWorkboard() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['workboard'],
        queryFn: fetchWorkboard
    })

    return {
        pillars: data?.pillars || [],
        isLoading,
        error
    }
}
