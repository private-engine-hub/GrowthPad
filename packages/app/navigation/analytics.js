import { APP_ROUTES } from './routes';
let provider = null;
export const setAnalyticsProvider = (p) => { provider = p; };
export const trackNavigation = (routeKey, source) => {
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
    if (!provider)
        return;
    provider.track(eventName, properties);
};
