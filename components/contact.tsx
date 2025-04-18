"use client";

interface ContactSectionProps {
  dict?: {
    title: string;
    message: string;
    email: string;
    buttonText: string;
  };
  language?: string;
  commandPath?: string;
  isInternationalized?: boolean;
}

export default function ContactSection({
  dict,
  language = "sl",
  commandPath = "C:\\User\\Guest",
  isInternationalized = false,
}: ContactSectionProps) {
  // Determine content based on whether we're using internationalization or direct language
  const title = isInternationalized
    ? dict?.title
    : language === "sl"
    ? "Kontakt"
    : "Contact";
  const message = isInternationalized
    ? dict?.message
    : language === "sl"
    ? "Vas zanima sodelovanje? Pošljite mi e-pošto!"
    : "Interested in working together? Send me an email!";
  const email = dict?.email || "info@pavsic.net";

  return (
    <section
      id="contact"
      className="content-section"
    >
      <div className="section-content">
        <div className="section-header">
          <div className="terminal-line">{commandPath}&gt; cd contact</div>
          <div className="terminal-line">
            {commandPath}\contact&gt; type CONTACT.txt
          </div>
        </div>
        <h2 className="section-title">{title}</h2>
        <div className="terminal-line">
          --------------------------------------------------
        </div>
        <div className="terminal-text">{message}</div>
        <div className="terminal-line">
          EMAIL:{" "}
          <a
            href={`mailto:${email}`}
            className="command-link"
          >
            {email}
          </a>
        </div>
        <div className="terminal-line">
          --------------------------------------------------
        </div>
        <div className="terminal-line">
          {commandPath}\contact&gt; <span className="cursor"></span>
        </div>
      </div>
    </section>
  );
}
