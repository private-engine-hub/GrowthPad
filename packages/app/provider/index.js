'use client';
import { jsx as _jsx } from "nativewind/jsx-runtime";
import { QueryClient, QueryClientProvider } from './query';
import { useState } from 'react';
import { SafeArea } from './safe-area';
export function Provider({ children }) {
    // Create a client instance per component mount (Next.js App Router pattern)
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
            },
        },
    }));
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(SafeArea, { children: children }) }));
}
