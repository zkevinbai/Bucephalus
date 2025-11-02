import GridBox from './GridBox'

const technologies = [
  'devicon-javascript-plain colored',
  'devicon-html5-plain colored',
  'devicon-css3-plain colored',
  'devicon-react-original colored',
  'devicon-d3js-plain colored',
  'devicon-express-original colored',
  'devicon-nodejs-plain colored',
  'devicon-postgresql-plain colored',
  'devicon-ruby-plain colored',
  'devicon-git-plain colored',
  'devicon-rails-plain colored',
  'devicon-mongodb-plain colored',
]

export default function Skills() {
  return (
    <div className="flex flex-col gap-6 p-8 items-center justify-center max-[800px]:p-6 max-[800px]:gap-4">
      <GridBox shouldEmphasizeLeft={false}>
        <h2 className="text-2xl font-semibold text-white/90 font-raleway m-0 text-center max-[800px]:text-xl">
          Technologies and Frameworks
        </h2>
        <div className="w-full bg-white/[0.03] border border-white/8 rounded-xl backdrop-blur-sm p-6 grid grid-cols-4 grid-rows-3 gap-4 justify-items-center items-center max-[800px]:grid-cols-3 max-[800px]:p-4 max-[800px]:gap-3">
          {technologies.map((icon) => (
            <div
              key={icon}
              className="text-[2.5rem] bg-white/5 border border-white/10 h-16 w-16 p-2 rounded-lg grid place-content-center transition-all duration-300 hover:bg-[rgba(48,127,246,0.15)] hover:border-[rgba(48,127,246,0.4)] hover:-translate-y-1 hover:scale-110 hover:shadow-[0_6px_16px_rgba(48,127,246,0.2)] max-[800px]:text-[2rem] max-[800px]:h-14 max-[800px]:w-14"
            >
              <i className={icon} />
            </div>
          ))}
        </div>
      </GridBox>
    </div>
  )
}