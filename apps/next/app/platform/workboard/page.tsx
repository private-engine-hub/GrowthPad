'use client'


import { Canvas } from "@/components/layout/Canvas"
import { Pillar } from "@/components/board/Pillar"
import { ObjectiveCascade } from "@/components/board/Cascade"
import { Accordion } from "@/components/ui/accordion"
import { useWorkboard } from "app/hooks/use-workboard"
import { DollarSign, Activity, TrendingUp } from "lucide-react"

export default function DashboardPage() {
    const { pillars } = useWorkboard()

    const getIcon = (id: string) => {
        switch (id) {
            case 'financial': return <DollarSign className="text-emerald-600" size={20} />
            case 'operational': return <Activity className="text-blue-600" size={20} />
            case 'market': return <TrendingUp className="text-purple-600" size={20} />
            default: return null
        }
    }

    return (
        <Canvas>
            {pillars.map(pillar => (
                <Pillar
                    key={pillar.id}
                    title={pillar.title}
                    description={pillar.description}
                    icon={getIcon(pillar.id)}
                >
                    <Accordion type="multiple" defaultValue={pillar.objectives.map(o => o.id)} className="w-full">
                        {pillar.objectives.map(obj => (
                            <ObjectiveCascade key={obj.id} objective={obj} />
                        ))}
                    </Accordion>
                </Pillar>
            ))}
        </Canvas>
    )
}
