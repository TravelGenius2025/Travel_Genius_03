'use client'
const MAP: Record<string,string> = {
  IN: 'INR', US: 'USD', GB: 'GBP', EU: 'EUR', AE: 'AED', SG: 'SGD',
  AU: 'AUD', CA: 'CAD', JP: 'JPY', KR: 'KRW'
}
const FX: Record<string, number> = {
  INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095, AED: 0.044, SGD: 0.016, AUD: 0.018, CAD: 0.016, JPY: 1.85, KRW: 16.0
}

function getRegion(): string {
  if (typeof Intl === 'undefined') return 'IN'
  const loc = Intl.DateTimeFormat().resolvedOptions().locale || 'en-IN'
  const m = loc.split('-')[1]
  return (m || 'IN').toUpperCase()
}

export function detectCurrency(): string {
  try {
    const saved = localStorage.getItem('tg_cur'); if (saved) return saved
  } catch {}
  const reg = getRegion()
  return MAP[reg] || 'USD'
}

export function setCurrency(cur: string) {
  try { localStorage.setItem('tg_cur', cur) } catch {}
  location.reload()
}

export function formatMoney(amountInINR: number, currency?: string) {
  const cur = currency || detectCurrency()
  const rate = FX[cur] || 1
  const num = amountInINR * rate
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(num)
  } catch {
    return `${cur} ${Math.round(num)}`
  }
}

export const SupportedCurrencies = Object.keys(FX)
