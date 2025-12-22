import { View, ScrollView } from 'react-native';
import { H1, Lead, Text, Small } from '../../ui/typography';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Shield, ChevronLeft, Chrome } from 'lucide-react-native';

export function LoginScreen() {
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 min-h-[100vh] justify-center items-center p-6 bg-slate-50/50">
                <Button
                    href="/"
                    variant="ghost"
                    size="sm"
                    className="absolute top-10 left-6 flex-row gap-1"
                    label="Back"
                    icon={<ChevronLeft size={16} color="#64748b" />}
                />

                <Card className="w-full max-w-md shadow-2xl shadow-slate-200 border-none bg-white py-4">
                    <CardHeader className="items-center pb-2">
                        <View className="w-14 h-14 bg-blue-600 rounded-2xl items-center justify-center mb-6 shadow-xl shadow-blue-200">
                            <Shield color="white" size={28} />
                        </View>
                        <H1 className="text-3xl text-slate-900 border-none">Sign In</H1>
                        <Lead className="text-center text-slate-500 mt-2 px-4">
                            One-click access to your strategic playbook canvas with Supabase & Google
                        </Lead>
                    </CardHeader>

                    <CardContent className="gap-8 pt-8 px-8">
                        {/* 
                          GOOGLE LOGIN - The "Best in Class" 2025 Flow.
                          In a real Supabase app, this would trigger:
                          supabase.auth.signInWithOAuth({ provider: 'google' })
                        */}
                        <Button
                            href="/dashboard"
                            variant="outline"
                            size="lg"
                            className="w-full border-slate-200 py-4 h-16"
                            icon={<Chrome size={20} color="#000" />}
                            label="Continue with Google"
                            textClassName="text-slate-900 text-lg"
                        />

                        <View className="flex-row items-center gap-4">
                            <View className="flex-1 h-[1px] bg-slate-100" />
                            <Text className="text-slate-300 text-xs font-bold uppercase tracking-widest">Secured by Supabase</Text>
                            <View className="flex-1 h-[1px] bg-slate-100" />
                        </View>

                        <View className="items-center">
                            <Small className="text-center text-slate-400 leading-relaxed">
                                By continuing, you agree to GrowthPad's{"\n"}
                                <Text className="text-blue-600">Terms of Service</Text> and <Text className="text-blue-600">Privacy Policy</Text>.
                            </Small>
                        </View>
                    </CardContent>
                </Card>

                <View className="mt-10 flex-row gap-8 opacity-40">
                    <Shield size={20} color="#64748b" />
                    <View className="w-5 h-5 bg-slate-400 rounded-sm" />
                    <View className="w-5 h-5 bg-slate-400 rounded-full" />
                </View>
            </View>
        </ScrollView>
    );
}
