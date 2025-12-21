'use client'

import Link from 'next/link'
import { ArrowRight, Layout, Zap, CheckCircle2, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * 🚀 Landing Shell
 * Structure: Header -> Hero -> Social Proof -> Features -> CTA -> Footer
 */
export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            {/* 
        --------------------
        1. MAIN HEADER
        --------------------
      */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    {/* Logo Block */}
                    <div className="flex items-center gap-2 font-black text-xl tracking-tight text-[#0079BF]">
                        <div className="h-8 w-8 rounded-lg bg-[#0079BF] flex items-center justify-center">
                            <Zap className="h-5 w-5 text-white" />
                        </div>
                        GrowthPad
                    </div>

                    {/* Navigation Block */}
                    <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
                        <Link href="#features" className="hover:text-foreground transition-colors">
                            Features
                        </Link>
                        <Link href="#pricing" className="hover:text-foreground transition-colors">
                            Pricing
                        </Link>
                        <Link href="#about" className="hover:text-foreground transition-colors">
                            About
                        </Link>
                    </nav>

                    {/* Action Block */}
                    <div className="flex items-center gap-4">
                        <Link
                            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block"
                            href="/login"
                        >
                            Log in
                        </Link>
                        <Link href="/dashboard">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* 
          --------------------
          2. HERO SECTION
          -------------------- 
        */}
                <section className="container mx-auto flex flex-col items-center gap-8 py-24 text-center md:py-32 px-4">
                    <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-[#0079BF] bg-blue-50 border-blue-100">
                        <span className="flex h-2 w-2 rounded-full bg-amber-400 mr-2 animate-pulse"></span>
                        v3.0 Public Beta Live
                    </div>

                    <h1 className="max-w-[64rem] text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-[#0079BF]">
                        Your growth roadmap <br className="hidden sm:inline" />
                        <span className="text-amber-400">on easy mode</span>
                    </h1>

                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-8">
                        Stop checking 15 different tools. GrowthPad unifies your financial models,
                        operational OKRs, and market tasks into a single panoramic command center.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/dashboard">
                            <Button size="lg" className="h-12 px-8 text-lg bg-[#0079BF] hover:bg-[#026AA7] text-white">
                                Launch Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="#demo">
                            <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                                View Demo
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* 
          --------------------
          3. FEATURE GRID (Cards)
          --------------------
        */}
                <section id="features" className="container mx-auto space-y-12 py-8 md:py-12 lg:py-24 px-4">
                    <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                            Architecture First
                        </h2>
                        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                            Built on the &quot;Shared Brain&quot; protocol. Logic lives once, surfaces everywhere.
                        </p>
                    </div>

                    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="relative overflow-hidden rounded-xl border bg-card text-card-foreground p-2 hover:shadow-lg transition-all duration-200">
                            <div className="flex h-[180px] flex-col justify-between rounded-lg p-6">
                                <Layout className="h-10 w-10 text-primary" />
                                <div className="space-y-2">
                                    <h3 className="font-bold">Panoramic Web</h3>
                                    <p className="text-sm text-muted-foreground">
                                        A flexible canvas that adapts to your screen, giving you the full picture.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="relative overflow-hidden rounded-xl border bg-card text-card-foreground p-2 hover:shadow-lg transition-all duration-200">
                            <div className="flex h-[180px] flex-col justify-between rounded-lg p-6">
                                <Zap className="h-10 w-10 text-primary" />
                                <div className="space-y-2">
                                    <h3 className="font-bold">Native Speed</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Zero-latency native apps for iOS and Android, taking your strategy offline.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="relative overflow-hidden rounded-xl border bg-card text-card-foreground p-2 hover:shadow-lg transition-all duration-200">
                            <div className="flex h-[180px] flex-col justify-between rounded-lg p-6">
                                <CheckCircle2 className="h-10 w-10 text-primary" />
                                <div className="space-y-2">
                                    <h3 className="font-bold">Strategic Cascade</h3>
                                    <p className="text-sm text-muted-foreground">
                                        L1-L5 hierarchy ensures every task connects back to a P&L driver.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* 
        --------------------
        4. FOOTER
        --------------------
      */}
            <footer className="border-t py-6 md:py-0 bg-muted/20">
                <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
                    <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                        <Zap className="h-6 w-6 text-primary" />
                        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                            Built by <span className="font-semibold text-foreground">EngineRoom</span>.
                            The source code is available on <span className="font-medium underline underline-offset-4">GitHub</span>.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
