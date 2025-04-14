import { getDictionary } from "@/lib/dictionaries"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import About from "@/components/about"
import Contact from "@/components/contact"

export default async function Home({
  params,
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <main className="main-content">
      <Hero dict={dict.hero} />
      <Projects dict={dict.projects} />
      <About dict={dict.about} />
      <Contact dict={dict.contact} />
    </main>
  )
}
