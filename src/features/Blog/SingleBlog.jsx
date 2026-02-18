import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Grid from '../Portfolio/Grid'
import GridBox from '../Portfolio/GridBox'
import { getPostBySlug, blogPosts } from './blogData'

export default function SingleBlog() {
  const { slug } = useParams()
  const blogContent = getPostBySlug(slug)
  const postIndex = blogPosts.findIndex(post => post.slug === slug)
  const postNumber = postIndex !== -1 ? blogPosts.length - postIndex : null
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  
  if (!blogContent) {
    return (
      <Grid>
        <GridBox shouldEmphasizeLeft={false} className="md:col-span-2 !grid-cols-1 justify-items-center">
          <div className="flex flex-col gap-6 p-6 w-full max-[950px]:p-4">
            <h1 className="font-raleway text-2xl font-semibold text-gray-800 m-0">Post not found</h1>
          </div>
        </GridBox>
      </Grid>
    )
  }
  
  return (
    <Grid>
        <GridBox shouldEmphasizeLeft={false} className="md:col-span-2 !grid-cols-1 justify-items-center">
          <div className="flex flex-col gap-6 p-6 w-full max-[950px]:p-4">
          <h1 className="font-raleway text-[2.5rem] font-bold text-transparent bg-[linear-gradient(135deg,#1a1a3a_0%,#ef4444_50%,#1a1a3a_100%)] bg-[length:200%_auto] bg-clip-text [-webkit-background-clip:text] animate-shimmer m-0 leading-tight tracking-[-0.02em] text-center">
            {blogContent.title}
          </h1>
          
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {postNumber && (
              <span className="text-sm text-gray-500 font-light">
                {postNumber}
              </span>
            )}
            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-[#ef4444] hover:text-white hover:border-[#ef4444] transition-all duration-200">
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
  )
}