'use client'
import SearchBar from '@/components/SearchBar'
import ExperienceGrid from '@/components/ExperienceGrid'
import GlobalPOIGrid from '@/components/GlobalPOIGrid'
import WeatherCard from '@/components/WeatherCard'
import EventLinks from '@/components/EventLinks'
import FlightSearch from '@/components/FlightSearch'
import HotelSearch from '@/components/HotelSearch'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
export default function SearchPage(){
  const [cityId,setCityId]=useState<string|null>(null); const [cityName,setCityName]=useState<string>(''); const sp=useSearchParams()
  useEffect(()=>{ const id=sp.get('cityId'); const name=sp.get('cityName'); if(id) setCityId(id); if(name) setCityName(name) },[sp])
  return (<div className="space-y-6">
    <h1 className="text-3xl font-bold h-serif">Search by city</h1>
    <SearchBar onSelect={(id,name)=>{ setCityId(id); setCityName(name||'') }}/>
    <FlightSearch/>
    <HotelSearch/>
    {cityName && (<div className="space-y-2"><h2 className="text-xl font-semibold">Explore {cityName}</h2><WeatherCard city={cityName}/><EventLinks city={cityName}/>
          <GlobalPOIGrid city={cityName}/></div>)}
    {cityId && !cityName && (<div className="space-y-2"><h2 className="text-xl font-semibold">Experiences</h2><ExperienceGrid cityId={cityId}/></div>)}
  </div>)
}
