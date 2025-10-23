
import Hero from '@/components/pages/home/Hero'
import VisionMission from '@/components/pages/home/VisionMission'
import React from 'react'
import WhyChooseUs from '@/components/pages/home/WhyChoose'
import EncryptionFeatures from '@/components/pages/home/EncryptionFeatures'
import HowItWorks from '@/components/pages/home/HowItWorks'
import GetStarted from '@/components/pages/home/FreeTrial'

export default function page() {
  return (
    <div className=''>
      <Hero/>
      <WhyChooseUs/>
      <EncryptionFeatures />
      <HowItWorks/>
      <VisionMission/>
      <GetStarted/>
    </div>
  )
}
