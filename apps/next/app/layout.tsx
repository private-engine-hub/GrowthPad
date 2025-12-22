
import './globals.css'

export const metadata = {
    title: 'GrowthPad',
    description: 'The Unified Strategic Playbook Canvas',
}

import { Providers } from './providers'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
