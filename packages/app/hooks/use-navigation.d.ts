import { RouteKey } from '../navigation/routes';
export declare function useAppNavigation(): {
    navigate: (routeKey: RouteKey, options?: {
        trackSource?: string;
    }) => void;
    getPath: (routeKey: RouteKey) => string;
    getName: (routeKey: RouteKey) => string;
};
