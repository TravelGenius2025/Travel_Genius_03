'use client'
export function formatMoney(n:number){ try{ return new Intl.NumberFormat(undefined, {style:'currency', currency:'USD', maximumFractionDigits:0}).format(n)}catch{return '$'+Math.round(n)} }
