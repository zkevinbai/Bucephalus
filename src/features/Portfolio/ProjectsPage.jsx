import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import Projects from './Projects'

/** Standalone home for the retired Projects section — reachable from the
    footer easter egg, off the main portfolio scroll. */
export default function ProjectsPage() {
  return (
    <div className="pt-20 md:pt-24">
      <Container size="page">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-clay-deep"
        >
          <span aria-hidden>←</span> Home
        </Link>
      </Container>
      <Projects />
    </div>
  )
}
