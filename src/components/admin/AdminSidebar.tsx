'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  LogOut,
} from 'lucide-react'
import { signOut } from 'next-auth/react'

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

export default function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside className="hidden md:flex w-60 flex-col border-r border-[var(--color-border)] bg-[var(--color-bg)] shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-border)]">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.15em] uppercase text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
        >
          E-DIGITALS
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-[var(--color-text-muted)] px-3 mb-3">
          Management
        </p>
        <div className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors',
                isActive(item.href, item.exact)
                  ? 'bg-[var(--color-accent)] text-black font-medium'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
              )}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-[var(--color-border)]">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-[var(--color-text-muted)] hover:text-red-400 hover:bg-[var(--color-surface)] transition-colors w-full"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  )
}
