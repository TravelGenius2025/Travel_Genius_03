'use client'
import { formatMoney } from '@/lib/currency'

export default function ExperienceCard({ item }:{ item:any }){
  const img = item?.image || 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop'
  const price = item?.price || item?.retailPrice?.amount || 1999
  return (
    <div className="card overflow-hidden flex flex-col">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt={item?.title||'Experience'} className="h-40 w-full object-cover"/>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="font-semibold">{item?.title||'Experience'}</div>
        <div className="text-sm text-[rgba(59,47,42,0.7)] line-clamp-3">{item?.shortDescription||''}</div>
        <div className="mt-auto flex items-center justify-between">
          <div className="font-bold">{formatMoney(Number(price)||0)}</div>
          <a href="#" className="button bg-gold-600 text-white">Book</a>
        </div>
      </div>
    </div>
  )
}
