import Grid from './Grid'
import GridBox from './GridBox'
import Hero from './Hero'
import Skills from './Skills'
import TabNavigation from './TabNavigation'
import CareerTimeline from './CareerTimeline'
import Education from './Education'
import Projects from './Projects'

export default function Portfolio() {
  const tabs = [
    { id: 'career', label: 'Career' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
  ]

  const renderTabContent = (activeTab) => {
    switch (activeTab) {
      case 'career':
        return <CareerTimeline />
      case 'education':
        return <Education />
      case 'projects':
        return <Projects />
      default:
        return <CareerTimeline />
    }
  }

  return (
    <Grid>
      <GridBox shouldEmphasizeLeft={false} className="md:col-span-1 !grid-cols-1 justify-items-center">
        <Hero />
      </GridBox>
      <GridBox shouldEmphasizeLeft={false} className="md:col-span-1 !grid-cols-1 justify-items-center">
        <Skills />
      </GridBox>
      <GridBox shouldEmphasizeLeft={false} className="!grid-cols-1 md:col-span-2">
        <TabNavigation tabs={tabs}>
          {(activeTab) => renderTabContent(activeTab)}
        </TabNavigation>
      </GridBox>
    </Grid>
  )
}