'use client'

import React from 'react';
import Link from 'next/link';
import { APP_ROUTES, RouteKey } from 'app/navigation/routes';
import { trackNavigation } from 'app/navigation/analytics';
import { cn } from '@/lib/utils';
import { usePathname } from "next/navigation"

interface AppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    route: RouteKey;
    children?: React.ReactNode;
    className?: string;
    trackSource?: string;
    // Support custom onClick for composition
    onClick?: (e?: React.MouseEvent) => void;
    // Support variant for active state checking (used in Sidebar)
    activeClassName?: string;
}

export function AppLink({ route, children, className, trackSource, onClick, activeClassName, ...props }: AppLinkProps) {
    const { path } = APP_ROUTES[route];
    const pathname = usePathname()
    const isActive = pathname === path

    const handleClick = (e: React.MouseEvent) => {
        trackNavigation(route, trackSource);
        if (onClick) onClick(e);
    };

    return (
        <Link
            href={path}
            onClick={handleClick}
            className={cn(className, isActive && activeClassName)}
            {...props}
        >
            {children}
        </Link>
    );
}
