'use client'
import { formatMoney } from '@/lib/currency'
export default function ExperienceCard({ title, image, price }:{ title:string, image?:string, price:number }){
  return (<div className='card overflow-hidden hover:shadow-xl transition-shadow'>
    <img src={image || 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop'} className='w-full h-40 object-cover' alt={title}/>
    <div className='p-4 flex items-center justify-between'><div className='font-semibold'>{title}</div><div className='font-bold'>{formatMoney(price)}</div></div>
  </div>)
}
