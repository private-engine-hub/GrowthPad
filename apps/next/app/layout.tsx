
import './globals.css'

export const metadata = {
    title: 'GrowthPad',
    description: 'The Unified Strategic Playbook Canvas',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}
