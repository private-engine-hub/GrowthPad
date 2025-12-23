'use client'

import { QueryClient, QueryClientProvider } from './query'
import { useState } from 'react'
import { SafeArea } from './safe-area'

export function Provider({ children }: { children: React.ReactNode }) {
  // Create a client instance per component mount (Next.js App Router pattern)
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <SafeArea>{children}</SafeArea>
    </QueryClientProvider>
  )
}
