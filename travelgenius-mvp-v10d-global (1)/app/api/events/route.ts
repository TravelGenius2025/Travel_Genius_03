import { NextResponse } from 'next/server'
import all from '@/data/events.json'

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city') || ''
  const data = (all as Record<string, any[]>)[city] || []
  return NextResponse.json({ data })
}
