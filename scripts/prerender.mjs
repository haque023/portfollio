// Injects pre-rendered HTML into the built pages so crawlers, link-preview scrapers and
// non-JavaScript readers see the real content. Runs after the client and SSR builds.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const distDir = path.resolve('dist')
const ssrDir = path.resolve('dist-ssr')
const placeholder = '<div id="root"></div>'

const { render, routes } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

for (const route of routes) {
  const file = route === '/' ? 'index.html' : path.join(route.slice(1), 'index.html')
  const target = path.join(distDir, file)
  const template = fs.readFileSync(target, 'utf8')
  if (!template.includes(placeholder)) throw new Error(`Root placeholder missing in ${file}`)

  const appHtml = await render(route)
  // Function replacer: the rendered HTML contains "$" characters that String.replace would interpret.
  fs.writeFileSync(
    target,
    template.replace(placeholder, () => `<div id="root">${appHtml}</div>`),
  )
  console.log(`prerendered ${route} -> ${path.relative('.', target)} (${appHtml.length} chars)`)
}

fs.rmSync(ssrDir, { recursive: true, force: true })
