import { View, ScrollView } from 'react-native';

interface PillarProps {
    header?: React.ReactNode;
    children: React.ReactNode;
}

export function PillarColumn({ header, children }: PillarProps) {
    return (
        // md:w-1/3 forces the 3-column split on Web
        // w-screen ensures the paging works correctly on Native
        <View className="w-screen md:w-1/3 md:h-full p-2">
            <View className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Fixed Header */}
                {header && (
                    <View className="z-10 bg-white">
                        {header}
                    </View>
                )}

                {/* Independent Vertical Scroll */}
                <ScrollView
                    className="flex-1"
                    contentContainerClassName="p-4 gap-4"
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            </View>
        </View>
    );
}
