import { RouteKey } from './routes';
export declare const getPageMeta: (routeKey: RouteKey) => {
    title: string;
    description: string;
    openGraph: {
        url: string;
        title: string;
    };
};
