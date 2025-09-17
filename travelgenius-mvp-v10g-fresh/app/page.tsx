'use client'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'

export default function Home(){
  const { t } = useI18n()
  return (
    <div className="space-y-10">
      <section className="card p-8">
        <h1 className="text-4xl font-bold h-serif mb-2">TravelGenius</h1>
        <p className="text-[rgba(59,47,42,0.7)] mb-6">Global search, instant ideas, quick booking links.</p>
        <Link href="/search" className="button bg-gold-600 text-white">{t('cta_start_search')}</Link>
      </section>
    </div>
  )
}
