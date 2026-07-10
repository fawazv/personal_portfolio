"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const TIMELINE_DATA = [
  {
    year: "Dec 2025 - Jan 2026",
    title: "Generative AI Intern",
    org: "Sunbeam Infotech Pvt. Ltd., Pune",
    description: "Engineered RAG-based Generative AI applications using cloud-hosted and local LLMs, supporting 500+ user queries. Improved response relevance by 30% using optimized embeddings and vector-based retrieval. Automated data ingestion pipelines using Selenium, reducing manual effort by 70%. Built interactive Streamlit dashboards and integrated modular AI workflows.",
    type: "work",
  },
  {
    year: "Jul 2025 - Sep 2025",
    title: "AI-ML Virtual Intern",
    org: "Google for Developers × EduSkills",
    description: "Applied supervised and unsupervised Machine Learning algorithms on structured datasets. Performed data preprocessing, feature engineering, and model evaluation in Python.",
    type: "work",
  },
  {
    year: "2023 - Present",
    title: "B.Tech in AI & Data Science",
    org: "DKTE Engineering Institute",
    description: "Currently pursuing B.Tech in Artificial Intelligence & Data Science. Academic CGPA of 7.50 / 10. Building strong fundamentals in data pipelines, database management systems, and algorithms.",
    type: "education",
  },
  {
    year: "2022 - 2023",
    title: "Class XII",
    org: "Maharashtra State Board",
    description: "Completed Higher Secondary Certificate (HSC) in science streams. Secured 69.50% score.",
    type: "education",
  },
  {
    year: "2020 - 2021",
    title: "Class X",
    org: "Maharashtra State Board",
    description: "Completed Secondary School Certificate (SSC). Secured 85.50% score.",
    type: "education",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative z-20 bg-[#050505] min-h-screen py-32 px-4 md:px-12 overflow-hidden border-t border-white/5" id="journey">
       {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[20%] w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-center mb-20"
        >
          <span className="text-sm font-mono text-secondary uppercase tracking-widest text-glow">Professional & Academic Path</span>
          <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 tracking-tight">
             My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            A chronological timeline of my educational milestones and professional internships in AI/ML and software development.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-primary/20 via-secondary/50 to-accent/20 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {TIMELINE_DATA.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }: { item: any; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Spacer for desktop layout */}
      <div className="hidden md:block w-1/2" />

      {/* Point on Line */}
      <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-[#050505] transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
         <div className="absolute inset-0 bg-primary/40 blur-sm opacity-70" />
      </div>

      {/* Content Card */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
        <div className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors duration-300">
          <div className={`flex flex-col ${isEven ? "md:items-end" : "md:items-start"} mb-2`}>
             <span className="text-xs text-primary font-mono border border-primary/30 px-2 py-1 rounded-full bg-primary/10 mb-2 w-fit">
              {item.year}
            </span>
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
              {item.title}
            </h3>
          </div>
          
          <p className="text-sm text-secondary mb-4 font-medium uppercase tracking-wider">
            {item.org}
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
