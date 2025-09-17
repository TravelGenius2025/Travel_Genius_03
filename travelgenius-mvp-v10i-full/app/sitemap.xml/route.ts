import { SEO_CITIES } from '@/lib/seoCities'
export async function GET(request: Request) {
  const url = new URL(request.url)
  const base = `${url.protocol}//${url.host}`
  const paths = ['/', '/search']
  const cities = SEO_CITIES.map(c=>`/dest/${c.slug}`)
  const urls = [...paths, ...cities].map(p => `<url><loc>${base}${p}</loc></url>`).join('')
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}
