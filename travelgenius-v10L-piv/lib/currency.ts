'use client'
const FX: Record<string, number> = { INR:1, USD:0.012, EUR:0.011, GBP:0.0095, AED:0.044, SGD:0.016, AUD:0.018, CAD:0.016, JPY:1.85, KRW:16.0 }
export const SupportedCurrencies = Object.keys(FX)
export function detectCurrency(): string {
  try { const saved = localStorage.getItem('tg_cur'); if (saved) return saved } catch {}
  return 'USD'
}
export function setCurrency(cur: string){ try{ localStorage.setItem('tg_cur',cur)}catch{}; location.reload() }
export function formatMoney(amountInINR: number, currency?: string){
  const cur = currency || detectCurrency(); const rate = FX[cur] || 1; const num = amountInINR * rate
  try { return new Intl.NumberFormat(undefined, { style:'currency', currency:cur, maximumFractionDigits:0 }).format(num) }
  catch { return `${cur} ${Math.round(num)}` }
}
