'use client'
import { detectCurrency, setCurrency } from '@/lib/currency'
import { useEffect } from 'react'
export default function AutoCurrency(){
  useEffect(()=>{
    try{
      const saved = localStorage.getItem('tg_cur')
      if(saved) return
      const cached = sessionStorage.getItem('tg_cur_auto')
      if(cached){ return }
      fetch('/api/geoip').then(r=>r.json()).then(j=>{
        if(j?.currency){
          sessionStorage.setItem('tg_cur_auto', j.currency)
          // Only set if nothing saved and different from default detect
          if(!localStorage.getItem('tg_cur')){
            const current = detectCurrency()
            if(current !== j.currency){
              localStorage.setItem('tg_cur', j.currency)
              location.reload()
            }
          }
        }
      }).catch(()=>{})
    }catch(_){}
  },[])
  return null
}
