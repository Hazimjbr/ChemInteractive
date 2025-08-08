'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from './header';

const indicators = {
  phenolphthalein: { range: [8.2, 10.0], color: 'rgba(255, 192, 203, 0.5)' },
  bromothymolBlue: { range: [6.0, 7.6], color: 'rgba(255, 255, 0, 0.5)' },
  methylOrange: { range: [3.1, 4.4], color: 'rgba(255, 165, 0, 0.5)' },
};

export default function TitrationExperiment() {
    const [acidVolume, setAcidVolume] = useState(25);
    const [acidConcentration, setAcidConcentration] = useState(0.1);
    const [baseConcentration, setBaseConcentration] = useState(0.1);
    const [indicator, setIndicator] = useState('phenolphthalein');
    const [isRunning, setIsRunning] = useState(false);
    const [volumeAdded, setVolumeAdded] = useState(0);
    const [data, setData] = useState<{ x: number; y: number }[]>([]);
    const [ph, setPh] = useState(1);
    const [equivalencePoint, setEquivalencePoint] = useState<number | null>(null);

    const calculatePH = (baseAdded: number) => {
        const initialMolesAcid = acidVolume * acidConcentration / 1000;
        const molesBaseAdded = baseAdded * baseConcentration / 1000;
        const totalVolume = (acidVolume + baseAdded) / 1000;

        let H_plus;
        if (molesBaseAdded < initialMolesAcid) {
            H_plus = (initialMolesAcid - molesBaseAdded) / totalVolume;
        } else if (molesBaseAdded > initialMolesAcid) {
            const OH_minus = (molesBaseAdded - initialMolesAcid) / totalVolume;
            const pOH = -Math.log10(OH_minus);
            return 14 - pOH;
        } else {
            return 7; // Equivalence point for strong acid-strong base
        }
        return -Math.log10(H_plus);
    };

    useEffect(() => {
        const initialPh = calculatePH(0);
        setPh(initialPh);
        setData([{ x: 0, y: initialPh }]);
        const ep = (acidVolume * acidConcentration) / baseConcentration;
        setEquivalencePoint(ep);
    }, [acidVolume, acidConcentration, baseConcentration]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning && volumeAdded < 50) {
            interval = setInterval(() => {
                setVolumeAdded(v => {
                    const newVolume = v + 0.1;
                    const newPh = calculatePH(newVolume);
                    setPh(newPh);
                    setData(d => [...d, { x: newVolume, y: newPh }]);
                    return newVolume;
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isRunning, volumeAdded, acidVolume, acidConcentration, baseConcentration]);


    const handleReset = () => {
        setIsRunning(false);
        setVolumeAdded(0);
        const initialPh = calculatePH(0);
        setPh(initialPh);
        setData([{ x: 0, y: initialPh }]);
    };
    
    const indicatorColor = indicators[indicator as keyof typeof indicators];
    const currentIndicatorColor = ph >= indicatorColor.range[0] && ph <= indicatorColor.range[1] ? indicatorColor.color : 'transparent';


    return (
        <div className="flex flex-col h-full">
            <Header title="Acid-Base Titration" description="An interactive simulation of a strong acid-strong base titration." />
            <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Experiment Controls</CardTitle>
                        <CardDescription>Set the initial parameters for your titration.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="acid-volume">Acid Volume (mL)</Label>
                            <Input id="acid-volume" type="number" value={acidVolume} onChange={e => setAcidVolume(parseFloat(e.target.value))} disabled={isRunning} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="acid-concentration">Acid Concentration (M)</Label>
                            <Input id="acid-concentration" type="number" value={acidConcentration} onChange={e => setAcidConcentration(parseFloat(e.target.value))} disabled={isRunning} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="base-concentration">Base Concentration (M)</Label>
                            <Input id="base-concentration" type="number" value={baseConcentration} onChange={e => setBaseConcentration(parseFloat(e.target.value))} disabled={isRunning} />
                        </div>
                         <div className="space-y-2">
                            <Label>Indicator</Label>
                            <Select value={indicator} onValueChange={setIndicator} disabled={isRunning}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Indicator" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="phenolphthalein">Phenolphthalein</SelectItem>
                                    <SelectItem value="bromothymolBlue">Bromothymol Blue</SelectItem>
                                    <SelectItem value="methylOrange">Methyl Orange</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'Pause' : 'Start'}</Button>
                            <Button onClick={handleReset} variant="outline">Reset</Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2 space-y-8">
                     <Card className="flex flex-col items-center justify-center p-4 min-h-[400px]">
                        <p className="text-2xl font-bold">pH: {ph.toFixed(2)}</p>
                        <p className="text-muted-foreground">{volumeAdded.toFixed(2)} mL of Base Added</p>
                        <div className="w-40 h-60 mt-4 bg-gray-200 rounded-t-lg" style={{backgroundColor: currentIndicatorColor}}>
                        </div>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Titration Curve</CardTitle>
                             <CardDescription>pH vs. Volume of Base Added</CardDescription>
                        </CardHeader>
                        <CardContent className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                        dataKey="x" 
                                        type="number" 
                                        domain={[0, 50]} 
                                        label={{ value: 'Volume of Base (mL)', position: 'insideBottom', offset: -10 }} 
                                        unit="mL"
                                    />
                                    <YAxis 
                                        domain={[0, 14]} 
                                        label={{ value: 'pH', angle: -90, position: 'insideLeft' }} 
                                    />
                                    <Tooltip />
                                    <Legend verticalAlign="top" />
                                    <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} dot={false} name="pH" />
                                    {equivalencePoint && <ReferenceLine x={equivalencePoint} stroke="red" label="Equiv. Point" />}
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}