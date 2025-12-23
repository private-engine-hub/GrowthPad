import { RouteKey, APP_ROUTES, RouteConfig } from './routes';
import { getAbsoluteUrl } from './url-resolver';

export const getPageMeta = (routeKey: RouteKey) => {
    const route = APP_ROUTES[routeKey] as RouteConfig;
    return {
        title: route.meta?.title || `${route.name} | GrowthPad`,
        description: route.meta?.description || 'AI-powered strategic planning for SMBs.',
        openGraph: {
            url: getAbsoluteUrl(routeKey),
            title: route.meta?.title || route.name,
        },
    };
};
