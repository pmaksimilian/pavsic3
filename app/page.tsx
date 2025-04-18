'use client'

import type React from "react";
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

import Hero from "../components/hero";
import Projects from "../components/projects";
import About from "../components/about";
import Contact from "../components/contact";
import { useSectionNavigation } from "../hooks/use-section-navigation";

const commandPath = "C:\\User\\Guest";
export default function Home () {
  const router = useRouter();
  const [language, setLanguage] = useState("en"); // Default to Slovenian

  // Add refs for sections to enable automatic scrolling
  const terminalWindowRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  // Define section refs array
  const sectionRefs = [
    { ref: heroSectionRef, id: "home" },
    { ref: projectsSectionRef, id: "projects" },
    { ref: aboutSectionRef, id: "about" },
    { ref: contactSectionRef, id: "contact" },
  ];

  // Set up section navigation with wheel events
  const { scrollToSection, currentSection } = useSectionNavigation(
    terminalWindowRef,
    sectionRefs
  );

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
            onCommand={scrollToSection}
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
      <button
        onClick={() => scrollToSection("home")}
        className={`back-to-top ${currentSection && currentSection != "home" ? "visible" : ""}`}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}
