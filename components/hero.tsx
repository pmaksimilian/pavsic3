"use client";

import { useState, useEffect } from "react";

interface HeroSectionProps {
  dict?: {
    subtitle: string;
  };
  language?: string;
  commandPath?: string;
  isInternationalized?: boolean;
}

export default function HeroSection({
  dict,
  language = "sl",
  commandPath = "C:\\User\\Guest",
  isInternationalized = false,
}: HeroSectionProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [titleDone, setTitleDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // Determine subtitle based on whether we're using internationalization or direct language
  const subtitleText = isInternationalized
    ? dict?.subtitle
    : language === "sl"
    ? "SPLETNI RAZVOJ"
    : "WEB DEVELOPMENT";

  // Typewriter effect for title
  useEffect(() => {
    const fullTitle = "PAVSIC.NET";
    let i = 0;
    const interval = setInterval(() => {
      setTitle(fullTitle.substring(0, i + 1));
      i++;
      if (i === fullTitle.length) {
        clearInterval(interval);
        setTitleDone(true);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for subtitle after title is done
  useEffect(() => {
    if (!titleDone || !subtitleText) return;

    let i = 0;
    const interval = setInterval(() => {
      setSubtitle(subtitleText.substring(0, i + 1));
      i++;
      if (i === subtitleText.length) {
        clearInterval(interval);
        setSubtitleDone(true);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [titleDone, subtitleText]);

  // Show command prompt after both animations are done
  useEffect(() => {
    if (titleDone && subtitleDone) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 500);
    }
  }, [titleDone, subtitleDone]);

  return (
    <section className="hero-section">
      <div className="section-content">
        <div className="terminal-line">{commandPath}&gt; start pavsic.net</div>
        <div className="terminal-line">Loading...</div>
        <div className="terminal-line">
          Welcome to PAVSIC.NET Terminal v1.0.0
        </div>
        <div className="terminal-line">
          Copyright (c) 2025 PAVSIC.NET. All rights reserved.
        </div>
        <div className="terminal-line">
          --------------------------------------------------
        </div>
        <div className="terminal-line"></div>

        <div className="terminal-output">
          <h1 className="terminal-title-text">
            {title}
            <span className={titleDone ? "hidden" : "cursor"}></span>
          </h1>
          <h2 className="terminal-subtitle-text">
            {subtitle}
            <span
              className={!titleDone || subtitleDone ? "hidden" : "cursor"}
            ></span>
          </h2>

          {showPrompt && (
            <div className="command-prompt">
              <div className="terminal-line">{commandPath}&gt; explore</div>
              <div className="terminal-line">
                Available commands:
                <ul className="command-list">
                  <li>
                    <a
                      href="#projects"
                      className="command-link"
                    >
                      projects
                    </a>{" "}
                    - View my projects
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="command-link"
                    >
                      about
                    </a>{" "}
                    - About me
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="command-link"
                    >
                      contact
                    </a>{" "}
                    - Contact information
                  </li>
                </ul>
              </div>
              <div className="terminal-line">
                {commandPath}&gt; <span className="cursor"></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
