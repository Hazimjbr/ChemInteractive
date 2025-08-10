'use client';

import { useRef, useEffect } from 'react';

export default function Diagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Set display size (css pixels)
    const width = 350;
    const height = 250;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    
    // Set actual size in memory (scaled for high-dpi screens)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = [];
    const numParticles = 25;
    const particleRadius = 5;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
      }

      draw() {
        if(!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }

      update() {
        // Bounce off walls
        if (this.x + this.radius > width || this.x - this.radius < 0) {
          this.vx = -this.vx;
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
          this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;
      }
    }
    
    function init() {
        for (let i = 0; i < numParticles; i++) {
            let x = Math.random() * (width - particleRadius * 2) + particleRadius;
            let y = Math.random() * (height - particleRadius * 2) + particleRadius;
            particles.push(new Particle(x, y, particleRadius, 'hsl(var(--primary))'));
        }
    }

    function animate() {
      if(!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    }
    
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full aspect-[350/250] rounded-lg overflow-hidden border bg-card">
      <canvas ref={canvasRef} data-ai-hint="gas particles animation"></canvas>
    </div>
  );
}
