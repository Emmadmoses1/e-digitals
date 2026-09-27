'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/process', label: 'Process' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <nav className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="w-8 h-8 bg-[#f97316] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">E</span>
          </span>
          <span className="font-bold text-[#0a0a0a] tracking-tight">E-DIGITALS</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-200 ${pathname === l.href ? 'text-[#f97316]' : 'text-[#374151] hover:text-[#0a0a0a]'}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact" className="btn-primary text-sm py-2 px-5">
            Let&apos;s Talk
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-[#374151] hover:text-[#0a0a0a] hover:bg-[#f3f4f6] transition-colors"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#f3f4f6] px-6 py-6 flex flex-col gap-4 shadow-lg">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-base font-medium py-2 transition-colors ${pathname === l.href ? 'text-[#f97316]' : 'text-[#374151]'}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-sm mt-2 justify-center">
            Let&apos;s Talk
          </Link>
        </div>
      )}
    </header>
  )
}
