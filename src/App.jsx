import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Portfolio from './features/Portfolio/Portfolio'
import AllBlogs from './features/Blog/AllBlogs'
import SingleBlog from './features/Blog/SingleBlog'
import ChineseZodiac from './features/Apps/ChineseZodiac/ChineseZodiac'
import AppsIndex from './features/Apps/AppsIndex'
import AppPage from './features/Apps/AppPage'
import Themes from './features/Apps/Curiosities/Themes'
import ProjectsPage from './features/Portfolio/ProjectsPage'
import Curiosities from './features/Apps/Curiosities/Curiosities'
import LogoSizer from './features/Apps/Curiosities/LogoSizer'
import { useScrollReveal } from './hooks/useScrollReveal'
import { trackPageView } from './utils/analytics'

// Map any old /toys/* URL to its /apps/* equivalent so existing links survive.
function ToysToApps() {
  const location = useLocation()
  const target = location.pathname.replace(/^\/toys/, '/apps') + location.search + location.hash
  return <Navigate to={target} replace />
}

function RouteEffects() {
  const location = useLocation()

  // Analytics page view per route.
  useEffect(() => {
    const path = location.pathname + location.search
    trackPageView(path, document.title)
  }, [location.pathname, location.search])

  // Scroll to top on navigation (but allow in-page #anchors to work).
  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  // Re-arm scroll-reveal after each route swap.
  useScrollReveal(location.pathname)

  return null
}

function App() {
  return (
    <>
      <RouteEffects />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/blog/:slug" element={<SingleBlog />} />
          <Route path="/blog" element={<AllBlogs />} />
          <Route path="/apps" element={<AppsIndex />} />
          <Route path="/apps/zodiac" element={<ChineseZodiac />} />
          <Route path="/apps/:slug" element={<AppPage />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/curiosities" element={<Curiosities />} />
          <Route path="/logo-sizer" element={<LogoSizer />} />
          {/* Legacy redirects: /toys was renamed to /apps. */}
          <Route path="/toys/*" element={<ToysToApps />} />
          <Route path="/zodiac" element={<Navigate to="/apps/zodiac" replace />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/" element={<Portfolio />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
