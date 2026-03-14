'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import DetailsSection from '@/components/DetailsSection'
import CountdownSection from '@/components/CountdownSection'
import ProgramSection from '@/components/ProgramSection'
import LocationSection from '@/components/LocationSection'
import RSVPSection from '@/components/RSVPSection'
import FooterSection from '@/components/FooterSection'
import DecorativeDivider from '@/components/DecorativeDivider'
import EnvelopeIntro from '@/components/EnvelopeIntro'

export default function HomePage() {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = opened ? '' : 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [opened])

  return (
    <>
      <AnimatePresence mode="wait">
        {!opened && (
          <EnvelopeIntro key="envelope-intro" onOpen={() => setOpened(true)} />
        )}
      </AnimatePresence>

      {opened && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <DecorativeDivider />
            <DetailsSection />
            <DecorativeDivider />
            <CountdownSection />
            <DecorativeDivider />
            <ProgramSection />
            <DecorativeDivider />
            <LocationSection />
            <DecorativeDivider />
            <RSVPSection />
          </main>
          <FooterSection />
        </>
      )}
    </>
  )
}
