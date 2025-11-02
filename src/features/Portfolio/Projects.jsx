import { useEffect, useRef } from 'react'
import GridBox from './GridBox'
import ProjectDetail from './ProjectDetail'
import ProjectPhoto from './ProjectPhoto'
import TimeTravelTicTacToeImg from '../../assets/projects/TimeTravelTicTacToe.png'
import AurelianImg from '../../assets/projects/Aurelian.png'
import VerbaImg from '../../assets/projects/Verba.png'
import AlexandriaImg from '../../assets/projects/Alexandria.png'
import AugustusImg from '../../assets/projects/Augustus.png'

// Preload project images to cache them for faster loading
const projectImages = [
  TimeTravelTicTacToeImg,
  AurelianImg,
  VerbaImg,
  AlexandriaImg,
  AugustusImg,
]

const projects = [
  {
    title: 'Time Travel Tic Tac Toe',
    description: 'Interactive <strong>tic-tac-toe game</strong> featuring an <strong>AI opponent</strong> with <strong>time travel mechanics</strong>—travel back through <strong>move history</strong> to replay the game from any point, with a <strong>beautiful gradient-styled interface</strong> and <strong>move tracking</strong>',
    githubLink: 'https://github.com/zkevinbai/tictactoe_two',
    liveLink: 'https://zkevinbai.github.io/tictactoe_two/',
    emphasizeLeft: true,
  },
  {
    title: 'Aurelian',
    description: '<strong>Personal finance visualization tool</strong> using <strong>Sankey diagrams</strong> to map <strong>income, expenses, and savings flows</strong>—gain insights into your <strong>financial patterns</strong> through <strong>interactive, color-coded flow charts</strong>',
    githubLink: 'https://github.com/zkevinbai/Aurelian',
    liveLink: 'https://zkevinbai.github.io/Aurelian/',
    emphasizeLeft: true,
  },
  {
    title: 'Verba',
    description: '<strong>AI writing assistant</strong> built with <strong>React 18, TypeScript, and Supabase</strong>—helps writers with <strong>AI-powered grammar checking</strong>, <strong>intelligent writing suggestions</strong>, <strong>A/B variant generation</strong>, and <strong>document management</strong>',
    githubLink: 'https://github.com/zkevinbai/verba',
    liveLink: 'https://verba-2025.vercel.app/',
    emphasizeLeft: true,
  },
  {
    title: 'Alexandria',
    description: '<strong>Comprehensive book discovery and management platform</strong>—search through <strong>extensive book databases</strong>, track your <strong>reading progress</strong>, manage your <strong>personal library</strong>, and discover new titles with <strong>powerful search filters</strong>',
    githubLink: 'https://github.com/zkevinbai/Alexandria',
    emphasizeLeft: true,
  },
  {
    title: 'Augustus',
    description: '<strong>Modern note-taking application</strong> with a <strong>fully-featured rich text editor</strong>—create, format, and organize your notes with <strong>WYSIWYG editing</strong>, <strong>markdown support</strong>, and <strong>intuitive document management</strong>',
    githubLink: 'https://github.com/zkevinbai/Augustus',
    emphasizeLeft: true,
  },
]

export default function Projects() {
  const hasPreloaded = useRef(false)
  
  // Preload images only when Projects component mounts (user clicks Projects tab)
  // This ensures images are cached without affecting other routes or initial load
  useEffect(() => {
    if (!hasPreloaded.current) {
      projectImages.forEach((imageSrc) => {
        const img = new Image()
        img.src = imageSrc
      })
      hasPreloaded.current = true
    }
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full">
      {projects.map((project) => (
        <GridBox key={project.title} shouldEmphasizeLeft={true}>
          <ProjectPhoto title={project.title} />
          <ProjectDetail
            title={project.title}
            description={project.description}
            githubLink={project.githubLink}
            liveLink={project.liveLink}
          />
        </GridBox>
      ))}
    </div>
  )
}

