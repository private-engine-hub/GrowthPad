import { APP_ROUTES } from './routes';
// Base URL from environment (set per deployment)
const getBaseUrl = () => {
    // 1. Explicit Environment Override (Standard SaaS Pattern)
    if (process.env.NEXT_PUBLIC_APP_URL)
        return process.env.NEXT_PUBLIC_APP_URL;
    // 2. Native Override
    if (process.env.EXPO_PUBLIC_APP_URL)
        return process.env.EXPO_PUBLIC_APP_URL;
    // 3. Fallback for Local Dev (Client-Side)
    if (typeof window !== 'undefined')
        return window.location.origin;
    // 4. Default Safety Net (Production)
    return 'https://growthpad.app';
};
export const getAbsoluteUrl = (routeKey) => {
    return `${getBaseUrl()}${APP_ROUTES[routeKey].path}`;
};
// Deep Link (for mobile)
export const getDeepLink = (routeKey) => {
    const scheme = process.env.EXPO_PUBLIC_DEEP_LINK_SCHEME || 'growthpad';
    return `${scheme}:/${APP_ROUTES[routeKey].path}`;
};
