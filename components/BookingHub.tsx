'use client'
import { useState } from 'react'
import MetricCard from './MetricCard'

type Deeplink = { name:string, url:string }
type Metric = {
  tei:number, distance_km:number, co2_kg:number, co2_rf_kg:number,
  tz_diff_hours:number, weather: { precip_mm:number, wind_ms:number, temp_c:number, risk:string[] },
  notes:string[]
}

function SectionTitle({children}:{children:any}){
  return <h2 className="text-xl font-semibold mt-8 mb-3">{children}</h2>
}

export default function BookingHub(){
  const [fromCity,setFromCity]=useState('Delhi')
  const [toCity,setToCity]=useState('Paris')
  const [fromIata,setFromIata]=useState('DEL')
  const [toIata,setToIata]=useState('CDG')
  const [depart,setDepart]=useState<string>('')
  const [ret,setRet]=useState<string>('')
  const [adults,setAdults]=useState<number>(1)

  const [flightLinks,setFlightLinks]=useState<Deeplink[]>([])
  const [hotelLinks,setHotelLinks]=useState<Deeplink[]>([])
  const [metric,setMetric]=useState<Metric|null>(null)
  const [busy,setBusy]=useState(false)
  const [error,setError]=useState<string|undefined>()

  const run=async()=>{
    try{
      setBusy(true); setError(undefined)
      const q = new URLSearchParams({ origin:fromIata.trim(), destination:toIata.trim(), depart:depart||'', ret:ret||'', adults:String(adults||1) })
      const qh = new URLSearchParams({ city:toCity.trim(), checkin:depart||'', checkout:ret||'', adults:String(adults||1) })

      const [flRes, hoRes, meRes] = await Promise.all([
        fetch(`/api/deeplink/flights?${q.toString()}`).then(r=>r.json()),
        fetch(`/api/deeplink/hotels?${qh.toString()}`).then(r=>r.json()),
        fetch(`/api/trip/metrics?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&depart=${encodeURIComponent(depart||'')}&return=${encodeURIComponent(ret||'')}`).then(r=>r.json())
      ])
      setFlightLinks(flRes.links||[])
      setHotelLinks(hoRes.links||[])
      setMetric(meRes)
    }catch(e:any){
      setError(e?.message||'Something went wrong')
    }finally{
      setBusy(false)
    }
  }

  return (
    <div className="bg-white shadow-sm rounded-2xl p-4 sm:p-6 border">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <SectionTitle>Flights</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">From City</label>
              <input className="w-full border rounded-lg px-3 py-2" value={fromCity} onChange={e=>setFromCity(e.target.value)}/>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">To City</label>
              <input className="w-full border rounded-lg px-3 py-2" value={toCity} onChange={e=>setToCity(e.target.value)}/>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">From (IATA)</label>
              <input className="w-full border rounded-lg px-3 py-2 uppercase" value={fromIata} onChange={e=>setFromIata(e.target.value.toUpperCase())}/>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">To (IATA)</label>
              <input className="w-full border rounded-lg px-3 py-2 uppercase" value={toIata} onChange={e=>setToIata(e.target.value.toUpperCase())}/>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Depart</label>
              <input type="date" className="w-full border rounded-lg px-3 py-2" value={depart} onChange={e=>setDepart(e.target.value)}/>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Return (optional)</label>
              <input type="date" className="w-full border rounded-lg px-3 py-2" value={ret} onChange={e=>setRet(e.target.value)}/>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Adults</label>
              <input type="number" min={1} className="w-full border rounded-lg px-3 py-2" value={adults} onChange={e=>setAdults(parseInt(e.target.value||'1'))}/>
            </div>
          </div>

          <SectionTitle>Hotels</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Destination City</label>
              <input className="w-full border rounded-lg px-3 py-2" value={toCity} onChange={e=>setToCity(e.target.value)}/>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Check-in</label>
                <input type="date" className="w-full border rounded-lg px-3 py-2" value={depart} onChange={e=>setDepart(e.target.value)}/>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Check-out</label>
                <input type="date" className="w-full border rounded-lg px-3 py-2" value={ret} onChange={e=>setRet(e.target.value)}/>
              </div>
            </div>
          </div>

          <button onClick={run} disabled={busy} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-indigo-500 to-violet-600 text-white font-medium disabled:opacity-60">
            {busy ? 'Searching…' : 'Search & Build Links'}
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}

          {flightLinks.length>0 && (
            <div className="mt-6">
              <SectionTitle>Open flight results on:</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {flightLinks.map((l,i)=>(
                  <a key={i} href={l.url} target="_blank" className="px-3 py-2 rounded-lg border hover:bg-gray-50">{l.name}</a>
                ))}
              </div>
            </div>
          )}

          {hotelLinks.length>0 && (
            <div className="mt-6">
              <SectionTitle>Open hotel results on:</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {hotelLinks.map((l,i)=>(
                  <a key={i} href={l.url} target="_blank" className="px-3 py-2 rounded-lg border hover:bg-gray-50">{l.name}</a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <SectionTitle>Your Trip Ease Index™</SectionTitle>
          <p className="text-xs text-gray-500 -mt-2 mb-2">A single, transparent score combining CO₂, jet lag, weather risk and route distance.</p>
          <MetricCard data={metric}/>
          <p className="text-[11px] text-gray-400 mt-2">Method: CO₂ from distance (econ), RF=1.9; jet lag from timezone offsets; weather risk from daily precip/wind/temp using Open-Meteo.</p>
        </div>
      </div>
    </div>
  )
}
