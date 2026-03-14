'use client'

import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import CoupleSection from '@/components/CoupleSection'
import DetailsSection from '@/components/DetailsSection'
import CountdownSection from '@/components/CountdownSection'
import ProgramSection from '@/components/ProgramSection'
import LocationSection from '@/components/LocationSection'
import RSVPSection from '@/components/RSVPSection'
import FooterSection from '@/components/FooterSection'
import DecorativeDivider from '@/components/DecorativeDivider'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DecorativeDivider />
        <CoupleSection />
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
  )
}
