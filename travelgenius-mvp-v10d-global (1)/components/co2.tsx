'use client'
export default function Co2Badge({ km }:{ km:number }){ const factor=0.13; const value=Math.round(km*factor)
  return <span className="inline-flex items-center gap-1 text-xs text-[rgba(59,47,42,0.7)] bg-[rgba(59,47,42,0.06)] px-2 py-1 rounded-full">~{value} kg CO₂e</span>
}
