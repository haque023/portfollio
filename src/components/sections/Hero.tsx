import { Link } from 'react-router-dom'
import { m, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { profile, stats } from '../../data/profile'
import { githubLink, linkedinLink } from '../../data/social'
import { HeroBackground } from '../animations/HeroBackground'
import { buttonStyles } from '../ui/Button'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { CvButton } from '../ui/CvButton'
import { Tag } from '../ui/Badge'
import { Container } from '../ui/Section'

const pipeline = [
  { step: 'embed(query)', comment: 'embeddings', delay: '0s' },
  { step: 'vector_db.search(top_k)', comment: 'semantic search', delay: '1.5s' },
  { step: 'build_context(chunks)', comment: 'retrieval', delay: '3s' },
  { step: 'llm.generate(context)', comment: 'Azure OpenAI', delay: '4.5s' },
  { step: 'answer', comment: 'grounded response', delay: '6s' },
]

function PipelineCard() {
  return (
    <div className="relative rounded-2xl border border-line-strong bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <span className="font-mono text-xs text-fg-subtle">rag_request_flow</span>
        <span className="w-10" aria-hidden="true" />
      </div>
      <div className="p-5 font-mono text-[13px] leading-7">
        <p className="text-fg-subtle">
          <span className="text-signal">#</span> illustrative request flow
        </p>
        <p>
          <span className="text-accent">query</span> <span className="text-fg-subtle">=</span>{' '}
          <span className="text-amber">&quot;user question&quot;</span>
        </p>
        {pipeline.map((line) => (
          <p
            key={line.step}
            className="flex animate-step flex-wrap items-baseline gap-x-2 opacity-60"
            style={{ animationDelay: line.delay }}
          >
            <span className="text-fg-subtle" aria-hidden="true">
              &rarr;
            </span>
            <span className="text-fg">{line.step}</span>
            <span className="text-fg-subtle"># {line.comment}</span>
          </p>
        ))}
        <p className="mt-1 text-fg-subtle">
          <span
            className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent"
            aria-hidden="true"
          />
        </p>
      </div>
    </div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const item = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section id="home" aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <HeroBackground />
      <Container className="relative pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <m.p
              {...item(0)}
              className="mb-5 font-mono text-xs tracking-[0.18em] text-accent uppercase"
            >
              AI Engineering &middot; .NET &middot; Azure
            </m.p>
            <m.h1
              {...item(0.08)}
              id="hero-heading"
              className="text-4xl leading-[1.05] font-semibold sm:text-6xl lg:text-7xl"
            >
              <span className="text-gradient">{profile.name}</span>
            </m.h1>
            <m.p {...item(0.16)} className="mt-5 text-xl font-medium text-fg sm:text-2xl">
              {profile.roles.map((role, i) => (
                <span key={role}>
                  {i > 0 && (
                    <span className="mx-2 text-fg-subtle" aria-hidden="true">
                      |
                    </span>
                  )}
                  {i > 0 && <span className="sr-only"> and </span>}
                  {role}
                </span>
              ))}
            </m.p>
            <m.p
              {...item(0.24)}
              className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg"
            >
              {profile.tagline}
            </m.p>

            <m.div {...item(0.32)} className="mt-8 flex flex-wrap gap-3">
              <Link to={{ pathname: '/', hash: '#projects' }} className={buttonStyles('primary')}>
                View Projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <CvButton />
              <Link to={{ pathname: '/', hash: '#contact' }} className={buttonStyles('secondary')}>
                <Mail className="size-4" aria-hidden="true" />
                Contact
              </Link>
            </m.div>

            {(githubLink || linkedinLink) && (
              <m.ul {...item(0.4)} className="mt-4 flex gap-2">
                {githubLink && (
                  <li>
                    <a
                      href={githubLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonStyles('ghost', 'sm')}
                    >
                      <GithubIcon className="size-4" />
                      GitHub
                    </a>
                  </li>
                )}
                {linkedinLink && (
                  <li>
                    <a
                      href={linkedinLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonStyles('ghost', 'sm')}
                    >
                      <LinkedinIcon className="size-4" />
                      LinkedIn
                    </a>
                  </li>
                )}
              </m.ul>
            )}

            <m.ul {...item(0.48)} className="mt-8 flex flex-wrap gap-2" aria-label="Core stack">
              {['.NET', 'Python', 'LLM', 'RAG', 'Azure'].map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </m.ul>
          </div>

          <m.div {...item(0.3)} className="hidden lg:block">
            <PipelineCard />
          </m.div>
        </div>

        <m.dl
          {...item(0.56)}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line-strong/60 bg-line-strong/40 sm:mt-20 lg:grid-cols-4"
          aria-label="At a glance"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col bg-surface/90 p-4 sm:p-5">
              <dt className="order-2 mt-1 text-xs text-fg-muted sm:text-sm">{s.label}</dt>
              <dd className="order-1 font-mono text-lg font-semibold sm:text-2xl">{s.value}</dd>
              {s.note && (
                <dd className="order-3 mt-1 text-[11px] text-fg-subtle sm:text-xs">{s.note}</dd>
              )}
            </div>
          ))}
        </m.dl>
        <p className="mt-3 text-xs text-fg-subtle">Figures are approximate and self-reported.</p>
      </Container>
    </section>
  )
}
