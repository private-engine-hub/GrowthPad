import { RouteKey } from './routes';
export declare const isPublicRoute: (routeKey: RouteKey) => boolean;
export declare const requiresAuth: (routeKey: RouteKey) => boolean;
export declare const isAuthenticated: () => Promise<boolean>;
