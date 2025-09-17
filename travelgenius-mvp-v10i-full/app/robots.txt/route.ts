export async function GET(request: Request) {
  const url = new URL(request.url)
  const base = `${url.protocol}//${url.host}`
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } })
}
