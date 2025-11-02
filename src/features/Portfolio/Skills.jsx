import CursorLogo from '../../assets/companies/Cursor-logo.png'
import ChatGPTLogo from '../../assets/companies/ChatGPT-logo.svg'
import ClaudeLogo from '../../assets/companies/Claude-logo.svg'
import VercelLogo from '../../assets/companies/Vercel-logo.png'
import GeminiLogo from '../../assets/companies/Gemini-logo.svg'
import AWSLogo from '../../assets/companies/AWS-logo.svg'
import PythonLogo from '../../assets/companies/Python-logo.svg'

// Helper function to get tech name from devicon class
const getTechName = (iconClass) => {
  const nameMap = {
    'devicon-javascript-plain': 'JavaScript',
    'devicon-html5-plain': 'HTML5',
    'devicon-css3-plain': 'CSS3',
    'devicon-react-original': 'React',
    'devicon-typescript-plain': 'TypeScript',
    'devicon-python-plain': 'Python',
    'devicon-ruby-plain': 'Ruby',
    'devicon-nodejs-plain': 'Node.js',
    'devicon-postgresql-plain': 'PostgreSQL',
    'devicon-mongodb-plain': 'MongoDB',
    'devicon-git-plain': 'Git',
    'devicon-tailwindcss-plain': 'Tailwind CSS',
  }
  const baseClass = iconClass.split(' ')[0]
  return nameMap[baseClass] || baseClass.replace('devicon-', '').replace('-plain', '').replace('-original', '')
}

const skills = [
  'devicon-javascript-plain colored',
  'devicon-html5-plain colored',
  'devicon-css3-plain colored',
  'devicon-react-original colored',
  'devicon-typescript-plain colored',
  { name: 'Python', logo: PythonLogo, type: 'logo' },
  'devicon-ruby-plain colored',
  'devicon-nodejs-plain colored',
  'devicon-postgresql-plain colored',
  'devicon-mongodb-plain colored',
  { name: 'AWS', logo: AWSLogo, type: 'logo' },
  'devicon-git-plain colored',
  { name: 'Vercel', logo: VercelLogo, type: 'logo' },
  'devicon-tailwindcss-plain colored',
  { name: 'Gemini', logo: GeminiLogo, type: 'logo' },
  { name: 'Claude', logo: ClaudeLogo, type: 'logo' },
  { name: 'Cursor', logo: CursorLogo, type: 'logo' },
  { name: 'ChatGPT', logo: ChatGPTLogo, type: 'logo' },
]

export default function Skills() {
  return (
    <div className="flex flex-col gap-6 p-8 items-center justify-center max-[950px]:p-6 max-[950px]:gap-4">
      <h2 className="text-2xl font-semibold text-gray-800 font-raleway m-0 text-center max-[950px]:text-xl">
        Technologies and Frameworks
      </h2>
      <div className="w-full bg-white/50 border border-gray-300/40 rounded-xl backdrop-blur-sm p-6 grid grid-cols-6 grid-rows-3 gap-4 justify-items-center items-center max-[950px]:grid-cols-3 max-[950px]:grid-rows-6 max-[950px]:p-4 max-[950px]:gap-3">
        {skills.map((item) => {
          const techName = typeof item === 'string' ? getTechName(item) : item.name
          
          if (typeof item === 'string') {
            // Devicon technology
            return (
              <div
                key={item}
                className="relative group text-[2.5rem] bg-white/70 border border-gray-300/50 h-16 w-16 p-2 rounded-lg grid place-content-center transition-all duration-300 hover:bg-[rgba(48,127,246,0.2)] hover:border-[rgba(48,127,246,0.6)] hover:-translate-y-1 hover:scale-110 hover:shadow-[0_6px_16px_rgba(48,127,246,0.3)] max-[950px]:text-[2rem] max-[950px]:h-14 max-[950px]:w-14 cursor-pointer"
              >
                <i className={item} />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-raleway font-medium px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-lg">
                  {techName}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            )
          } else {
            // Logo
            const isAILogo = ['ChatGPT', 'Claude', 'Gemini'].includes(item.name)
            return (
              <div
                key={item.name}
                className="relative group bg-white/70 border border-gray-300/50 h-16 w-16 max-[950px]:h-14 max-[950px]:w-14 p-2 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[rgba(48,127,246,0.2)] hover:border-[rgba(48,127,246,0.6)] hover:-translate-y-1 hover:scale-110 hover:shadow-[0_6px_16px_rgba(48,127,246,0.3)] cursor-pointer"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className={`object-contain rounded-lg ${isAILogo ? 'w-[150%] h-[150%]' : 'w-full h-full'}`}
                />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-raleway font-medium px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-lg">
                  {techName}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}