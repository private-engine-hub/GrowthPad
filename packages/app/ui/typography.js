import { jsx as _jsx } from "nativewind/jsx-runtime";
import { Text as RNText } from 'react-native';
import { cn } from '../utils';
export function Text({ className, ...props }) {
    return (_jsx(RNText, { className: cn('text-base text-foreground', className), ...props }));
}
export function H1({ className, ...props }) {
    return (_jsx(RNText, { className: cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className), ...props }));
}
export function H2({ className, ...props }) {
    return (_jsx(RNText, { className: cn('scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0', className), ...props }));
}
export function H3({ className, ...props }) {
    return (_jsx(RNText, { className: cn('scroll-m-20 text-2xl font-semibold tracking-tight', className), ...props }));
}
export function H4({ className, ...props }) {
    return (_jsx(RNText, { className: cn('scroll-m-20 text-xl font-semibold tracking-tight', className), ...props }));
}
export function Lead({ className, ...props }) {
    return (_jsx(RNText, { className: cn('text-xl text-muted-foreground', className), ...props }));
}
export function Small({ className, ...props }) {
    return (_jsx(RNText, { className: cn('text-sm font-medium leading-none', className), ...props }));
}
