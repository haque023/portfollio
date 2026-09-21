import { useState } from 'react'
import { projectCategories, projects } from '../../data/projects'
import { cn } from '../../lib/cn'
import { Reveal } from '../animations/Reveal'
import { Section } from '../ui/Section'
import { ProjectCard } from './ProjectCard'

const ALL = 'All'

export function Projects() {
  const [filter, setFilter] = useState<string>(ALL)
  const visible = filter === ALL ? projects : projects.filter((p) => p.category === filter)

  return (
    <Section
      id="projects"
      index="05"
      eyebrow="Featured projects"
      title="Systems I have designed and built"
      description="Each card is labelled with its real maturity. Only Production means running in production; MVP, Prototype, Concept, Reference and Research are used wherever that is more accurate."
    >
      <Reveal>
        <div
          role="group"
          aria-label="Filter projects by category"
          className="mb-8 flex flex-wrap gap-2"
        >
          {[ALL, ...projectCategories].map((category) => {
            const selected = filter === category
            return (
              <button
                key={category}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(category)}
                className={cn(
                  'h-9 rounded-full border px-4 text-sm transition-colors',
                  selected
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-line-strong text-fg-muted hover:border-fg-subtle hover:text-fg',
                )}
              >
                {category}
              </button>
            )
          })}
        </div>
      </Reveal>

      <p className="sr-only" role="status">
        Showing {visible.length} of {projects.length} projects
      </p>
      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
