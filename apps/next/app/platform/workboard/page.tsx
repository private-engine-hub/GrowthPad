'use client'


import { StrategyTreemap } from "@/components/view-tree/StrategyTreemap"
import { useWorkboard } from "@/hooks/use-workboard"


export default function DashboardPage() {
    const { pillars } = useWorkboard()

    return (
        <StrategyTreemap />
    )
}
