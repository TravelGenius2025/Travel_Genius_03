'use client'
import { useEffect, useState } from 'react'
type PollData={ id:string, title:string, options:{ id:string, text:string, votes:number }[] }
async function createPoll(title:string, options:string[]){ const r=await fetch('/api/poll',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({title,options})}); if(r.status===501) return null; const j=await r.json(); return j?.id||null }
async function fetchPoll(id:string){ const r=await fetch(`/api/poll/${id}`); if(r.status===501) return null; return r.json() }
async function vote(id:string, optionId:string){ const r=await fetch(`/api/poll/${id}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({optionId}) }); if(r.status===501) return false; return true }
function uid(){ return Math.random().toString(36).slice(2,10) }
export default function Poll(){
  const [title,setTitle]=useState('Where should we go?'); const [options,setOptions]=useState<string[]>(['Goa','Manali','Udaipur'])
  const [pollId,setPollId]=useState(''); const [data,setData]=useState<PollData|null>(null); const [usingSupabase,setUsingSupabase]=useState(true)
  useEffect(()=>{ const hash=typeof window!=='undefined'?location.hash.replace('#',''):''; if(hash){ setPollId(hash); load(hash) } },[])
  async function load(id:string){ const d=await fetchPoll(id); if(!d){ setUsingSupabase(false); return } setData(d) }
  async function handleCreate(){ const id=await createPoll(title, options); if(!id){ setUsingSupabase(false); const localId=uid(); const payload={ id:localId, title, options:options.map(o=>({ id:uid(), text:o, votes:0 })) }; localStorage.setItem(`poll_${localId}`, JSON.stringify(payload)); setData(payload as any); setPollId(localId); history.replaceState(null,'',`#${localId}`); return } setUsingSupabase(true); setPollId(id); history.replaceState(null,'',`#${id}`); const d=await fetchPoll(id); setData(d) }
  async function handleVote(optionId:string){ if(usingSupabase && pollId){ const ok=await vote(pollId, optionId); if(ok){ const d=await fetchPoll(pollId); setData(d) } return } if(data){ const updated={ ...data, options:data.options.map(o=> o.id===optionId? { ...o, votes:o.votes+1 }:o)}; setData(updated); localStorage.setItem(`poll_${data.id}`, JSON.stringify(updated)) } }
  if(!data){ return (<div className="card p-4 space-y-3 max-w-xl"><div className="text-[rgba(59,47,42,0.7)] text-sm">Create a poll</div>
    <input className="border rounded-2xl p-2 w-full" value={title} onChange={e=>setTitle(e.target.value)}/>
    <div className="space-y-2">{options.map((op,i)=>(<div key={i} className="flex gap-2"><input className="border rounded-2xl p-2 flex-1" value={op} onChange={e=>setOptions(arr=>arr.map((x,idx)=> idx===i? e.target.value: x))}/></div>))}</div>
    <button onClick={()=>setOptions(arr=>[...arr,'New Option'])} className="button bg-[rgba(59,47,42,0.06)]">Add option</button>
    <button onClick={handleCreate} className="button bg-gold-600 text-white">Create & Share</button>
    <div className="text-xs text-[rgba(59,47,42,0.7)]">A shareable link will appear in your URL bar after creation.</div></div>) }
  return (<div className="card p-4 space-y-3 max-w-xl">
    <div className="text-sm text-[rgba(59,47,42,0.7)]">Shareable link</div><div className="font-mono break-all text-xs">{typeof window!=='undefined'?location.href:''}</div>
    <div className="font-semibold">{data.title}</div>
    <div className="space-y-2">{data.options.map(op=>(<div key={op.id} className="flex items-center gap-2"><button onClick={()=>handleVote(op.id)} className="button bg-gold-600 text-white">Vote</button><div className="flex-1">{op.text}</div><div className="text-sm text-[rgba(59,47,42,0.7)]">{op.votes} votes</div></div>))}</div>
    {!usingSupabase&&<div className="text-xs text-amber-600">Running in local-only mode (no Supabase). Add keys to persist across devices.</div>}
  </div>)
}
