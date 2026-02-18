import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Portfolio from './features/Portfolio/Portfolio'
import AllBlogs from './features/Blog/AllBlogs'
import SingleBlog from './features/Blog/SingleBlog'
import ChineseZodiac from './features/ChineseZodiac/ChineseZodiac'

function Cube3DWrapper() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Determine current view based on pathname
  const getViewFromPath = (pathname) => {
    if (pathname === '/blog') return 'blog'
    if (pathname === '/zodiac') return 'zodiac'
    return 'portfolio'
  }
  
  const [currentView, setCurrentView] = useState(getViewFromPath(location.pathname))
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Sync state with route changes
  useEffect(() => {
    setCurrentView(getViewFromPath(location.pathname))
  }, [location.pathname])
  
  // Scroll to top when switching between apps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsScrolled(false)
  }, [currentView])
  
  // Detect scroll position to minimize button
  useEffect(() => {
    const handleScroll = () => {
      // Hide when scrolled past ~600px (roughly past Hero/Skills, at tabs area)
      const scrollThreshold = 600
      setIsScrolled(window.scrollY > scrollThreshold)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const handleViewChange = (newView) => {
    setCurrentView(newView)
    
    // Scroll to top immediately
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Navigate
    if (newView === 'blog') {
      navigate('/blog')
    } else if (newView === 'zodiac') {
      navigate('/zodiac')
    } else {
      navigate('/')
    }
  }
  
  // Calculate rotation angle: 0deg (Portfolio), 120deg (Blog), 240deg (Zodiac)
  const rotationAngles = {
    portfolio: 0,
    blog: 120,
    zodiac: 240
  }
  
  const rotationAngle = rotationAngles[currentView] || 0
  
  return (
    <div className="relative w-screen">
      {/* View Selector - Upper Right */}
      <div
        className={`fixed z-50 inline-flex items-center gap-2 bg-white/40 border border-gray-300/40 rounded-lg text-gray-800 font-raleway font-medium shadow-md hover:bg-white/60 hover:border-gray-400/60 hover:text-gray-900 hover:-translate-y-[1px] hover:shadow-lg transition-all duration-300 backdrop-blur-sm ${
          isScrolled 
            ? 'px-3 py-2 text-xs' 
            : 'px-5 py-3 text-sm'
        }`}
        style={{
          // Support iOS Chrome and Safari - account for safe area insets
          top: 'calc(1rem + env(safe-area-inset-top, 0px))',
          right: 'calc(1rem + env(safe-area-inset-right, 0px))',
        }}
      >
        {!isScrolled ? (
          <select
            value={currentView}
            onChange={(e) => handleViewChange(e.target.value)}
            className="bg-transparent border-none outline-none font-raleway font-medium text-gray-800 cursor-pointer appearance-none pr-6"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23333\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right center',
              backgroundSize: '10px'
            }}
          >
            <option value="portfolio">Portfolio</option>
            <option value="blog">Blog</option>
            <option value="zodiac">Zodiac</option>
          </select>
        ) : (
          <button
            onClick={() => handleViewChange(currentView === 'portfolio' ? 'blog' : currentView === 'blog' ? 'zodiac' : 'portfolio')}
            className="flex items-center gap-1"
            title={`Switch view (Current: ${currentView})`}
          >
            <span className="text-base transition-transform duration-500">🔄</span>
          </button>
        )}
      </div>
      
      {/* 3D Cube Container - Conditionally render only active view */}
      <div className="w-full">
        {/* Conditionally render only the active view */}
        {currentView === 'portfolio' && <Portfolio />}
        {currentView === 'blog' && <AllBlogs />}
        {currentView === 'zodiac' && <ChineseZodiac />}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog/:slug" element={<SingleBlog />} />
        <Route path="/blog" element={<Cube3DWrapper />} />
        <Route path="/zodiac" element={<Cube3DWrapper />} />
        <Route path="/portfolio" element={<Cube3DWrapper />} />
        <Route path="/" element={<Cube3DWrapper />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
