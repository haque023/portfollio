/// <reference types="vite/client" />

/** True when public/cv/MD-Emdadul-Haque-CV.pdf existed at build time (see vite.config.ts). */
declare const __CV_AVAILABLE__: boolean

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_BASE_PATH?: string
  readonly VITE_GITHUB_USERNAME?: string
  readonly VITE_LINKEDIN_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
