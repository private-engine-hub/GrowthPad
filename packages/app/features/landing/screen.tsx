import { View, ScrollView, Pressable } from 'react-native';
import { Text, H1, H2, Lead, Small } from '../../ui/typography';
import { Card, CardContent } from '../../ui/card';
import { useRouter } from 'solito/navigation';
import { ChevronRight, Layout, Zap, Shield, BarChart3 } from 'lucide-react-native';

import { Button } from '../../ui/button';

export function LandingScreen() {
    return (
        <ScrollView className="flex-1 bg-white">
            {/* Nav Bar */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-slate-100">
                <H2 className="text-blue-600 font-bold tracking-tight">GrowthPad</H2>
                <View className="flex-row gap-4">
                    <Button label="Sign In" variant="ghost" href="/login" />
                    <Button label="Get Started" variant="primary" size="sm" href="/login" />
                </View>
            </View>

            {/* Hero Section */}
            <View className="px-6 py-16 items-center text-center">
                <View className="bg-blue-50 px-3 py-1 rounded-full mb-6">
                    <Small className="text-blue-700 font-bold">2025 READY ARCHITECTURE</Small>
                </View>
                <H1 className="text-slate-900 text-center mb-6">
                    Accelerate Your Business <Text className="text-blue-600">Growth</Text>
                </H1>
                <Lead className="text-slate-500 text-center max-w-2xl">
                    The unified strategic command center for modern SaaS founders.
                    Manage objectives, track jobs, and scale with conviction.
                </Lead>
                <View className="mt-10 flex-row gap-4">
                    <Button label="Build Your Workboard" size="lg" href="/login" />
                    <Button label="View Demo" variant="outline" size="lg" />
                </View>
            </View>

            {/* Features Preview */}
            <View className="px-6 py-16 bg-slate-50">
                <View className="items-center mb-12">
                    <H2 className="text-slate-900 mb-2">Everything you need to scale</H2>
                    <Text className="text-slate-500">Built for speed, efficiency, and clarity.</Text>
                </View>

                <View className="gap-6 md:flex-row flex-wrap justify-center">
                    <FeatureCard
                        icon={Layout}
                        title="Workboard"
                        desc="Visualize your entire strategic cascade from Pillars to Jobs."
                    />
                    <FeatureCard
                        icon={Zap}
                        title="AI Simulation"
                        desc="Generate resources and simulate growth scenarios instantly."
                    />
                    <FeatureCard
                        icon={BarChart3}
                        title="Analytics"
                        desc="Real-time tracking of operational and financial health."
                    />
                </View>
            </View>

            {/* Footer */}
            <View className="p-12 items-center border-t border-slate-100">
                <Text className="text-slate-400">© 2025 GrowthPad. All rights reserved.</Text>
            </View>
        </ScrollView>
    );
}

function FeatureCard({ icon: Icon, title, desc }: any) {
    return (
        <Card className="w-full md:w-[300px] bg-white border-none shadow-sm">
            <CardContent className="p-6">
                <View className="w-12 h-12 bg-blue-50 rounded-lg items-center justify-center mb-4">
                    <Icon color="#2563eb" size={24} />
                </View>
                <H2 className="text-lg mb-2">{title}</H2>
                <Text className="text-slate-500 leading-relaxed">{desc}</Text>
            </CardContent>
        </Card>
    );
}
