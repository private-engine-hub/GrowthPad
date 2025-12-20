import { View, Platform, type ViewProps } from 'react-native';
import { cn } from '../../utils';

interface SurfaceProps extends ViewProps {
    className?: string;
    children: React.ReactNode;
}

export function Surface({ className, children, ...props }: SurfaceProps) {
    if (Platform.OS === 'web') {
        const isGrid = className?.includes('grid');
        return (
            // @ts-ignore - div is valid in React Native Web contexts
            <div
                className={cn(isGrid ? "grid" : "flex flex-col", "relative", className)}
                {...props}
            >
                {children}
            </div>
        );
    }

    return (
        <View className={cn("flex-1", className)} {...props}>
            {children}
        </View>
    );
}
