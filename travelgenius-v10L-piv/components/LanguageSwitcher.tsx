'use client'
import { useI18n } from '@/lib/i18n'
export default function LanguageSwitcher(){
  const { lang, setLang } = useI18n()
  return (
    <select aria-label="Language" value={lang} onChange={e=>setLang(e.target.value)} className="border rounded-2xl p-2">
      <option value="en">EN</option>
      <option value="hi">हिंदी</option>
      <option value="es">ES</option>
      <option value="ar">AR</option>
    </select>
  )
}
