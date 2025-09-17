import { NextResponse } from 'next/server'
import localCities from '@/data/cities.json'

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim()
  if(q.length < 2) return NextResponse.json({ data: [] })

  try {
    const r = await fetch(`https://api.teleport.org/api/cities/?search=${encodeURIComponent(q)}&limit=10`, { cache: 'no-store' })
    const j = await r.json()
    const items = (j?._embedded?.['city:search-results'] || []).map((it:any)=> {
      const name = it.matching_full_name || it?.matching_alternate_names?.[0]?.name || it?.matching_full_name || ''
      return { id: it.href || it?._links?.self?.href ?? it?._links?.['city:item']?.href || name, city: name.split(',')[0], countryCode: name.split(',').pop()?.trim().split(' ').pop() || '' }
    })
    return NextResponse.json({ data: items })
  } catch (e) {
    // fall back to local
    const data = (localCities as any[]).filter(c=> c.city.toLowerCase().includes(q.toLowerCase()))
    return NextResponse.json({ data })
  }
}
