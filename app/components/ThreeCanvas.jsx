"use client";

import React, { Suspense, useRef, useEffect } from "react";
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF('/gun.glb');
  const modelRef = useRef();
  
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.y = elapsedTime / 10;
      modelRef.current.position.y = Math.sin(elapsedTime / 3) * 0.2;
    }
  });
  
  return <primitive ref={modelRef} object={scene} scale={3} position={[0, 0, -3]} />;
}

function BackgroundParticles() {
  const pointsRef = useRef();
  const { scene } = useThree();
  
  useEffect(() => {
    if (pointsRef.current) {
      scene.fog = new THREE.Fog('#000810', 5, 20);
    }
  }, [scene]);
  
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });
  
  const particleCount = 5000;
  const positions = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, [particleCount]);
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#3B82F6"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeCanvas({ className, showModel = true }) {
  return (
    <div className={`${className || ""}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
        <color attach="background" args={['#000810']} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} color="#0055ff" intensity={1} />
        <Suspense fallback={null}>
          <BackgroundParticles />
          {showModel && <Model />}
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/gun.glb');