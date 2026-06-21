import Hero from './Hero'
import SectionNav from './SectionNav'
import About from './About'
import CareerTimeline from './CareerTimeline'
import Volunteering from './Volunteering'
import Education from './Education'
import Skills from './Skills'
import { SubstackHomeBand } from '../../components/SubstackCTA'
import { useSeo } from '../../utils/seo'

export default function Portfolio() {
  useSeo({
    title: 'Kevin Bai — Member of Technical Staff, Anthropic',
    description:
      'Forward Deployed Engineering, Applied AI, and International Relations. Previously Palantir, the United Nations, Berkeley, and Oxford.',
    path: '/',
    type: 'profile',
  })

  return (
    <>
      <Hero />
      <SectionNav />
      <About />
      <CareerTimeline />
      <Volunteering />
      <Education />
      <Skills />
      <SubstackHomeBand />
    </>
  )
}
