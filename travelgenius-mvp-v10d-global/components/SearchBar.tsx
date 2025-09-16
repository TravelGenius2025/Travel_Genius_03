'use client'
import { useRef, useState } from 'react'; import useSWR from 'swr'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())
export default function SearchBar({ onSelect }:{ onSelect:(id:string, name?:string)=>void }){
  const [q,setQ]=useState(''); const {data}=useSWR(q.length>=2?`/api/cities?q=${encodeURIComponent(q)}`:null, fetcher)
  const box=useRef<HTMLDivElement>(null)
  return <div className="relative max-w-xl" ref={box}>
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Type a city (e.g., Goa, Tokyo, Paris)…" className="w-full rounded-2xl border p-3 shadow-soft outline-none focus:ring-2 focus:ring-gold-600"/>
    {q.length>=2 && data?.data && (<div className="absolute left-0 right-0 mt-2 rounded-2xl border bg-white shadow-soft max-h-80 overflow-auto z-20">
      {data.data.map((c:any)=>(<button key={c.id} onClick={()=>onSelect(String(c.id), c.city + (c.countryCode? ', '+c.countryCode : ''))} className="w-full text-left px-4 py-2 hover:bg-[rgba(59,47,42,0.06)]">{c.city}, {c.countryCode}</button>))}
      {data.data.length===0 && <div className="px-4 py-2 text-[rgba(59,47,42,0.7)]">No results</div>}
    </div>)}
  </div>
}
