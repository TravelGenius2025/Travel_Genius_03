'use client'
import useSWR from 'swr'; import EventCard from './EventCard'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())
export default function EventRow({ city }:{ city:string }){
  const {data,isLoading}=useSWR(`/api/events?city=${encodeURIComponent(city)}`,fetcher)
  if(isLoading) return <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{Array.from({length:3}).map((_,i)=>(<div key={i} className="card h-36 animate-pulse" />))}</div>
  const items=data?.data||[]
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{items.map((e:any)=>(<EventCard key={e.id} item={e}/>))}{items.length===0&&<div className="text-[rgba(59,47,42,0.7)]">No upcoming events found here.</div>}</div>
}
