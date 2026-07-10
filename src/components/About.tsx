"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

// Simple custom hook for count-up animations when component is visible
function useCountUp(endVal: number, duration: number = 2000, startVal: number = 0, suffix: string = "") {
  const [count, setCount] = useState(startVal);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (endVal - startVal) + startVal));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [endVal, duration, startVal]);

  return `${count}${suffix}`;
}

export default function About() {
  const [inView, setInView] = useState(false);

  // Counter values
  const internMonths = useCountUp(inView ? 5 : 0, 1500, 0, "+ months");
  const queryCount = useCountUp(inView ? 500 : 0, 2000, 0, "+ queries");
  const autoReduction = useCountUp(inView ? 70 : 0, 1500, 0, "% reduction");
  const cgpaVal = useCountUp(inView ? 75 : 0, 1500, 0, "/10 CGPA");

  return (
    <section 
      className="relative z-20 bg-[#050505] min-h-screen py-32 px-4 md:px-12 overflow-hidden border-t border-white/5" 
      id="about"
      onMouseEnter={() => setInView(true)}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-mono text-accent uppercase tracking-widest text-glow">The Developer Behind the Code</span>
          <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 tracking-tight">
            Who Is <span className="gradient-text">Dipratna?</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Story Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="glass-card p-8 md:p-10 rounded-3xl relative border border-white/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">A Passion for Intelligence & Scalability</h3>
              
              <p className="text-gray-300 leading-relaxed text-lg">
                I am an AI & Data Science student at DKTE Engineering Institute, specializing in the intersection
                of machine learning, natural language processing, and modern backend engineering. My journey is focused
                on building applications that don't just work, but adapt, learn, and scale.
              </p>
              
              <p className="text-gray-300 leading-relaxed text-lg mt-4">
                During my internship at Sunbeam Infotech, I engineered production-grade RAG applications, improving
                query response relevance by 30% and automating ingestion flows with Selenium to save 70% manual effort.
                I thrive in environments that challenge me to solve complex real-world problems.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                <div>
                  <h4 className="text-sm font-mono text-gray-500 uppercase">Current Status</h4>
                  <p className="text-white font-medium mt-1">B.Tech Undergrad (AIDS)</p>
                </div>
                <div>
                  <h4 className="text-sm font-mono text-gray-500 uppercase">Base Location</h4>
                  <p className="text-white font-medium mt-1">Pune / Kolhapur, IN</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Stat 1 */}
            <div className="glass-card p-6 rounded-3xl text-center flex flex-col justify-center items-center border border-white/5 h-44">
              <span className="text-4xl md:text-5xl font-black gradient-text font-mono">
                {internMonths}
              </span>
              <h4 className="text-gray-400 font-medium text-sm mt-3 uppercase tracking-wider">Internship Experience</h4>
            </div>

            {/* Stat 2 */}
            <div className="glass-card p-6 rounded-3xl text-center flex flex-col justify-center items-center border border-white/5 h-44">
              <span className="text-4xl md:text-5xl font-black text-glow font-mono text-white">
                {queryCount}
              </span>
              <h4 className="text-gray-400 font-medium text-sm mt-3 uppercase tracking-wider">RAG Queries Handled</h4>
            </div>

            {/* Stat 3 */}
            <div className="glass-card p-6 rounded-3xl text-center flex flex-col justify-center items-center border border-white/5 h-44">
              <span className="text-4xl md:text-5xl font-black text-glow font-mono text-accent">
                {autoReduction}
              </span>
              <h4 className="text-gray-400 font-medium text-sm mt-3 uppercase tracking-wider">Manual Work Reduced</h4>
            </div>

            {/* Stat 4 */}
            <div className="glass-card p-6 rounded-3xl text-center flex flex-col justify-center items-center border border-white/5 h-44">
              <span className="text-4xl md:text-5xl font-black gradient-text font-mono">
                {cgpaVal.replace("75", "7.5")}
              </span>
              <h4 className="text-gray-400 font-medium text-sm mt-3 uppercase tracking-wider">Academic Record</h4>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
