"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: any }) {
  // Opacity transforms
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);

  // Parallax Y movement (optional polish)
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center text-white mix-blend-difference">
        {/* Section 1 */}
        <motion.div 
            style={{ opacity: opacity1, y: y1 }}
            className="absolute inset-0 flex items-center justify-center p-8"
        >
            <div className="text-center">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4">Dipratna Kamble.</h1>
                <p className="text-xl md:text-2xl font-light text-gray-300">Full Stack Developer.</p>
            </div>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
            style={{ opacity: opacity2, y: y2 }}
            className="absolute inset-0 flex items-center justify-start p-8 md:p-24"
        >
            <div className="max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-bold leading-tight">Building scalable <br/><span className="text-blue-500">microservices</span> & web apps.</h2>
            </div>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
            style={{ opacity: opacity3, y: y3 }}
            className="absolute inset-0 flex items-center justify-end p-8 md:p-24 text-right"
        >
            <div className="max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-bold leading-tight">Expertise in Next.js, <br/><span className="text-purple-500">Node.js</span> & Cloud.</h2>
            </div>
        </motion.div>
    </div>
  );
}
