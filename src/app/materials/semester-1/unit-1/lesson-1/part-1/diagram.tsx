'use client';

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { Slider } from '@/components/ui/slider';

// Define constants
const width = 350;
const initialHeight = 250;
const numParticles = 25;
const particleRadius = 5;

// Boyle's Law simulation: P₁V₁ = P₂V₂, and for kinetic energy KE ∝ T.
// A simpler model for visualization: when volume decreases, pressure increases, which we simulate by increasing particle speed.
// Let's use the relation: v₂ = v₁ * (V₁/V₂). Since area is proportional to volume here, A₁ = width * h₁, A₂ = width * h₂.
// So, V₁/V₂ = initialHeight/h₂.
// The base speed will be set, and the multiplier will adjust it.
const calculateSpeedMultiplier = (currentHeight: number) => Math.max(0.5, initialHeight / currentHeight);

export default function Diagram() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | undefined>();
  const runnerRef = useRef<Matter.Runner | undefined>();
  const renderRef = useRef<Matter.Render | undefined>();
  const topWallRef = useRef<Matter.Body | undefined>();
  const groundRef = useRef<Matter.Body | undefined>();
  const leftWallRef = useRef<Matter.Body | undefined>();
  const rightWallRef = useRef<Matter.Body | undefined>();
  const particlesRef = useRef<Matter.Body[]>([]);

  const [containerHeight, setContainerHeight] = useState(initialHeight);

  // Initialize Matter.js engine, renderer, and world
  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Composite, Body } = Matter;

    const engine = Engine.create({
      gravity: { y: 0 },
      timing: { timeScale: 1 },
    });
    engineRef.current = engine;

    const render = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: width,
        height: containerHeight, // Use state for initial height
        wireframes: false,
        background: 'transparent',
      },
    });
    renderRef.current = render;

    const wallOptions = { isStatic: true, render: { fillStyle: 'hsl(var(--primary))' }, friction: 0 };
    
    // Store references to walls
    groundRef.current = Bodies.rectangle(width / 2, containerHeight, width, 10, wallOptions);
    leftWallRef.current = Bodies.rectangle(0, containerHeight / 2, 10, containerHeight, wallOptions);
    rightWallRef.current = Bodies.rectangle(width, containerHeight / 2, 10, containerHeight, wallOptions);
    topWallRef.current = Bodies.rectangle(width / 2, 0, width, 10, wallOptions);
    
    const localParticles: Matter.Body[] = [];
    for (let i = 0; i < numParticles; i++) {
      const particle = Bodies.circle(
        Math.random() * (width - 2 * particleRadius) + particleRadius,
        Math.random() * (containerHeight - 2 * particleRadius) + particleRadius,
        particleRadius,
        {
          restitution: 1,
          friction: 0,
          frictionAir: 0,
          frictionStatic: 0,
          render: { fillStyle: 'hsl(var(--accent))' },
          inertia: Infinity,
        }
      );
      Body.setVelocity(particle, {
        x: (Math.random() - 0.5) * 2, // Initial base speed
        y: (Math.random() - 0.5) * 2,
      });
      localParticles.push(particle);
    }
    particlesRef.current = localParticles;

    Composite.add(engine.world, [
        groundRef.current,
        leftWallRef.current,
        rightWallRef.current,
        topWallRef.current,
        ...localParticles
    ]);

    Render.run(render);

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    return () => {
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (renderRef.current) Render.stop(renderRef.current);
      if (engineRef.current) Composite.clear(engineRef.current.world, false);
      if (renderRef.current?.canvas) renderRef.current.canvas.remove();
      engineRef.current = undefined;
      renderRef.current = undefined;
      runnerRef.current = undefined;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Handle container height changes
  useEffect(() => {
    if (!engineRef.current || !renderRef.current || !topWallRef.current || !groundRef.current || !leftWallRef.current || !rightWallRef.current) return;
    
    const { Body, Composite } = Matter;

    // Adjust canvas size
    renderRef.current.bounds.max.y = containerHeight;
    if(renderRef.current.canvas) {
      renderRef.current.canvas.height = containerHeight;
    }
    
    // Move walls
    Body.setPosition(groundRef.current, { x: width / 2, y: containerHeight + 5});
    Body.setPosition(topWallRef.current, { x: width / 2, y: -5 });
    
    Body.setPosition(leftWallRef.current, { x: -5, y: containerHeight / 2 });
    Body.scale(leftWallRef.current, 1, containerHeight / leftWallRef.current.bounds.max.y);
    
    Body.setPosition(rightWallRef.current, { x: width + 5, y: containerHeight / 2 });
    Body.scale(rightWallRef.current, 1, containerHeight / rightWallRef.current.bounds.max.y);


    // Update particle velocities and positions
    const speedMultiplier = calculateSpeedMultiplier(containerHeight);
    particlesRef.current.forEach(particle => {
        // Adjust velocity
        const magnitude = Math.sqrt(particle.velocity.x ** 2 + particle.velocity.y ** 2);
        const baseSpeed = 2; // A constant base speed
        if (magnitude > 0) {
            const newSpeed = baseSpeed * speedMultiplier;
            Body.setVelocity(particle, {
                x: (particle.velocity.x / magnitude) * newSpeed,
                y: (particle.velocity.y / magnitude) * newSpeed,
            });
        }

        // Ensure particles are within the new bounds to prevent them from getting stuck
        if (particle.position.y >= containerHeight - particleRadius) {
            Body.setPosition(particle, { x: particle.position.x, y: containerHeight - particleRadius -1 });
        }
        if (particle.position.y < particleRadius) {
            Body.setPosition(particle, { x: particle.position.x, y: particleRadius + 1 });
        }
        if (particle.position.x > width - particleRadius) {
            Body.setPosition(particle, {x: width-particleRadius -1, y: particle.position.y});
        }
        if (particle.position.x < particleRadius) {
            Body.setPosition(particle, {x: particleRadius +1, y: particle.position.y});
        }
    });

  }, [containerHeight]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full rounded-lg overflow-hidden border bg-card flex justify-center items-center" style={{ height: `${initialHeight}px` }}>
        <div ref={sceneRef} style={{ width: `${width}px`, height: `${containerHeight}px` }} data-ai-hint="gas particles animation matterjs" />
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
