'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plane, Sailboat, Mountain, Sparkles } from 'lucide-react'
import VibeChips from '@/components/VibeChips'
import EventRow from '@/components/EventRow'
import ExperienceGrid from '@/components/ExperienceGrid'
import FlightSearch from '@/components/FlightSearch'
import HotelSearch from '@/components/HotelSearch'
import IndiaHighlights from '@/components/IndiaHighlights'
import { useState } from 'react'

export default function Home(){
  const [city,setCity]=useState('Goa, India'); const [cityId,setCityId]=useState('1263706')
  return (<div className="space-y-10">
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl md:text-5xl font-extrabold tracking-tight h-serif">Plan by <span className="text-gold-600">vibe</span>. Book with confidence.</motion.h1>
        <p className="text-[rgba(59,47,42,0.7)]">A fresh way to discover experiences and events. Start with a mood, not a checkbox.</p>
        <div className="flex gap-3">
          <Link href="/search" className="button bg-gold-600 text-white">Start searching</Link>
          <a href="#whats-good" className="button bg-[rgba(59,47,42,0.06)]">What’s good now</a>
        </div>
        <VibeChips onChoose={()=>{}}/>
        <div className="flex gap-4 text-[rgba(59,47,42,0.7)]">
          <div className="flex items-center gap-2"><Plane/><span>Skyscanner deep links</span></div>
          <div className="flex items-center gap-2"><Sailboat/><span>CO₂ labels</span></div>
          <div className="flex items-center gap-2"><Mountain/><span>Micro-itineraries</span></div>
          <div className="flex items-center gap-2"><Sparkles/><span>Group polls</span></div>
        </div>
      </div>
      <img src="/logo.svg" className="w-full max-w-md mx-auto" alt="TravelGenius"/>
    </section>

    <FlightSearch/>
    <HotelSearch/>
    <IndiaHighlights/>

    <section id="whats-good" className="space-y-6">
      <h2 className="text-2xl font-bold h-serif">What’s Good Now in {city}</h2>
      <EventRow city="Goa"/>
      <ExperienceGrid cityId={cityId}/>
    </section>
  </div>)
}
