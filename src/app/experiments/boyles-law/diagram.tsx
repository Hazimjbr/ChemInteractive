
'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import p5 from 'p5';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

// --- Constants ---
const CANVAS_HEIGHT = 350;
const TUBE_WIDTH = 25;
const TUBE_BEND_RADIUS = 40;
const INITIAL_GAS_HEIGHT = 150;
const INITIAL_PRESSURE = 1; // in atm

// --- React Component ---
export default function Diagram() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [pressure, setPressure] = useState(INITIAL_PRESSURE);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (sketchRef.current) {
      setWidth(sketchRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (width <= 0) return;

    p5InstanceRef.current?.remove();

    const sketch = (p: p5) => {
      let currentGasHeight = INITIAL_GAS_HEIGHT;
      const targetGasHeight = INITIAL_GAS_HEIGHT / pressure;

      p.setup = () => {
        p.createCanvas(width, CANVAS_HEIGHT);
        p.noStroke();
      };

      p.draw = () => {
        p.background('hsl(var(--card))');

        // Lerp for smooth animation
        currentGasHeight = p.lerp(currentGasHeight, targetGasHeight, 0.1);
        
        const centerX = width / 2;
        const tubeBottom = CANVAS_HEIGHT - TUBE_BEND_RADIUS;

        // Draw J-Tube
        p.stroke('hsl(var(--border))');
        p.strokeWeight(3);
        p.fill('hsl(var(--muted))');

        // Left arm (closed)
        p.line(centerX - TUBE_BEND_RADIUS, tubeBottom, centerX - TUBE_BEND_RADIUS, 50);
        p.line(centerX - TUBE_BEND_RADIUS - TUBE_WIDTH, tubeBottom, centerX - TUBE_BEND_RADIUS - TUBE_WIDTH, 50);
        p.line(centerX - TUBE_BEND_RADIUS - TUBE_WIDTH, 50, centerX - TUBE_BEND_RADIUS, 50); // top cap
        
        // Right arm (open)
        p.line(centerX + TUBE_BEND_RADIUS, tubeBottom, centerX + TUBE_BEND_RADIUS, 10);
        p.line(centerX + TUBE_BEND_RADIUS + TUBE_WIDTH, tubeBottom, centerX + TUBE_BEND_RADIUS + TUBE_WIDTH, 10);
        
        // Bend
        p.noFill();
        p.arc(centerX, tubeBottom, TUBE_BEND_RADIUS * 2, TUBE_BEND_RADIUS * 2, 0, p.PI);
        p.arc(centerX, tubeBottom, (TUBE_BEND_RADIUS + TUBE_WIDTH) * 2, (TUBE_BEND_RADIUS + TUBE_WIDTH) * 2, 0, p.PI);
        
        // --- Draw Mercury & Gas ---
        p.noStroke();
        
        // Mercury level in left arm depends on gas volume
        const leftMercuryY = tubeBottom - currentGasHeight;
        
        // Mercury level in right arm depends on pressure
        // 1 atm = 760 mmHg. We'll scale this. Let's say 1 atm difference = 76px difference.
        const pressureHeightDifference = (pressure - 1) * 76;
        const rightMercuryY = leftMercuryY - pressureHeightDifference;

        // Fill Mercury
        p.fill(180, 180, 180); // Silver-gray for mercury

        // Bottom U-part
        p.beginShape();
        p.vertex(centerX - TUBE_BEND_RADIUS - TUBE_WIDTH, tubeBottom);
        p.vertex(centerX + TUBE_BEND_RADIUS + TUBE_WIDTH, tubeBottom);
        p.vertex(centerX + TUBE_BEND_RADIUS + TUBE_WIDTH, rightMercuryY > tubeBottom ? tubeBottom : rightMercuryY);
        p.vertex(centerX + TUBE_BEND_RADIUS, rightMercuryY > tubeBottom ? tubeBottom : rightMercuryY);
        p.endShape(p.CLOSE);
        p.arc(centerX, tubeBottom, (TUBE_BEND_RADIUS + TUBE_WIDTH) * 2, (TUBE_BEND_RADIUS + TUBE_WIDTH) * 2, 0, p.PI);
        p.fill('hsl(var(--card))'); // cover inner part
        p.arc(centerX, tubeBottom, TUBE_BEND_RADIUS * 2, TUBE_BEND_RADIUS * 2, 0, p.PI);
        
        
        // Left arm mercury
        p.fill(180, 180, 180);
        p.rect(centerX - TUBE_BEND_RADIUS - TUBE_WIDTH, leftMercuryY, TUBE_WIDTH, tubeBottom - leftMercuryY);
        
        // Right arm mercury
        if (rightMercuryY < tubeBottom) {
             p.rect(centerX + TUBE_BEND_RADIUS, rightMercuryY, TUBE_WIDTH, tubeBottom - rightMercuryY);
        }

        // Fill Gas in left arm
        p.fill(173, 216, 230, 150); // Light blue for gas
        p.rect(centerX - TUBE_BEND_RADIUS - TUBE_WIDTH, 50, TUBE_WIDTH, leftMercuryY - 50);

        // --- Draw Labels ---
        p.fill('hsl(var(--foreground))');
        p.textAlign(p.CENTER);
        p.textSize(12);
        
        // Volume Label
        p.text('V', centerX - TUBE_BEND_RADIUS - (TUBE_WIDTH/2), leftMercuryY - (currentGasHeight/2));
        
        // Pressure Label
        p.text(`${pressure.toFixed(1)} atm`, centerX + TUBE_BEND_RADIUS + (TUBE_WIDTH/2), rightMercuryY - 10);

      };
    };

    p5InstanceRef.current = new p5(sketch, sketchRef.current!);

    return () => {
      p5InstanceRef.current?.remove();
    };
  }, [pressure, width]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        ref={sketchRef}
        className="rounded-lg border bg-muted w-full overflow-hidden"
        style={{ height: `${CANVAS_HEIGHT}px` }}
        data-ai-hint="Boyle's law J-tube experiment"
      >
      </div>

       <Card className="p-4 w-full">
          <Label htmlFor="pressure-slider" className="mb-2 block text-center">الضغط (atm)</Label>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono">1.0</span>
            <Slider
              id="pressure-slider"
              min={1}
              max={4}
              step={0.1}
              value={[pressure]}
              onValueChange={(value) => setPressure(value[0])}
              dir="ltr"
            />
            <span className="text-sm font-mono">4.0</span>
          </div>
        </Card>
    </div>
  );
}
