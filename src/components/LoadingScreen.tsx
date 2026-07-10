"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExploded, setIsExploded] = useState(false);
  const [showScreen, setShowScreen] = useState(true);

  useEffect(() => {
    // Percentage counter
    const duration = 2500; // 2.5 seconds
    const intervalTime = 25;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Trigger particle explosion and glitch fade
      const explodeTimeout = setTimeout(() => {
        setIsExploded(true);
      }, 300);

      const hideTimeout = setTimeout(() => {
        setShowScreen(false);
        onComplete();
      }, 1000);

      return () => {
        clearTimeout(explodeTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {showScreen && (
        <motion.div
          className="fixed inset-0 z-99999 flex flex-col items-center justify-center bg-[#050505] select-none overflow-hidden"
          exit={{
            opacity: 0,
            filter: "blur(20px)",
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        >
          {/* Grid background layer */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

          {/* Glowing background blobs */}
          <div className="absolute w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] top-1/4 left-1/4 animate-pulse-glow" />
          <div className="absolute w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] bottom-1/4 right-1/4 animate-pulse-glow" style={{ animationDelay: "-1s" }} />

          {/* Logo + Counter Container */}
          <div className="relative flex flex-col items-center z-10 max-w-md w-full px-8">
            {/* Logo with glitch effect */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-mono font-black tracking-widest mb-10 text-white text-center relative"
            >
              <span className="relative z-10 bg-clip-text text-transparent bg-linear-to-r from-primary via-secondary to-accent text-glow">
                DIPRATNA
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent blur-md opacity-30 -z-10 rounded-lg animate-pulse" />
            </motion.div>

            {/* Percentage Text */}
            <motion.div
              className="text-5xl md:text-6xl font-mono font-extrabold text-white text-center tracking-tighter mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.round(progress)}%
            </motion.div>

            {/* Loading Bar Frame */}
            <div className="w-full h-1.5 bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
              {/* Active Loading bar */}
              <motion.div
                className="h-full bg-linear-to-r from-primary via-secondary to-accent"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
              {/* Glow head */}
              <motion.div
                className="absolute top-0 bottom-0 w-8 bg-white blur-xs opacity-50"
                style={{ left: `calc(${progress}% - 32px)` }}
              />
            </div>

            {/* Small status text */}
            <motion.span
              className="text-[10px] tracking-[0.3em] font-mono text-gray-500 uppercase mt-4 block"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Initializing Digital Experience
            </motion.span>
          </div>

          {/* Explosion Particle overlay on completion */}
          {isExploded && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              {[...Array(30)].map((_, i) => {
                const angle = Math.random() * Math.PI * 2;
                const distance = 100 + Math.random() * 300;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                const colors = ["#3B82F6", "#8B5CF6", "#06B6D4", "#FFFFFF"];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{ backgroundColor: randomColor }}
                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
