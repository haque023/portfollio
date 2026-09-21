import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { env } from './lib/env'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

// Project detail pages are split into their own chunk; the home page stays lean.
const ProjectPage = lazy(() => import('./pages/ProjectPage'))

export default function App() {
  return (
    // Framer Motion: load only the DOM animation features, and honour prefers-reduced-motion.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {/* BASE_URL keeps routing correct when hosted under /REPOSITORY/. */}
        <BrowserRouter basename={env.base.replace(/\/$/, '') || '/'}>
          <Layout>
            <Suspense fallback={<div className="min-h-[60svh]" aria-hidden="true" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects/:id" element={<ProjectPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </MotionConfig>
    </LazyMotion>
  )
}
