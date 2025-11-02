export default function Grid({ children }) {
  return (
    <div className="relative min-w-full min-h-screen grid grid-cols-1 grid-rows-[auto_auto_1fr] gap-6 p-6 pb-12 bg-[linear-gradient(to_bottom,rgb(255,254,180),rgb(183,229,255),rgb(255,210,206),rgb(255,254,180))] md:grid-cols-2 md:grid-rows-[auto_1fr] [&>*]:relative [&>*]:z-10">
      {children}
    </div>
  )
}