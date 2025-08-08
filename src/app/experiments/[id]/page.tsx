'use client';

import { use } from 'react';
import Header from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TitrationExperiment from '@/components/titration-experiment';

// Mock data for experiments - in a real app this would come from a database or CMS
const experimentsData: { [key: string]: { title: string; description: string } } = {
  'acid-base-titration': {
    title: 'Acid-Base Titration',
    description: 'Determine the concentration of an unknown acid or base.',
  },
  'synthesis-of-aspirin': {
    title: 'Synthesis of Aspirin',
    description: 'Synthesize acetylsalicylic acid (aspirin) from salicylic acid and acetic anhydride.',
  },
  'gas-laws-exploration': {
    title: 'Gas Laws Exploration',
    description: 'Investigate the relationships between pressure, volume, and temperature of a gas.',
  },
  'redox-reactions': {
    title: 'Redox Reactions',
    description: 'Observe and analyze oxidation-reduction reactions, such as the reaction between copper and nitric acid.',
  },
  // Add other experiments here
};

export default function ExperimentPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise);
    const experiment = experimentsData[params.id];

    if (!experiment) {
        return (
            <div className="flex flex-col h-full">
                <Header title="Experiment Not Found" />
                <div className="flex-1 p-8 flex items-center justify-center">
                    <p>The experiment you are looking for does not exist.</p>
                </div>
            </div>
        );
    }

    // Specific component for the acid-base titration experiment
    if (params.id === 'acid-base-titration') {
        return <TitrationExperiment />;
    }

    // Placeholder for other experiments
    return (
        <div className="flex flex-col h-full">
            <Header title={experiment.title} description={experiment.description} />
            <div className="flex-1 p-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Virtual Lab</CardTitle>
                        <CardDescription>This experiment is under construction.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Check back later for an interactive simulation!</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
