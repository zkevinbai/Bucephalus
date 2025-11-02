import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Portfolio from './features/Portfolio/Portfolio'
import AllBlogs from './features/Blog/AllBlogs'
import SingleBlog from './features/Blog/SingleBlog'

function Cube3DWrapper() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Determine current view - check if we're on blog list (not single blog post)
  const isBlogList = location.pathname === '/blog'
  const [isBlog, setIsBlog] = useState(isBlogList)
  
  // Sync state with route changes
  useEffect(() => {
    setIsBlog(isBlogList)
  }, [location.pathname])
  
  const handleToggle = () => {
    const newIsBlog = !isBlog
    setIsBlog(newIsBlog)
    
    // Navigate
    if (newIsBlog) {
      navigate('/blog')
    } else {
      navigate('/')
    }
  }
  
  return (
    <div className="relative w-screen">
      {/* Toggle Button - Upper Right */}
      <button
        onClick={handleToggle}
        className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 px-5 py-3 bg-white/40 border border-gray-300/40 rounded-lg text-gray-800 font-raleway text-sm font-medium shadow-md hover:bg-white/60 hover:border-gray-400/60 hover:text-gray-900 hover:-translate-y-[1px] hover:shadow-lg transition-all duration-300 backdrop-blur-sm group"
      >
        <span className="text-base transition-transform duration-500 group-hover:rotate-180">🔄</span>
        <span>{isBlog ? 'Portfolio' : 'Blog'}</span>
      </button>
      
      {/* 3D Cube Container */}
      <div 
        className="w-full"
        style={{
          perspective: '1500px',
          perspectiveOrigin: '50% 50%'
        }}
      >
        <div
          className="relative w-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${isBlog ? 180 : 0}deg)`,
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Front Face - Portfolio */}
          <div
            className="absolute w-full"
            style={{
              transform: 'translateZ(0px)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              pointerEvents: isBlog ? 'none' : 'auto',
            }}
          >
            <div style={{ opacity: isBlog ? 0 : 1 }}>
              <Portfolio />
            </div>
          </div>
          
          {/* Back Face - Blog */}
          <div
            className="absolute w-full"
            style={{
              transform: 'rotateY(180deg) translateZ(0px)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              pointerEvents: isBlog ? 'auto' : 'none',
            }}
          >
            <div style={{ opacity: isBlog ? 1 : 0 }}>
              <AllBlogs />
            </div>
          </div>
        </div>
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
        <Route path="/portfolio" element={<Cube3DWrapper />} />
        <Route path="/" element={<Cube3DWrapper />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
