export default function Grid({ children }) {
  return (
    <div className="relative min-w-full min-h-screen grid grid-cols-1 grid-rows-[auto_auto_1fr] gap-6 p-6 pb-12 pt-24 bg-white md:grid-cols-2 md:grid-rows-[auto_1fr] [&>*]:relative [&>*]:z-10">
      {children}
    </div>
  )
}