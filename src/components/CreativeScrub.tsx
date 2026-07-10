"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function CreativeScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgTextRef = useRef<HTMLHeadingElement>(null);
  const topLayerRef = useRef<HTMLImageElement>(null);
  
  // Cinematic Reveal Refs
  const revealCanvasRef = useRef<HTMLCanvasElement>(null);
  const revealMaskCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroOverlayObj = useRef<HTMLImageElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  // Preload Images objects
  const imagesRef = useRef<HTMLImageElement[]>([]);
  // Track current frame to avoid redundant renders
  const currentFrameRef = useRef({ index: 0 });

  // 1. Preload Frames
  useEffect(() => {
    const frameCount = 240;
    let loadedCount = 0;
    const images = new Array(frameCount);

    for (let i = 1; i <= frameCount; i++) {
      const num = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `/hero-video/ezgif-frame-${num}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
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

    // Preload the overlay image
    const overlayImg = new Image();
    overlayImg.src = '/hero-video/hero-image/hero.png';
    overlayImg.onload = () => { 
      heroOverlayObj.current = overlayImg; 
    };
    revealMaskCanvasRef.current = document.createElement('canvas');
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
    
    if (revealCanvasRef.current) {
      revealCanvasRef.current.width = window.innerWidth * dpr;
      revealCanvasRef.current.height = window.innerHeight * dpr;
    }
    if (revealMaskCanvasRef.current) {
      revealMaskCanvasRef.current.width = window.innerWidth * dpr;
      revealMaskCanvasRef.current.height = window.innerHeight * dpr;
      
      const maskCtx = revealMaskCanvasRef.current.getContext('2d');
      if (maskCtx) {
        maskCtx.fillStyle = 'black';
        maskCtx.fillRect(0, 0, window.innerWidth * dpr, window.innerHeight * dpr);
      }
    }
    
    renderFrame(currentFrameRef.current.index);
  };

  // 3. GSAP Scroll Animation
  useGSAP(() => {
    // Lock scroll locally or handle preloader complete
    if (!preloaderComplete) {
      document.body.style.overflow = 'hidden';
    }

    if (!isLoaded) return;
    
    // Cinematic Preloader Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setPreloaderComplete(true);
        document.body.style.overflow = '';
      }
    });

    tl.to('.preloader-panel-scrub', {
      yPercent: 100,
      duration: 1.2,
      stagger: 0.08,
      ease: 'power4.inOut'
    })
    .fromTo('.hero-title-scrub', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('.hero-subtitle-scrub', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo('.hero-cta-scrub', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    handleResize();
    window.addEventListener('resize', handleResize);

    const frameCount = 240;

    // Canvas Image Sequence Scrub
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1, 
      onUpdate: (self) => {
        const frameIndex = Math.floor(self.progress * (frameCount - 1));
        
        if (frameIndex !== currentFrameRef.current.index) {
          currentFrameRef.current.index = frameIndex;
          requestAnimationFrame(() => renderFrame(frameIndex));
        }
      }
    });

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

    // Fade in text label
    gsap.to(bgTextRef.current, {
      opacity: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 30%',
        end: 'top top',
        scrub: true,
      }
    });

    // --- CINEMATIC LIGHT REVEAL LOOP ---
    const renderReveal = () => {
      if (!revealCanvasRef.current || !revealMaskCanvasRef.current || !heroOverlayObj.current) return;
      
      const canvas = revealCanvasRef.current;
      const maskCanvas = revealMaskCanvasRef.current;
      const ctx = canvas.getContext('2d', { alpha: true });
      const maskCtx = maskCanvas.getContext('2d', { alpha: true });
      
      const w = canvas.width;
      const h = canvas.height;
      
      if (!ctx || !maskCtx || w === 0 || h === 0) return;

      // Only active during final frames 235-240
      if (currentFrameRef.current.index < 235) {
        if (mouseRef.current.isActive) {
          ctx.clearRect(0, 0, w, h);
          maskCtx.globalCompositeOperation = 'source-over';
          maskCtx.fillStyle = 'black';
          maskCtx.fillRect(0, 0, w, h);
          mouseRef.current.isActive = false;
        }
        return;
      }

      mouseRef.current.isActive = true;
      
      // 1. Fade the mask trail over time
      maskCtx.globalCompositeOperation = 'source-over';
      maskCtx.fillStyle = 'rgba(0, 0, 0, 0.05)'; 
      maskCtx.fillRect(0, 0, w, h);
      
      // 2. Draw brush stroke to reveal image
      const { x, y } = mouseRef.current;
      if (x >= 0 && y >= 0) {
        maskCtx.globalCompositeOperation = 'destination-out';
        const radius = 250; 
        const gradient = maskCtx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        maskCtx.fillStyle = gradient;
        maskCtx.beginPath();
        maskCtx.arc(x, y, radius, 0, Math.PI * 2);
        maskCtx.fill();
      }
      
      // 3. Render final frame
      ctx.clearRect(0, 0, w, h);
      
      const img = heroOverlayObj.current;
      const scale = w / img.width;
      const imgY = (h / 2) - (img.height / 2) * scale;
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(img, 0, imgY, img.width * scale, img.height * scale);
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(maskCanvas, 0, 0);
    };

    gsap.ticker.add(renderReveal);

    const handleMouseMove = (e: MouseEvent) => {
      const dpr = window.devicePixelRatio || 1;
      mouseRef.current.x = e.clientX * dpr;
      mouseRef.current.y = e.clientY * dpr;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const stickyViewport = containerRef.current?.querySelector('.sticky-scrub-viewport');
    if (stickyViewport) {
      stickyViewport.addEventListener('mousemove', handleMouseMove as any);
      stickyViewport.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      gsap.ticker.remove(renderReveal);
      if (stickyViewport) {
        stickyViewport.removeEventListener('mousemove', handleMouseMove as any);
        stickyViewport.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, { scope: containerRef, dependencies: [isLoaded] });

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black" id="creativescrub">
      
      {/* Premium GSAP 6-Panel Preloader */}
      {!preloaderComplete && (
        <div className="fixed inset-0 z-[200] flex w-full h-screen pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="preloader-panel-scrub h-full bg-[#0a0a0c] border-r border-[#1a1a1f]"
              style={{ width: '16.666667%' }}
            />
          ))}
          {!isLoaded && (
             <div className="absolute inset-0 flex items-center justify-center text-white z-10 text-sm font-mono tracking-widest uppercase opacity-75">
               Loading Cinematic Sequence: {loadingProgress}%
             </div>
          )}
        </div>
      )}

      {/* Sticky Viewport */}
      <div className="relative w-full h-full overflow-hidden sticky-scrub-viewport">
        
        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover origin-center"
        />

        {/* Cinematic Reveal Canvas */}
        <canvas
          ref={revealCanvasRef}
          className="absolute inset-0 h-full w-full pointer-events-none z-[2] hidden md:block"
        />

        {/* Creative Bold Background Text (Second Layer) */}
       

        {/* Top Layer Cutout Image */}
        <img 
          ref={topLayerRef}
          src="/hero-video/ezgif-frame-240.jpg" 
          className="absolute inset-0 h-full w-full object-cover origin-center pointer-events-none z-[2] opacity-0"
          alt="Top Layer Cutout"
        />

        {/* BOTTOM CONTENT OVERLAY */}
        <div className="absolute bottom-0 left-0 w-full z-[10] px-8 md:px-16 pb-12 flex flex-col pointer-events-auto">
          
          {/* Top Row: 3 Columns */}
          <div className="flex flex-col md:flex-row justify-between items-end w-full mb-8 max-w-[1800px] mx-auto">
            
            {/* LEFT COLUMN */}
            <div className="flex-1 mb-8 md:mb-0">
              <div className="w-8 h-[1px] bg-primary mb-5"></div>
              <p className="text-xs font-mono text-gray-400 tracking-wider">Cinematic Scrub Sequence</p>
            </div>

            {/* CENTER COLUMN */}
            <div className="hidden md:block flex-[2]"></div>

            {/* RIGHT COLUMN */}
            <div className="flex-1 flex justify-start md:justify-end">
              <a href="#projects" className="hero-cta-scrub opacity-0 group inline-flex flex-col items-start md:items-end">
                <div className="flex items-center text-primary text-[12px] uppercase tracking-[2px] mb-2 transition-colors duration-300 group-hover:text-white">
                  <span className="mr-2">VIEW PROJECTS</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </div>
                <div className="w-full h-[1px] bg-primary opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:bg-white"></div>
              </a>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="w-full max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
            
            {/* Left Side Socials */}
            <div className="flex items-center space-x-12 mb-4 md:mb-0">
              {['INSTAGRAM', 'LINKEDIN', 'GITHUB'].map((social) => (
                <a 
                  key={social} 
                  href={
                    social === 'GITHUB' ? 'https://github.com/Dipratna29' : 
                    social === 'LINKEDIN' ? 'https://www.linkedin.com/in/dipratna-kamble-827437371' : 
                    social === 'INSTAGRAM' ? 'https://www.instagram.com/deepwave.ae?igsh=MWl6ZDd0d3RrNW5iaA==' : '#'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-[10px] uppercase tracking-[2px] transition-colors duration-300 hover:text-white"
                >
                  {social}
                </a>
              ))}
            </div>

            {/* Right Side Copyright */}
            <div className="text-gray-500 text-[10px] uppercase tracking-[1px] font-mono">
              &copy; {new Date().getFullYear()} DIPRATNA KAMBLE. ALL RIGHTS RESERVED.
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
