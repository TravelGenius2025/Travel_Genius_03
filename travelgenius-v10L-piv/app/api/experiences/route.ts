import { NextResponse } from 'next/server'
import all from '@/data/experiences.json'
export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const cityId = searchParams.get('cityId') || ''
  const data = (all as Record<string, any[]>)[cityId] || []
  return NextResponse.json({ data })
}
