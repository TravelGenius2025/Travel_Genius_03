import { NextResponse } from 'next/server'
import CITIES from '@/data/cities.json'

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').toLowerCase().trim()
  if(q.length < 2) return NextResponse.json({ data: [] })
  const data = (CITIES as any[]).filter(c => (c.city + ' ' + (c.countryCode||'')).toLowerCase().includes(q)).slice(0, 15)
  return NextResponse.json({ data })
}
