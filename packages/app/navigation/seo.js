import { APP_ROUTES } from './routes';
import { getAbsoluteUrl } from './url-resolver';
export const getPageMeta = (routeKey) => {
    const route = APP_ROUTES[routeKey];
    return {
        title: route.meta?.title || `${route.name} | GrowthPad`,
        description: route.meta?.description || 'AI-powered strategic planning for SMBs.',
        openGraph: {
            url: getAbsoluteUrl(routeKey),
            title: route.meta?.title || route.name,
        },
    };
};
