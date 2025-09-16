import type { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'
import { SEO_CITIES as CITIES } from '@/lib/seoCities'
const CITIES = CITIES as any; /* keep type simple for TS */
// old list [
  { slug:'paris', name:'Paris, France', hero:'https://images.unsplash.com/photo-1522098543979-ffc7f79d5f33?q=80&w=1200&auto=format&fit=crop', blurb:'Cafés, art, and riverfront strolls.' },
  { slug:'tokyo', name:'Tokyo, Japan', hero:'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1200&auto=format&fit=crop', blurb:'Neon nights, tranquil shrines, perfect ramen.' },
  { slug:'new-york', name:'New York, USA', hero:'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?q=80&w=1200&auto=format&fit=crop', blurb:'Skylines, Broadway, endless neighborhoods.' },
  { slug:'london', name:'London, UK', hero:'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop', blurb:'History, markets, parks & pubs.' },
  { slug:'dubai', name:'Dubai, UAE', hero:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop', blurb:'Futuristic skyline and desert escapes.' },
  { slug:'sydney', name:'Sydney, Australia', hero:'https://images.unsplash.com/photo-1506976785307-8732e854ad75?q=80&w=1200&auto=format&fit=crop', blurb:'Harbour life, beaches, coastal walks.' },
  { slug:'singapore', name:'Singapore', hero:'https://images.unsplash.com/photo-1512455102796-42e89a85bbc8?q=80&w=1200&auto=format&fit=crop', blurb:'Hawker food, lush gardens, spotless streets.' },
  { slug:'bangkok', name:'Bangkok, Thailand', hero:'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1200&auto=format&fit=crop', blurb:'Street food, temples, river ferries.' },
  { slug:'mumbai', name:'Mumbai, India', hero:'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=1200&auto=format&fit=crop', blurb:'Sea breeze, cinema, cutting chai.' },
  { slug:'delhi', name:'Delhi, India', hero:'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop', blurb:'Monuments, markets, and Mughal flavors.' }
]

export async function generateStaticParams() {
  return CITIES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }:{ params:{ slug:string } }): Promise<Metadata> {
  const c = CITIES.find(x=>x.slug===params.slug)
  const title = c ? `${c.name} Travel Guide — TravelGenius` : 'Destination — TravelGenius'
  const description = c ? blurbFor(c.name, 'en') : 'Plan by vibe, book with confidence.'
  return { title, description, openGraph:{ title, description, images:[{url:c?.hero||'/logo.svg'}] } }
}

function detectLangFromHeaders(): string {
  try { const h = headers(); const al = h.get('accept-language') || 'en'; const base = al.split(',')[0].split('-')[0]; return ['en','hi','es','ar'].includes(base) ? base : 'en' } catch { return 'en' }
}
function blurbFor(name: string, lang: string): string {
  switch(lang){
    case 'hi': return `${name} के लिए आपकी गाइड — शीर्ष दर्शनीय स्थल, भोजन और स्थानीय मोहल्ले।`
    case 'es': return `Tu guía de ${name}: mejores lugares, comida y barrios locales.`
    case 'ar': return `دليلك إلى ${name}: أبرز المعالم والطعام والأحياء المحلية.`
    default: return `${name} guide — top sights, food, and local neighborhoods.`
  }
}
export default function CityPage({ params }:{ params:{ slug:string } }){ const lang = detectLangFromHeaders();
  const c = CITIES.find(x=>x.slug===params.slug)
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
      <div className="text-sm text-[rgba(59,47,42,0.7)]">Pre-rendered for SEO. More cities can be added in <code>app/dest/[slug]/page.tsx</code>.</div>
    </div>
  )
}
