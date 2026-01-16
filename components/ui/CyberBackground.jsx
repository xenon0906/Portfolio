"use client";
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, PerspectiveCamera } from "@react-three/drei";

// 3D Moving Grid component
const MovingGrid = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.z = (state.clock.getElapsedTime() * 0.5) % 2;
    }
  });

  return (
    <gridHelper
      ref={meshRef}
      args={[100, 100, 0x06b6d4, 0x222222]}
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

// PROJECTS: 3D Cyber Grid with Three.js
const CyberBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-carbon">
      <Suspense fallback={<div className="fixed inset-0 bg-carbon" />}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 1, 10]} fov={60} />
          <ambientLight intensity={0.5} />
          <MovingGrid />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        </Canvas>
      </Suspense>
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default CyberBackground;
