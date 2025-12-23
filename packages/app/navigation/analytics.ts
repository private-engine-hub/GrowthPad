import { RouteKey, APP_ROUTES } from './routes';

type AnalyticsProvider = {
    track: (event: string, properties?: Record<string, any>) => void;
};

let provider: AnalyticsProvider | null = null;

export const setAnalyticsProvider = (p: AnalyticsProvider) => { provider = p; };

export const trackNavigation = (routeKey: RouteKey, source?: string) => {
    const eventName = 'Page Viewed';
    const properties = {
        page_name: APP_ROUTES[routeKey].name,
        page_path: APP_ROUTES[routeKey].path,
        source: source || 'direct',
    };

    // Log to console in development (Mock Mode)
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] ${eventName}:`, properties);
    }

    if (!provider) return;
    provider.track(eventName, properties);
};
