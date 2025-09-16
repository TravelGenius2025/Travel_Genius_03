'use client'
import { useState } from 'react'; import clsx from 'clsx'
const VIBES=[{key:'chill',label:'Chill by Water'},{key:'adrenaline',label:'Adrenaline'},{key:'family',label:'Family-friendly'},{key:'hidden',label:'Hidden Gems'},{key:'food',label:'Food Pilgrim'}]
export default function VibeChips({ onChoose }:{ onChoose:(key:string)=>void }){
  const [active,setActive]=useState(''); return <div className="flex flex-wrap gap-2">
    {VIBES.map(v=>(<button key={v.key} className={clsx('px-3 py-1 rounded-full border text-sm', active===v.key?'bg-gold-600 text-white border-gold-600':'bg-white')} onClick={()=>{setActive(v.key); onChoose(v.key)}}>{v.label}</button>))}
  </div>
}
