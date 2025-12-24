export type RouteKey = 'landing' | 'login' | 'signup' | 'home' | 'dashboard' | 'planner' | 'playbooks' | 'analytics' | 'settings';
export type RouteConfig = {
    path: string;
    name: string;
    public?: boolean;
    meta?: {
        title: string;
        description: string;
    };
};
export declare const APP_ROUTES: Record<RouteKey, RouteConfig>;
