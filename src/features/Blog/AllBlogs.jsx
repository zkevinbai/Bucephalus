import { Link } from 'react-router-dom'
import SingleBlog from './SingleBlog'

export default function AllBlogs() {
  return (
    <div className="mx-40 max-[950px]:mx-4">
      <div className="font-avenir text-[5rem] font-normal p-4">
        Kevin Bai
      </div>
      <div>
        <div className="rounded-[15px] m-1 border-[0.25rem] border-black p-4">
          <SingleBlog />
        </div>
      </div>
    </div>
  )
}