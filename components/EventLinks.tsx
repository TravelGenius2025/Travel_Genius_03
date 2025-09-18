'use client'
export default function EventLinks({ city }:{ city:string }){
  const eb = `https://www.eventbrite.com/d/--/events/?loc=${encodeURIComponent(city)}`
  const mu = `https://www.meetup.com/find/?allMeetups=false&radius=10&userFreeform=${encodeURIComponent(city)}`
  return (
    <div className="flex gap-2">
      <a className="px-3 py-2 rounded-xl bg-gray-50" href={eb} target="_blank">Eventbrite</a>
      <a className="px-3 py-2 rounded-xl bg-gray-50" href={mu} target="_blank">Meetup</a>
    </div>
  )
}
