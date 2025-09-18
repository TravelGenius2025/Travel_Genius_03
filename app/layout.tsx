import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header' // 👈 add this import

export const metadata: Metadata = {
  title: 'TravelGenius',
  description: 'Plan smarter trips with Trip Ease Index™',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Header />                 {/* 👈 add header here */}
        <main className="min-h-screen">{children}</main>
        <footer className="border-t">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} TravelGenius — TEI™ is an indicative score. Always check carrier rules and entry requirements.
          </div>
        </footer>
      </body>
    </html>
  )
}
