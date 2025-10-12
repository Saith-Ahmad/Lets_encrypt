import CEOMessage from '@/componnets/CEOMessage'
import CTASection from '@/componnets/CTAsection'
import Hero from '@/componnets/Hero'
import Safety from '@/componnets/Safety'
import Services from '@/componnets/Services'
import ChemicalServices from '@/componnets/ChemicalServices'
import CoalSupply from '@/componnets/CoalSupply'
import TestimonialsSection from '@/componnets/Testimonials'
import ContactUs from '@/componnets/ContactUs'
import VisionMission from '@/componnets/VisionMission'
import React from 'react'

export default function page() {
  return (
    <div className=''>
      <Hero/>
      <Services/>
      <ChemicalServices />
      <CoalSupply/>
      <Safety/>
      <CEOMessage/>
      <VisionMission/>
      <TestimonialsSection/>
      <CTASection/>
      <ContactUs/>
    </div>
  )
}
