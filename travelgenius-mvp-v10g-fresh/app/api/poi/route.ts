import { NextResponse } from 'next/server'
async function wiki(url: string){
  const r = await fetch(url, { headers: { 'User-Agent': 'TravelGenius/1.0 (demo)' }, cache: 'no-store' })
  return r.json()
}
export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const city = (searchParams.get('city') || '').trim()
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  let latNum = Number(lat), lonNum = Number(lon)
  if((!lat || !lon) && city){
    try {
      const g = await fetch(`${new URL(req.url).origin}/api/geocode?city=${encodeURIComponent(city)}`, { cache: 'no-store' })
      const gj = await g.json()
      if(gj?.data){ latNum = gj.data.lat; lonNum = gj.data.lon }
    } catch(e){}
  }
  if(!latNum || !lonNum){ return NextResponse.json({ data: [] }) }
  const radius = 7000
  const geo = await wiki(`https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${latNum}%7C${lonNum}&gsradius=${radius}&gslimit=9&format=json`)
  const pages = geo?.query?.geosearch || []
  if(pages.length === 0) return NextResponse.json({ data: [] })
  const ids = pages.map((p:any)=> p.pageid).join('|')
  const detail = await wiki(`https://en.wikipedia.org/w/api.php?action=query&pageids=${ids}&prop=extracts%7Cpageimages&explaintext=1&exintro=1&pithumbsize=600&format=json`)
  const results = Object.values(detail?.query?.pages || {}).map((p:any)=> ({
    id: p.pageid, title: p.title, image: p.thumbnail?.source || null, shortDescription: (p.extract || '').split('\n')[0],
    retailPrice: { amount: 0, currency: 'INR' }, viatorUrl: null
  }))
  return NextResponse.json({ data: results })
}
