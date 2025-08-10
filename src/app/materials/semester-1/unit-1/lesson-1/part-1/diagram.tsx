'use client';

import { useRef, useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';

// Define a constant for the initial speed multiplier
const INITIAL_SPEED_MULTIPLIER = 2;

export default function Diagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [containerHeight, setContainerHeight] = useState(250);
  const particlesRef = useRef<Particle[]>([]);
  
  const width = 350;
  const initialHeight = 250;

  class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    // Store the base velocity direction vectors
    baseVx: number;
    baseVy: number;

    constructor(x: number, y: number, radius: number, color: string) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      
      // Set a random base direction
      this.baseVx = (Math.random() - 0.5); // -0.5 to 0.5
      this.baseVy = (Math.random() - 0.5); // -0.5 to 0.5

      // Initial velocity
      this.vx = this.baseVx * INITIAL_SPEED_MULTIPLIER;
      this.vy = this.baseVy * INITIAL_SPEED_MULTIPLIER;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
    
    update(currentHeight: number, speedMultiplier: number) {
      // Bounce off walls
      if (this.x + this.radius > width || this.x - this.radius < 0) {
        this.baseVx = -this.baseVx;
      }
      if (this.y + this.radius > currentHeight || this.y - this.radius < 0) {
        this.baseVy = -this.baseVy;
      }

      // Update velocity based on current speed multiplier
      this.vx = this.baseVx * speedMultiplier;
      this.vy = this.baseVy * speedMultiplier;

      this.x += this.vx;
      this.y += this.vy;

       // Ensure particles stay within bounds after resize to prevent them from getting stuck
      if (this.x + this.radius > width) this.x = width - this.radius;
      if (this.x - this.radius < 0) this.x = this.radius;
      if (this.y + this.radius > currentHeight) this.y = currentHeight - this.radius;
      if (this.y - this.radius < 0) this.y = this.radius;
    }
  }
  
  // Initialize particles only once
  useEffect(() => {
    const numParticles = 25;
    const particleRadius = 5;
    const localParticles: Particle[] = [];
    for (let i = 0; i < numParticles; i++) {
        let x = Math.random() * (width - particleRadius * 2) + particleRadius;
        let y = Math.random() * (initialHeight - particleRadius * 2) + particleRadius;
        localParticles.push(new Particle(x, y, particleRadius, 'hsl(var(--primary))'));
    }
    particlesRef.current = localParticles;
  }, []);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Set display size (css pixels)
    canvas.style.width = width + "px";
    canvas.style.height = containerHeight + "px";
    
    // Set actual size in memory (scaled for high-dpi screens)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = containerHeight * dpr;
    ctx.scale(dpr, dpr);
    
    // As volume decreases, speed increases to simulate increased pressure.
    // The relationship is inverse: P ∝ 1/V. We'll simulate this by making speed ∝ 1/V.
    const speedMultiplier = INITIAL_SPEED_MULTIPLIER * (initialHeight / containerHeight);

    const animate = () => {
      if(!ctx) return;
      // Clear only the visible area
      ctx.clearRect(0, 0, width, containerHeight);

      for (const particle of particlesRef.current) {
        particle.update(containerHeight, speedMultiplier);
        particle.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerHeight]);

  return (
    <div className="flex flex-col items-center gap-4">
        <div className="w-full rounded-lg overflow-hidden border bg-card flex justify-center items-end" style={{ height: `${initialHeight}px` }}>
          <canvas ref={canvasRef} style={{ width: `${width}px`, height: `${containerHeight}px` }} data-ai-hint="gas particles animation"></canvas>
        </div>
        <div className="w-full flex items-center gap-2">
            <span className="text-sm text-muted-foreground">حجم الوعاء</span>
            <Slider
                defaultValue={[initialHeight]}
                min={50}
                max={initialHeight}
                step={1}
                onValueChange={(value) => setContainerHeight(value[0])}
                dir="ltr"
            />
        </div>
    </div>
  );
}
