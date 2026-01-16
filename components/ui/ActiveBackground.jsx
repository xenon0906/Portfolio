"use client";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Generate sphere points manually
function generateSpherePoints(count, radius) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

// ==========================================
// 1. DARK MODE: Neon Cyan Warp
// ==========================================
function DarkStarfield() {
  const ref = useRef();
  // 6000 Particles for high density
  const positions = useMemo(() => generateSpherePoints(6000, 1.5), []);

  useFrame((state, delta) => {
    if (ref.current) {
      // High speed rotation (The "Power")
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// ==========================================
// 2. LIGHT MODE: Cobalt Hyper-Speed (Upgraded)
// ==========================================
function LightStarfield() {
  const ref = useRef();
  // MATCHED DENSITY: 6000 Particles (Same as Dark Mode)
  const positions = useMemo(() => generateSpherePoints(6000, 1.5), []);

  useFrame((state, delta) => {
    if (ref.current) {
      // MATCHED SPEED: Same powerful rotation
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#1e40af"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={1.0}
        />
      </Points>
    </group>
  );
}

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function ActiveBackground() {
  const { resolvedTheme } = useTheme();

  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="fixed inset-0 z-0 bg-[var(--bg-color)]" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-all duration-700 ease-in-out">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Background color */}
        <color attach="background" args={[isDark ? "#050505" : "#f0f2f5"]} />

        {/* Fog depth to fade distant particles in light mode */}
        {!isDark && <fog attach="fog" args={['#f0f2f5', 0.5, 1.8]} />}

        {isDark ? <DarkStarfield /> : <LightStarfield />}
      </Canvas>

      {/* Gradient Vignette */}
      <div
        className={`absolute inset-0 bg-gradient-to-t opacity-90 transition-colors duration-700
          ${isDark
            ? 'from-[#050505] via-transparent to-[#050505]'
            : 'from-[#f0f2f5] via-transparent to-[#f0f2f5]'
          }
        `}
      />
    </div>
  );
}

export { ActiveBackground };
