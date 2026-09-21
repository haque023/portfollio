import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import './index.css'

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production pages are pre-rendered at build time, so hydrate them. The dev server and the
// 404 fallback ship an empty root and render from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
