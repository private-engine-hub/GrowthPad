'use client'

import { DashboardLayout } from 'app/ui/dashboard-layout'

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout>{children}</DashboardLayout>
}
