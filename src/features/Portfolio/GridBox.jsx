export default function GridBox({ shouldEmphasizeLeft, children, className = '' }) {
  return (
    <div className={`grid p-6 gap-6 items-center justify-items-stretch bg-white/40 border border-gray-300/40 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/60 hover:border-gray-400/60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] max-[950px]:grid-cols-1 max-[950px]:grid-rows-[auto_auto] max-[950px]:p-4 max-[950px]:gap-4 ${
      shouldEmphasizeLeft ? 'grid-cols-[1.5fr_1fr]' : 'grid-cols-[1fr_1.5fr]'
    } ${className}`}>
      {children}
    </div>
  )
}