"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

function AnimatedParticles() {
  const particlesRef = useRef();
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = clock.getElapsedTime() * 0.02;
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });
  
  return (
    <Stars 
      ref={particlesRef}
      radius={100} 
      depth={50} 
      count={5000} 
      factor={4} 
      saturation={0}
      fade
      speed={1}
    />
  );
}

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <color attach="background" args={['#050A20']} />
        <fog attach="fog" args={['#050A20', 5, 30]} />
        
        <Suspense fallback={null}>
          <AnimatedParticles />
        </Suspense>
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#3B82F6" />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
