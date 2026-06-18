'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 3000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    
    // Bright Cinematic palette: Bright Amber & Neon Cyan
    const color1 = new THREE.Color('#fbbf24'); // Bright Amber
    const color2 = new THREE.Color('#22d3ee'); // Neon Cyan
    const tempColor = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      // Position spread fully across the background
      const r = 4 + Math.random() * 12;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      tempColor.lerpColors(color1, color2, Math.random());
      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }
    return [pos, col];
  }, [particleCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial 
        transparent 
        vertexColors 
        size={0.08} 
        sizeAttenuation={true} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Optional geometric nodes to add depth to the background
function NodeConnections() {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, -5]}>
      <mesh>
        <icosahedronGeometry args={[4, 1]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.15} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[5, 1]} />
        <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ParticleField />
        <NodeConnections />
      </Canvas>
    </div>
  );
}
