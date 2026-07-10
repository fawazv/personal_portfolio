"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CinematicTrailer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef({ index: 0 });

  // 1. Preload sequence frames
  useEffect(() => {
    const frameCount = 240;
    let loadedCount = 0;
    const images = new Array(frameCount);

    for (let i = 1; i <= frameCount; i++) {
      const num = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `/earth-video/ezgif-frame-${num}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setIsLoaded(true);
        }
      };
      
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setIsLoaded(true);
        }
      };

      images[i - 1] = img;
    }
    
    imagesRef.current = images;
  }, []);

  // 2. Canvas Rendering Logic
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d', { alpha: false });
    const img = imagesRef.current[index];
    
    if (!context || !img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clear previous frame
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Scale image to fill full screen width
    const scale = canvasWidth / img.width;
    const x = 0; // Align to left edge
    const y = (canvasHeight / 2) - (img.height / 2) * scale; // Center vertically

    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    renderFrame(currentFrameRef.current.index);
  };

  useEffect(() => {
    if (!isLoaded) return;

    gsap.registerPlugin(ScrollTrigger);

    handleResize();
    window.addEventListener('resize', handleResize);

    // Master Timeline for Video Scrub and Overlay Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // Scroll distance (300vh)
        scrub: 0.5,     // Smooth scrubbing
        pin: true,      // Pin container in place
        anticipatePin: 1,
      },
    });

    // 1. Scrub image sequence frame by frame from 0 to 239
    const frameObj = { frame: 0 };
    tl.to(frameObj, {
      frame: 239,
      duration: 3,
      ease: "none",
      onUpdate: () => {
        const frameIndex = Math.floor(frameObj.frame);
        if (frameIndex !== currentFrameRef.current.index) {
          currentFrameRef.current.index = frameIndex;
          requestAnimationFrame(() => renderFrame(frameIndex));
        }
      }
    }, 0);

    // Subtle Canvas Zoom Effect
    gsap.to(canvasRef.current, {
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        scrub: true,
      }
    });

    // 2. Animate Slide 1 (fades in, stays, fades out)
    tl.fromTo(
      slide1Ref.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" },
      0
    ).to(
      slide1Ref.current,
      { opacity: 0, y: -50, scale: 0.9, duration: 0.5, ease: "power2.in" },
      0.8
    );

    // 3. Animate Slide 2
    tl.fromTo(
      slide2Ref.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" },
      1.1
    ).to(
      slide2Ref.current,
      { opacity: 0, y: -50, scale: 0.9, duration: 0.5, ease: "power2.in" },
      1.9
    );

    // 4. Animate Slide 3
    tl.fromTo(
      slide3Ref.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" },
      2.2
    ).to(
      slide3Ref.current,
      { opacity: 1, y: 0, scale: 1, duration: 0.8 }, // keep it visible at the end of scroll
      2.7
    );

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full bg-[#050505] overflow-hidden border-t border-white/5"
      id="trailer"
    >
      {/* Canvas Background for sequence frames */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover origin-center opacity-60"
      />

      {/* Cinematic dark overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Content Container */}
      <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 z-10">
        
        {/* Slide 1 */}
        <div
          ref={slide1Ref}
          className="absolute max-w-3xl text-center flex flex-col items-center pointer-events-none select-none"
        >
          <span className="text-xs md:text-sm font-mono text-accent uppercase tracking-[0.3em] mb-4 text-glow">
            Core Focus 01
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight">
            Engineering the <span className="gradient-text">Future of AI</span>
          </h2>
          <p className="text-gray-300 text-base md:text-xl mt-6 max-w-xl leading-relaxed">
            Developing domain-grounded conversational agents, automated vector index pipelines, and custom RAG databases.
          </p>
        </div>

        {/* Slide 2 */}
        <div
          ref={slide2Ref}
          className="absolute max-w-3xl text-center flex flex-col items-center pointer-events-none select-none"
        >
          <span className="text-xs md:text-sm font-mono text-primary uppercase tracking-[0.3em] mb-4 text-glow">
            Core Focus 02
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight">
            Automating <span className="gradient-text-blue-cyan">Data Pipelines</span>
          </h2>
          <p className="text-gray-300 text-base md:text-xl mt-6 max-w-xl leading-relaxed">
            Engineering Selenium agents and scheduled scrapers to ingest records, reducing manual workload by 70%.
          </p>
        </div>

        {/* Slide 3 */}
        <div
          ref={slide3Ref}
          className="absolute max-w-3xl text-center flex flex-col items-center pointer-events-none select-none"
        >
          <span className="text-xs md:text-sm font-mono text-secondary uppercase tracking-[0.3em] mb-4 text-glow">
            Core Focus 03
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight">
            Building Modern <span className="gradient-text-purple-cyan">Interfaces</span>
          </h2>
          <p className="text-gray-300 text-base md:text-xl mt-6 max-w-xl leading-relaxed">
            Deploying responsive client hubs with Next.js, high-speed Streamlit pipelines, and gorgeous WebGL effects.
          </p>
        </div>

      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-10 left-10 z-20 pointer-events-none font-mono text-xs text-gray-500 uppercase tracking-widest hidden md:block">
        Scrubbing Cinematic Sequence
      </div>
      <div className="absolute bottom-10 right-10 z-20 pointer-events-none font-mono text-xs text-gray-500 uppercase tracking-widest hidden md:block">
        Dipratna Kamble &copy; 2026
      </div>
    </div>
  );
}
