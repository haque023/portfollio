import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import type { Project } from '../../types'
import { GithubIcon } from '../ui/BrandIcons'
import { StatusBadge, Tag } from '../ui/Badge'

const MAX_TAGS = 5

export function ProjectCard({ project }: { project: Project }) {
  const extra = project.technologies.length - MAX_TAGS

  return (
    <m.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="card group relative flex h-full flex-col p-5 transition-colors hover:border-accent/40 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">
          {project.category}
        </p>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="mt-4 text-xl font-semibold">
        <Link
          to={`/projects/${project.id}`}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-offset-4"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{project.summary}</p>

      <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
        <div>
          <dt className="font-mono text-[11px] tracking-wider text-accent uppercase">Problem</dt>
          <dd className="mt-1 line-clamp-3 text-fg-muted">{project.problem}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] tracking-wider text-accent uppercase">Solution</dt>
          <dd className="mt-1 line-clamp-3 text-fg-muted">{project.solution}</dd>
        </div>
        {project.architectureHighlights[0] && (
          <div>
            <dt className="font-mono text-[11px] tracking-wider text-accent uppercase">
              Architecture
            </dt>
            <dd className="mt-1 line-clamp-3 text-fg-muted">{project.architectureHighlights[0]}</dd>
          </div>
        )}
      </dl>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
        {project.technologies.slice(0, MAX_TAGS).map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
        {extra > 0 && (
          <li>
            <Tag>+{extra}</Tag>
          </li>
        )}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
          View details
          <ArrowUpRight
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
        <div className="relative z-10 flex gap-1">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="flex size-9 items-center justify-center rounded-lg text-fg-muted hover:bg-white/5 hover:text-fg"
            >
              <GithubIcon className="size-4" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="flex size-9 items-center justify-center rounded-lg text-fg-muted hover:bg-white/5 hover:text-fg"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </m.article>
  )
}
