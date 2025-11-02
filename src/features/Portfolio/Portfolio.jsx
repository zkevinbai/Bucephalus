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
      <Hero />
      <Skills />
      <div className="flex flex-col gap-6 p-8 items-center justify-center max-[800px]:p-6 max-[800px]:gap-4">
        <GridBox shouldEmphasizeLeft={false}>
          <TabNavigation tabs={tabs}>
            {(activeTab) => renderTabContent(activeTab)}
          </TabNavigation>
        </GridBox>
      </div>
    </Grid>
  )
}