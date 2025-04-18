"use client";

import { useState } from "react";

interface ProjectsSectionProps {
  dict?: {
    title: string;
  };
  language?: string;
  commandPath?: string;
  isInternationalized?: boolean;
}

interface Project {
  id: string;
  title: string;
  type: string;
  stack: string[];
  description: string;
  url: string;
  size: number;
  date: string;
}

function formatSize(size: number): string {
  return size.toLocaleString("en-US");
}

function getTodayDate(): string {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}


export default function ProjectsSection({
  dict,
  language = "sl",
  commandPath = "C:\\User\\Guest",
  isInternationalized = false,
}: ProjectsSectionProps) {
  // Determine title based on whether we're using internationalization or direct language
  const title = isInternationalized
    ? dict?.title
    : language === "sl"
    ? "Projekti"
    : "Projects";

  const projects: Project[] = [
    {
      id: "LIME_N_LEMON",
      title: "Agency Website",
      type: "WEB",
      stack: ["WordPress"],
      description:
        language === "sl"
          ? "Spletna stran agencije za organizacijo dogodkov"
          : "Website of an event planning agency",
      url: "https://limenlemon.si",
      size: 15360,
      date: getTodayDate(),
    },
    {
      id: "CELEIA_1902",
      title: "Real Estate Website",
      type: "WEB",
      stack: ["WordPress"],
      description:
        language === "sl"
          ? "Stran za prodajo nepremičnine s klikabilnim tlorisom"
          : "Property listing page with an interactive floor plan",
      url: "https://celeia1902.si",
      size: 8129,
      date: getTodayDate(),
    },
    // {
    //   id: "PROJECT_3",
    //   title: "Admin Dashboard",
    //   type: "APP",
    //   stack: ["Vue", "Firebase", "Chart.js"],
    //   description:
    //     language === "sl"
    //       ? "Nadzorna plošča za upravljanje podatkov"
    //       : "Dashboard for data management",
    //   url: "https://example.com/project3",
    // size: "10,240",
    //   date: "04/14/2023",
    // },
  ];
  
  const totalSize = projects.reduce((sum, p) => sum + p.size, 0);

  // State to track which project is "selected" or being viewed
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Function to toggle project selection
  const toggleProjectSelection = (projectId: string) => {
    if (selectedProject === projectId) {
      setSelectedProject(null);
    } else {
      setSelectedProject(projectId);
    }
  };

  return (
    <section
      id="projects"
      className="content-section"
    >
      <div className="section-content">
        <div className="section-header">
          <div className="terminal-line">{commandPath}&gt; cd projects</div>
          <div className="terminal-line">{commandPath}\projects&gt; dir</div>
        </div>
        <h2 className="section-title">{title}</h2>
        <div className="terminal-line">Directory of {commandPath}\projects</div>
        <div className="terminal-line">
          --------------------------------------------------
        </div>
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-listing"
          >
            <div
              className="terminal-line project-line"
              onClick={() => toggleProjectSelection(project.id)}
            >
              {project.id}.EXE &lt;{project.type}&gt; {formatSize(project.size)}{" "}
              bytes {project.date} [{project.stack.join(", ")}]
            </div>

            {/* Expanded project details when selected */}
            {selectedProject === project.id && (
              <div className="project-details">
                <div className="terminal-line">
                  {commandPath}\projects&gt; info {project.id}.EXE
                </div>
                <div className="terminal-line">
                  {language === "sl"
                    ? "Prikazujem informacije za"
                    : "Displaying information for"}{" "}
                  {project.id}.EXE...
                </div>
                <div className="project-info">
                  <div className="terminal-line">
                    {language === "sl" ? "Naslov" : "Title"}: {project.title}
                  </div>
                  <div className="terminal-line">
                    {language === "sl" ? "Tehnologije" : "Technologies"}:{" "}
                    {project.stack.join(", ")}
                  </div>
                  <div className="terminal-line">
                    {language === "sl" ? "Opis" : "Description"}:{" "}
                    {project.description}
                  </div>
                  <div className="terminal-line">
                    URL:{" "}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="command-link"
                    >
                      {project.url}
                    </a>
                  </div>
                </div>
                <div className="terminal-line">
                  {commandPath}\projects&gt; <span className="cursor"></span>
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="terminal-line">
          --------------------------------------------------
        </div>
        <div className="terminal-line">
          {projects.length} File(s) {formatSize(totalSize)} bytes
        </div>
        <div className="terminal-line">
          {commandPath}\projects&gt; <span className="cursor"></span>
        </div>
      </div>
    </section>
  );
}
