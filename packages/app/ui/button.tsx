import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'solito/navigation';
import { cn } from '../utils';
import React from 'react';

interface ButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    label?: string;
    href?: string;
    icon?: React.ReactNode;
    textClassName?: string;
    children?: React.ReactNode;
    className?: string; // Explicitly add className for NativeWind
}

export function Button({
    variant = 'primary',
    size = 'md',
    label,
    href,
    icon,
    className,
    textClassName,
    onPress,
    children,
    ...props
}: ButtonProps) {
    const { push } = useRouter();

    const variants = {
        primary: 'bg-blue-600 active:bg-blue-700 shadow-sm shadow-blue-200',
        secondary: 'bg-slate-800 active:bg-slate-900 shadow-sm',
        outline: 'border border-slate-200 bg-white active:bg-slate-50',
        ghost: 'bg-transparent active:bg-slate-100',
        danger: 'bg-red-600 active:bg-red-700 shadow-sm shadow-red-200',
    };

    const sizes = {
        sm: 'px-3 py-1.5 rounded-lg',
        md: 'px-5 py-3 rounded-xl',
        lg: 'px-8 py-4 rounded-2xl',
        icon: 'p-2 rounded-full',
    };

    const textColors = {
        primary: 'text-white',
        secondary: 'text-white',
        outline: 'text-slate-900',
        ghost: 'text-slate-600',
        danger: 'text-white',
    };

    const handlePress = (e: any) => {
        if (href) {
            push(href);
        }
        if (onPress) {
            onPress(e);
        }
    };

    return (
        <Pressable
            onPress={handlePress}
            className={cn(
                'flex-row items-center justify-center gap-2 transition-all active:scale-95',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {icon && icon}
            {label && (
                <Text className={cn('font-bold tracking-tight', textColors[variant], textClassName)}>
                    {label}
                </Text>
            )}
            {children}
        </Pressable>
    );
}
