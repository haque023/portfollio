import { flowNodes, supportPanels } from '../../data/architecture'
import { cn } from '../../lib/cn'
import type { SupportPanel } from '../../types'
import { FlowConnector } from '../animations/FlowConnector'
import { Reveal } from '../animations/Reveal'
import { Section } from '../ui/Section'

/** Nodes that make up the AI core are tinted so the diagram reads as layers, not a flat chain. */
const AI_CORE = new Set(['orchestration', 'retrieval', 'vector', 'llm'])

interface PanelProps {
  panel: SupportPanel
  /** Which side of the main flow the panel sits on (large screens). */
  side: 'left' | 'right'
}

const placement = {
  left: {
    grid: 'lg:col-start-1 lg:row-start-3 lg:row-span-4 lg:justify-self-end',
    line: 'lg:before:-right-14',
  },
  right: {
    grid: 'lg:col-start-3 lg:row-start-2 lg:row-span-6 lg:justify-self-start',
    line: 'lg:before:-left-14',
  },
}

/** Supporting-infrastructure panel, joined to the main flow by a dashed line on large screens. */
function Panel({ panel, side }: PanelProps) {
  const { grid, line } = placement[side]

  return (
    <Reveal className={cn('lg:w-full lg:max-w-64 lg:self-center', grid)}>
      <section
        aria-labelledby={`panel-${panel.id}`}
        className={cn(
          'relative rounded-2xl border border-dashed border-line-strong bg-surface/60 p-5',
          'lg:before:absolute lg:before:top-1/2 lg:before:w-14 lg:before:border-t lg:before:border-dashed lg:before:border-line-strong',
          line,
        )}
      >
        <h3
          id={`panel-${panel.id}`}
          className="mb-4 font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase"
        >
          {panel.title}
        </h3>
        <ul className="space-y-3">
          {panel.items.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rounded-full bg-signal/70"
              />
              <span>
                <span className="text-sm font-medium text-fg">{item.label}</span>
                {item.detail && <span className="block text-xs text-fg-muted">{item.detail}</span>}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  )
}

export function ArchitectureShowcase() {
  const { data, platform, crossCutting } = supportPanels

  return (
    <Section
      id="architecture"
      index="06"
      eyebrow="Architecture"
      title="How I Build AI Systems"
      description="The request path of a typical RAG or LLM application, and the infrastructure around it. A general pattern, not a description of one specific deployment."
    >
      <div className="bg-grid rounded-3xl border border-line bg-surface/30 p-4 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,26rem)_1fr] lg:gap-x-14 lg:gap-y-0">
          {flowNodes.map((node, i) => (
            <div key={node.id} className="flex flex-col items-center lg:col-start-2">
              <Reveal delay={Math.min(i, 5) * 0.05} className="w-full">
                <div
                  className={cn(
                    'relative w-full rounded-xl border p-4',
                    AI_CORE.has(node.id)
                      ? 'border-accent/40 bg-accent/[0.06]'
                      : 'border-line-strong bg-surface-2/70',
                  )}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-semibold">{node.label}</h3>
                    <span className="font-mono text-[11px] text-fg-subtle">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-fg-muted">{node.detail}</p>
                  <p className="mt-2 font-mono text-xs text-accent">{node.tech}</p>
                </div>
              </Reveal>
              {i < flowNodes.length - 1 && <FlowConnector className="my-1.5 lg:my-2" />}
            </div>
          ))}

          <Panel panel={data} side="left" />
          <Panel panel={platform} side="right" />
        </div>

        <Reveal className="mt-8">
          <section
            aria-labelledby="panel-cross"
            className="rounded-2xl border border-dashed border-line-strong bg-surface/60 p-5"
          >
            <h3
              id="panel-cross"
              className="mb-4 font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase"
            >
              {crossCutting.title}
            </h3>
            <ul className="grid gap-4 sm:grid-cols-3">
              {crossCutting.items.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70"
                  />
                  <span>
                    <span className="text-sm font-medium text-fg">{item.label}</span>
                    {item.detail && (
                      <span className="block text-xs text-fg-muted">{item.detail}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-fg-subtle">
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block size-3 rounded-sm border border-accent/60 bg-accent/10"
            />
            AI core
          </span>
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-0 w-5 border-t border-dashed border-line-strong"
            />
            Supporting infrastructure
          </span>
        </p>
      </div>
    </Section>
  )
}
