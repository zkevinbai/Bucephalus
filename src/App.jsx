import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Breadcrumbs from './components/Breadcrumbs'
import Portfolio from './features/Portfolio/Portfolio'
import AllBlogs from './features/Blog/AllBlogs'
import SingleBlog from './features/Blog/SingleBlog'
import ChineseZodiac from './features/ChineseZodiac/ChineseZodiac'

function App() {
  return (
    <BrowserRouter>
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
