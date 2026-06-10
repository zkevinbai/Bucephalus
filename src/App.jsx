import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Portfolio from './features/Portfolio/Portfolio'
import AllBlogs from './features/Blog/AllBlogs'
import SingleBlog from './features/Blog/SingleBlog'
import ChineseZodiac from './features/ChineseZodiac/ChineseZodiac'
import Toys from './features/Toys/Toys'
import ToyPage from './features/Toys/ToyPage'
import Themes from './features/Themes/Themes'
import { useScrollReveal } from './hooks/useScrollReveal'
import { trackPageView } from './utils/analytics'

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
    <BrowserRouter>
      <RouteEffects />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/blog/:slug" element={<SingleBlog />} />
          <Route path="/blog" element={<AllBlogs />} />
          <Route path="/toys" element={<Toys />} />
          <Route path="/toys/zodiac" element={<ChineseZodiac />} />
          <Route path="/toys/:slug" element={<ToyPage />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/zodiac" element={<Navigate to="/toys/zodiac" replace />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/" element={<Portfolio />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
