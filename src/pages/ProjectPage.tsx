import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink, Info } from 'lucide-react'
import { getProject, projects } from '../data/projects'
import { profile } from '../data/profile'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { ArchitectureDiagram } from '../components/ui/ArchitectureDiagram'
import { StatusBadge, Tag } from '../components/ui/Badge'
import { GithubIcon } from '../components/ui/BrandIcons'
import { buttonStyles } from '../components/ui/Button'
import { Container } from '../components/ui/Section'
import { NotFoundPage } from './NotFoundPage'

function DetailSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <h2
        id={`${id}-heading`}
        className="mb-4 font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-fg-muted">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ProjectPage() {
  const { id } = useParams()
  const project = getProject(id)
  useDocumentMeta(project ? `${project.title} | ${profile.name}` : undefined, project?.summary)

  if (!project) return <NotFoundPage what="project" />

  const index = projects.findIndex((p) => p.id === project.id)
  const next = projects[(index + 1) % projects.length]
  const previous = projects[(index - 1 + projects.length) % projects.length]

  return (
    <article className="pt-28 pb-20 sm:pt-36">
      <Container>
        <Link
          to={{ pathname: '/', hash: '#projects' }}
          className="mb-8 inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All projects
        </Link>

        <header className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="font-mono text-xs tracking-wider text-fg-subtle uppercase">
              {project.category}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold sm:text-5xl">{project.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted">{project.summary}</p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="space-y-12">
            <DetailSection id="overview" title="Overview">
              <p className="leading-relaxed text-fg-muted">{project.overview}</p>
            </DetailSection>

            <div className="grid gap-12 md:grid-cols-2 md:gap-8">
              <DetailSection id="problem" title="Problem">
                <p className="leading-relaxed text-fg-muted">{project.problem}</p>
              </DetailSection>
              <DetailSection id="solution" title="Solution">
                <p className="leading-relaxed text-fg-muted">{project.solution}</p>
              </DetailSection>
            </div>

            <DetailSection id="architecture" title="Architecture">
              <ArchitectureDiagram layers={project.architecture} title={project.title} />
              <div className="mt-6">
                <BulletList items={project.architectureHighlights} />
              </div>
            </DetailSection>

            <DetailSection id="features" title="Key features">
              <BulletList items={project.keyFeatures} />
            </DetailSection>

            <DetailSection id="challenges" title="Engineering challenges">
              <BulletList items={project.challenges} />
            </DetailSection>

            <DetailSection id="results" title="Results">
              {project.results.length > 0 ? (
                <BulletList items={project.results} />
              ) : (
                <p className="flex gap-3 rounded-xl border border-line bg-surface/60 p-4 text-sm leading-relaxed text-fg-muted">
                  <Info className="mt-0.5 size-4 shrink-0 text-fg-subtle" aria-hidden="true" />
                  No measured outcomes are published for this project. I only list results that have
                  been verified.
                </p>
              )}
            </DetailSection>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Project facts">
            <div className="card space-y-6 p-5">
              <div>
                <h2 className="mb-3 font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase">
                  Technology stack
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="mb-3 font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase">
                  Links
                </h2>
                <div className="flex flex-col gap-2">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonStyles('secondary', 'md', 'w-full')}
                    >
                      <GithubIcon className="size-4" />
                      GitHub
                    </a>
                  ) : (
                    <p className="text-sm text-fg-subtle">Source code is not publicly listed.</p>
                  )}
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonStyles('secondary', 'md', 'w-full')}
                    >
                      <ExternalLink className="size-4" aria-hidden="true" />
                      Live demo
                    </a>
                  ) : (
                    <p className="text-sm text-fg-subtle">No live demo available.</p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <nav
          aria-label="More projects"
          className="mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
        >
          {previous && previous.id !== project.id && (
            <Link
              to={`/projects/${previous.id}`}
              className="card p-5 transition-colors hover:border-accent/50"
            >
              <span className="flex items-center gap-2 font-mono text-xs text-fg-subtle uppercase">
                <ArrowLeft className="size-3.5" aria-hidden="true" /> Previous
              </span>
              <span className="mt-1 block font-semibold">{previous.title}</span>
            </Link>
          )}
          {next && next.id !== project.id && (
            <Link
              to={`/projects/${next.id}`}
              className="card p-5 text-right transition-colors hover:border-accent/50 sm:col-start-2"
            >
              <span className="flex items-center justify-end gap-2 font-mono text-xs text-fg-subtle uppercase">
                Next <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
              <span className="mt-1 block font-semibold">{next.title}</span>
            </Link>
          )}
        </nav>
      </Container>
    </article>
  )
}
