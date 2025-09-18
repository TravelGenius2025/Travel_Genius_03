import { NextResponse } from 'next/server'

type Geo = { name:string, lat:number, lon:number, timezone?:string }
async function geocode(city:string): Promise<Geo|null> {
  try{
    const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`, { next:{ revalidate: 3600 }})
    const j = await r.json()
    const it = j?.results?.[0]
    if(!it) return null
    return { name: it.name, lat: it.latitude, lon: it.longitude, timezone: it.timezone }
  }catch{ return null }
}

function haversine(lat1:number, lon1:number, lat2:number, lon2:number){
  const toRad = (d:number)=>d*Math.PI/180
  const R=6371
  const dLat=toRad(lat2-lat1), dLon=toRad(lon2-lon1)
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2
  return 2*R*Math.asin(Math.sqrt(a))
}

async function tzOffsetSeconds(lat:number, lon:number){
  try{
    // Use Open‑Meteo forecast simply to get utc_offset_seconds for that location
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`, { next:{ revalidate: 600 }})
    const j = await r.json()
    return j?.utc_offset_seconds || 0
  }catch{ return 0 }
}

async function weatherRisk(lat:number, lon:number, isoDate:string){
  try{
    const start = isoDate || new Date().toISOString().slice(0,10)
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=precipitation_sum,wind_speed_10m_max,temperature_2m_max,temperature_2m_min&start_date=${start}&end_date=${start}`, { next:{ revalidate: 1800 }})
    const j = await r.json()
    const d0 = 0
    const precip = j?.daily?.precipitation_sum?.[d0] ?? 0
    const wind = j?.daily?.wind_speed_10m_max?.[d0] ?? 0
    const tmax = j?.daily?.temperature_2m_max?.[d0] ?? 20
    const tmin = j?.daily?.temperature_2m_min?.[d0] ?? 12
    const risk:string[]=[]
    let penalty=0
    if(precip>8){ risk.push('heavy rain'); penalty+=8 }
    if(wind>12){ risk.push('strong wind'); penalty+=6 }
    if(tmax>=35 || tmin<=0){ risk.push('temp extremes'); penalty+=6 }
    return { precip_mm: precip, wind_ms: wind, temp_c: (tmax+tmin)/2, risk, penalty }
  }catch{
    return { precip_mm:0, wind_ms:0, temp_c:20, risk:[], penalty:0 }
  }
}

export async function GET(req: Request){
  const u = new URL(req.url)
  const from = u.searchParams.get('from')||''
  const to = u.searchParams.get('to')||''
  const depart = u.searchParams.get('depart')||''

  const gA = await geocode(from)
  const gB = await geocode(to)
  if(!gA || !gB) return NextResponse.json({ error:'Could not geocode cities' }, { status: 400 })

  const dist = haversine(gA.lat, gA.lon, gB.lat, gB.lon)
  // Simple economy emission factors
  const ef = dist > 2500 ? 0.09 : 0.115 // kg CO2 per km
  const co2 = dist * ef
  const co2rf = co2 * 1.9

  const [oOff, dOff] = await Promise.all([ tzOffsetSeconds(gA.lat,gA.lon), tzOffsetSeconds(gB.lat,gB.lon) ])
  const tzDiffHours = (dOff - oOff) / 3600

  const wr = await weatherRisk(gB.lat, gB.lon, depart)

  // Penalties
  const distPenalty = Math.min(30, dist/500 * 2) // up to 30
  const jetPenalty = Math.min(20, Math.abs(tzDiffHours) * 1.8) // up to 20
  const co2Penalty = Math.min(30, co2/100 * 1) // 100 kg -> 1 point (scaled conservative)
  const weatherPenalty = Math.min(20, wr.penalty)

  let tei = 100 - (distPenalty + jetPenalty + co2Penalty + weatherPenalty)
  tei = Math.max(10, Math.min(95, tei))

  const notes = [
    `Distance penalty: ${distPenalty.toFixed(1)}`,
    `Jet lag penalty: ${jetPenalty.toFixed(1)}`,
    `CO2 penalty: ${co2Penalty.toFixed(1)} (economy)`,
    `Weather penalty: ${weatherPenalty.toFixed(1)}`
  ]

  return NextResponse.json({
    tei, distance_km: dist, co2_kg: co2, co2_rf_kg: co2rf, tz_diff_hours: tzDiffHours,
    weather: wr, notes
  })
}
