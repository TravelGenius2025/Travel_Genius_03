import './globals.css'
import Link from 'next/link'

export const metadata = { title:'TravelGenius', description:'Plan by vibe; book with confidence.' }

export default function RootLayout({ children }:{ children: React.ReactNode }){
  return (<html lang='en'><body>
    <header className='max-w-5xl mx-auto px-4 py-3 flex items-center gap-3'>
      <Link href='/' className='flex items-center gap-2'><img src='/logo.svg' className='h-8 w-auto' alt='logo'/><span className='font-bold text-lg'>TravelGenius</span></Link>
    </header>
    <main className='max-w-5xl mx-auto px-4 py-6'>{children}</main>
  </body></html>)
}
