import NativeWindRegistry from './registry'
import './globals.css'

export const metadata = {
    title: 'GrowthPad',
    description: 'The Unified Strategic Command Center',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <NativeWindRegistry>{children}</NativeWindRegistry>
            </body>
        </html>
    )
}
