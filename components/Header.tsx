'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const nav = [
  { title: 'Home', href: '/' },
  { title: 'Search', href: '/search' },
  { title: 'Book', href: '/book' }, // 👈 new
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href ? 'text-gray-900' : 'text-gray-600'

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-7 w-7 rounded-xl bg-gradient-to-br from-pink-500 via-indigo-500 to-violet-600"></span>
          <span className="font-extrabold text-lg bg-gradient-to-r from-pink-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
            TravelGenius
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg hover:bg-gray-50 font-medium ${isActive(item.href)}`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link
            href="/book"
            className="px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-pink-500 via-indigo-500 to-violet-600"
          >
            Plan & Book
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-gray-50"
        >
          ☰
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t">
          <nav className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-lg hover:bg-gray-50 font-medium ${isActive(item.href)}`}
              >
                {item.title}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="mt-1 px-4 py-2 rounded-xl font-medium text-white text-center bg-gradient-to-r from-pink-500 via-indigo-500 to-violet-600"
            >
              Plan & Book
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
