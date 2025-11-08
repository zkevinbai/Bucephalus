import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Grid from '../Portfolio/Grid'
import GridBox from '../Portfolio/GridBox'
import { getPostBySlug, blogPosts } from './blogData'

export default function SingleBlog() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const blogContent = getPostBySlug(slug)
  const postIndex = blogPosts.findIndex(post => post.slug === slug)
  const postNumber = postIndex !== -1 ? blogPosts.length - postIndex : null
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Detect scroll position to minimize button
  useEffect(() => {
    const handleScroll = () => {
      // Hide text when scrolled past ~600px (roughly past title/metadata card)
      const scrollThreshold = 600
      setIsScrolled(window.scrollY > scrollThreshold)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const handleBackToBlog = () => {
    navigate('/blog')
    // AllBlogs component will handle scrolling to top on mount
  }
  
  if (!blogContent) {
    return (
      <>
        {/* Floating Back Button */}
        <button
          onClick={handleBackToBlog}
          className={`fixed z-50 inline-flex items-center gap-2 bg-white/40 border border-gray-300/40 rounded-lg text-gray-800 font-raleway font-medium shadow-md hover:bg-white/60 hover:border-gray-400/60 hover:text-gray-900 hover:-translate-y-[1px] hover:shadow-lg transition-all duration-300 backdrop-blur-sm ${
            isScrolled 
              ? 'px-3 py-2 text-xs' 
              : 'px-5 py-3 text-sm'
          }`}
          style={{
            // Support iOS Chrome and Safari - account for safe area insets
            top: 'calc(1rem + env(safe-area-inset-top, 0px))',
            left: 'calc(1rem + env(safe-area-inset-left, 0px))'
          }}
          title="Back to Blog"
        >
          <span>←</span>
          {!isScrolled && <span>Blog</span>}
        </button>
        
        <Grid>
          <GridBox shouldEmphasizeLeft={false} className="md:col-span-2 !grid-cols-1 justify-items-center">
            <div className="flex flex-col gap-6 p-6 w-full max-[950px]:p-4">
              <h1 className="font-raleway text-2xl font-semibold text-gray-800 m-0">Post not found</h1>
            </div>
          </GridBox>
        </Grid>
      </>
    )
  }
  
  return (
    <>
      {/* Floating Back Button */}
      <button
        onClick={handleBackToBlog}
        className={`fixed z-50 inline-flex items-center gap-2 bg-white/40 border border-gray-300/40 rounded-lg text-gray-800 font-raleway font-medium shadow-md hover:bg-white/60 hover:border-gray-400/60 hover:text-gray-900 hover:-translate-y-[1px] hover:shadow-lg transition-all duration-300 backdrop-blur-sm ${
          isScrolled 
            ? 'px-3 py-2 text-xs' 
            : 'px-5 py-3 text-sm'
        }`}
        style={{
          // Support iOS Chrome and Safari - account for safe area insets
          top: 'calc(1rem + env(safe-area-inset-top, 0px))',
          left: 'calc(1rem + env(safe-area-inset-left, 0px))'
        }}
        title="Back to Blog"
      >
        <span>←</span>
        {!isScrolled && <span>Blog</span>}
      </button>
      
      <Grid>
        <GridBox shouldEmphasizeLeft={false} className="md:col-span-2 !grid-cols-1 justify-items-center">
          <div className="flex flex-col gap-6 p-6 w-full max-[950px]:p-4">
          <h1 className="font-raleway text-[2.5rem] font-bold text-transparent bg-[linear-gradient(135deg,#1a1a3a_0%,#307ff6_50%,#1a1a3a_100%)] bg-[length:200%_auto] bg-clip-text [-webkit-background-clip:text] animate-shimmer m-0 leading-tight tracking-[-0.02em] text-center">
            {blogContent.title}
          </h1>
          
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {postNumber && (
              <span className="text-sm text-gray-500 font-light">
                {postNumber}
              </span>
            )}
            <span className="px-3 py-1 bg-white/70 border border-gray-300/50 rounded-md text-xs font-medium text-gray-700">
              {blogContent.category}
            </span>
            <span className="text-sm text-gray-600 font-light">
              {blogContent.date}
            </span>
            <span className="text-sm text-gray-600 font-light">
              {blogContent.readTime}
            </span>
            {blogContent.author && (
              <span className="text-sm text-gray-600 font-light">
                {blogContent.author}
              </span>
            )}
          </div>
        </div>
      </GridBox>
      
      <GridBox shouldEmphasizeLeft={false} className="md:col-span-2 !grid-cols-1">
        <article 
          className="flex flex-col gap-6 p-8 w-full max-[950px]:p-6 max-[950px]:gap-4"
          dangerouslySetInnerHTML={{ __html: blogContent.content }}
        />
      </GridBox>
    </Grid>
    </>
  )
}