"use client";

import AsciiArt from "./about_image";

interface AboutSectionProps {
  dict?: {
    title: string;
    content: string;
  };
  language?: string;
  commandPath?: string;
  isInternationalized?: boolean;
}

export default function AboutSection({
  dict,
  language = "sl",
  commandPath = "C:\\User\\Guest",
  isInternationalized = false,
}: AboutSectionProps) {
  // Determine title and content based on whether we're using internationalization or direct language
  const title = isInternationalized
    ? dict?.title
    : language === "sl"
    ? "O Meni"
    : "About Me";
  const content = isInternationalized
    ? dict?.content
    : language === "sl"
    ? "Sem spletni razvijalec s strastjo do ustvarjanja čistih, učinkovitih in uporabniku prijaznih spletnih strani. Z večletnimi izkušnjami v industriji se specializiram za gradnjo sodobnih spletnih aplikacij z uporabo najnovejših tehnologij in najboljših praks."
    : "I am a web developer with a passion for creating clean, efficient, and user-friendly websites. With years of experience in the industry, I specialize in building modern web applications using the latest technologies and best practices.";

  return (
    <section
      id="about"
      className="content-section"
    >
      <div className="section-content">
        <div className="about-container">
          <div className="about-content-container">
            <div className="section-header">
              <div className="terminal-line">{commandPath}&gt; cd about</div>
              <div className="terminal-line">
                {commandPath}\about&gt; type README.txt
              </div>
            </div>
            <h2 className="section-title">{title}</h2>

            <div className="about-text">
              <div className="terminal-line">
                --------------------------------------------------
              </div>
              <div className="terminal-text">{content}</div>
              <div className="terminal-line">
                --------------------------------------------------
              </div>
              <div className="terminal-line">
                {commandPath}\about&gt; <span className="cursor"></span>
              </div>
            </div>
          </div>

          {/* ASCII art container */}
          <div className="ascii-art-container">
            <AsciiArt />
          </div>
        </div>
      </div>
    </section>
  );
}
