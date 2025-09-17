'use client'
import { formatMoney } from '@/lib/currency'
import Link from 'next/link'; import Co2Badge from './co2'; import RazorpayButton from './razorpay'
export default function ExperienceCard({ item }:{ item:any }){
  const img=item.images?.[0]?.variants?.[0]?.url||item.image||'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop'
  const title=item.title||item.productTitle||'Experience'
  const price=item.price||item.retailPrice?.amount||1999
  const currency=item.currency||item.retailPrice?.currency||'INR'
  return <div className="card overflow-hidden flex flex-col">
    <div className="relative h-44"><img src={img} alt={title} className="object-cover w-full h-full"/></div>
    <div className="p-4 flex-1 flex flex-col gap-2">
      <h3 className="font-semibold">{title}</h3>
      <div className="text-sm text-[rgba(59,47,42,0.7)] line-clamp-2">{item.shortDescription||item.description||'Curated experience'}</div>
      <div className="flex items-center justify-between mt-auto"><div className="font-bold">{formatMoney(Number(price)||0)}</div><Co2Badge km={250}/></div>
      <div className="flex gap-2 pt-2">
        {item.viatorUrl&&<a className="button bg-gold-600 text-white" href={item.viatorUrl} target="_blank">Book</a>}
        {!item.viatorUrl&&<RazorpayButton title={title} amount={Math.max(499,Math.floor((Number(price)||999)*0.2))}/>}
        <button onClick={async ()=>{const deviceId=(()=>{let id=localStorage.getItem('deviceId'); if(!id){id=Math.random().toString(36).slice(2,10); localStorage.setItem('deviceId',id)} return id})()
          const payload={deviceId, item:{title, shortDescription:item.shortDescription, viatorUrl:item.viatorUrl}}
          try{ const r=await fetch('/api/saves',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)}); if(r.status===501){ const raw=localStorage.getItem('saved_items')||'[]'; const arr=JSON.parse(raw); arr.unshift(payload.item); localStorage.setItem('saved_items',JSON.stringify(arr)) } }
          catch(_){ const raw=localStorage.getItem('saved_items')||'[]'; const arr=JSON.parse(raw); arr.unshift(payload.item); localStorage.setItem('saved_items',JSON.stringify(arr)) }
        }} className="button bg-[rgba(59,47,42,0.06)]">Save</button>
        <Link href="/trips" className="button bg-[rgba(59,47,42,0.06)]">View</Link>
      </div>
    </div>
  </div>
}
