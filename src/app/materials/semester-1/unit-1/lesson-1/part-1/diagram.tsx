
'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import p5 from 'p5';
import { Slider } from '@/components/ui/slider';

// --- Constants ---
const CONTAINER_HEIGHT = 250; // The fixed height of the container card
const INITIAL_BOX_HEIGHT = 250; // The initial height of the simulation box
const NUM_PARTICLES = 30;
const PARTICLE_RADIUS = 5; // Slightly larger for visibility
const BASE_SPEED = 1.5;

// --- React Component ---
export default function Diagram() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  // State for the simulation box height, controlled by the slider
  const [boxHeight, setBoxHeight] = useState(INITIAL_BOX_HEIGHT);
  // State for the container width, determined once on layout
  const [width, setWidth] = useState(0);

  // Measure the container's width once it's on the page
  useLayoutEffect(() => {
    if (sketchRef.current) {
      setWidth(sketchRef.current.clientWidth);
    }
  }, []);

  // Main effect to create and manage the p5.js sketch
  useEffect(() => {
    // Don't run if the container width hasn't been measured yet
    if (width <= 0) return;

    // Cleanup the previous sketch instance before creating a new one
    p5InstanceRef.current?.remove();

    // --- The p5.js Sketch Definition ---
    const sketch = (p: p5) => {
      let particles: Particle[] = [];
      const speedMultiplier = INITIAL_BOX_HEIGHT / boxHeight;

      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        radius: number;

        constructor() {
          this.radius = PARTICLE_RADIUS;
          // Ensure particles are created well within the bounds
          this.pos = p.createVector(
            p.random(this.radius, width - this.radius),
            p.random(this.radius, boxHeight - this.radius)
          );
          this.vel = p5.Vector.random2D().mult(BASE_SPEED * speedMultiplier);
        }

        update() {
          this.pos.add(this.vel);
          this.checkBoundaries();
        }

        checkBoundaries() {
          // Check X axis collision
          if (this.pos.x <= this.radius || this.pos.x >= width - this.radius) {
            this.vel.x *= -1;
            this.pos.x = p.constrain(this.pos.x, this.radius, width - this.radius);
          }
          // Check Y axis collision
          if (this.pos.y <= this.radius || this.pos.y >= boxHeight - this.radius) {
            this.vel.y *= -1;
            this.pos.y = p.constrain(this.pos.y, this.radius, boxHeight - this.radius);
          }
        }

        show() {
          // As requested: Red fill, Black stroke
          p.fill(255, 0, 0); // Red
          p.stroke(0);       // Black
          p.strokeWeight(1);
          p.ellipse(this.pos.x, this.pos.y, this.radius * 2);
        }
      }

      p.setup = () => {
        p.createCanvas(width, boxHeight);
        // Create all particles
        for (let i = 0; i < NUM_PARTICLES; i++) {
          particles.push(new Particle());
        }
      };

      p.draw = () => {
        // Draw the background of the simulation box
        p.background('hsl(var(--card))');

        // Draw the border of the simulation box
        p.stroke('hsl(var(--primary))');
        p.strokeWeight(2);
        p.noFill();
        p.rect(0, 0, width - 1, boxHeight - 1);
        
        // Update and show all particles
        for (const particle of particles) {
          particle.update();
          particle.show();
        }
      };
    };

    // Create the new p5 instance
    p5InstanceRef.current = new p5(sketch, sketchRef.current!);

    // The cleanup function for this effect
    return () => {
      p5InstanceRef.current?.remove();
    };
    // This effect re-runs whenever the boxHeight or width changes
  }, [boxHeight, width]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* This is the container with a FIXED height, acting as a viewport */}
      <div
        ref={sketchRef}
        className="rounded-lg border bg-muted w-full flex items-center justify-center"
        style={{ height: `${CONTAINER_HEIGHT}px` }}
        data-ai-hint="gas particles simulation p5js"
      >
        {/* The p5 canvas is created by the script and injected here */}
        {/* Its height will be `boxHeight`, which can be smaller than `CONTAINER_HEIGHT` */}
      </div>
       <div className="w-full space-y-2">
        <div className="w-full flex items-center gap-2">
            <span className="text-sm text-muted-foreground">حجم الوعاء</span>
            <Slider
            value={[boxHeight]}
            min={80} // Minimum height for the simulation box
            max={CONTAINER_HEIGHT} // Maximum height is the container's height
            step={1}
            onValueChange={(value) => setBoxHeight(value[0])}
            dir="ltr"
            />
        </div>
        <div className="w-full flex justify-between text-xs text-muted-foreground px-1" dir="ltr">
            <span>حجم أصغر، ضغط أعلى</span>
            <span>حجم أكبر، ضغط أقل</span>
        </div>
      </div>
    </div>
  );
}
