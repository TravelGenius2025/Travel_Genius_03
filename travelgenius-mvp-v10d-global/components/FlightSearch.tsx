'use client'
import { useMemo, useState } from 'react'
function formatDate(d:Date){ const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), day=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}` }
export default function FlightSearch(){
  const [origin,setOrigin]=useState('BOM'); const [dest,setDest]=useState('GOI')
  const today=new Date(); const out=new Date(today); out.setDate(out.getDate()+30); const ret=new Date(today); ret.setDate(ret.getDate()+35)
  const [depart,setDepart]=useState(formatDate(out)); const [returnDate,setReturnDate]=useState(formatDate(ret))
  const market=process.env.NEXT_PUBLIC_MARKET||'IN', currency=process.env.NEXT_PUBLIC_CURRENCY||'INR', locale=process.env.NEXT_PUBLIC_LOCALE||'en-IN'
  const url=useMemo(()=>{ const base='https://www.skyscanner.com/transport/flights'; const path=`/${origin}/${dest}/${depart}/${returnDate}/`; const qs=new URLSearchParams({adults:'1',cabinclass:'economy',currency,market,locale})
    let aff = process.env.NEXT_PUBLIC_SKYSCANNER_AFFILIATE_PARAMS || ''; if(!aff && typeof window!=='undefined'){ try{ aff = localStorage.getItem('sky_aff') || '' }catch(_){} }
    const built = `${base}${path}?${qs.toString()}`; return aff? `${built}&${aff}`: built },[origin,dest,depart,returnDate,currency,market,locale])
  return <div className="card p-4 space-y-3"><div className="font-semibold">Find Flights (Skyscanner)</div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <input value={origin} onChange={e=>setOrigin(e.target.value.toUpperCase().slice(0,3))} className="border rounded-2xl p-2" placeholder="Origin IATA (e.g., BOM)"/>
      <input value={dest} onChange={e=>setDest(e.target.value.toUpperCase().slice(0,3))} className="border rounded-2xl p-2" placeholder="Destination IATA (e.g., GOI)"/>
      <input type="date" value={depart} onChange={e=>setDepart(e.target.value)} className="border rounded-2xl p-2"/>
      <input type="date" value={returnDate} onChange={e=>setReturnDate(e.target.value)} className="border rounded-2xl p-2"/>
    </div>
    <a href={url} target="_blank" className="button bg-gold-600 text-white">Search on Skyscanner</a>
    <div className="text-xs text-[rgba(59,47,42,0.7)]">Tip: Use IATA codes (e.g., DEL, BOM, BLR, GOI, PNQ).</div>
  </div>
}
