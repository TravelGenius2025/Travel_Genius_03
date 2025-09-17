'use client'
import { detectCurrency, setCurrency, SupportedCurrencies } from '@/lib/currency'
import { useI18n } from '@/lib/i18n'
export default function CurrencySwitcher(){
  const cur = detectCurrency()
  const { t } = useI18n()
  return (
    <label className="flex items-center gap-2">
      <span className="text-sm">{t('currency')}</span>
      <select value={cur} onChange={e=>setCurrency(e.target.value)} className="border rounded-2xl p-2">
        {SupportedCurrencies.map(c=> <option key={c} value={c}>{c}</option>)}
      </select>
    </label>
  )
}
