"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Project Data for Dipratna
const projects = [
  {
    id: "sunbeam-chatbot",
    title: "Sunbeam Chatbot",
    category: "Generative AI • RAG",
    description: "RAG-Based AI Query System for course and internship queries.",
    longDescription: "A Retrieval-Augmented Generation (RAG) system built to handle complex student and internship enrollment queries. Leverages a pipeline that parses documents, stores embeddings in a vector database, and uses LLMs to return highly accurate, source-grounded answers. Features an automated Selenium ingestion stream and a conversational Streamlit interface.",
    techStack: ["Python", "LangChain", "Vector DB", "Selenium", "Ollama", "Streamlit"],
    repo: "https://github.com/Dipratna29",
    demo: "#",
    color: "from-blue-600/20 to-cyan-500/20",
    hoverColor: "group-hover:from-blue-600/40 group-hover:to-cyan-500/40",
    span: "md:col-span-2 md:row-span-2",
    mediaUrl: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    demoUrl: "https://images.pexels.com/photos/8386433/pexels-photo-8386433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "smart-task-organizer",
    title: "Smart Task Organizer (STO)",
    category: "Full Stack • Web App",
    description: "Role-based task management application with dynamic assignment.",
    longDescription: "A complete role-based task organization platform that allows administrators to create tasks and match them to users dynamically based on skill profiles. Features real-time state tracking (accept, reject, in-progress, completed) and an interactive dashboard.",
    techStack: ["Next.js", "React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    repo: "https://github.com/Dipratna29",
    demo: "#",
    color: "from-purple-600/20 to-pink-500/20",
    hoverColor: "group-hover:from-purple-600/40 group-hover:to-pink-500/40",
    span: "md:col-span-1 md:row-span-2",
    mediaUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    demoUrl: "https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "resume-ai",
    title: "Resume AI Screener",
    category: "Machine Learning • NLP",
    description: "Semantic CV analyzer and candidate ranking dashboard.",
    longDescription: "An intelligent resume evaluation system that uses NLP models to extract skills, experience, and certifications from uploaded candidate PDFs. It matches resumes against job descriptions using semantic similarity and ranks candidates on an intuitive analytics interface.",
    techStack: ["Python", "PyTorch", "PyPDF2", "LangChain", "Streamlit", "NLTK"],
    repo: "https://github.com/Dipratna29",
    demo: "#",
    color: "from-orange-500/20 to-red-500/20",
    hoverColor: "group-hover:from-orange-500/40 group-hover:to-red-500/40",
    span: "md:col-span-1 md:row-span-1",
    mediaUrl: "https://images.pexels.com/photos/4050312/pexels-photo-4050312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    demoUrl: "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "medical-image-classifier",
    title: "AI Medical Image Classifier",
    category: "Computer Vision",
    description: "Deep learning model for medical image analysis using OpenCV.",
    longDescription: "A deep learning model utilizing Convolutional Neural Networks (CNNs) to classify X-Ray and MRI scans. Integrated OpenCV for image preprocessing, CLAHE contrast enhancement, and contour mapping to pinpoint critical areas.",
    techStack: ["Python", "OpenCV", "TensorFlow", "NumPy", "Matplotlib"],
    repo: "https://github.com/Dipratna29",
    demo: "#",
    color: "from-green-600/20 to-teal-500/20",
    hoverColor: "group-hover:from-green-600/40 group-hover:to-teal-500/40",
    span: "md:col-span-1 md:row-span-1",
    mediaUrl: "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    demoUrl: "https://images.pexels.com/photos/7089012/pexels-photo-7089012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "data-pipeline-automation",
    title: "Data Pipeline Automator",
    category: "Data Engineering",
    description: "Automated ingestion pipeline with scheduled triggers.",
    longDescription: "An automation utility designed to scrape, extract, transform, and load (ETL) unstructured web documents into relational database servers. Built utilizing Selenium for dynamic content handling, schedule triggers for periodic execution, and detailed logs.",
    techStack: ["Python", "Selenium", "MySQL", "Cron", "Git"],
    repo: "https://github.com/Dipratna29",
    demo: "#",
    color: "from-indigo-600/20 to-purple-500/20",
    hoverColor: "group-hover:from-indigo-600/40 group-hover:to-purple-500/40",
    span: "md:col-span-1 md:row-span-1",
    mediaUrl: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    demoUrl: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <section className="relative z-20 bg-[#050505] min-h-screen py-32 px-4 md:px-12 overflow-hidden border-t border-white/5" id="projects">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="mb-16 text-center"
        >
          <span className="text-sm font-mono text-accent uppercase tracking-widest text-glow">Portfolio Showpiece</span>
          <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 tracking-tight">
            Selected <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
             A showcase of machine learning pipelines, custom RAG architecture, automation agents, and modern full-stack web applications.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]"
        >
            <AnimatePresence mode="popLayout">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        layoutId={project.id}
                        onClick={() => setSelectedId(project.id)}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                        className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-white/5 backdrop-blur-md ${project.span}`}
                        whileHover={{ scale: 1.015 }}
                    >
                        {/* Media Background */}
                        <img 
                            src={project.mediaUrl}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-all duration-700 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-linear-to-br ${project.color} ${project.hoverColor} transition-all duration-500 opacity-60 group-hover:opacity-80 mix-blend-overlay`} />
                        
                        {/* Darkener */}
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />

                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                            <div className="flex justify-between items-start">
                                 <span className="inline-block px-3 py-1 rounded-full bg-black/55 border border-white/10 text-xs font-mono text-glow text-accent">
                                    {project.category}
                                 </span>
                                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                 </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:translate-x-1 transition-transform drop-shadow-lg">{project.title}</h3>
                                <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-md">
                                    {project.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                    {project.techStack.slice(0, 4).map(t => (
                                        <span key={t} className="text-[10px] uppercase tracking-wider text-white/95 bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-white/10 font-mono">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

        {/* Enhanced Modal */}
        <AnimatePresence>
            {selectedId && selectedProject && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-60"
                    />
                    <div className="fixed inset-0 flex items-center justify-center z-70 pointer-events-auto p-4 md:p-8">
                        <motion.div
                           layoutId={selectedId}
                           className="bg-[#0e0e10] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl relative scrollbar-hide"
                        >
                           <button 
                                onClick={() => setSelectedId(null)}
                                className="absolute top-6 right-6 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white/70 hover:text-white transition-colors border border-white/10 cursor-pointer"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                           </button>

                           <div className="flex flex-col md:flex-row h-full">
                                { /* Visual Side */ }
                                <div className={`w-full md:w-2/5 min-h-[300px] relative overflow-hidden flex flex-col justify-end p-8`}>
                                    <img 
                                        src={selectedProject.demoUrl || selectedProject.mediaUrl}
                                        alt={selectedProject.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-80" 
                                    />
                                   <div className={`absolute inset-0 bg-linear-to-b ${selectedProject.color} mix-blend-overlay opacity-80`} />
                                   <div className="absolute inset-0 bg-black/40" />
                                   
                                   <motion.span 
                                     initial={{ opacity: 0, y: 10 }}
                                     animate={{ opacity: 1, y: 0 }}
                                     transition={{ delay: 0.2 }}
                                     className="relative z-10 inline-block px-3 py-1 rounded-full bg-black/60 text-xs font-mono text-glow text-accent mb-4 w-fit border border-white/10 backdrop-blur-md"
                                   >
                                     {selectedProject.category}
                                   </motion.span>
                                   <motion.h3 
                                     initial={{ opacity: 0, y: 10 }}
                                     animate={{ opacity: 1, y: 0 }}
                                     transition={{ delay: 0.3 }}
                                     className="relative z-10 text-4xl font-bold text-white leading-none tracking-tight drop-shadow-xl"
                                   >
                                     {selectedProject.title}
                                   </motion.h3>
                                </div>

                                {/* Content Side */}
                                <div className="w-full md:w-3/5 p-8 md:p-12 bg-[#0E0E10]">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 font-mono">About the project</h4>
                                        <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                                            {selectedProject.longDescription}
                                        </p>

                                        <div className="mb-10">
                                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 font-mono">Core Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.techStack.map((tech, i) => (
                                                    <motion.span 
                                                        key={tech} 
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.5 + (i * 0.05) }}
                                                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-gray-200 border border-white/10 transition-colors cursor-default font-mono"
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                                            <a 
                                                href={selectedProject.repo} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="flex-1 py-4 rounded-xl bg-white text-black font-bold text-center hover:bg-gray-200 transition-all hover:scale-103 flex items-center justify-center gap-2 cursor-pointer"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                                GitHub Code
                                            </a>
                                            <a 
                                                href={selectedProject.demo} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="flex-1 py-4 rounded-xl bg-white/5 text-white font-bold text-center hover:bg-white/10 transition-all hover:scale-103 border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
                                            >
                                                Live Demo
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                            </a>
                                            <button 
                                                onClick={() => setSelectedId(null)}
                                                className="flex-1 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-center transition-all hover:scale-103 border border-white/10 flex items-center justify-center gap-2 cursor-pointer font-mono"
                                            >
                                                ← Back
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                           </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
}
