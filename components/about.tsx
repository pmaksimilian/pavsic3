import Image from "next/image"

export default function About({ dict }: { dict: any }) {
  return (
    <section className="section about">
      <h2 className="section-title">{dict.title}</h2>
      <div className="about-container">
        <div className="about-image">
          <Image
            src="/placeholder.svg?height=300&width=300"
            alt="Profile"
            width={300}
            height={300}
            style={{
              border: "1px solid var(--terminal-border)",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="about-text">
          <p>{dict.content}</p>
        </div>
      </div>
    </section>
  )
}
