// Placeholder: Wire up to LaunchDarkly, Statsig, or Vercel Edge Config
// In Mock Mode, all flags are enabled by default.
const FLAGS = {
// 'analytics': false, // Example: disable analytics page in staging
};
export const isRouteEnabled = (routeKey) => {
    return FLAGS[routeKey] !== false;
};
