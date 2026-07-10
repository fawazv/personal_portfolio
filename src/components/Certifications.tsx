"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const CERTIFICATIONS = [
  {
    title: "AWS Academy Graduate - Data Engineering",
    issuer: "Amazon Web Services (AWS)",
    date: "2025",
    skills: ["Data Pipelines", "ETL Processes", "AWS Glue", "Redshift", "Athena", "EMR"],
    credentialId: "AWS-DATA-ENG",
    color: "from-blue-600 to-indigo-600",
  },
  {
    title: "AI-ML Virtual Intern",
    issuer: "Google for Developers x EduSkills",
    date: "2025",
    skills: ["Supervised Learning", "Unsupervised Learning", "Feature Engineering", "Scikit-Learn"],
    credentialId: "G-DEV-EDU-2025",
    color: "from-purple-600 to-pink-600",
  },
  {
    title: "Introduction to Machine Learning",
    issuer: "Coursera",
    date: "2024",
    skills: ["Regression Models", "Neural Networks", "Gradient Descent", "Model Tuning"],
    credentialId: "COURSERA-ML-101",
    color: "from-cyan-600 to-blue-600",
  },
  {
    title: "Adobe Certified Professional - Video Editing",
    issuer: "Adobe",
    date: "2024",
    skills: ["Premiere Pro", "After Effects", "Color Grading", "Post Production"],
    credentialId: "ADOBE-VEDIT-PRO",
    color: "from-red-600 to-orange-600",
  },
];

export default function Certifications() {
  return (
    <section className="relative z-20 bg-[#050505] py-32 px-4 md:px-12 overflow-hidden border-t border-white/5" id="certifications">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-mono text-accent uppercase tracking-widest text-glow">Validation of Knowledge</span>
          <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 tracking-tight">
            Credentials & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Flip the cards to see verified details and key technical competencies validated by global platforms.
          </p>
        </motion.div>

        {/* 3D Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CERTIFICATIONS.map((cert, index) => (
            <CertCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert, index }: { cert: any; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-[320px] w-full cursor-pointer perspective-1000 select-none group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full duration-700 transform-style-3d relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden glass-card rounded-3xl p-6 flex flex-col justify-between border border-white/10 group-hover:border-primary/40">
          <div>
            <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${cert.color} flex items-center justify-center text-white text-lg font-bold mb-6 shadow-md`}>
              {cert.issuer[0]}
            </div>
            <h3 className="text-xl font-bold text-white leading-snug group-hover:text-primary transition-colors">
              {cert.title}
            </h3>
            <p className="text-gray-400 text-sm mt-2">{cert.issuer}</p>
          </div>
          
          <div className="flex justify-between items-center text-xs font-mono text-gray-500">
            <span>{cert.date}</span>
            <span className="text-primary hover:underline">Hover to Flip →</span>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl p-6 flex flex-col justify-between border border-white/10 bg-[#0E0E10] text-white [transform:rotateY(180deg)] shadow-xl">
          <div>
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-4">Competencies Verified</span>
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.map((skill: string) => (
                <span key={skill} className="px-2.5 py-1 bg-white/5 border border-white/5 rounded text-[10px] font-mono text-gray-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-4">
            <span className="text-[10px] font-mono text-gray-500 block">CREDENTIAL ID</span>
            <span className="text-xs font-mono text-white mt-1 block">{cert.credentialId}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
