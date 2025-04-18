"use client";

interface ProjectsSectionProps {
  dict?: {
    title: string;
  };
  language?: string;
  commandPath?: string;
  isInternationalized?: boolean;
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

  const projects = [
    {
      id: 1,
      title: "Project 1",
      image: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      id: 2,
      title: "Project 2",
      image: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      id: 3,
      title: "Project 3",
      image: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
  ];

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
        <div className="terminal-line">
          Directory of {commandPath}\projects
        </div>
        <div className="terminal-line">
          --------------------------------------------------
        </div>
        <div className="terminal-line">
          PROJECT_1.exe &lt;DIR&gt; 10,240 bytes 04/14/2025 10:30 AM
        </div>
        <div className="terminal-line">
          PROJECT_2.exe &lt;DIR&gt; 15,360 bytes 03/22/2025 02:15 PM
        </div>
        <div className="terminal-line">
          PROJECT_3.exe &lt;DIR&gt; 8,192 bytes 02/10/2025 09:45 AM
        </div>
        <div className="terminal-line">
          --------------------------------------------------
        </div>
        <div className="terminal-line">3 File(s) 33,792 bytes</div>
        <div className="terminal-line">
          {commandPath}\projects&gt; <span className="cursor"></span>
        </div>
      </div>
    </section>
  );
}
