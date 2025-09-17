import { NextResponse } from 'next/server'
export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const city = (searchParams.get('city') || '').trim()
  if(!city) return NextResponse.json({ error: 'city required' }, { status: 400 })
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1&addressdetails=1`
    const r = await fetch(url, { headers: { 'User-Agent': 'TravelGenius/1.0 (demo)' }, cache: 'no-store' })
    const j = await r.json()
    if(!Array.isArray(j) || j.length===0) return NextResponse.json({ data: null })
    const hit = j[0]
    return NextResponse.json({ data: { lat: parseFloat(hit.lat), lon: parseFloat(hit.lon), display_name: hit.display_name } })
  } catch (e) {
    return NextResponse.json({ data: null })
  }
}
