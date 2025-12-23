import { RouteKey, APP_ROUTES } from './routes';

export const isPublicRoute = (routeKey: RouteKey): boolean => {
    return APP_ROUTES[routeKey].public === true;
};

// In Mock Mode, we assume the user is always authenticated for now.
// In Live Mode, this will delegate to Supabase Auth middleware.
export const requiresAuth = (routeKey: RouteKey): boolean => {
    return !isPublicRoute(routeKey);
};

// Stub for client-side usage
export const isAuthenticated = () => true;
