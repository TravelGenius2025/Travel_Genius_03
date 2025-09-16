'use client'
import Link from 'next/link'
const cities=[{id:'1263706',name:'Goa',img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'},
{id:'1253626',name:'Jaipur',img:'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop'},
{id:'1256237',name:'Udaipur',img:'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop'},
{id:'1260683',name:'Manali',img:'https://images.unsplash.com/photo-1562564789-41b0aa1e69cb?q=80&w=1200&auto=format&fit=crop'},
{id:'1259056',name:'Rishikesh',img:'https://images.unsplash.com/photo-1626947149623-d313dfc2a74b?q=80&w=1200&auto=format&fit=crop'},
{id:'1273294',name:'Andaman',img:'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop'}]
export default function IndiaHighlights(){
  return <section className="space-y-4">
    <h2 className="text-2xl font-bold h-serif">Discover India</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {cities.map(c=>(<Link key={c.id} href={`/search?cityId=${c.id}&cityName=${encodeURIComponent(c.name+', India')}`} className="relative rounded-2xl overflow-hidden group">
        <img src={c.img} alt={c.name} className="h-40 w-full object-cover group-hover:scale-105 transition"/>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-2 left-2 text-white font-semibold drop-shadow">{c.name}</div>
      </Link>))}
    </div>
  </section>
}
