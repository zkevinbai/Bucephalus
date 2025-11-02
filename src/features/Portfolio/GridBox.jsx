export default function GridBox({ shouldEmphasizeLeft, children }) {
  return (
    <div className={`grid p-6 gap-6 items-center justify-items-stretch bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] hover:border-white/15 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] max-[800px]:grid-cols-1 max-[800px]:grid-rows-[auto_auto] max-[800px]:p-4 max-[800px]:gap-4 ${
      shouldEmphasizeLeft ? 'grid-cols-[1.5fr_1fr]' : 'grid-cols-[1fr_1.5fr]'
    }`}>
      {children}
    </div>
  )
}