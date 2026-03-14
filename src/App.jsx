import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from './hooks/useTheme'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CoupleSection from './components/CoupleSection'
import DetailsSection from './components/DetailsSection'
import CountdownSection from './components/CountdownSection'
import LocationSection from './components/LocationSection'
import WelcomeMessage from './components/WelcomeMessage'
import FooterSection from './components/FooterSection'
import DecorativeDivider from './components/DecorativeDivider'
import MusicToggle from './components/MusicToggle'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <ScrollProgress />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main>
            <HeroSection />
            <DecorativeDivider />
            <CoupleSection />
            <DecorativeDivider />
            <DetailsSection />
            <DecorativeDivider />
            <CountdownSection />
            <DecorativeDivider />
            <LocationSection />
            <DecorativeDivider />
            <WelcomeMessage />
          </main>
          <FooterSection />
          <MusicToggle />
        </>
      )}
    </>
  )
}

export default App
