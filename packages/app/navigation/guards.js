import { APP_ROUTES } from './routes';
export const isPublicRoute = (routeKey) => {
    return APP_ROUTES[routeKey].public === true;
};
// In Live Mode, this will delegate to Supabase Auth middleware.
export const requiresAuth = (routeKey) => {
    return !isPublicRoute(routeKey);
};
import { supabase } from '../provider/supabase';
// Check if user has a valid session
export const isAuthenticated = async () => {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
};
