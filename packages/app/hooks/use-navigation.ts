import { useRouter } from 'next/navigation';
import { APP_ROUTES, RouteKey } from '../navigation/routes';
import { trackNavigation } from '../navigation/analytics';
import { Platform } from 'react-native';

export function useAppNavigation() {
    const router = useRouter();

    const navigate = (routeKey: RouteKey, options?: { trackSource?: string }) => {
        trackNavigation(routeKey, options?.trackSource);

        // In strict architecture, we'd use a generic adapter here.
        // For this specific boilerplate, we know we are in Next.js (Web) or Expo (Native).

        if (Platform.OS === 'web') {
            router.push(APP_ROUTES[routeKey].path);
        } else {
            // Native navigation logic would go here (e.g. valid Expo Router link)
            // For now, we assume this hook is primarily consumed by Web Shell components
            // or shared components that handle platform checks internally.
            console.warn('Native navigation not yet implemented in useAppNavigation');
        }
    };

    const getPath = (routeKey: RouteKey) => APP_ROUTES[routeKey].path;
    const getName = (routeKey: RouteKey) => APP_ROUTES[routeKey].name;

    return { navigate, getPath, getName };
}
