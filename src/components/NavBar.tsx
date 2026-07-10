"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "journey", label: "Journey", href: "#journey" },
  { id: "blog", label: "Blog", href: "#blog" },
  { id: "testimonials", label: "Reviews", href: "#testimonials" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer to detect active section
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger when section occupies the middle of screen
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center p-4 md:p-6 ${
        isScrolled ? "py-3 md:py-4" : "py-6 md:py-8"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    >
      <div
        className={`flex items-center justify-between w-full max-w-5xl px-6 md:px-8 py-3 rounded-full border border-white/10 transition-all duration-500 bg-black/40 backdrop-blur-xl ${
          isScrolled ? "shadow-lg shadow-black/30 bg-black/60 scale-95" : ""
        }`}
      >
        {/* Logo */}
        <a href="#home" className="text-xl md:text-2xl font-bold tracking-wider relative group">
          <span className="gradient-text font-mono">DIPRATNA</span>
          <span className="text-primary group-hover:animate-ping absolute -right-3 top-1 w-1.5 h-1.5 rounded-full bg-primary" />
        </a>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-white ${
                activeSection === item.id ? "text-white" : "text-gray-400"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-4 right-4 h-[2px] bg-linear-to-r from-primary to-accent rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="relative px-5 py-2 overflow-hidden text-xs md:text-sm font-bold text-white rounded-full bg-linear-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] block group"
          >
            <span className="relative z-10">Hire Me</span>
            <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
