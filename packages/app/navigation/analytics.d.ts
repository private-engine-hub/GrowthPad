import { RouteKey } from './routes';
type AnalyticsProvider = {
    track: (event: string, properties?: Record<string, any>) => void;
};
export declare const setAnalyticsProvider: (p: AnalyticsProvider) => void;
export declare const trackNavigation: (routeKey: RouteKey, source?: string) => void;
export {};
