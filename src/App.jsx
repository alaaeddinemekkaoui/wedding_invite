import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from './hooks/useTheme'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import DetailsSection from './components/DetailsSection'
import CountdownSection from './components/CountdownSection'
import LocationSection from './components/LocationSection'
import WelcomeMessage from './components/WelcomeMessage'
import FooterSection from './components/FooterSection'
import DecorativeDivider from './components/DecorativeDivider'
import EnvelopeIntro from './components/EnvelopeIntro'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [invitationOpened, setInvitationOpened] = useState(false)
  const [startSection, setStartSection] = useState(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = invitationOpened ? '' : 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [invitationOpened])

  useEffect(() => {
    if (!invitationOpened || !startSection) return

    const timer = window.setTimeout(() => {
      document.getElementById(startSection)?.scrollIntoView({ behavior: 'auto' })
    }, 80)

    return () => window.clearTimeout(timer)
  }, [invitationOpened, startSection])

  return (
    <>
      <AnimatePresence mode="wait">
        {!invitationOpened && (
          <EnvelopeIntro
            key="envelope-intro"
            onOpen={() => {
              setInvitationOpened(true)
              setStartSection('accueil')
            }}
          />
        )}
      </AnimatePresence>

      {invitationOpened && (
        <>
          <ScrollProgress />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main>
            <HeroSection />
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
        </>
      )}
    </>
  )
}

export default App
