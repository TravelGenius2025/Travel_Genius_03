import { NextResponse } from 'next/server'

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const city = (searchParams.get('city') || '').trim()
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  if(!city && (!lat || !lon)) return NextResponse.json({ data: null })
  let latNum = Number(lat), lonNum = Number(lon)
  try{
    if((!lat || !lon) && city){
      const g = await fetch(`${new URL(req.url).origin}/api/geocode?city=${encodeURIComponent(city)}`, { cache: 'no-store' })
      const gj = await g.json()
      if(gj?.data){ latNum = gj.data.lat; lonNum = gj.data.lon }
    }
    if(!latNum || !lonNum) return NextResponse.json({ data: null })
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latNum}&longitude=${lonNum}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`, { cache: 'no-store' })
    const j = await r.json()
    return NextResponse.json({ data: j })
  }catch(e){
    return NextResponse.json({ data: null })
  }
}
