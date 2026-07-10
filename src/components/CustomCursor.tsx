"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hoverState, setHoverState] = useState<"default" | "hover" | "text" | "click">("default");
  const [cursorColor, setCursorColor] = useState<string>("border-primary bg-primary/20");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset cursor by half its default width (20px) to center it
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
    };

    const handleMouseDown = () => setHoverState("click");
    const handleMouseUp = () => setHoverState("default");

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Track hover states for links and buttons
    const addEventListeners = () => {
      document.querySelectorAll("a, button, input, select, textarea, [role='button'], .clickable").forEach((el) => {
        el.addEventListener("mouseenter", () => setHoverState("hover"));
        el.addEventListener("mouseleave", () => setHoverState("default"));
      });

      document.querySelectorAll("p, h1, h2, h3, h4, span:not(.font-mono), li").forEach((el) => {
        el.addEventListener("mouseenter", () => setHoverState("text"));
        el.addEventListener("mouseleave", () => setHoverState("default"));
      });
    };

    // Run initially and set a small timeout for async rendering
    addEventListeners();
    const intervalId = setInterval(addEventListeners, 2000);

    // Track active section and adapt color
    const handleSectionChange = () => {
      const sections = ["home", "creativescrub", "trailer", "projects", "testimonials", "blog", "skills", "journey", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            // Adapt cursor color depending on the section
            if (sectionId === "home" || sectionId === "skills") {
              setCursorColor("border-primary bg-primary/10");
            } else if (sectionId === "projects" || sectionId === "journey" || sectionId === "trailer" || sectionId === "creativescrub") {
              setCursorColor("border-secondary bg-secondary/10");
            } else if (sectionId === "testimonials" || sectionId === "blog" || sectionId === "contact") {
              setCursorColor("border-accent bg-accent/10");
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleSectionChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleSectionChange);
      clearInterval(intervalId);
    };
  }, [mouseX, mouseY]);

  // Adjust cursor scale and style depending on state
  const variants = {
    default: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      scale: 1,
    },
    hover: {
      width: 60,
      height: 60,
      borderRadius: "50%",
      scale: 1.5,
      borderWidth: "1px",
      borderColor: "rgba(255,255,255,1)",
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    text: {
      width: 6,
      height: 40,
      borderRadius: "4px",
      scale: 1,
      borderWidth: "0px",
      backgroundColor: "rgba(255,255,255,0.8)",
    },
    click: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      scale: 0.8,
      borderWidth: "2px",
    },
  };

  return (
    <>
      {/* Outer Glowing Cursor */}
      <motion.div
        className={`fixed top-0 left-0 border pointer-events-none z-9999 hidden md:block ${cursorColor} transition-colors duration-500`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={hoverState}
        variants={variants}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
      {/* Inner Dot Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-9999 mix-blend-difference hidden md:block"
        style={{
          x: useSpring(mouseX, { damping: 20, stiffness: 500 }),
          y: useSpring(mouseY, { damping: 20, stiffness: 500 }),
          // Adjust center offset for 2x2 dot inside 40x40 container
          translateX: 19,
          translateY: 19,
        }}
      />
    </>
  );
}
