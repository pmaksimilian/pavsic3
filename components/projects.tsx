import Image from "next/image"

type Project = {
  id: number
  title: string
  image: string
  url: string
}

export default function Projects({ dict }: { dict: any }) {
  const projects: Project[] = [
    { id: 1, title: "Project 1", image: "/placeholder.svg?height=200&width=300", url: "#" },
    { id: 2, title: "Project 2", image: "/placeholder.svg?height=200&width=300", url: "#" },
    { id: 3, title: "Project 3", image: "/placeholder.svg?height=200&width=300", url: "#" },
    { id: 4, title: "Project 4", image: "/placeholder.svg?height=200&width=300", url: "#" },
  ]

  return (
    <section className="section projects">
      <h2 className="section-title">{dict.title}</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <a href={project.url} key={project.id} className="project-item">
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="project-overlay">
                <div className="project-title">{project.title}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
