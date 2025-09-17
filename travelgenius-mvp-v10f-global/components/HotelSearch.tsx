'use client'
import { useMemo, useState } from 'react'
function formatDate(d:Date){ const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}` }
export default function HotelSearch(){
  const [dest,setDest]=useState('Goa, India'); const today=new Date(); const inDate=new Date(today); inDate.setDate(inDate.getDate()+30); const outDate=new Date(today); outDate.setDate(outDate.getDate()+34)
  const [checkin,setCheckin]=useState(formatDate(inDate)); const [checkout,setCheckout]=useState(formatDate(outDate)); const [adults,setAdults]=useState(2); const [rooms,setRooms]=useState(1)
  const bookingUrl=useMemo(()=>{ const qs=new URLSearchParams({ ss:dest, checkin:checkin, checkout:checkout, group_adults:String(adults), no_rooms:String(rooms), group_children:'0' })
    let aff = process.env.NEXT_PUBLIC_HOTEL_AFFILIATE_PARAMS || ''; if(!aff && typeof window!=='undefined'){ try{ aff = localStorage.getItem('hotel_aff') || '' }catch(_){} }
    const baseUrl=`https://www.booking.com/searchresults.html?${qs.toString()}`; return aff? `${baseUrl}&${aff}` : baseUrl },[dest,checkin,checkout,adults,rooms])
  return <div className="card p-4 space-y-3"><div className="font-semibold">Find Hotels</div>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
      <input value={dest} onChange={e=>setDest(e.target.value)} className="border rounded-2xl p-2 col-span-2" placeholder="Destination"/>
      <input type="date" value={checkin} onChange={e=>setCheckin(e.target.value)} className="border rounded-2xl p-2"/>
      <input type="date" value={checkout} onChange={e=>setCheckout(e.target.value)} className="border rounded-2xl p-2"/>
      <div className="flex gap-2">
        <input type="number" min={1} value={adults} onChange={e=>setAdults(Number(e.target.value))} className="border rounded-2xl p-2 w-20"/>
        <input type="number" min={1} value={rooms} onChange={e=>setRooms(Number(e.target.value))} className="border rounded-2xl p-2 w-20"/>
      </div>
    </div>
    <a href={bookingUrl} target="_blank" className="button bg-gold-600 text-white">Search Hotels</a>
    <div className="text-xs text-[rgba(59,47,42,0.7)]">Opens Booking.com with live availability.</div>
  </div>
}
