"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import ThreeBackground from "./ThreeBackground";
import Image from "next/image";

const TYPING_ROLES = [
  "AI Engineer",
  "Full Stack Developer",
  "Creative Designer",
  "Data Science Undergrad",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);

  // Blinking circular moving particles around main-img
  useEffect(() => {
    const canvas = particlesCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      alpha: number;
      alphaSpeed: number;
      color: string;
    }> = [];

    const colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#FFFFFF'];

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = 45;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * (canvas.width || 450),
          y: Math.random() * (canvas.height || 450),
          radius: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          alpha: Math.random() * 0.8 + 0.2,
          alphaSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    // Delay init slightly to ensure container measurements are ready
    const timer = setTimeout(() => {
      resizeCanvas();
      initParticles();
      drawParticles();
    }, 100);

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off bounds
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // Blink particle (fade alpha in and out)
        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.95) {
          p.alpha = 0.95;
          p.alphaSpeed *= -1;
        } else if (p.alpha < 0.15) {
          p.alpha = 0.15;
          p.alphaSpeed *= -1;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Parallax tilt effect on profile photo
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageContainerRef.current) return;
    const card = imageContainerRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Divide to control tilt strength
    card.style.transform = `perspective(1000px) rotateY(${x / 15}deg) rotateX(${-y / 15}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!imageContainerRef.current) return;
    imageContainerRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
  };

  // Typing animation effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = TYPING_ROLES[roleIndex];
    
    if (isDeleting) {
      // Deleting text
      timer = setTimeout(() => {
        setDisplayedText((prev) => prev.substring(0, prev.length - 1));
      }, 50);
    } else {
      // Writing text
      timer = setTimeout(() => {
        setDisplayedText((prev) => currentFullText.substring(0, prev.length + 1));
      }, 100);
    }

    // Switch between writing and deleting
    if (!isDeleting && displayedText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Wait at end
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % TYPING_ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 md:px-12" id="home">
      {/* 3D Stars/Nebula background */}
      <ThreeBackground />

      {/* Blinking Circular Moving Particles Canvas on entire first page */}
      <canvas ref={particlesCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />

      {/* Huge Background Transparent Outlined Text */}
      <div className="absolute inset-x-0 bottom-10 flex justify-center pointer-events-none select-none overflow-hidden z-0">
        <h1 className="text-[12vw] font-black tracking-[0.15em] leading-none text-transparent stroke-white/5 font-mono select-none" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.03)" }}>
          DEVELOPER
        </h1>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-primary uppercase text-glow">
              Welcome to the future of AI & Web
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-none"
          >
            Hi, I'm{" "}
            <span className="gradient-text drop-shadow-[0_0_35px_rgba(59,130,246,0.3)]">
              Dipratna
            </span>
          </motion.h1>

          {/* Typing Role Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-10 text-xl md:text-3xl font-medium font-mono text-gray-300 flex items-center"
          >
            <span>{displayedText}</span>
            <span className="w-1.5 h-6 ml-1 bg-accent animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-gray-400 text-base md:text-lg max-w-lg leading-relaxed"
          >
            AI & Data Science undergraduate passionate about building scalable microservices,
            generative AI pipelines, contextual RAG chatbots, and immersive web experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 bg-linear-to-r from-primary via-secondary to-accent text-white font-bold rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] cursor-pointer"
            >
              Explore Projects
            </button>
           
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-150 transition-all hover:scale-105 cursor-pointer"
            >
              Hire Me
            </button>
          </motion.div>

          {/* Mobile/Tablet standing profile picture inline */}
          <div className="lg:hidden flex justify-center items-center mt-8 relative w-full">
            <div className="relative w-64 h-80 md:w-80 md:h-[400px]">
              {/* Soft Ambient Purple Glow behind the mobile standing image */}
              <div className="absolute inset-4 rounded-full bg-purple-600/20 opacity-70 blur-[60px] pointer-events-none z-0 animate-pulse duration-3000" />
              
              <Image
                src="/main-img.png"
                alt="Dipratna Ravi Kamble"
                fill
                priority
                className="object-contain relative z-10"
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        {/* Right Side Photo Spacer (reservations for desktop absolute layout) */}
        <div className="lg:col-span-5 hidden lg:block" />
      </div>

      {/* Desktop Standing Profile Photo (Aligned to bottom-right of viewport) */}
      <div className="hidden lg:block absolute right-[2%] bottom-[2vh] h-[95vh] w-[50vw] max-w-[700px] z-10 pointer-events-auto">
        <div
          ref={imageContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-full select-none"
        >
          {/* Soft Ambient Purple Glow behind the standing image */}
          <div className="absolute inset-x-12 top-24 bottom-12 rounded-full bg-purple-600/25 opacity-80 blur-[100px] pointer-events-none z-0 animate-pulse duration-4000" />
          
          <Image
            src="/main-img.png"
            alt="Dipratna Ravi Kamble"
            fill
            priority
            className="object-contain object-bottom relative z-10"
            sizes="50vw"
          />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer z-10"
        onClick={() => scrollToSection("projects")}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-2">Scroll Down</span>
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            className="w-1 h-2 bg-accent rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
