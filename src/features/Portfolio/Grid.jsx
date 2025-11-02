export default function Grid({ children }) {
  return (
    <div className="relative min-w-full min-h-screen grid grid-cols-2 grid-rows-3 gap-8 p-8 bg-[linear-gradient(to_top_right,rgb(255,210,206),rgb(255,254,180),rgb(183,229,255))] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:z-0 max-[1500px]:grid-cols-1 max-[1500px]:grid-rows-[repeat(6,auto)] max-[1500px]:gap-6 max-[1500px]:p-6 max-[1500px]:pb-12 max-[1500px]:bg-[linear-gradient(to_bottom,rgb(255,254,180),rgb(183,229,255),rgb(255,210,206),rgb(255,254,180))] [&>*]:relative [&>*]:z-10">
      {children}
    </div>
  )
}