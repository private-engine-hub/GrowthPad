import { View } from 'react-native'
import { Text } from 'app/ui/typography'
// import { styled } from 'nativewind' // This import is no longer needed

// const StyledView = styled(View) // This definition is no longer needed

export type KanbanCard = {
    id: string
    title: string
    tag: string
}

export function BoardCard({ title, tag }: { title: string; tag: string }) {
    return (
        <View className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm active:bg-blue-50">
            <View className="flex-row items-start justify-between gap-2">
                <Text className="text-slate-900 font-medium flex-1 leading-snug">
                    {title}
                </Text>
            </View>
            <View className="mt-3 flex-row">
                <View className="bg-slate-100 px-2 py-1 rounded text-xs">
                    <Text className="text-xs text-slate-500 font-medium">{tag}</Text>
                </View>
            </View>
        </View>
    )
}
