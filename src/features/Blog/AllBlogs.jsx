import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Grid from '../Portfolio/Grid'
import GridBox from '../Portfolio/GridBox'
import { blogPosts } from './blogData'

export default function AllBlogs() {
  // Scroll to top when navigating to blog listing
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  
  return (
    <Grid>
      <GridBox shouldEmphasizeLeft={false} className="md:col-span-2 !grid-cols-1 justify-items-center">
        <div className="flex flex-col gap-4 p-6 w-full max-[950px]:p-4">
          <h1 className="font-raleway text-[2.25rem] font-bold text-transparent bg-[linear-gradient(135deg,#1a1a3a_0%,#ef4444_50%,#1a1a3a_100%)] bg-[length:200%_auto] bg-clip-text [-webkit-background-clip:text] animate-shimmer m-0 leading-tight tracking-[-0.02em] text-center">
            Kevin's Blog
          </h1>
          <p className="font-raleway text-base font-light text-gray-800 m-0 leading-[1.7] tracking-[0.01em] text-center">
            Thoughts on <strong>forward deployed engineering</strong>, <strong>enterprise software</strong>, <strong>international geopolitics and economics</strong>, and <strong>building technology</strong> that solves real problems.
          </p>
        </div>
      </GridBox>
      
      <GridBox shouldEmphasizeLeft={false} className="md:col-span-2 !grid-cols-1">
        <div className="flex flex-col gap-6 w-full p-6 max-[950px]:p-4 max-[950px]:gap-4">
          {blogPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="flex flex-col gap-4 p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-raleway no-underline"
            >
              <h2 className="text-2xl font-semibold text-gray-800 m-0 tracking-[-0.01em]">
                {post.title}
              </h2>
              
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-sm text-gray-500 font-light">
                  {blogPosts.length - index}
                </span>
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-[#ef4444] hover:text-white hover:border-[#ef4444] transition-all duration-200">
                  {post.category}
                </span>
                <span className="text-sm text-gray-600 font-light">
                  {post.date}
                </span>
                <span className="text-sm text-gray-600 font-light">
                  {post.readTime}
                </span>
              </div>
              
              <p 
                className="text-base font-light text-gray-700 m-0 leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: post.excerpt }} 
              />
              
              <div className="pt-2">
                <span className="text-sm font-medium text-gray-700 hover:text-[#ef4444] transition-colors duration-300">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </GridBox>
    </Grid>
  )
}