export default function Grid({ children }) {
  return (
    <div className="relative min-w-full min-h-screen grid grid-cols-2 grid-rows-3 gap-8 p-8 bg-gradient-to-br from-[#0f0f23] via-[#1a1a3a] to-[#0f0f23] before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_50%,rgba(48,127,246,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(138,43,226,0.1)_0%,transparent_50%)] before:pointer-events-none before:z-0 max-[1500px]:grid-cols-1 max-[1500px]:grid-rows-[repeat(6,auto)] max-[1500px]:gap-6 max-[1500px]:p-6 max-[1500px]:pb-12 [&>*]:relative [&>*]:z-10">
      {children}
    </div>
  )
}