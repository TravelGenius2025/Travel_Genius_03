'use client'
import { detectCurrency, setCurrency, SupportedCurrencies } from '@/lib/currency'
export default function CurrencySwitcher(){
  const cur = detectCurrency()
  return (
    <label className="flex items-center gap-2">
      <span className="text-sm">Currency</span>
      <select aria-label="Currency" value={cur} onChange={e=>setCurrency(e.target.value)} className="border rounded-2xl p-2">
        {SupportedCurrencies.map(c=> <option key={c} value={c}>{c}</option>)}
      </select>
    </label>
  )
}
