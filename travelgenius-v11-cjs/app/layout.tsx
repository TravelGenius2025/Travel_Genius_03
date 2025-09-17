import './globals.css'
import Link from 'next/link'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import CurrencySwitcher from '@/components/CurrencySwitcher'

export const metadata = { title: 'TravelGenius', description: 'Plan by vibe; book with confidence.' }

export default function RootLayout({ children }:{ children: React.ReactNode }){
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest"/>
        <script dangerouslySetInnerHTML={{__html:`try{var l=localStorage.getItem('tg_lang')||navigator.language.split('-')[0]; if(l==='ar'){ document.documentElement.setAttribute('dir','rtl'); }}catch(e){}`}} />
      </head>
      <body>
        <header className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link className="flex items-center gap-2" href="/">
            <img src="/logo.svg" alt="TravelGenius" className="h-8 w-auto"/>
            <span className="text-xl font-bold h-serif">TravelGenius</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4">
            <CurrencySwitcher/>
            <LanguageSwitcher/>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        <script dangerouslySetInnerHTML={{__html:`if ('serviceWorker' in navigator) { window.addEventListener('load', ()=> navigator.serviceWorker.register('/sw.js').catch(()=>{})); }`}} />
      </body>
    </html>
  )
}
