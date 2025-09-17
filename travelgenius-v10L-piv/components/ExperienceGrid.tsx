'use client'
import ExperienceCard from './ExperienceCard'
import { useEffect, useState } from 'react'
export default function ExperienceGrid({ cityId }:{ cityId:string }){
  const [items,setItems]=useState<any[]>([])
  useEffect(()=>{ fetch(`/api/experiences?cityId=${encodeURIComponent(cityId)}`).then(r=>r.json()).then(j=>setItems(j.data||[])) },[cityId])
  if(!items.length) return null
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{items.map((x:any)=> <ExperienceCard key={x.id} item={x}/>)}</div>
}
