import { NextResponse } from 'next/server'

async function jfetch(url: string){
  const r = await fetch(url, { cache: 'no-store', headers: { 'User-Agent': 'TravelGenius/1.0 demo' } })
  return r.json()
}

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const city = (searchParams.get('city') || '').trim()
  if(!city) return NextResponse.json({ data: [] })

  try{
    // Geocode city
    const g = await jfetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`)
    if(!Array.isArray(g) || g.length===0) return NextResponse.json({ data: [] })
    const lat = parseFloat(g[0].lat), lon = parseFloat(g[0].lon)

    // Get nearby pages
    const radius = 7000
    const geo = await jfetch(`https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${lat}%7C${lon}&gsradius=${radius}&gslimit=9&format=json`)
    const pages = geo?.query?.geosearch || []
    if(pages.length === 0) return NextResponse.json({ data: [] })
    const ids = pages.map((p:any)=> p.pageid).join('|')

    const detail = await jfetch(`https://en.wikipedia.org/w/api.php?action=query&pageids=${ids}&prop=extracts%7Cpageimages&explaintext=1&exintro=1&pithumbsize=600&format=json`)
    const results = Object.values(detail?.query?.pages || {}).map((p:any)=> ({
      id: p.pageid, title: p.title, image: p.thumbnail?.source || null,
      shortDescription: (p.extract || '').split('\n')[0]
    }))
    return NextResponse.json({ data: results })
  }catch(e){
    return NextResponse.json({ data: [] })
  }
}
