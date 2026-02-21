import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Breadcrumbs from './components/Breadcrumbs'
import Portfolio from './features/Portfolio/Portfolio'
import AllBlogs from './features/Blog/AllBlogs'
import SingleBlog from './features/Blog/SingleBlog'
import ChineseZodiac from './features/ChineseZodiac/ChineseZodiac'
import { trackPageView } from './utils/analytics'

function AnalyticsPageView() {
  const location = useLocation()
  useEffect(() => {
    const path = location.pathname + location.search
    trackPageView(path, document.title)
  }, [location.pathname, location.search])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <AnalyticsPageView />
      <Header />
      <Breadcrumbs />
      <Routes>
        <Route path="/blog/:slug" element={<SingleBlog />} />
        <Route path="/blog" element={<AllBlogs />} />
        <Route path="/zodiac" element={<ChineseZodiac />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
