'use client'

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface CanvasProps {
    children: React.ReactNode
}

/**
 * 🎨 Canvas (Standard Horizontal Board)
 * 
 * Uses shadcn/ui ScrollArea to create a Trello-like side-by-side layout.
 * This is the standard "Canvas Template" for the Workboard.
 */
export function Canvas({ children }: CanvasProps) {
    return (
        <ScrollArea className="w-full h-full whitespace-nowrap rounded-md border text-left">
            <div className="flex w-max space-x-4 p-4">
                {children}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}
