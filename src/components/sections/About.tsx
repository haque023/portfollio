import { Blocks, Bot, Cloud, Cpu, Database, ServerCog, type LucideIcon } from 'lucide-react'
import { profile } from '../../data/profile'
import { Reveal } from '../animations/Reveal'
import { Section } from '../ui/Section'

const icons: LucideIcon[] = [ServerCog, Database, Bot, Cloud, Blocks, Cpu]

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title="Enterprise engineer, AI builder"
      description="AI that is connected to real systems: ERP data, databases, APIs, industrial hardware and production infrastructure."
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal className="space-y-5 text-base leading-relaxed text-fg-muted">
          {profile.summary.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2">
          {profile.focusAreas.map((area, i) => {
            const Icon = icons[i % icons.length] ?? Cpu
            return (
              <li key={area.title}>
                <Reveal delay={i * 0.05} className="h-full">
                  <article className="card h-full p-5 transition-colors hover:border-line-strong">
                    <Icon className="mb-3 size-5 text-accent" aria-hidden="true" />
                    <h3 className="text-base font-semibold">{area.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                      {area.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
