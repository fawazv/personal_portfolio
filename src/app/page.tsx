"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import LenisProvider from "@/components/LenisProvider";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import CreativeScrub from "@/components/CreativeScrub";
import CinematicTrailer from "@/components/CinematicTrailer";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Certifications from "@/components/Certifications";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Dock from "@/components/Dock";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <LenisProvider>
          <CustomCursor />
          <NavBar />
          <main className="bg-[#050505] min-h-screen text-white relative">
            <Hero />
            <CreativeScrub />
            <CinematicTrailer />
            <About />
            <Projects />
            <Skills />
            <Timeline />
            <Certifications />
            <Blog />
            <Testimonials />
            <Contact />
            <Dock />
          </main>
        </LenisProvider>
      )}
    </>
  );
}
