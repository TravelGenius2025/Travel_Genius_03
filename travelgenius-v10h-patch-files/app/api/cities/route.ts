import { NextResponse } from 'next/server'
import localCities from '@/data/cities.json'

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim()
  if(q.length < 2) return NextResponse.json({ data: [] })

  try {
    const url = `https://api.teleport.org/api/cities/?search=${encodeURIComponent(q)}&limit=10`
    const r = await fetch(url, { cache: 'no-store' })
    const j = await r.json()
    const items = (j?._embedded?.['city:search-results'] || []).map((it:any)=> {
      const name = it.matching_full_name || it?.matching_alternate_names?.[0]?.name || ''
      const links = it?._links || {}
      const selfHref = (links as any)?.self?.href
      const cityItemHref = (links as any)?.['city:item']?.href
      return {
        id: (it as any).href || selfHref || cityItemHref || name,
        city: (name.split(',')[0] || '').trim(),
        countryCode: (name.split(',').pop() || '').trim().split(' ').pop() || ''
      }
    })
    return NextResponse.json({ data: items })
  } catch (e) {
    const data = (localCities as any[]).filter(c=> (c.city||'').toLowerCase().includes(q.toLowerCase()))
    return NextResponse.json({ data })
  }
}
