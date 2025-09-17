'use client'
export default function EventCard({ item }:{ item:any }){
  return <div className="card p-4 flex flex-col gap-2">
    <div className="text-sm text-[rgba(59,47,42,0.7)]">{item.date || item.dates?.start?.localDate}</div>
    <div className="font-semibold">{item.name}</div>
    <div className="text-sm text-[rgba(59,47,42,0.7)]">{item.venue || item._embedded?.venues?.[0]?.name}</div>
    <div className="mt-2"><a href={item.url} target="_blank" className="button bg-[rgba(59,47,42,0.06)]">Details</a></div>
  </div>
}
