import { GitFork, Star } from 'lucide-react'
import { repositories } from '../../data/github'
import { githubLink } from '../../data/social'
import { env } from '../../lib/env'
import { Reveal } from '../animations/Reveal'
import { buttonStyles } from '../ui/Button'
import { GithubIcon } from '../ui/BrandIcons'
import { Tag } from '../ui/Badge'
import { Section } from '../ui/Section'

/**
 * Repository data is configured manually in `src/data/github.ts`, so the page never calls
 * the GitHub API. The section is omitted entirely until there is something real to show.
 */
export function GithubSection() {
  if (!githubLink && repositories.length === 0) return null

  return (
    <Section
      id="github"
      eyebrow="Open source"
      title="On GitHub"
      description="Selected repositories, maintained by hand so the numbers and descriptions stay accurate."
      className="pt-0 sm:pt-0"
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {githubLink && (
          <Reveal className="h-full">
            <div className="card flex h-full flex-col justify-between gap-6 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl border border-line-strong bg-surface-2">
                  <GithubIcon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">@{env.githubUsername}</p>
                  <p className="font-mono text-xs text-fg-subtle">{githubLink.display}</p>
                </div>
              </div>
              <a
                href={githubLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles('secondary')}
              >
                View GitHub
              </a>
            </div>
          </Reveal>
        )}

        {repositories.map((repo, i) => (
          <Reveal key={repo.name} delay={i * 0.05} className="h-full">
            <article className="card flex h-full flex-col p-5 transition-colors hover:border-accent/40 sm:p-6">
              <h3 className="font-mono text-base font-semibold">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  {repo.name}
                </a>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
                {repo.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                {repo.technologies.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
              {(repo.stars !== undefined || repo.forks !== undefined) && (
                <p className="mt-4 flex gap-4 text-xs text-fg-muted">
                  {repo.stars !== undefined && (
                    <span className="flex items-center gap-1">
                      <Star className="size-3.5" aria-hidden="true" />
                      {repo.stars} <span className="sr-only">stars</span>
                    </span>
                  )}
                  {repo.forks !== undefined && (
                    <span className="flex items-center gap-1">
                      <GitFork className="size-3.5" aria-hidden="true" />
                      {repo.forks} <span className="sr-only">forks</span>
                    </span>
                  )}
                </p>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
