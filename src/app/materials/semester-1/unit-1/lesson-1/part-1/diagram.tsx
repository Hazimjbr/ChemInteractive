'use client';

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { Slider } from '@/components/ui/slider';

// Define constants
const width = 350;
const initialHeight = 250;
const numParticles = 25;
const particleRadius = 5;

// Boyle's Law simulation: P₁V₁ = P₂V₂, and for kinetic energy KE = 0.5mv², so v ∝ 1/√m.
// A simpler model for visualization: when volume decreases, pressure increases.
// We can simulate this by increasing particle velocity as volume decreases.
// Let's use the relation: v₂ = v₁ * (V₁/V₂). Since area is proportional to volume here,
// A₁ = width * h₁, A₂ = width * h₂. So, V₁/V₂ = h₁/h₂.
// Speed multiplier will be initialHeight / currentHeight.
const calculateSpeedMultiplier = (currentHeight: number) => initialHeight / currentHeight;


export default function Diagram() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const runnerRef = useRef<Matter.Runner>();
  const renderRef = useRef<Matter.Render>();
  const topWallRef = useRef<Matter.Body>();
  const particlesRef = useRef<Matter.Body[]>([]);

  const [containerHeight, setContainerHeight] = useState(initialHeight);

  // Initialize Matter.js engine, renderer, and world
  useEffect(() => {
    // Aliases
    const { Engine, Render, Runner, Bodies, Composite, Events } = Matter;

    // Create engine
    const engine = Engine.create({
        gravity: { y: 0 }, // No gravity for gas simulation
        timing: { timeScale: 1 }
    });
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: width,
        height: initialHeight,
        wireframes: false, // See filled shapes
        background: 'transparent',
      },
    });
    renderRef.current = render;
    
    // Create walls
    const wallOptions = { isStatic: true, render: { fillStyle: 'hsl(var(--primary))' } };
    const ground = Bodies.rectangle(width / 2, initialHeight, width, 10, wallOptions);
    const leftWall = Bodies.rectangle(0, initialHeight / 2, 10, initialHeight, wallOptions);
    const rightWall = Bodies.rectangle(width, initialHeight / 2, 10, initialHeight, wallOptions);
    const topWall = Bodies.rectangle(width / 2, 0, width, 10, wallOptions);
    topWallRef.current = topWall;


    // Create particles
    const localParticles = [];
    for (let i = 0; i < numParticles; i++) {
        const particle = Bodies.circle(
            Math.random() * (width - 20) + 10,
            Math.random() * (initialHeight - 20) + 10,
            particleRadius,
            {
                restitution: 1, // Perfectly elastic collisions
                friction: 0,
                frictionAir: 0,
                frictionStatic: 0,
                render: { fillStyle: 'hsl(var(--primary))' },
                inertia: Infinity, // No speed loss on collision
            }
        );
        Matter.Body.setVelocity(particle, {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
        });
        localParticles.push(particle);
    }
    particlesRef.current = localParticles;

    // Add all bodies to the world
    Composite.add(engine.world, [ground, leftWall, rightWall, topWall, ...localParticles]);

    // Run the renderer
    Render.run(render);

    // Create runner
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    
    // Clean up on unmount
    return () => {
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (renderRef.current) Render.stop(renderRef.current);
      if (engineRef.current) Composite.clear(engineRef.current.world, false);
      if (renderRef.current) renderRef.current.canvas.remove();
      if(engineRef.current) engineRef.current = undefined;
    };
  }, []);

  // Handle container height changes
  useEffect(() => {
    if (!renderRef.current || !topWallRef.current || !engineRef.current) return;
    const { Body, Composite } = Matter;
    
    // Adjust canvas size
    renderRef.current.bounds.max.y = containerHeight;
    renderRef.current.canvas.height = containerHeight;

    // Move the top wall
    Body.setPosition(topWallRef.current, { x: width / 2, y: 0 });

    // Adjust wall heights to match new container height
    const walls = Composite.allBodies(engineRef.current.world).filter(body => body.isStatic);
    walls.forEach(wall => {
        if(wall.label === 'Rectangle Body' && wall !== topWallRef.current) {
            // This is a naive way to find vertical walls, but works for this simple case.
            // A better way would be to label the walls on creation.
            const isLeftOrRightWall = wall.position.x === 0 || wall.position.x === width;
             if (wall.bounds.max.y > 10) { // Exclude top and bottom walls
                Body.scale(wall, 1, containerHeight / wall.bounds.max.y);
                Body.setPosition(wall, {x: wall.position.x, y: containerHeight / 2});
             } else { // ground
                Body.setPosition(wall, {x: width/2, y: containerHeight});
             }
        }
    });

    // Update particle velocities
    const speedMultiplier = calculateSpeedMultiplier(containerHeight);
    particlesRef.current.forEach(particle => {
        const currentVelocity = particle.velocity;
        // Get the magnitude of the velocity
        const magnitude = Math.sqrt(currentVelocity.x ** 2 + currentVelocity.y ** 2);
        // Avoid division by zero if magnitude is zero
        const scale = magnitude > 0 ? (2 * speedMultiplier) / magnitude : 0;
        
        Body.setVelocity(particle, {
            x: currentVelocity.x * scale,
            y: currentVelocity.y * scale
        });

        // Ensure particles are within the new bounds
        if (particle.position.y > containerHeight) {
            Body.setPosition(particle, { x: particle.position.x, y: containerHeight - particleRadius });
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
          onValue-commit={(value) => setContainerHeight(value[0])}
          onValueChange={(value) => setContainerHeight(value[0])}
          dir="ltr"
        />
      </div>
    </div>
  );
}
