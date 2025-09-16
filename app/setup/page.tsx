'use client'
import useSWR from 'swr'; import { useEffect, useState } from 'react'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())
export default function SetupPage(){
  const { data } = useSWR('/api/env-status', fetcher); const env = data?.data || {}
  const [sky,setSky]=useState(''); const [hotel,setHotel]=useState('')
  useEffect(()=>{ setSky(localStorage.getItem('sky_aff')||''); setHotel(localStorage.getItem('hotel_aff')||'') },[])
  const save=()=>{ localStorage.setItem('sky_aff', sky); localStorage.setItem('hotel_aff', hotel); alert('Saved locally. These will be used if env vars are missing.') }
  const Row=({name,ok}:{name:string,ok:boolean})=>(<div className="flex items-center justify-between border-b py-2"><div>{name}</div><div className={ok?'text-green-600':'text-red-600'}>{ok?'Present':'Missing'}</div></div>)
  return (<div className="space-y-6"><h1 className="text-3xl font-bold h-serif">Setup & Status</h1>
    <p className="text-[rgba(59,47,42,0.7)]">Verify environment variables and set affiliate tags locally.</p>
    <section className="card p-4"><h2 className="font-semibold mb-2">Environment status (server)</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{Object.keys(env).map(k=><Row key={k} name={k} ok={!!env[k]}/>)}</div><p className="text-xs mt-2 text-[rgba(59,47,42,0.7)]">Values are not shown, only Present/Missing.</p></section>
    <section className="card p-4 space-y-3"><h2 className="font-semibold">Affiliate tags (local fallback)</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-2"><input className="border rounded-2xl p-2" placeholder="Skyscanner params e.g., associateid=YOUR_ID" value={sky} onChange={e=>setSky(e.target.value)}/><input className="border rounded-2xl p-2" placeholder="Booking.com params e.g., aid=1234567&label=mylabel" value={hotel} onChange={e=>setHotel(e.target.value)}/></div><button onClick={save} className="button bg-gold-600 text-white">Save</button><div className="text-xs text-[rgba(59,47,42,0.7)]">Flight & Hotel links will append these if env vars are missing.</div></section>
  </div>)
}
