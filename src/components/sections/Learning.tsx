import { Award, BookOpen, GraduationCap } from 'lucide-react'
import { certifications, learning } from '../../data/certifications'
import { education } from '../../data/experience'
import { Reveal } from '../animations/Reveal'
import { Tag } from '../ui/Badge'
import { Section } from '../ui/Section'

export function Learning() {
  return (
    <Section
      id="learning"
      index="04"
      eyebrow="Education & learning"
      title="Foundations and ongoing study"
      description="Formal education, plus the areas I am actively learning. Exploration is labelled as exploration."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((entry) => (
          <Reveal key={entry.id}>
            <article className="card h-full p-5 sm:p-6">
              <GraduationCap className="mb-3 size-5 text-accent" aria-hidden="true" />
              <h3 className="text-lg font-semibold">{entry.degree}</h3>
              <p className="mt-1 text-fg-muted">{entry.institution}</p>
              {entry.result && <p className="mt-3 font-mono text-sm text-accent">{entry.result}</p>}
              {entry.notes && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {entry.notes.map((note) => (
                    <li key={note}>
                      <Tag>{note}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        ))}

        {certifications.map((cert) => (
          <Reveal key={cert.id}>
            <article className="card h-full p-5 sm:p-6">
              <Award className="mb-3 size-5 text-accent" aria-hidden="true" />
              <h3 className="text-lg font-semibold">{cert.title}</h3>
              <p className="mt-1 text-fg-muted">
                {cert.issuer}
                {cert.date && <span> &middot; {cert.date}</span>}
              </p>
              {cert.details && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cert.details.map((detail) => (
                    <li key={detail}>
                      <Tag>{detail}</Tag>
                    </li>
                  ))}
                </ul>
              )}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-accent underline"
                >
                  View credential
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold">
          <BookOpen className="size-5 text-accent" aria-hidden="true" />
          Currently exploring
        </h3>
      </Reveal>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {learning.map((item, i) => (
          <li key={item.id}>
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              <article className="card h-full p-5">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
