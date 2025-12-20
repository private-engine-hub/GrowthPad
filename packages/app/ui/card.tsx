import { View } from 'react-native';
import { cn } from '../utils';

function Card({ className, ...props }: React.ComponentProps<typeof View>) {
    return (
        <View
            className={cn(
                'rounded-xl border border-border bg-card shadow-sm',
                className
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }: React.ComponentProps<typeof View>) {
    return (
        <View
            className={cn('flex flex-col space-y-1.5 p-6', className)}
            {...props}
        />
    );
}

import { Text } from './typography';

function CardTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
    return (
        <Text
            className={cn('font-semibold leading-none tracking-tight', className)}
            {...props}
        />
    );
}

function CardContent({ className, ...props }: React.ComponentProps<typeof View>) {
    return <View className={cn('p-6 pt-0', className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardContent };
