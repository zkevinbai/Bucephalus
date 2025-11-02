import { Link } from 'react-router-dom'

export default function SingleBlog() {
  return (
    <div className="h-full overflow-hidden font-avenir text-2xl">
      <Link to="/" className="text-[#f55f4e]">
        Back to Portfolio
      </Link>
      {/* Blog content would go here */}
    </div>
  )
}