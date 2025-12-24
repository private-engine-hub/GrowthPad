/// <reference types="react" />
import { type ViewProps } from 'react-native';
interface SurfaceProps extends ViewProps {
    className?: string;
    children: React.ReactNode;
}
export declare function Surface({ className, children, ...props }: SurfaceProps): JSX.Element;
export {};
