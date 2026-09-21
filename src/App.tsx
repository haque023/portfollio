import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { routerBasename } from './lib/env'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import ProjectPage from './pages/ProjectPage'

/**
 * Router-agnostic app shell, shared by the browser entry and the build-time pre-renderer.
 * Pages are imported statically (the project page is ~2 kB gzipped) so the server and client
 * render identical trees; a lazy route would put a Suspense boundary in one but not the other
 * and break hydration.
 */
export function AppRoutes() {
  return (
    // Framer Motion: load only the DOM animation features, and honour prefers-reduced-motion.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </MotionConfig>
    </LazyMotion>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <AppRoutes />
    </BrowserRouter>
  )
}
