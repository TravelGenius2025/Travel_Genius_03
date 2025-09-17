import type { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'
import { SEO_CITIES } from '@/lib/seoCities'

export async function generateStaticParams() {
  return SEO_CITIES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }:{ params:{ slug:string } }): Promise<Metadata> {
  const c = SEO_CITIES.find(x=>x.slug===params.slug)
  const title = c ? `${c.name} Travel Guide — TravelGenius` : 'Destination — TravelGenius'
  const description = c ? blurbFor(c.name, 'en') : 'Plan by vibe, book with confidence.'
  return { title, description, openGraph:{ title, description, images:[{url:c?.hero||'/logo.svg'}] } }
}

function detectLangFromHeaders(): string {
  try { 
    const al = headers().get('accept-language') || 'en'
    const base = al.split(',')[0].split('-')[0]
    return ['en','hi','es','ar'].includes(base) ? base : 'en'
  } catch { return 'en' }
}
function blurbFor(name: string, lang: string): string {
  switch(lang){
    case 'hi': return `${name} के लिए आपकी गाइड — शीर्ष दर्शनीय स्थल, भोजन और स्थानीय मोहल्ले।`
    case 'es': return `Tu guía de ${name}: mejores lugares, comida y barrios locales.`
    case 'ar': return `دليلك إلى ${name}: أبرز المعالم والطعام والأحياء المحلية.`
    default: return `${name} guide — top sights, food, and local neighborhoods.`
  }
}

export default function CityPage({ params }:{ params:{ slug:string } }){
  const lang = detectLangFromHeaders();
  const c = SEO_CITIES.find(x=>x.slug===params.slug)
  if(!c) return <div className="space-y-6"><h1 className="text-3xl font-bold">Destination</h1><p>Not found.</p></div>
  const searchHref = `/search?cityName=${encodeURIComponent(c.name)}`
  return (
    <div className="space-y-6">
      <div className="rounded-2xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.hero} className="w-full h-72 object-cover" alt={c.name}/>
      </div>
      <h1 className="text-3xl font-bold h-serif">{c.name}</h1>
      <p className="text-[rgba(59,47,42,0.7)]">{blurbFor(c.name, lang)}</p>
      <div className="flex gap-3">
        <Link href={searchHref} className="button bg-gold-600 text-white">Explore {c.name}</Link>
        <a className="button bg-[rgba(59,47,42,0.06)]" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.name)}`} target="_blank">Map</a>
      </div>
      <div className="text-sm text-[rgba(59,47,42,0.7)]">Pre-rendered for SEO. You can add more cities in <code>lib/seoCities.ts</code>.</div>
    </div>
  )
}
