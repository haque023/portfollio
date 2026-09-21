import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { profile } from '../src/data/profile.ts'
import { site } from '../src/data/site.ts'
import { projects } from '../src/data/projects.ts'
import { buildStructuredData } from '../src/lib/structuredData.ts'

interface SeoPluginOptions {
  siteUrl?: string
  base: string
  githubUsername?: string
  linkedinUrl?: string
}

interface PageMeta {
  title: string
  description: string
  /** Path relative to the site base, e.g. "" or "projects/rag-platform/". */
  path: string
}

const SEO_START = '<!--seo:start-->'
const SEO_END = '<!--seo:end-->'

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const isPlaceholder = (value: string | undefined) =>
  !value || /yourdomain\.com|yourusername|yourprofile/i.test(value)

export function seoPlugin(options: SeoPluginOptions): Plugin {
  const siteUrl = isPlaceholder(options.siteUrl)
    ? undefined
    : options.siteUrl!.trim().replace(/\/+$/, '')
  const github = isPlaceholder(options.githubUsername) ? undefined : options.githubUsername!.trim()
  const linkedin = isPlaceholder(options.linkedinUrl) ? undefined : options.linkedinUrl!.trim()
  const base = options.base
  const publicDir = path.resolve(process.cwd(), 'public')

  const absolute = (relPath: string) =>
    siteUrl ? `${siteUrl}${base === '/' ? '' : base.replace(/\/$/, '')}/${relPath}` : undefined

  const ogImage = fs.existsSync(path.join(publicDir, 'og-image.png'))
    ? absolute('og-image.png')
    : undefined

  const homeMeta: PageMeta = { title: site.title, description: site.description, path: '' }

  function renderHead(page: PageMeta): string {
    const url = absolute(page.path)
    const tags: string[] = [
      `<title>${escapeAttr(page.title)}</title>`,
      `<meta name="description" content="${escapeAttr(page.description)}" />`,
      `<meta name="author" content="${escapeAttr(profile.name)}" />`,
      '<meta name="robots" content="index, follow, max-image-preview:large" />',
      `<meta property="og:type" content="${page.path ? 'article' : 'website'}" />`,
      `<meta property="og:site_name" content="${escapeAttr(profile.name)}" />`,
      `<meta property="og:title" content="${escapeAttr(page.title)}" />`,
      `<meta property="og:description" content="${escapeAttr(page.description)}" />`,
      `<meta property="og:locale" content="${site.locale}" />`,
      `<meta name="twitter:card" content="${ogImage ? 'summary_large_image' : 'summary'}" />`,
      `<meta name="twitter:title" content="${escapeAttr(page.title)}" />`,
      `<meta name="twitter:description" content="${escapeAttr(page.description)}" />`,
    ]
    if (url) {
      tags.push(`<link rel="canonical" href="${escapeAttr(url)}" />`)
      tags.push(`<meta property="og:url" content="${escapeAttr(url)}" />`)
    }
    if (ogImage) {
      tags.push(`<meta property="og:image" content="${escapeAttr(ogImage)}" />`)
      tags.push(`<meta property="og:image:alt" content="${escapeAttr(site.ogImageAlt)}" />`)
      tags.push(`<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`)
    }
    if (!page.path) {
      const json = JSON.stringify(
        buildStructuredData({ siteUrl: absolute(''), github, linkedin }),
      ).replace(/</g, '\\u003c')
      tags.push(`<script type="application/ld+json">${json}</script>`)
    }
    return `${SEO_START}\n    ${tags.join('\n    ')}\n    ${SEO_END}`
  }

  return {
    name: 'portfolio-seo',
    // Must run after Vite's own HTML plugin has emitted index.html.
    enforce: 'post',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace('<!--app-head-->', renderHead(homeMeta)),
    },
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        const indexAsset = bundle['index.html']
        if (!indexAsset || indexAsset.type !== 'asset') return
        const indexHtml = String(indexAsset.source)

        // GitHub Pages serves 404.html for unknown paths; the SPA renders its own not-found page.
        this.emitFile({ type: 'asset', fileName: '404.html', source: indexHtml })

        // Pre-rendered head for each project detail route so shared links and crawlers get
        // route-specific metadata and a real 200 response on GitHub Pages.
        const start = indexHtml.indexOf(SEO_START)
        const end = indexHtml.indexOf(SEO_END)
        if (start !== -1 && end !== -1) {
          for (const project of projects) {
            const page: PageMeta = {
              title: `${project.title} | ${profile.name}`,
              description: project.summary,
              path: `projects/${project.id}/`,
            }
            const html =
              indexHtml.slice(0, start) + renderHead(page) + indexHtml.slice(end + SEO_END.length)
            this.emitFile({
              type: 'asset',
              fileName: `projects/${project.id}/index.html`,
              source: html,
            })
          }
        }

        if (!siteUrl) {
          this.warn('VITE_SITE_URL is not set: sitemap.xml, canonical and og:url are skipped.')
          this.emitFile({
            type: 'asset',
            fileName: 'robots.txt',
            source: 'User-agent: *\nAllow: /\n',
          })
          return
        }

        const today = new Date().toISOString().slice(0, 10)
        const urls = ['', ...projects.map((p) => `projects/${p.id}/`)]
        const sitemap =
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          urls
            .map(
              (u) =>
                `  <url>\n    <loc>${absolute(u)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
            )
            .join('\n') +
          '\n</urlset>\n'
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
        this.emitFile({
          type: 'asset',
          fileName: 'robots.txt',
          source: `User-agent: *\nAllow: /\n\nSitemap: ${absolute('sitemap.xml')}\n`,
        })
      },
    },
  }
}
