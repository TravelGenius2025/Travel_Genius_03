'use client'
import { useState, useEffect } from 'react'
export default function SearchBar({ onSelect }:{ onSelect:(id:string, name:string)=>void }){
  const [q,setQ]=useState(''); const [sug,setSug]=useState<any[]>([])
  useEffect(()=>{ let t:any; if(q.length>=2){ t=setTimeout(async()=>{ const r=await fetch(`/api/cities?q=${encodeURIComponent(q)}`); const j=await r.json(); setSug(j.data||[]) },250)} else setSug([]); return ()=>clearTimeout(t) },[q])
  return (
    <div className="relative">
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Paris, Tokyo..." className="border rounded-2xl p-3 w-full"/>
      {sug.length>0 && <div className="absolute z-10 bg-white border rounded-xl mt-1 w-full shadow-soft max-h-64 overflow-auto">
        {sug.map((c:any)=>(<div key={c.id} onClick={()=>onSelect(String(c.id), c.city + (c.countryCode? ', '+c.countryCode:''))} className="px-3 py-2 hover:bg-ivory cursor-pointer">{c.city}{c.countryCode?`, ${c.countryCode}`:''}</div>))}
      </div>}
    </div>
  )
}
