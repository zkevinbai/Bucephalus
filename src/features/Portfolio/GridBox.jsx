export default function GridBox({ shouldEmphasizeLeft, children, className = '' }) {
  return (
    <div className={`grid p-6 gap-6 items-center justify-items-stretch bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 max-[950px]:grid-cols-1 max-[950px]:grid-rows-[auto_auto] max-[950px]:p-4 max-[950px]:gap-4 ${
      shouldEmphasizeLeft ? 'grid-cols-[1.5fr_1fr]' : 'grid-cols-[1fr_1.5fr]'
    } ${className}`}>
      {children}
    </div>
  )
}