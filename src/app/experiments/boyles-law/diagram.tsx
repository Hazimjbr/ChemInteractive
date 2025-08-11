
'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import p5 from 'p5';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

// --- Constants ---
const CANVAS_HEIGHT = 350; 
const TUBE_WIDTH = 15; 
const TUBE_WALL_THICKNESS = 2;
const TUBE_BEND_RADIUS = 20; 
const INITIAL_GAS_HEIGHT = 75; 
const PRESSURE_TO_HEIGHT_SCALE = 38;
const INITIAL_PRESSURE = 1;

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
        // Position the drawing at the bottom
        const tubeBottomY = CANVAS_HEIGHT - 50;
        const tubeTopY = tubeBottomY - 200; 
        const tubeCapY = tubeTopY;
        const innerTubeWidth = TUBE_WIDTH - (TUBE_WALL_THICKNESS * 2);

        // --- Calculate Mercury Levels ---
        const gasVolumeBottomY = tubeCapY + currentGasHeight;
        const leftMercuryTopY = gasVolumeBottomY;
        const rightMercuryTopY = leftMercuryTopY - (pressure - 1) * PRESSURE_TO_HEIGHT_SCALE;

        // --- Draw Gas ---
        p.fill(173, 216, 230, 150); // Light blue for gas
        p.noStroke();
        p.rect(centerX - TUBE_BEND_RADIUS - TUBE_WIDTH + TUBE_WALL_THICKNESS, tubeCapY, innerTubeWidth, currentGasHeight);

        // --- Draw Mercury ---
        p.fill(180, 180, 180); // Silver-gray for mercury
        // Left arm mercury
        p.rect(centerX - TUBE_BEND_RADIUS - TUBE_WIDTH + TUBE_WALL_THICKNESS, leftMercuryTopY, innerTubeWidth, tubeBottomY - leftMercuryTopY);
        // Right arm mercury
        p.rect(centerX + TUBE_BEND_RADIUS + TUBE_WALL_THICKNESS, rightMercuryTopY, innerTubeWidth, tubeBottomY - rightMercuryTopY);
        // U-bend mercury
        p.arc(centerX, tubeBottomY, (TUBE_BEND_RADIUS * 2) + TUBE_WIDTH, (TUBE_BEND_RADIUS * 2) + TUBE_WIDTH, 0, p.PI);
        p.fill('hsl(var(--card))');
        p.arc(centerX, tubeBottomY, (TUBE_BEND_RADIUS * 2) + TUBE_WIDTH - (TUBE_WALL_THICKNESS * 2), (TUBE_BEND_RADIUS * 2) + TUBE_WIDTH - (TUBE_WALL_THICKNESS * 2), 0, p.PI);
        

        // --- Draw J-Tube Glass ---
        p.noFill();
        p.stroke(0); // Set stroke to black
        p.strokeWeight(TUBE_WALL_THICKNESS);
        
        // Left arm (closed)
        p.line(centerX - TUBE_BEND_RADIUS - TUBE_WIDTH, tubeBottomY, centerX - TUBE_BEND_RADIUS - TUBE_WIDTH, tubeCapY);
        p.line(centerX - TUBE_BEND_RADIUS, tubeBottomY, centerX - TUBE_BEND_RADIUS, tubeCapY);
        p.line(centerX - TUBE_BEND_RADIUS - TUBE_WIDTH, tubeCapY, centerX - TUBE_BEND_RADIUS, tubeCapY); // top cap
        
        // Right arm (open) - Make it taller
        p.line(centerX + TUBE_BEND_RADIUS, tubeBottomY, centerX + TUBE_BEND_RADIUS, 10);
        p.line(centerX + TUBE_BEND_RADIUS + TUBE_WIDTH, tubeBottomY, centerX + TUBE_BEND_RADIUS + TUBE_WIDTH, 10);
        
        // Bend
        p.noFill();
        p.strokeWeight(TUBE_WALL_THICKNESS);
        p.arc(centerX, tubeBottomY, TUBE_BEND_RADIUS * 2, TUBE_BEND_RADIUS * 2, 0, p.PI, p.OPEN);
        p.arc(centerX, tubeBottomY, TUBE_BEND_RADIUS * 2 + TUBE_WIDTH * 2, TUBE_BEND_RADIUS * 2 + TUBE_WIDTH * 2, 0, p.PI, p.OPEN);


        // --- Draw Labels ---
        p.noStroke();
        p.fill(0); // Set fill to black for text
        
        // Volume Label
        p.textSize(12);
        p.textAlign(p.CENTER, p.CENTER);
        p.text('V', centerX - TUBE_BEND_RADIUS - (TUBE_WIDTH/2), tubeCapY + (currentGasHeight / 2));
        
        // Pressure Label
        p.textSize(12);
        p.textAlign(p.CENTER, p.BOTTOM);
        p.text(`${pressure.toFixed(1)} atm`, centerX + TUBE_BEND_RADIUS + (TUBE_WIDTH / 2), rightMercuryTopY - 5);

        
        // Mercury Height (h) Label
        if (pressure > 1.0) {
            const hLineX = centerX + TUBE_BEND_RADIUS + TUBE_WIDTH + 20;
            const h_in_mmHg = ((pressure - 1) * 760).toFixed(0);

            p.stroke(0);
            p.strokeWeight(1);
            p.line(hLineX, leftMercuryTopY, hLineX, rightMercuryTopY); // Vertical line for h
            p.line(hLineX - 3, leftMercuryTopY, hLineX + 3, leftMercuryTopY); // Top tick
            p.line(hLineX - 3, rightMercuryTopY, hLineX + 3, rightMercuryTopY); // Bottom tick

            p.noStroke();
            p.fill(0);
            p.textSize(10);
            p.textAlign(p.LEFT, p.CENTER);
            p.text(`h = ${h_in_mmHg} mmHg`, hLineX + 8, (leftMercuryTopY + rightMercuryTopY) / 2);
        }

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
            <span className="text-sm font-mono">4.0</span>
            <Slider
              id="pressure-slider"
              min={1}
              max={4}
              step={0.1}
              value={[pressure]}
              onValueChange={(value) => setPressure(value[0])}
              dir="ltr"
            />
            <span className="text-sm font-mono">1.0</span>
          </div>
        </Card>
    </div>
  );
}
