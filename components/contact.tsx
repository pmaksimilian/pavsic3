export default function Contact({ dict }: { dict: any }) {
  return (
    <section className="section contact">
      <h2 className="section-title">{dict.title}</h2>
      <div className="contact-cta">
        <p className="mb-4">{dict.message}</p>
        <a href={`mailto:${dict.email}`} className="btn">
          {dict.buttonText}
        </a>
      </div>
    </section>
  )
}
