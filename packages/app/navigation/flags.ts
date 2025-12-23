import { RouteKey } from './routes';

// Placeholder: Wire up to LaunchDarkly, Statsig, or Vercel Edge Config
// In Mock Mode, all flags are enabled by default.
const FLAGS: Partial<Record<RouteKey, boolean>> = {
    // 'analytics': false, // Example: disable analytics page in staging
};

export const isRouteEnabled = (routeKey: RouteKey): boolean => {
    return FLAGS[routeKey] !== false;
};
