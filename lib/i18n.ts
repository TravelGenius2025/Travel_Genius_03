'use client'
export function useI18n(){
  const t = (k:string)=> ({ search:'Search by city', start:'Start searching' } as any)[k] || k
  return { t }
}
