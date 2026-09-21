import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { seoPlugin } from './plugins/seo.ts'
import { profile } from './src/data/profile.ts'

/** Normalise a base path to the `/segment/` form Vite expects. */
function normaliseBase(value: string | undefined): string {
  const trimmed = (value ?? '').trim()
  if (!trimmed || trimmed === '/') return '/'
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const base = normaliseBase(env.VITE_BASE_PATH)

  return {
    // `/` for a custom domain (or USERNAME.github.io). `/REPOSITORY/` for project pages.
    base,
    define: {
      // Resolved at build time so the browser never probes for a missing PDF.
      __CV_AVAILABLE__: JSON.stringify(
        fs.existsSync(path.resolve(process.cwd(), 'public', profile.cvPath)),
      ),
    },
    plugins: [
      react(),
      tailwindcss(),
      seoPlugin({
        siteUrl: env.VITE_SITE_URL,
        base,
        githubUsername: env.VITE_GITHUB_USERNAME,
        linkedinUrl: env.VITE_LINKEDIN_URL,
      }),
    ],
    build: {
      target: 'es2022',
      sourcemap: false,
    },
  }
})
