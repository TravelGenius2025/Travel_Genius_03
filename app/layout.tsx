import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import CurrencySwitcher from '@/components/CurrencySwitcher'
import AutoCurrency from '@/components/AutoCurrency'
export const metadata: Metadata = { title:'TravelGenius', description:'Plan by vibe, book with confidence' }
export default function RootLayout({ children }:{ children: React.ReactNode }){
  return <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Playfair+Display:wght@500;700&display=swap" rel="stylesheet"/>
      <script dangerouslySetInnerHTML={{__html: `
try{var l=localStorage.getItem('tg_lang')||navigator.language.split('-')[0]; if(l==='ar'){ document.documentElement.setAttribute('dir','rtl'); }}catch(e){}
`}} />
    </head>
    <body className="min-h-screen">
      <header className="sticky top-0 z-50 bg-ivory/80 backdrop-blur border-b border-[rgba(0,0,0,0.06)]">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold"><img src="/logo.svg" alt="logo" className="h-8"/></Link>
          <nav className="ml-auto flex items-center gap-4">
            <Link href="/search" className="hover:underline">Search</Link>
            <Link href="/trips" className="hover:underline">My Trips</Link>
            <Link href="/setup" className="hover:underline">Setup</Link>
          <CurrencySwitcher/>
            <LanguageSwitcher/>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-[rgba(59,47,42,0.7)]">Built with ❤️ on Next.js • © {new Date().getFullYear()} TravelGenius</footer>
      <script async src="https://checkout.razorpay.com/v1/checkout.js"></script>
          <AutoCurrency/>
    </body>
  </html>
}
