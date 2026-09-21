import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { About } from '../components/sections/About'
import { ArchitectureShowcase } from '../components/sections/ArchitectureShowcase'
import { Contact } from '../components/sections/Contact'
import { Experience } from '../components/sections/Experience'
import { GithubSection } from '../components/sections/GithubSection'
import { Hero } from '../components/sections/Hero'
import { Learning } from '../components/sections/Learning'
import { Philosophy } from '../components/sections/Philosophy'
import { Projects } from '../components/sections/Projects'
import { Skills } from '../components/sections/Skills'

export function HomePage() {
  useDocumentMeta()

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Learning />
      <Projects />
      <GithubSection />
      <ArchitectureShowcase />
      <Philosophy />
      <Contact />
    </>
  )
}
