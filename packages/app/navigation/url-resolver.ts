import { APP_ROUTES, RouteKey } from './routes';

// Base URL from environment (set per deployment)
const getBaseUrl = (): string => {
    // Server-side (Next.js API routes, emails)
    if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
    // Native (Expo)
    if (process.env.EXPO_PUBLIC_APP_URL) return process.env.EXPO_PUBLIC_APP_URL;
    // Client-side fallback
    if (typeof window !== 'undefined') return window.location.origin;
    // Default (should not reach here in production)
    return 'https://app.growthpad.com';
};

export const getAbsoluteUrl = (routeKey: RouteKey): string => {
    return `${getBaseUrl()}${APP_ROUTES[routeKey].path}`;
};

// Deep Link (for mobile)
export const getDeepLink = (routeKey: RouteKey): string => {
    const scheme = process.env.EXPO_PUBLIC_DEEP_LINK_SCHEME || 'growthpad';
    return `${scheme}:/${APP_ROUTES[routeKey].path}`;
};
