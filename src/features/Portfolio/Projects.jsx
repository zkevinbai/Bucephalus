import GridBox from './GridBox'
import ProjectDetail from './ProjectDetail'
import ProjectPhoto from './ProjectPhoto'

const projects = [
  {
    title: 'Aurelian',
    description: 'personal finance sankey visualization',
    githubLink: 'https://github.com/zkevinbai/Aurelian',
    liveLink: 'https://zkevinbai.github.io/Aurelian/',
    emphasizeLeft: true,
  },
  {
    title: 'Alexandria',
    description: 'book search engine and book tracker',
    githubLink: 'https://github.com/zkevinbai/Alexandria',
    emphasizeLeft: true,
  },
  {
    title: 'Augustus',
    description: 'note taking with rich text editor',
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

