import { jsx as _jsx, jsxs as _jsxs } from "nativewind/jsx-runtime";
import { View, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import { cn } from '../utils';
import { Text } from './typography';
import { ChevronDown } from 'lucide-react-native';
if (Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
// Simple Context-less Accordion for MVP
// In a full implementation, use Context to handle "single" vs "multiple" types
export function Accordion({ className, children, ...props }) {
    return _jsx(View, { className: cn('gap-2', className), ...props, children: children });
}
export function AccordionItem({ className, value, children, ...props }) {
    // In this simple version, state is managed internally or by parent. 
    // For now, we'll let each item manage its own state if not controlled.
    return _jsx(View, { className: cn('border-b border-border', className), ...props, children: children });
}
export function AccordionTrigger({ className, children, onClick, isOpen, ...props }) {
    return (_jsxs(Pressable, { onPress: () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            onClick && onClick();
        }, className: cn('flex-row items-center justify-between py-4 font-medium transition-all', className), ...props, children: [typeof children === 'string' ? _jsx(Text, { children: children }) : children, _jsx(ChevronDown, { size: 16, className: cn('text-muted-foreground transition-transform duration-200', isOpen ? 'rotate-180' : ''), color: "black" // TODO: Use theme color
             })] }));
}
export function AccordionContent({ className, children, isOpen, ...props }) {
    if (!isOpen)
        return null;
    return (_jsx(View, { className: cn('overflow-hidden text-sm pb-4 pt-0', className), ...props, children: children }));
}
