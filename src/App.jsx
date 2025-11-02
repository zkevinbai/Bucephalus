import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Portfolio from './features/Portfolio/Portfolio'
import AllBlogs from './features/Blog/AllBlogs'
import SingleBlog from './features/Blog/SingleBlog'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog/:slug" element={<SingleBlog />} />
        <Route path="/blog" element={<AllBlogs />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
