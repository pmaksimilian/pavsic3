"use client";

import { useEffect, useState } from "react";

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
  const [emailHTML, setEmailHTML] = useState("");

  useEffect(() => {
    const user = "&#105;&#110;&#102;&#111;"; // "info"
    const domain = "&#112;&#97;&#118;&#115;&#105;&#99;&#46;&#110;&#101;&#116;"; // "pavsic.net"
    const email = `${user}@${domain}`;

    const html = `<a href="mailto:${email}" class="command-link">${email}</a>`;
    setEmailHTML(html);
  }, []);

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

  return (
    <section id="contact" className="content-section">
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
          <span dangerouslySetInnerHTML={{ __html: emailHTML }} />
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
