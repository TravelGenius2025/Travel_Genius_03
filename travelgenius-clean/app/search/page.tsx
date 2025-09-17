'use client'
import { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import ExperienceCard from '@/components/ExperienceCard'

export default function SearchPage(){
  const [city,setCity]=useState<string>(''); const [wx,setWx]=useState<any>(null)
  async function onPick(name:string){ setCity(name); const r=await fetch('/api/weather?city='+encodeURIComponent(name)); const j=await r.json(); setWx(j.data) }
  return (<div className='space-y-6'>
    <div className='card p-6'>
      <h1 className='text-2xl font-bold mb-3'>Search by city</h1>
      <SearchBar onPick={onPick}/>
    </div>
    {city && <div className='space-y-4'>
      <h2 className='text-xl font-semibold'>Explore {city}</h2>
      {wx && <div className='card p-4'>Today: {wx.current_weather?.temperature}° — Next: {wx.daily?.temperature_2m_max?.[0]}° / {wx.daily?.temperature_2m_min?.[0]}°</div>}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <ExperienceCard title='City Walking Tour' price={1999}/>
        <ExperienceCard title='Food Crawl' price={2499}/>
        <ExperienceCard title='Museum Pass' price={1599}/>
      </div>
    </div>}
  </div>)
}
