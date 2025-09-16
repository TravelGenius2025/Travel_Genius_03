'use client'
import { useCallback } from 'react'
declare global{ interface Window{ Razorpay:any } }
export default function RazorpayButton({ title, amount }:{ title:string, amount:number }){
  const launch=useCallback(async ()=>{
    let orderId:null|string=null; try{ const r=await fetch('/api/create-order',{method:'POST', body:JSON.stringify({amount})}); const j=await r.json(); orderId=j?.orderId||null }catch(_){}
    const key_id=process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID||''
    const opts:any={ key:key_id, amount:amount*100, currency:'INR', name:'TravelGenius', description:title, order_id:orderId||undefined, theme:{ color:'#C6A667' } }
    const rz=new window.Razorpay(opts); rz.open()
  },[title,amount])
  return <button onClick={launch} className="button bg-gold-600 text-white">Reserve</button>
}
