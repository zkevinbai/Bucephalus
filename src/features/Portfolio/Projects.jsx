import Section from './Section'
import TimeTravelTicTacToeImg from '../../assets/projects/TimeTravelTicTacToe.png'
import AurelianImg from '../../assets/projects/Aurelian.png'
import VerbaImg from '../../assets/projects/Verba.png'
import AlexandriaImg from '../../assets/projects/Alexandria.png'
import AugustusImg from '../../assets/projects/Augustus.png'

const projects = [
  {
    title: 'Verba',
    image: VerbaImg,
    description:
      'An AI writing assistant built with React 18, TypeScript, and Supabase — grammar checking, intelligent suggestions, A/B variant generation, and document management.',
    stack: ['React', 'TypeScript', 'Supabase'],
    githubLink: 'https://github.com/zkevinbai/verba',
    liveLink: 'https://verba-2025.vercel.app/',
  },
  {
    title: 'Aurelian',
    image: AurelianImg,
    description:
      'A personal-finance visualization tool that maps income, expenses, and savings flows through interactive, color-coded Sankey diagrams.',
    stack: ['React', 'D3', 'Sankey'],
    githubLink: 'https://github.com/zkevinbai/Aurelian',
    liveLink: 'https://zkevinbai.github.io/Aurelian/',
  },
  {
    title: 'Time Travel Tic Tac Toe',
    image: TimeTravelTicTacToeImg,
    description:
      'An interactive tic-tac-toe with an AI opponent and time-travel mechanics — rewind through move history and replay the game from any point.',
    stack: ['React', 'Game AI'],
    githubLink: 'https://github.com/zkevinbai/tictactoe_two',
    liveLink: 'https://zkevinbai.github.io/tictactoe_two/',
  },
  {
    title: 'Alexandria',
    image: AlexandriaImg,
    description:
      'A book discovery and management platform — search extensive databases, track reading progress, and manage your personal library with powerful filters.',
    stack: ['React', 'Search'],
    githubLink: 'https://github.com/zkevinbai/Alexandria',
  },
  {
    title: 'Augustus',
    image: AugustusImg,
    description:
      'A modern note-taking app with a fully-featured rich-text editor — WYSIWYG editing, markdown support, and intuitive document management.',
    stack: ['React', 'Rich Text'],
    githubLink: 'https://github.com/zkevinbai/Augustus',
  },
]

function ProjectCard({ project }) {
  return (
    <article className="reveal group flex flex-col overflow-hidden rounded-2xl border border-line bg-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-28px_rgba(27,23,20,0.5)]">
      <div className="aspect-[16/10] overflow-hidden border-b border-line bg-cream-2">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-serif text-xl font-semibold tracking-[-0.01em] text-ink">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 text-ink-soft">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="transition-colors hover:text-clay"
            >
              <i className="fab fa-github text-lg" />
            </a>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className="transition-colors hover:text-clay"
              >
                <i className="fas fa-external-link-alt text-base" />
              </a>
            )}
          </div>
        </div>
        <p className="text-[0.95rem] leading-relaxed text-ink-soft">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-medium text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built for the fun of it."
      intro="Side projects, named after libraries, emperors, and ideas I like."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  )
}
