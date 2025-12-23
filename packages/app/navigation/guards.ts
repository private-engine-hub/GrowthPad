import { RouteKey, APP_ROUTES } from './routes';

export const isPublicRoute = (routeKey: RouteKey): boolean => {
    return APP_ROUTES[routeKey].public === true;
};

// In Live Mode, this will delegate to Supabase Auth middleware.
export const requiresAuth = (routeKey: RouteKey): boolean => {
    return !isPublicRoute(routeKey);
};

import { supabase } from '../provider/supabase';

// Check if user has a valid session
export const isAuthenticated = async () => {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
};
