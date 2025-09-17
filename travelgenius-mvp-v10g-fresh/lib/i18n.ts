'use client'
import en from '@/locales/en.json'
import hi from '@/locales/hi.json'
import es from '@/locales/es.json'
import ar from '@/locales/ar.json'
const TABLE: Record<string, any> = { en, hi, es, ar }
function getBrowserLang(): string {
  if (typeof navigator === 'undefined') return 'en'
  const lang = navigator.language || 'en'
  const base = lang.split('-')[0]
  if (TABLE[base]) return base
  return 'en'
}
export function getDefaultLang(): string {
  try { const saved = localStorage.getItem('tg_lang'); if (saved) return saved } catch {}
  return getBrowserLang()
}
export function useI18n() {
  const lang = getDefaultLang()
  const dict = TABLE[lang] || TABLE['en']
  const t = (key: string, vars: Record<string,string|number> = {}) => {
    const raw = (dict && (dict as any)[key]) || (TABLE['en'] as any)[key] || key
    return Object.keys(vars).reduce((s,k)=> s.replace(new RegExp(`\{${k}\}`,'g'), String(vars[k])), raw)
  }
  const setLang = (l:string)=> { try { localStorage.setItem('tg_lang', l) } catch {} ; location.reload() }
  return { t, lang, setLang }
}
export function isRTL(lang?:string){ const l=lang||getDefaultLang(); return l==='ar' }
