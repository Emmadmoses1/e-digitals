'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#f3f4f6]' : 'bg-white'}`}>
      <nav className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between">
        <Link href="/" className="font-black text-[#0a0a0a] text-xl tracking-tight">
          E-<span className="text-[#f97316]">DIGITALS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`text-sm font-medium transition-colors duration-200 relative ${pathname === l.href ? 'text-[#f97316]' : 'text-[#374151] hover:text-[#0a0a0a]'}`}
            >
              {l.label}
              {pathname === l.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#f97316]" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <Link href="/contact" className="btn-primary py-2 px-5 text-xs">
            Let&apos;s Talk
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-[#0a0a0a]">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t border-[#f3f4f6] px-6 py-6 flex flex-col gap-4 shadow-lg">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`text-base font-semibold py-2 border-b border-[#f3f4f6] ${pathname === l.href ? 'text-[#f97316]' : 'text-[#0a0a0a]'}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary mt-2 justify-center">
            Let&apos;s Talk
          </Link>
        </div>
      )}
    </header>
  )
}
