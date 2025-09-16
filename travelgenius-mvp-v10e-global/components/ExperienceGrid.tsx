'use client'
import useSWR from 'swr'; import ExperienceCard from './ExperienceCard'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())
export default function ExperienceGrid({ cityId }:{ cityId:string }){
  const {data,isLoading}=useSWR(`/api/experiences?cityId=${encodeURIComponent(cityId)}`,fetcher)
  if(isLoading) return <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{Array.from({length:6}).map((_,i)=>(<div key={i} className="card h-48 animate-pulse" />))}</div>
  const items=data?.data||[]
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{items.map((p:any)=>(<ExperienceCard key={p.code||p.id} item={p}/>))}{items.length===0&&<div className="text-[rgba(59,47,42,0.7)]">No experiences found.</div>}</div>
}
