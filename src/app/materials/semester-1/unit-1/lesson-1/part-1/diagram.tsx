'use client';

import React, { useState, useEffect, useRef } from 'react';
import p5 from 'p5';
import { Slider } from '@/components/ui/slider';

// --- Constants ---
const boxWidth = 350;
const initialBoxHeight = 250;
const numParticles = 30;
const particleRadius = 4;
const baseSpeed = 2;

// --- React Component ---
export default function Diagram() {
  const [containerHeight, setContainerHeight] = useState(initialBoxHeight);
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let p5Instance: p5;

    const sketch = (p: p5) => {
      let particles: Particle[] = [];
      let currentBoxHeight = initialBoxHeight;
      let speedMultiplier = 1.0;

      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        radius: number;

        constructor() {
          this.pos = p.createVector(
            p.random(particleRadius, boxWidth - particleRadius),
            p.random(particleRadius, currentBoxHeight - particleRadius)
          );
          this.vel = p5.Vector.random2D().mult(baseSpeed);
          this.radius = particleRadius;
        }

        updateSpeed() {
          const currentSpeed = this.vel.mag();
          if (currentSpeed > 0) {
            const newSpeed = baseSpeed * speedMultiplier;
            this.vel.setMag(newSpeed);
          }
        }

        update() {
          this.pos.add(this.vel);
          this.checkBoundaries();
        }

        checkBoundaries() {
          if (this.pos.x < this.radius || this.pos.x > boxWidth - this.radius) {
            this.vel.x *= -1;
            this.pos.x = p.constrain(this.pos.x, this.radius, boxWidth - this.radius);
          }
          if (this.pos.y < this.radius || this.pos.y > currentBoxHeight - this.radius) {
            this.vel.y *= -1;
            this.pos.y = p.constrain(this.pos.y, this.radius, currentBoxHeight - this.radius);
          }
        }

        show() {
          p.noStroke();
          p.fill('hsl(var(--accent))');
          p.ellipse(this.pos.x, this.pos.y, this.radius * 2);
        }
      }

      p.setup = () => {
        p.createCanvas(boxWidth, initialBoxHeight);
        for (let i = 0; i < numParticles; i++) {
          particles.push(new Particle());
        }
      };

      p.draw = () => {
        // Update height and speed from React state
        if (currentBoxHeight !== containerHeight) {
            currentBoxHeight = containerHeight;
            p.resizeCanvas(boxWidth, currentBoxHeight);
            speedMultiplier = initialBoxHeight / currentBoxHeight;

            particles.forEach(particle => {
                particle.pos.y = p.constrain(particle.pos.y, particle.radius, currentBoxHeight - particle.radius);
                particle.updateSpeed();
            });
        }
        
        p.background('hsl(var(--card))');
        p.stroke('hsl(var(--primary))');
        p.noFill();
        p.rect(0, 0, boxWidth - 1, currentBoxHeight - 1);

        for (const particle of particles) {
          particle.update();
          particle.show();
        }
      };
    };

    if (sketchRef.current) {
        p5Instance = new p5(sketch, sketchRef.current);
    }
    
    // Cleanup function
    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, [containerHeight]); // Re-run effect if containerHeight changes, p5 instance will handle the update inside draw loop

  return (
    <div className="flex flex-col items-center gap-4">
       <div
        ref={sketchRef}
        className="rounded-lg border bg-card flex justify-center items-center overflow-hidden"
        style={{ width: `${boxWidth}px`, height: `${initialBoxHeight}px` }}
        data-ai-hint="gas particles simulation p5js"
      >
        {/* p5 canvas will be mounted here */}
      </div>
      <div className="w-full flex items-center gap-2">
        <span className="text-sm text-muted-foreground">حجم الوعاء</span>
        <Slider
          defaultValue={[initialBoxHeight]}
          min={50}
          max={initialBoxHeight}
          step={1}
          onValueChange={(value) => setContainerHeight(value[0])}
          dir="ltr"
        />
      </div>
    </div>
  );
}
