import GridBox from './GridBox'
import ProjectDetail from './ProjectDetail'
import ProjectPhoto from './ProjectPhoto'

const projects = [
  {
    title: 'Time Travel Tic Tac Toe',
    description: 'Interactive tic-tac-toe game featuring an AI opponent with time travel mechanics—travel back through move history to replay the game from any point, with a beautiful gradient-styled interface and move tracking',
    githubLink: 'https://github.com/zkevinbai/tictactoe_two',
    liveLink: 'https://zkevinbai.github.io/tictactoe_two/',
    emphasizeLeft: true,
  },
  {
    title: 'Aurelian',
    description: 'Personal finance visualization tool using Sankey diagrams to map income, expenses, and savings flows—gain insights into your financial patterns through interactive, color-coded flow charts',
    githubLink: 'https://github.com/zkevinbai/Aurelian',
    liveLink: 'https://zkevinbai.github.io/Aurelian/',
    emphasizeLeft: true,
  },
  {
    title: 'Alexandria',
    description: 'Comprehensive book discovery and management platform—search through extensive book databases, track your reading progress, manage your personal library, and discover new titles with powerful search filters',
    githubLink: 'https://github.com/zkevinbai/Alexandria',
    emphasizeLeft: true,
  },
  {
    title: 'Augustus',
    description: 'Modern note-taking application with a fully-featured rich text editor—create, format, and organize your notes with WYSIWYG editing, markdown support, and intuitive document management',
    githubLink: 'https://github.com/zkevinbai/Augustus',
    emphasizeLeft: true,
  },
]

export default function Projects() {
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

