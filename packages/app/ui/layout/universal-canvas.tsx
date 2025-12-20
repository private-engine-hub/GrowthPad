import { View, ScrollView, Platform } from 'react-native';

interface Props {
    children: React.ReactNode;
}

export function UniversalCanvas({ children }: Props) {
    if (Platform.OS === 'web') {
        return (
            // md:h-[calc(100vh-64px)] accounts for a standard SaaS header height
            // overflow-hidden prevents the body from scrolling, enforcing inner-pillar scrolling
            <View
                className="flex-1 w-full md:h-screen md:overflow-hidden bg-slate-50"
                style={{ flexDirection: 'row' }}
            >
                {children}
            </View>
        );
    }

    // Native: Horizontal Pager
    return (
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            className="flex-1 bg-slate-50"
        >
            {children}
        </ScrollView>
    );
}
