import { View, ScrollView } from 'react-native'
import { Text, H3 } from 'app/ui/typography'
import { BoardCard, type KanbanCard } from './board-card'

export function BoardColumn({
    title,
    cards,
}: {
    title: string
    cards: KanbanCard[]
}) {
    return (
        <View className="w-80 h-full bg-slate-50/50 border-r border-slate-200/60 p-4 flex-col gap-4">
            <View className="flex-row items-center justify-between pb-2 border-b border-slate-200/50">
                <H3 className="text-base font-bold text-slate-800">{title}</H3>
                <View className="bg-slate-200 rounded-full px-2 py-0.5">
                    <Text className="text-xs font-bold text-slate-600">{cards.length}</Text>
                </View>
            </View>

            {/* Vertical Scroll for cards within the column */}
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                {cards.map((card) => (
                    <BoardCard key={card.id} {...card} />
                ))}

                {/* Add Card Button Placeholder */}
                <View className="border-2 border-dashed border-slate-200 rounded-xl p-3 items-center justify-center mt-2">
                    <Text className="text-slate-400 font-medium text-sm">+ Add Item</Text>
                </View>
            </ScrollView>
        </View>
    )
}
