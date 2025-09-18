import { NextResponse } from 'next/server'

function pad(n:number){ return n<10 ? '0'+n : ''+n }

export async function GET(req: Request){
  const u = new URL(req.url)
  const origin = (u.searchParams.get('origin')||'').toUpperCase()
  const destination = (u.searchParams.get('destination')||'').toUpperCase()
  const depart = u.searchParams.get('depart')||''
  const ret = u.searchParams.get('ret')||''
  const adults = parseInt(u.searchParams.get('adults')||'1')||1

  const links:{name:string,url:string}[] = []

  // Google Flights generic search
  const gq = encodeURIComponent(`flights from ${origin} to ${destination} on ${depart||''}`.trim())
  links.push({ name:'Google Flights', url:`https://www.google.com/travel/flights?q=${gq}` })

  // Kayak deep link: /flights/DEL-JFK/2025-10-01/2025-10-10?adults=1
  const kDates = [depart, ret].filter(Boolean).join('/')
  links.push({ name:'KAYAK', url:`https://www.kayak.com/flights/${origin}-${destination}/${kDates}?adults=${adults}` })

  // Skyscanner route/date link (YYMMDD)
  function toYYMMDD(d:string){ if(!d) return ''; const dt=new Date(d); const yy=(''+dt.getUTCFullYear()).slice(2); return yy+pad(dt.getUTCMonth()+1)+pad(dt.getUTCDate()) }
  const ssA = toYYMMDD(depart); const ssB = toYYMMDD(ret)
  const ssDates = [ssA, ssB].filter(Boolean).join('/')
  links.push({ name:'Skyscanner', url:`https://www.skyscanner.net/transport/flights/${origin}/${destination}/${ssDates}/?adults=${adults}` })

  // Momondo deep link similar to Kayak
  const mmDates = [depart, ret].filter(Boolean).join('/')
  links.push({ name:'momondo', url:`https://www.momondo.com/flight-search/${origin}-${destination}/${mmDates}?adults=${adults}` })

  // Trip.com general query link
  const tq = encodeURIComponent(`${origin} to ${destination} ${depart}`.trim())
  links.push({ name:'Trip.com', url:`https://us.trip.com/flights/search?searchboxArg=${tq}` })

  return NextResponse.json({ links })
}
