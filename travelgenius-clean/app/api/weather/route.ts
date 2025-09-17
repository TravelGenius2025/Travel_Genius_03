import { NextResponse } from 'next/server'
export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const city = (searchParams.get('city') || '').trim()
  if(!city) return NextResponse.json({ data: null })
  try{
    const g = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`, { cache: 'no-store', headers: { 'User-Agent':'TravelGenius/1.0 demo' } })
    const gj = await g.json()
    if(!Array.isArray(gj) || gj.length===0) return NextResponse.json({ data: null })
    const { lat, lon } = gj[0]
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`, { cache: 'no-store' })
    const j = await r.json()
    return NextResponse.json({ data: j })
  }catch{ return NextResponse.json({ data: null }) }
}
