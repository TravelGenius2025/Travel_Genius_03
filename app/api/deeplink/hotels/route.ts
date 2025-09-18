import { NextResponse } from 'next/server'

export async function GET(req: Request){
  const u = new URL(req.url)
  const city = u.searchParams.get('city')||''
  const checkin = u.searchParams.get('checkin')||''
  const checkout = u.searchParams.get('checkout')||''
  const adults = parseInt(u.searchParams.get('adults')||'1')||1

  const p = (s:string)=>encodeURIComponent(s)

  const links = [
    { name:'Google Hotels', url:`https://www.google.com/travel/hotels?destination=${p(city)}&dates=${p(checkin)}%2C${p(checkout)}&adults=${adults}` },
    { name:'Booking.com', url:`https://www.booking.com/searchresults.html?ss=${p(city)}&checkin=${p(checkin)}&checkout=${p(checkout)}&group_adults=${adults}` },
    { name:'Agoda', url:`https://www.agoda.com/search?city=${p(city)}&checkIn=${p(checkin)}&checkOut=${p(checkout)}&adults=${adults}` },
    { name:'Expedia', url:`https://www.expedia.com/Hotel-Search?destination=${p(city)}&startDate=${p(checkin)}&endDate=${p(checkout)}&adults=${adults}` },
    { name:'Hotels.com', url:`https://www.hotels.com/Hotel-Search?destination=${p(city)}&startDate=${p(checkin)}&endDate=${p(checkout)}&adults=${adults}` },
  ]

  return NextResponse.json({ links })
}
