import { NextResponse } from 'next/server'

const CC_TO_CUR: Record<string,string> = {
  IN:'INR', US:'USD', GB:'GBP', AU:'AUD', CA:'CAD', JP:'JPY', KR:'KRW', SG:'SGD', AE:'AED',
  EU:'EUR', DE:'EUR', FR:'EUR', IT:'EUR', ES:'EUR', NL:'EUR', BE:'EUR', SE:'SEK', NO:'NOK',
  DK:'DKK', CH:'CHF', NZ:'NZD', ZA:'ZAR', BR:'BRL', MX:'MXN', SA:'SAR', QA:'QAR'
}

export async function GET(request: Request){
  const xf = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim()
  const url = xf ? `https://ipwho.is/${xf}` : 'https://ipwho.is/'
  try{
    const r = await fetch(url, { cache:'no-store' })
    const j = await r.json()
    const cc = (j && (j.country_code || j.country_code_iso3 || '')).toString().toUpperCase()
    const currency = (j && j.currency && j.currency.code) ? j.currency.code : (CC_TO_CUR[cc] || 'USD')
    return NextResponse.json({ country_code: cc, currency })
  }catch(e){
    return NextResponse.json({ country_code: null, currency: 'USD' })
  }
}
