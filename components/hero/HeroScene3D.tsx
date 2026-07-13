"use client";

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { GLOW_FROM, GLOW_TO } from '../../lib/theme';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reduced;
}

function OrganicBlob({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const lightARef = useRef<THREE.PointLight>(null);
  const lightBRef = useRef<THREE.PointLight>(null);

  // Fewer vertices on small viewports — cheapest place to cut detail.
  const [detail] = useState(() => (window.innerWidth < 640 ? 2 : 4));

  useFrame((state, delta) => {
    const { clock, pointer } = state;

    if (meshRef.current && !reducedMotion) {
      meshRef.current.rotation.y += delta * 0.08;
      meshRef.current.rotation.x += delta * 0.025;
    }

    if (materialRef.current) {
      materialRef.current.distort = reducedMotion
        ? 0.32
        : 0.35 + Math.sin(clock.elapsedTime * 0.6) * 0.08;
    }

    // Parallax: the glow (lights) drifts toward the pointer, not the mesh
    // itself or the camera — cheaper and avoids a nauseating camera pan.
    const targetX = reducedMotion ? 0 : pointer.x * 2.5;
    const targetY = reducedMotion ? 0 : pointer.y * 2.5;

    if (lightARef.current) {
      lightARef.current.position.x = THREE.MathUtils.lerp(lightARef.current.position.x, 2 + targetX, 0.04);
      lightARef.current.position.y = THREE.MathUtils.lerp(lightARef.current.position.y, 1.5 + targetY, 0.04);
    }
    if (lightBRef.current) {
      lightBRef.current.position.x = THREE.MathUtils.lerp(lightBRef.current.position.x, -2 - targetX, 0.04);
      lightBRef.current.position.y = THREE.MathUtils.lerp(lightBRef.current.position.y, -1.5 - targetY, 0.04);
    }
  });

  return (
    <group position={[0, -0.85, 0]}>
      <ambientLight intensity={0.2} />
      <pointLight ref={lightARef} position={[2, 1.5, 3]} color={GLOW_FROM} intensity={55} distance={14} />
      <pointLight ref={lightBRef} position={[-2, -1.5, 3]} color={GLOW_TO} intensity={55} distance={14} />
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.75, detail]} />
        <MeshDistortMaterial
          ref={materialRef}
          color={GLOW_TO}
          emissive={GLOW_FROM}
          emissiveIntensity={0.85}
          roughness={0.25}
          metalness={0.2}
          distort={0.35}
          speed={reducedMotion ? 0 : 1.4}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene3D() {
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 40 }}
    >
      <OrganicBlob reducedMotion={reducedMotion} />
    </Canvas>
  );
}
