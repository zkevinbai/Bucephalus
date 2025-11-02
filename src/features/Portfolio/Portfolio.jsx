import { useEffect } from 'react'
import Grid from './Grid'
import GridBox from './GridBox'
import Hero from './Hero'
import Skills from './Skills'
import TabNavigation from './TabNavigation'
import CareerTimeline from './CareerTimeline'
import Education from './Education'
import Projects from './Projects'
// Import project images for preloading
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

export default function Portfolio() {
  // Preload project images after initial render to cache them
  // Uses requestIdleCallback when available, otherwise setTimeout to defer
  useEffect(() => {
    const preloadImages = () => {
      projectImages.forEach((imageSrc) => {
        const img = new Image()
        img.src = imageSrc
      })
    }
    
    // Defer preloading to not compete with critical resources
    if (window.requestIdleCallback) {
      requestIdleCallback(preloadImages, { timeout: 2000 })
    } else {
      setTimeout(preloadImages, 1000)
    }
  }, [])
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