"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

// Skill Data based on Dipratna's Resume
const SKILL_CATEGORIES = [
  {
    category: "AI & Machine Learning",
    description: "Building intelligent applications, RAG systems, and data pipelines.",
    items: ["Generative AI", "LLMs", "RAG Systems", "Machine Learning", "Data Pipelines", "NumPy", "Pandas", "OpenCV"],
    color: "text-primary border-primary/30 bg-primary/5",
  },
  {
    category: "Backend & Database",
    description: "Designing robust server architectures, REST APIs, and database schemas.",
    items: ["Java", "C Programming", "SQL", "OOP", "MySQL", "REST APIs", "Selenium"],
    color: "text-secondary border-secondary/30 bg-secondary/5",
  },
  {
    category: "Cloud, Tools & Frontend",
    description: "Developing responsive frontend dashboard and deploying in cloud.",
    items: ["Streamlit", "HTML5 & CSS3", "Bootstrap 5", "Git", "GitHub", "IBM Cloud", "Google Cloud Platform"],
    color: "text-accent border-accent/30 bg-accent/5",
  },
  {
    category: "Creative Tools",
    description: "Professional video editing, graphics design, and motion graphics.",
    items: ["Video Editing", "Adobe Photoshop", "Adobe After Effects", "Adobe Premiere Pro", "DaVinci Resolve", "CapCut"],
    color: "text-white border-white/20 bg-white/5",
  },
];

// Flat list of all skill tags for the 3D Sphere
const ALL_SKILLS = SKILL_CATEGORIES.flatMap((cat) => cat.items);

// 3D Tag item
function SkillTag({ word, position }: { word: string; position: THREE.Vector3 }) {
  const [hovered, setHovered] = useState(false);

  // Return HTML floating in 3D Space
  return (
    <Html
      position={position}
      center
      distanceFactor={6}
      style={{
        transition: "all 0.2s ease",
        transform: `scale(${hovered ? 1.2 : 1})`,
        pointerEvents: "auto",
      }}
    >
      <div
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-all border select-none ${
          hovered
            ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.8)] scale-110"
            : "bg-black/80 text-gray-300 border-white/10 hover:border-accent hover:text-accent shadow-md"
        }`}
      >
        {word}
      </div>
    </Html>
  );
}

// 3D Rotating Sphere Component
function SphereGroup() {
  const groupRef = useRef<THREE.Group>(null);

  // Distribute skills evenly on a sphere using Fibonacci spiral algorithm
  const points = useMemo(() => {
    const tempPoints: { word: string; pos: THREE.Vector3 }[] = [];
    const count = ALL_SKILLS.length;
    const radius = 2.8;

    for (let i = 0; i < count; i++) {
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      tempPoints.push({
        word: ALL_SKILLS[i],
        pos: new THREE.Vector3(x, y, z),
      });
    }
    return tempPoints;
  }, []);

  // Rotate sphere on each frame
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {points.map((pt, idx) => (
        <SkillTag key={idx} word={pt.word} position={pt.pos} />
      ))}
    </group>
  );
}

export default function Skills() {
  return (
    <section className="relative z-20 bg-[#050505] min-h-screen py-32 px-4 md:px-12 overflow-hidden border-t border-white/5" id="skills">
      {/* Background ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-25%] right-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center lg:text-left"
        >
          <span className="text-sm font-mono text-primary uppercase tracking-widest text-glow">My Technical Stack</span>
          <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 tracking-tight">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mt-4 leading-relaxed mx-auto lg:mx-0">
            A comprehensive set of tools, libraries, and frameworks powering intelligence-driven systems.
          </p>
        </motion.div>

        {/* Content Layout: Left is categories, Right is 3D Sphere */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Categories Grid */}
          <div className="lg:col-span-7 space-y-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl glass-card border border-white/5 hover:border-white/10"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">{cat.category}</h3>
                    <p className="text-xs text-gray-400 mt-1">{cat.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {cat.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`px-3 py-1 text-xs font-mono font-medium rounded-full border transition-all hover:scale-105 duration-200 ${cat.color}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 3D Sphere Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 h-[350px] md:h-[450px] w-full flex items-center justify-center relative cursor-grab active:cursor-grabbing"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
            <Canvas camera={{ position: [0, 0, 7.5], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#8B5CF6" />
              <SphereGroup />
            </Canvas>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
