'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, LogOut, ExternalLink } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FolderOpen,
  Briefcase,
  MessageSquare,
  Image,
  Settings,
  Search,
  Star,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/services', label: 'Services', icon: Briefcase },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/media', label: 'Media', icon: Image },
  { href: '/admin/seo', label: 'SEO', icon: Search },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

interface AdminHeaderProps {
  user: { name?: string | null; email?: string | null }
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="h-16 border-b border-[var(--color-border)] flex items-center justify-between px-6 shrink-0 bg-[var(--color-bg)]">
        {/* Mobile logo + toggle */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-[var(--color-text-secondary)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="md:hidden text-sm font-semibold tracking-[0.15em] uppercase">
            E-DIGITALS
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            View Site <ExternalLink size={11} />
          </Link>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-[var(--color-text-primary)]">
              {user.name || 'Admin'}
            </p>
            <p className="text-[10px] text-[var(--color-text-muted)]">
              {user.email}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="p-2 text-[var(--color-text-muted)] hover:text-red-400 transition-colors"
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[var(--color-bg)] pt-16">
          <nav className="px-4 py-4">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors',
                    isActive(item.href, item.exact)
                      ? 'bg-[var(--color-accent)] text-black font-medium'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                  )}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="flex items-center gap-3 px-4 py-3 rounded-md text-sm text-[var(--color-text-muted)] hover:text-red-400 hover:bg-[var(--color-surface)] transition-colors mt-4"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
