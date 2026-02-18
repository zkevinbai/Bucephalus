import { useLocation } from 'react-router-dom'

export default function Grid({ children }) {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  // Add extra padding-top if breadcrumbs are visible (nested routes)
  const hasBreadcrumbs = pathnames.length > 1
  const paddingTop = hasBreadcrumbs ? 'pt-32' : 'pt-24' // pt-32 = 128px (header 64px + breadcrumbs ~48px + spacing)
  
  return (
    <div className={`relative min-w-full min-h-screen grid grid-cols-1 grid-rows-[auto_auto_1fr] gap-6 p-6 pb-12 ${paddingTop} bg-white md:grid-cols-2 md:grid-rows-[auto_1fr] [&>*]:relative [&>*]:z-10`}>
      {children}
    </div>
  )
}