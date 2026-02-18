import { Link, useLocation } from 'react-router-dom'

export default function Breadcrumbs() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) {
    return null
  }

  const getBreadcrumbLabel = (pathname) => {
    const labels = {
      blog: 'Blog',
      zodiac: 'Zodiac',
      portfolio: 'Portfolio',
    }
    return labels[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1)
  }

  return (
    <nav className="px-4 md:px-6 lg:px-8 py-3 bg-white border-b border-gray-100">
      <div className="flex items-center gap-2 text-sm text-gray-600 font-raleway">
        <Link
          to="/"
          className="hover:text-[#ef4444] transition-colors duration-200"
        >
          Home
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1

          return (
            <span key={routeTo} className="flex items-center gap-2">
              <span className="text-gray-400 mx-1">/</span>
              {isLast ? (
                <span className="text-gray-900 font-medium">
                  {getBreadcrumbLabel(name)}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:text-[#ef4444] transition-colors duration-200"
                >
                  {getBreadcrumbLabel(name)}
                </Link>
              )}
            </span>
          )
        })}
      </div>
    </nav>
  )
}
