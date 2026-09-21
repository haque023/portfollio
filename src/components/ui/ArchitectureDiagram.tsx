import { Fragment } from 'react'
import type { ArchitectureLayer } from '../../types'
import { FlowConnector } from '../animations/FlowConnector'

/**
 * Renders a project's architecture as stacked, numbered layers joined by flow connectors.
 * Pure HTML/CSS: no images, so it scales, themes and prints cleanly.
 */
export function ArchitectureDiagram({
  layers,
  title,
}: {
  layers: ArchitectureLayer[]
  title: string
}) {
  return (
    <figure className="bg-dots relative rounded-2xl border border-dashed border-line-strong bg-surface/60 p-4 sm:p-6">
      <figcaption className="sr-only">{title} architecture, top to bottom</figcaption>
      <ol className="mx-auto max-w-2xl">
        {layers.map((layer, i) => (
          <Fragment key={layer.label}>
            <li className="relative rounded-xl border border-line-strong bg-ink/80 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
                <div className="sm:w-36 sm:shrink-0">
                  <span className="font-mono text-[11px] text-fg-subtle">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-mono text-sm font-medium text-accent">{layer.label}</p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line-strong bg-surface-2/70 px-2.5 py-1 text-xs sm:text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {i < layers.length - 1 && (
              <li aria-hidden="true" className="list-none">
                <FlowConnector />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </figure>
  )
}
