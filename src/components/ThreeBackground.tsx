"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Mouse movement tracker hook
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

// 3D Central Node representing AI Core
function CentralNode({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.004;

      // Subtle mouse tracking
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.x * 1.5, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.y * 1.5, 0.05);
    }

    if (lightRef.current) {
      // Oscillate light intensity
      lightRef.current.intensity = Math.sin(state.clock.getElapsedTime() * 2) * 5 + 15;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#3B82F6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.9}
          wireframe
        />
      </Sphere>
      <pointLight ref={lightRef} position={[0, 0, 0]} color="#06B6D4" distance={10} intensity={15} />
    </group>
  );
}

// Custom nebula/gas clouds
function NebulaParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  // Generate random particles in a nebula cloud
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const distance = 4 + Math.random() * 8; // Sphere shell distribution

    positions[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = distance * Math.cos(phi);

    // Nebula palette: Blue, Purple, Cyan
    const randomColor = Math.random();
    if (randomColor < 0.33) {
      colors[i * 3] = 0.23; // #3B82F6 R
      colors[i * 3 + 1] = 0.51; // G
      colors[i * 3 + 2] = 0.96; // B
    } else if (randomColor < 0.66) {
      colors[i * 3] = 0.54; // #8B5CF6 R
      colors[i * 3 + 1] = 0.36; // G
      colors[i * 3 + 2] = 0.96; // B
    } else {
      colors[i * 3] = 0.02; // #06B6D4 R
      colors[i * 3 + 1] = 0.71; // G
      colors[i * 3 + 2] = 0.83; // B
    }
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      particlesRef.current.rotation.z = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ThreeBackground() {
  const mouse = useMousePosition();

  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-[#050505] overflow-hidden">
      {/* Aurora backdrop effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[150px] animate-float opacity-70" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-secondary/10 rounded-full blur-[180px] animate-float opacity-50" style={{ animationDelay: "-3s" }} />

      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8B5CF6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#06B6D4" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />
        <NebulaParticles />
        <CentralNode mouse={mouse} />
      </Canvas>
      
      {/* Noise filter */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(5,5,5,0.85)_80%)] pointer-events-none" />
    </div>
  );
}
