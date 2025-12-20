import { ScrollView, View } from 'react-native';
import { Text, H1, H3, Small } from '../../ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { PILLARS, THEMES, MOCK_OBJECTIVES, type Job } from '../../data';
import { cn } from '../../utils';
import { useState } from 'react';
import { DashboardLayout } from '../../ui/dashboard-layout';

export function WorkboardScreen() {
    return (
        <DashboardLayout>
            <ScrollView className="flex-1 p-6">
                <View className="mb-8">
                    <H1 className="text-slate-900 font-black tracking-tight">Strategy Workboard</H1>
                    <Text className="text-slate-400 text-lg">Manage your growth cascade</Text>
                </View>

                <View className="gap-6 pb-12">
                    {PILLARS.map((pillar) => (
                        <View key={pillar.id} className="gap-4">
                            {/* Pillar Header "Jira Blue" style */}
                            <View className="rounded-lg bg-[#0052cc] p-3 shadow-sm">
                                <H3 className="text-white">{pillar.title}</H3>
                                <Small className="text-blue-100">{pillar.description}</Small>
                            </View>

                            {/* Themes Cascade */}
                            {THEMES.filter((t) => t.pillarId === pillar.id).map((theme) => {
                                const themeObjectives = MOCK_OBJECTIVES.filter(
                                    (o) => o.themeId === theme.id
                                );

                                if (themeObjectives.length === 0) return null;

                                return (
                                    <Card key={theme.id} className="border-l-4 border-l-blue-500">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-lg text-slate-700">
                                                {theme.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Accordion className="gap-2">
                                                {themeObjectives.map((objective) => (
                                                    <ObjectiveItem key={objective.id} objective={objective} />
                                                ))}
                                            </Accordion>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </DashboardLayout>
    );
}

function ObjectiveItem({ objective }: { objective: any }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <AccordionItem className="border-none">
            <AccordionTrigger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <Text className="font-semibold text-slate-800">{objective.title}</Text>
            </AccordionTrigger>
            <AccordionContent isOpen={isOpen}>
                <View className="gap-3 pt-2">
                    {objective.jobs.map((job: Job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </View>
            </AccordionContent>
        </AccordionItem>
    );
}

function JobCard({ job }: { job: Job }) {
    return (
        <View className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
            <View className="flex-row justify-between">
                <Text className="font-medium text-slate-900">{job.title}</Text>
                <StatusBadge status={job.status} />
            </View>
            <Small className="mt-1 text-slate-500">{job.valueEst}</Small>
            <View className="mt-2 bg-slate-100 p-2 rounded">
                <Small className="text-slate-600 font-medium">Next Step:</Small>
                <Text className="text-xs text-slate-500">{job.steps[0]}</Text>
            </View>
        </View>
    );
}

function StatusBadge({ status }: { status: Job['status'] }) {
    const colors = {
        todo: 'bg-slate-100 text-slate-600',
        in_progress: 'bg-blue-100 text-blue-700',
        done: 'bg-green-100 text-green-700',
    };

    // We can't put text classes on View, so we split or just use View styles
    // Simpler: Just styled View + Text
    const bgColors = {
        todo: 'bg-slate-100',
        in_progress: 'bg-blue-100',
        done: 'bg-green-100',
    }
    const textColors = {
        todo: 'text-slate-600',
        in_progress: 'text-blue-700',
        done: 'text-green-700',
    }

    return (
        <View className={cn("rounded-full px-2 py-0.5", bgColors[status])}>
            <Text className={cn("text-xs font-medium", textColors[status])}>
                {status.replace('_', ' ')}
            </Text>
        </View>
    )
}
