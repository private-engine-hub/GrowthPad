'use client';

import { View, TouchableOpacity, Platform } from 'react-native';
import { Text, H1, H3, Small } from '../../ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { PILLARS, THEMES, MOCK_OBJECTIVES, type Job } from '../../data';
import { cn } from '../../utils';
import { useState } from 'react';
import { Sheet } from '../../ui/layout/sheet';
import { UniversalGrid } from '../../ui/layout/universal-grid';
import { PillarColumn } from './components/pillar-column';

// BEST PRACTICE: Structural Platform Fix
// Using UniversalCanvas as a Layout Switcher (Web Grid / Native Pager)
export function WorkboardScreen() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const renderHeader = () => (
        <View className="mb-8 px-6 pt-6">
            <H1 className="text-slate-900 font-black tracking-tight">Growth Workboard</H1>
            <Text className="text-slate-400 text-lg">Unified Strategic Command Center</Text>
        </View>
    );

    return (
        <View className="flex-1 bg-white">
            {/* Header is outside on mobile, or could be part of layout. 
                For now keeping it separate but UniversalCanvas takes full height.
                Maybe put header inside a wrapper if needed? 
                Actually UniversalCanvas on web is h-screen. 
                On web, we probably want the header above the columns.
                For simplicity, let's put the header inside the return but above Canvas.
            */}
            {/* Note: UniversalCanvas on Web is h-screen. If we put header above, we might overflow.
                Ideally UniversalCanvas is flex-1. 
                My implementation: md:h-screen. 
                Let's adjust Workboard to be a flex container.
            */}

            <View className="flex-1">
                {/* Main Screen Header - Scrollable? 
                     On Web, this should probably be outside the columns. 
                     On Native, inside the Pager? No, sticky top.
                 */}
                <View className="md:hidden">
                    {/* Native Header */}
                    {renderHeader()}
                </View>

                <View className="hidden md:block">
                    {/* Web Header */}
                    {renderHeader()}
                </View>

                <UniversalGrid>
                    {PILLARS.map((pillar) => (
                        <PillarColumn
                            key={pillar.id}
                            header={
                                <View className="p-4 border-b border-slate-100 bg-blue-600">
                                    <H3 className="text-white font-bold">{pillar.title}</H3>
                                    <Small className="text-blue-100">{pillar.description}</Small>
                                </View>
                            }
                        >
                            <PillarContent pillarId={pillar.id} onJobPress={setSelectedJob} />
                        </PillarColumn>
                    ))}
                </UniversalGrid>
            </View>

            <Sheet
                isOpen={!!selectedJob}
                onClose={() => setSelectedJob(null)}
                title={selectedJob?.title || 'Job Details'}
            >
                {selectedJob && (
                    <View className="gap-4">
                        <View className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <Text className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Status</Text>
                            <StatusBadge status={selectedJob.status} />
                        </View>

                        <View>
                            <Text className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Value Estimate</Text>
                            <Text className="text-lg font-semibold text-slate-900">{selectedJob.valueEst}</Text>
                        </View>

                        <View>
                            <Text className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Why Now?</Text>
                            <Text className="text-base text-slate-700">{selectedJob.whyNow}</Text>
                        </View>

                        <View>
                            <Text className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Next Steps</Text>
                            <View className="gap-2">
                                {selectedJob.steps.map((step, i) => (
                                    <View key={i} className="flex-row gap-3 items-start">
                                        <View className="w-6 h-6 rounded-full bg-blue-100 items-center justify-center mt-0.5">
                                            <Text className="text-xs font-bold text-blue-700">{i + 1}</Text>
                                        </View>
                                        <Text className="text-slate-600 flex-1 leading-6">{step}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                )}
            </Sheet>
        </View>
    );
}

function PillarContent({
    pillarId,
    onJobPress
}: {
    pillarId: string,
    onJobPress: (job: Job) => void
}) {
    return (
        <View className="gap-4">
            {THEMES.filter((t) => t.pillarId === pillarId).map((theme) => {
                const themeObjectives = MOCK_OBJECTIVES.filter(
                    (o) => o.themeId === theme.id
                );

                if (themeObjectives.length === 0) return null;

                return (
                    <Card key={theme.id} className="border-l-4 border-l-blue-400 bg-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base text-slate-700 font-semibold">
                                {theme.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion className="gap-2">
                                {themeObjectives.map((objective) => (
                                    <ObjectiveItem
                                        key={objective.id}
                                        objective={objective}
                                        onJobPress={onJobPress}
                                    />
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                );
            })}
        </View>
    );
}

function ObjectiveItem({
    objective,
    onJobPress
}: {
    objective: any,
    onJobPress: (job: Job) => void
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <AccordionItem className="border-none">
            <AccordionTrigger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <Text className="font-semibold text-slate-800">{objective.title}</Text>
            </AccordionTrigger>
            <AccordionContent isOpen={isOpen}>
                <View className="gap-3 pt-2">
                    {objective.jobs.map((job: Job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onPress={() => onJobPress(job)}
                        />
                    ))}
                </View>
            </AccordionContent>
        </AccordionItem>
    );
}

function JobCard({ job, onPress }: { job: Job, onPress: () => void }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className="rounded-md border border-slate-200 bg-white p-3 shadow-sm hover:border-blue-400 transition-colors"
        >
            <View className="flex-row justify-between">
                <Text className="font-medium text-slate-900">{job.title}</Text>
                <StatusBadge status={job.status} />
            </View>
            <Small className="mt-1 text-slate-500">{job.valueEst}</Small>
            <View className="mt-2 bg-slate-100 p-2 rounded">
                <Small className="text-slate-600 font-medium">Next Step:</Small>
                <Text className="text-xs text-slate-500">{job.steps[0]}</Text>
            </View>
        </TouchableOpacity>
    );
}

function StatusBadge({ status }: { status: Job['status'] }) {
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


