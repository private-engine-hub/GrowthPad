'use client';

import { View } from 'react-native';
import { Text, H1 } from '../../ui/typography';

export function WorkboardScreen() {
    return (
        <View className="flex-1 bg-white items-center justify-center p-8">
            <H1 className="text-slate-900 font-black tracking-tight mb-4 text-center">Growth Workboard</H1>
            <Text className="text-slate-400 text-lg text-center">
                This view is currently under maintenance as part of the strategy hierarchy pivot.
                Please use the Planner view.
            </Text>
        </View>
    );
}
