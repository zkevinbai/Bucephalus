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
    <div className="flex flex-col gap-6 p-8 items-center justify-center bg-white rounded-xl shadow-sm max-[950px]:p-6 max-[950px]:gap-4">
      <h2 className="text-2xl font-semibold text-gray-800 font-raleway m-0 text-center">
        Technologies and Frameworks
      </h2>
      <div className="w-full bg-white border border-gray-200 rounded-xl shadow-lg p-6 grid grid-cols-3 gap-4 max-[640px]:grid-cols-1 max-[640px]:gap-3">
        {skills.map((item) => {
          const techName = typeof item === 'string' ? getTechName(item) : item.name
          
          if (typeof item === 'string') {
            // Devicon technology
            return (
              <div
                key={item}
                className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:bg-red-50 hover:border-[#ef4444] hover:shadow-md group min-w-0"
              >
                <div className="text-3xl shrink-0 w-12 h-12 flex items-center justify-center">
                  <i className={item} />
                </div>
                <span className="text-base font-medium text-gray-800 font-raleway group-hover:text-[#ef4444] transition-colors truncate">
                  {techName}
                </span>
              </div>
            )
          } else {
            // Logo
            const isAILogo = ['ChatGPT', 'Claude', 'Gemini'].includes(item.name)
            return (
              <div
                key={item.name}
                className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:bg-red-50 hover:border-[#ef4444] hover:shadow-md group min-w-0"
              >
                <div className="shrink-0 w-12 h-12 flex items-center justify-center">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className={`object-contain ${isAILogo ? 'w-[120%] h-[120%]' : 'w-full h-full'}`}
                  />
                </div>
                <span className="text-base font-medium text-gray-800 font-raleway group-hover:text-[#ef4444] transition-colors truncate">
                  {techName}
                </span>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}