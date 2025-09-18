'use client'
import useSWR from 'swr'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())
export default function GlobalPOIGrid({ city }:{ city: string }){
  const { data, isLoading } = useSWR(city? `/api/poi?city=${encodeURIComponent(city)}` : null, fetcher)
  if(isLoading) return <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{Array.from({length:6}).map((_,i)=>(<div key={i} className="card h-48 animate-pulse" />))}</div>
  const items = data?.data || []
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((p:any)=>(
        <div key={p.id} className="card overflow-hidden flex flex-col">
          <div className="relative h-44">{p.image? <img src={p.image} className="object-cover w-full h-full" alt={p.title}/> : <div className="w-full h-full bg-gray-100" /> }</div>
          <div className="p-4 flex-1 flex flex-col gap-2">
            <h3 className="font-semibold">{p.title}</h3>
            <div className="text-sm opacity-70 line-clamp-3">{p.shortDescription || 'Point of interest'}</div>
            <div className="flex gap-2 pt-2">
              <a className="px-3 py-2 rounded-xl bg-gray-50" href={`https://en.wikipedia.org/wiki/${encodeURIComponent(p.title.replace(/ /g,'_'))}`} target="_blank">Open</a>
              <a className="px-3 py-2 rounded-xl bg-gray-50" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.title + ' ' + city)}`} target="_blank">Map</a>
            </div>
          </div>
        </div>
      ))}
      {items.length===0 && <div className="opacity-70">No points found. Try a nearby city.</div>}
    </div>
  )
}
