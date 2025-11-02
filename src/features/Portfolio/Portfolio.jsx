import Grid from './Grid'
import GridBox from './GridBox'
import Hero from './Hero'
import LinksContainer from './LinksContainer'
import Skills from './Skills'
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
    emphasizeLeft: false,
  },
]

export default function Portfolio() {
  return (
    <Grid>
      <Hero />
      <LinksContainer />
      <Skills />
      {projects.map((project) => (
        <GridBox key={project.title} shouldEmphasizeLeft={project.emphasizeLeft}>
          {project.emphasizeLeft ? (
            <>
              <ProjectPhoto title={project.title} />
              <ProjectDetail
                title={project.title}
                description={project.description}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
              />
            </>
          ) : (
            <>
              <ProjectDetail
                title={project.title}
                description={project.description}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
              />
              <ProjectPhoto title={project.title} />
            </>
          )}
        </GridBox>
      ))}
    </Grid>
  )
}