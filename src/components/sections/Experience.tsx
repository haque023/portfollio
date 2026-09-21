import { CheckCircle2 } from 'lucide-react'
import { experience } from '../../data/experience'
import { Reveal } from '../animations/Reveal'
import { Tag } from '../ui/Badge'
import { Section } from '../ui/Section'

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title="Where the work happens"
      description="Enterprise software and applied AI in a production environment."
    >
      <ol className="relative space-y-10 sm:pl-10">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] hidden w-px bg-line sm:block"
        />
        {experience.map((job) => (
          <li key={job.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-2 -left-10 hidden size-[15px] rounded-full border-2 border-accent bg-ink sm:block"
            />
            <Reveal>
              <article className="card p-5 sm:p-7">
                <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="text-xl font-semibold">{job.role}</h3>
                    <p className="mt-1 font-medium text-accent">
                      {job.company}
                      {job.location && (
                        <span className="font-normal text-fg-muted"> &middot; {job.location}</span>
                      )}
                    </p>
                  </div>
                  <p className="flex items-center gap-2 font-mono text-sm text-fg-muted">
                    <time>{job.start}</time>
                    <span aria-hidden="true">&ndash;</span>
                    <span className="sr-only">to</span>
                    {job.end ? (
                      <time>{job.end}</time>
                    ) : (
                      <span className="rounded-full border border-signal/40 bg-signal/10 px-2 py-0.5 text-xs text-signal">
                        Present
                      </span>
                    )}
                  </p>
                </header>

                <p className="mt-4 leading-relaxed text-fg-muted">{job.summary}</p>

                {job.metrics && job.metrics.length > 0 && (
                  <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                    {job.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex flex-col rounded-xl border border-line bg-ink/40 p-4"
                      >
                        <dt className="order-2 mt-1 text-xs text-fg-muted">{metric.label}</dt>
                        <dd className="order-1 font-mono text-xl font-semibold text-fg">
                          {metric.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <ul className="mt-6 space-y-3">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-relaxed">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span className="text-fg-muted">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
                  {job.technologies.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
