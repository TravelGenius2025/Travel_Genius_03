'use client'
import useSWR from 'swr'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())
export default function WeatherCard({ city }:{ city: string }){
  const { data } = useSWR(city? `/api/weather?city=${encodeURIComponent(city)}` : null, fetcher)
  const w = data?.data
  if(!w) return null
  return (
    <div className="card p-4">
      <div className="font-semibold">Today: {w.current_weather?.temperature}°</div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-2">
        {(w?.daily?.time || []).slice(0,5).map((t:string, i:number)=>(
          <div key={t} className="border rounded-2xl p-2 text-sm">
            <div>{t}</div>
            <div>{w.daily.temperature_2m_max[i]}° / {w.daily.temperature_2m_min[i]}°</div>
          </div>
        ))}
      </div>
    </div>
  )
}
