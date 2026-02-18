export default function GridBox({ shouldEmphasizeLeft, children, className = '', variant = 'white' }) {
  const variantStyles = {
    white: 'bg-white border border-gray-200 border-l-4 border-l-gray-300',
    red: 'bg-[#ef4444] border border-[#dc2626] border-l-4 border-l-[#dc2626] text-white',
    coral: 'bg-[#ff6347] bg-opacity-20 border border-[#ff6347] border-l-4',
    pink: 'bg-pink-50 border border-pink-200 border-l-4 border-l-pink-300',
    green: 'bg-green-50 border border-green-200 border-l-4 border-l-green-300',
  }
  
  const baseStyle = variantStyles[variant] || variantStyles.white
  
  return (
    <div className={`grid p-6 gap-6 items-center justify-items-stretch ${baseStyle} rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 max-[950px]:grid-cols-1 max-[950px]:grid-rows-[auto_auto] max-[950px]:p-4 max-[950px]:gap-4 ${
      shouldEmphasizeLeft ? 'grid-cols-[1.5fr_1fr]' : 'grid-cols-[1fr_1.5fr]'
    } ${className}`}>
      {children}
    </div>
  )
}