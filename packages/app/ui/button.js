import { jsx as _jsx, jsxs as _jsxs } from "nativewind/jsx-runtime";
import { Pressable, Text } from 'react-native';
import { useRouter } from 'solito/navigation';
import { cn } from '../utils';
import { APP_ROUTES } from '../navigation/routes';
export function Button({ variant = 'primary', size = 'md', label, href, route, icon, className, textClassName, onPress, children, ...props }) {
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
    const handlePress = (e) => {
        if (route) {
            push(APP_ROUTES[route].path);
        }
        else if (href) {
            push(href);
        }
        if (onPress) {
            onPress(e);
        }
    };
    return (_jsxs(Pressable, { onPress: handlePress, className: cn('flex-row items-center justify-center gap-2 transition-all active:scale-95', variants[variant], sizes[size], className), ...props, children: [icon && icon, label && (_jsx(Text, { className: cn('font-bold tracking-tight', textColors[variant], textClassName), children: label })), children] }));
}
