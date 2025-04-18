'use client'

import type React from "react";
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import Hero from "../components/hero";
import Projects from "../components/projects";
import About from "../components/about";
import Contact from "../components/contact";


export default function Home () {
  const router = useRouter();
  const [language, setLanguage] = useState("sl"); // Default to Slovenian
  const commandPath = "C:\\User\\Guest"; // Default path

  // Add refs for sections to enable automatic scrolling
  const terminalWindowRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);


  // Implement automatic scrolling between sections
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default scrolling
      e.preventDefault();

      if (!terminalWindowRef.current) return;

      // Get all section refs
      const sections = [
        heroSectionRef.current,
        projectsSectionRef.current,
        aboutSectionRef.current,
        contactSectionRef.current,
      ];

      // Filter out any null refs
      const validSections = sections.filter(Boolean) as HTMLElement[];

      // Find the currently visible section
      const currentSectionIndex = validSections.findIndex((section) => {
        const rect = section.getBoundingClientRect();
        // Consider a section "visible" if its top is near the viewport top
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSectionIndex === -1) return;

      // Determine scroll direction
      if (e.deltaY > 0 && currentSectionIndex < validSections.length - 1) {
        // Scroll down to next section
        validSections[currentSectionIndex + 1].scrollIntoView({
          behavior: "smooth",
        });
      } else if (e.deltaY < 0 && currentSectionIndex > 0) {
        // Scroll up to previous section
        validSections[currentSectionIndex - 1].scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    // Add wheel event listener to terminal window
    const terminalWindow = terminalWindowRef.current;
    if (terminalWindow) {
      terminalWindow.addEventListener("wheel", handleWheel, { passive: false });
    }

    // Clean up event listener on unmount
    return () => {
      if (terminalWindow) {
        terminalWindow.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  // Toggle language
  const toggleLanguage = () => {
    const newLang = language === "sl" ? "en" : "sl";
    setLanguage(newLang);
  };

  return (
    <div className="terminal-screen">
      {/* <div className="terminal-header">
        <div className="terminal-title">PAVSIC.NET - Terminal</div>
        <div className="terminal-controls">
          <button
            onClick={toggleLanguage}
            className="language-btn"
          >
            {language === "sl" ? "EN" : "SL"}
          </button>
        </div>
      </div> */}

      <div
        className="terminal-window"
        ref={terminalWindowRef}
      >
        <div ref={heroSectionRef as React.RefObject<HTMLDivElement>}>
          <Hero
            language={language}
            commandPath={commandPath}
            isInternationalized={false}
          />
        </div>

        <div ref={projectsSectionRef as React.RefObject<HTMLDivElement>}>
          <Projects
            language={language}
            commandPath={commandPath}
            isInternationalized={false}
          />
        </div>

        <div ref={aboutSectionRef as React.RefObject<HTMLDivElement>}>
          <About
            language={language}
            commandPath={commandPath}
            isInternationalized={false}
          />
        </div>

        <div ref={contactSectionRef as React.RefObject<HTMLDivElement>}>
          <Contact
            language={language}
            commandPath={commandPath}
            isInternationalized={false}
          />
        </div>
      </div>
    </div>
  );
}
