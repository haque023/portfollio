import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'
import { routerBasename } from './lib/env'
import { projects } from './data/projects'

/** Routes that get a pre-rendered HTML file at build time. */
export const routes = ['/', ...projects.map((p) => `/projects/${p.id}`)]

/** Renders one route to an HTML string. */
export async function render(route: string): Promise<string> {
  const location = `${routerBasename === '/' ? '' : routerBasename}${route}`
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={location} basename={routerBasename}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
  return new Response(prelude).text()
}
