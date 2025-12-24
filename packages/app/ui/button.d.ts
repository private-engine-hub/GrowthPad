import { Pressable } from 'react-native';
import React from 'react';
import { RouteKey } from '../navigation/routes';
interface ButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    label?: string;
    href?: string;
    route?: RouteKey;
    icon?: React.ReactNode;
    textClassName?: string;
    children?: React.ReactNode;
    className?: string;
}
export declare function Button({ variant, size, label, href, route, icon, className, textClassName, onPress, children, ...props }: ButtonProps): JSX.Element;
export {};
