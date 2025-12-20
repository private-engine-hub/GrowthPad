'use client'

import { ScrollView, View } from 'react-native'
import { BoardColumn } from './board-column'
import { MOCK_BOARD } from './data'
import { H1, Text } from 'app/ui/typography'
import { SafeAreaView } from 'moti'

export function BoardScreen() {
    return (
        <View className="flex-1 bg-white h-screen">
            {/* Top Header */}
            <View className="px-6 py-4 border-b border-slate-100 flex-row items-center justify-between z-10 bg-white/90 blur-lg backdrop-blur shadow-sm">
                <View>
                    <H1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">GrowthPad</H1>
                    <Text className="text-slate-500 text-sm hidden md:flex">Strategic Command Center</Text>
                </View>
                <View className="flex-row gap-3">
                    <View className="h-8 w-8 rounded-full bg-blue-500 justify-center items-center">
                        <Text className="text-white font-bold text-xs">CM</Text>
                    </View>
                </View>
            </View>

            {/* Horizontal Scroll Board Area */}
            <ScrollView
                horizontal
                className="flex-1 bg-slate-50"
                contentContainerStyle={{ padding: 0 }} // Columns manage their own spacing/borders
                showsHorizontalScrollIndicator={true}
            >
                {MOCK_BOARD.map((col) => (
                    <BoardColumn key={col.id} title={col.title} cards={col.cards} />
                ))}

                {/* Spacer for right edge */}
                <View className="w-6" />
            </ScrollView>
        </View>
    )
}
