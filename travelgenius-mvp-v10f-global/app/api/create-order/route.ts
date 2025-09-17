import { NextResponse } from 'next/server'
export async function POST(req:Request){
  const body = await req.json().catch(()=>({})); const amount = Number(body?.amount||999)
  const id=process.env.RAZORPAY_KEY_ID; const secret=process.env.RAZORPAY_KEY_SECRET
  if(!id||!secret){ return NextResponse.json({ orderId:null, demo:true }) }
  const creds=Buffer.from(`${id}:${secret}`).toString('base64')
  const r=await fetch('https://api.razorpay.com/v1/orders',{ method:'POST', headers:{ 'Authorization':`Basic ${creds}`,'Content-Type':'application/json' }, body:JSON.stringify({ amount:amount*100, currency:'INR', receipt:`rcpt_${Math.random().toString(36).slice(2)}` }) })
  const j=await r.json(); return NextResponse.json({ orderId:j.id })
}
