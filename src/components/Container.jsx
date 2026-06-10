/** Centered page column with consistent gutters. */
export default function Container({ children, className = '', size = 'page' }) {
  const max = size === 'reading' ? 'max-w-reading' : 'max-w-page'
  return (
    <div className={`mx-auto w-full ${max} px-6 md:px-8 ${className}`}>
      {children}
    </div>
  )
}
