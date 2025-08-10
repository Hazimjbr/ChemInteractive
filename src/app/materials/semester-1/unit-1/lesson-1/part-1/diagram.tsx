'use client';

import { useState } from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import type { P5CanvasInstance } from '@p5-wrapper/react';
import { Slider } from '@/components/ui/slider';

// --- Constants ---
const boxWidth = 350;
const initialBoxHeight = 250;
const numParticles = 30;
const particleRadius = 4;
const baseSpeed = 2;

// --- p5.js Sketch ---
function sketch(p5: P5CanvasInstance) {
  let particles: Particle[] = [];
  let currentBoxHeight = initialBoxHeight;
  let speedMultiplier = 1.0;

  class Particle {
    pos: any; // p5.Vector
    vel: any; // p5.Vector
    radius: number;

    constructor() {
      this.pos = p5.createVector(
        p5.random(particleRadius, boxWidth - particleRadius),
        p5.random(particleRadius, currentBoxHeight - particleRadius)
      );
      this.vel = p5.constructor.Vector.random2D().mult(baseSpeed);
      this.radius = particleRadius;
    }

    // Update particle's velocity based on the container's volume change
    updateSpeed() {
        const currentSpeed = this.vel.mag();
        if (currentSpeed > 0) {
            const newSpeed = baseSpeed * speedMultiplier;
            this.vel.setMag(newSpeed);
        }
    }

    // Update particle's position and handle collisions
    update() {
      this.pos.add(this.vel);
      this.checkBoundaries();
    }

    // Check for collisions with the walls
    checkBoundaries() {
      if (this.pos.x < this.radius || this.pos.x > boxWidth - this.radius) {
        this.vel.x *= -1;
         // Ensure particle stays within bounds after collision
        this.pos.x = p5.constrain(this.pos.x, this.radius, boxWidth - this.radius);
      }
      if (this.pos.y < this.radius || this.pos.y > currentBoxHeight - this.radius) {
        this.vel.y *= -1;
        // Ensure particle stays within bounds after collision
        this.pos.y = p5.constrain(this.pos.y, this.radius, currentBoxHeight - this.radius);
      }
    }

    // Draw the particle
    show() {
      p5.noStroke();
      p5.fill('hsl(var(--accent))');
      p5.ellipse(this.pos.x, this.pos.y, this.radius * 2);
    }
  }

  p5.setup = () => {
    p5.createCanvas(boxWidth, initialBoxHeight);
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  };

  p5.updateWithProps = (props) => {
    if (props.height) {
        // Only resize and update if the height has actually changed
        if (currentBoxHeight !== props.height) {
            currentBoxHeight = props.height;
            p5.resizeCanvas(boxWidth, currentBoxHeight);

            // Calculate speed multiplier based on the ratio of initial to current height (volume)
            speedMultiplier = initialBoxHeight / currentBoxHeight;

            particles.forEach(p => {
                // Reposition particles to be within the new bounds
                p.pos.y = p5.constrain(p.pos.y, p.radius, currentBoxHeight - p.radius);
                // Update their speed
                p.updateSpeed();
            });
        }
    }
  };

  p5.draw = () => {
    p5.background('hsl(var(--card))');
    // Optional: draw the container border
    p5.stroke('hsl(var(--primary))');
    p5.noFill();
    p5.rect(0, 0, boxWidth, currentBoxHeight);

    for (const particle of particles) {
      particle.update();
      particle.show();
    }
  };
}

// --- React Component ---
export default function Diagram() {
  const [containerHeight, setContainerHeight] = useState(initialBoxHeight);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="rounded-lg border bg-card flex justify-center items-center overflow-hidden"
        style={{ height: `${initialBoxHeight}px`, width: `${boxWidth}px` }}
        data-ai-hint="gas particles simulation p5js"
      >
        <ReactP5Wrapper sketch={sketch} height={containerHeight} />
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
