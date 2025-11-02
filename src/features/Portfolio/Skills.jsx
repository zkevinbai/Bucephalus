import CursorLogo from '../../assets/companies/Cursor-logo.png'
import OpenAILogo from '../../assets/companies/OpenAI-logo.png'
import ClaudeLogo from '../../assets/companies/Claude-logo.png'
import VercelLogo from '../../assets/companies/Vercel-logo.png'
import GeminiLogo from '../../assets/companies/Gemini-logo.svg'
import AWSLogo from '../../assets/companies/AWS-logo.svg'

const skills = [
  'devicon-javascript-plain colored',
  'devicon-html5-plain colored',
  'devicon-css3-plain colored',
  'devicon-react-original colored',
  'devicon-typescript-plain colored',
  'devicon-python-plain colored',
  'devicon-ruby-plain colored',
  'devicon-nodejs-plain colored',
  'devicon-postgresql-plain colored',
  'devicon-mongodb-plain colored',
  { name: 'AWS', logo: AWSLogo, type: 'logo' },
  'devicon-git-plain colored',
  { name: 'Vercel', logo: VercelLogo, type: 'logo' },
  'devicon-tailwindcss-plain colored',
  { name: 'Gemini', logo: GeminiLogo, type: 'logo' },
  { name: 'Anthropic', logo: ClaudeLogo, type: 'logo' },
  { name: 'Cursor', logo: CursorLogo, type: 'logo' },
  { name: 'OpenAI', logo: OpenAILogo, type: 'logo' },
]

export default function Skills() {
  return (
    <div className="flex flex-col gap-6 p-8 items-center justify-center max-[800px]:p-6 max-[800px]:gap-4">
      <h2 className="text-2xl font-semibold text-gray-800 font-raleway m-0 text-center max-[800px]:text-xl">
        Technologies and Frameworks
      </h2>
      <div className="w-full bg-white/50 border border-gray-300/40 rounded-xl backdrop-blur-sm p-6 grid grid-cols-6 grid-rows-3 gap-4 justify-items-center items-center max-[800px]:grid-cols-3 max-[800px]:grid-rows-6 max-[800px]:p-4 max-[800px]:gap-3">
        {skills.map((item) => {
          if (typeof item === 'string') {
            // Devicon technology
            return (
              <div
                key={item}
                className="text-[2.5rem] bg-white/70 border border-gray-300/50 h-16 w-16 p-2 rounded-lg grid place-content-center transition-all duration-300 hover:bg-[rgba(48,127,246,0.2)] hover:border-[rgba(48,127,246,0.6)] hover:-translate-y-1 hover:scale-110 hover:shadow-[0_6px_16px_rgba(48,127,246,0.3)] max-[800px]:text-[2rem] max-[800px]:h-14 max-[800px]:w-14"
              >
                <i className={item} />
              </div>
            )
          } else {
            // Logo
            return (
              <div
                key={item.name}
                className="bg-white/70 border border-gray-300/50 h-16 w-16 p-2 rounded-lg grid place-content-center transition-all duration-300 hover:bg-[rgba(48,127,246,0.2)] hover:border-[rgba(48,127,246,0.6)] hover:-translate-y-1 hover:scale-110 hover:shadow-[0_6px_16px_rgba(48,127,246,0.3)] max-[800px]:h-14 max-[800px]:w-14"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}