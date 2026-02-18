import Grid from './Grid'
import GridBox from './GridBox'
import Hero from './Hero'
import Skills from './Skills'
import TabNavigation from './TabNavigation'
import CareerTimeline from './CareerTimeline'
import Education from './Education'
import Projects from './Projects'
import About from './About'

export default function Portfolio() {
  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'career', label: 'Career' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
  ]

  const renderTabContent = (activeTab) => {
    switch (activeTab) {
      case 'about':
        return <About />
      case 'career':
        return <CareerTimeline />
      case 'skills':
        return <Skills />
      case 'education':
        return <Education />
      case 'projects':
        return <Projects />
      default:
        return <About />
    }
  }

  return (
    <Grid>
      <GridBox shouldEmphasizeLeft={false} className="md:col-span-2 !grid-cols-1 justify-items-center">
        <Hero />
      </GridBox>
      <GridBox shouldEmphasizeLeft={false} className="!grid-cols-1 md:col-span-2">
        <TabNavigation tabs={tabs}>
          {(activeTab) => renderTabContent(activeTab)}
        </TabNavigation>
      </GridBox>
    </Grid>
  )
}