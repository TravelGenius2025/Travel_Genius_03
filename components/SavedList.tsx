'use client'
import useSWR from 'swr'; import { useEffect, useState } from 'react'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())
function getDeviceId(){ let id=localStorage.getItem('deviceId'); if(!id){ id=Math.random().toString(36).slice(2,10); localStorage.setItem('deviceId',id) } return id }
export default function SavedList(){
  const [deviceId,setDeviceId]=useState(''); useEffect(()=>{ setDeviceId(getDeviceId()) },[])
  const { data } = useSWR(deviceId?`/api/saves?deviceId=${deviceId}`:null, fetcher)
  let items:any[]=[]; if(data?.data) items=data.data.map((r:any)=>r.item); if(!data||data?.error){ try{ items=JSON.parse(localStorage.getItem('saved_items')||'[]') }catch(_){} }
  if(items.length===0) return <div className="text-[rgba(59,47,42,0.7)]">No saved items yet.</div>
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{items.map((it,i)=>(<div key={i} className="card p-4"><div className="font-semibold">{it.title||'Saved Experience'}</div><div className="text-sm text-[rgba(59,47,42,0.7)]">{it.shortDescription||''}</div><a className="button bg-[rgba(59,47,42,0.06)] mt-2" href={it.viatorUrl||'#'} target="_blank">Open</a></div>))}</div>
}
