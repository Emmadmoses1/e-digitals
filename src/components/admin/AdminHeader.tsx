'use client'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function AdminHeader({ user }: { user: { name?: string | null; email?: string | null } }) {
  return (
    <header className="bg-white border-b border-[#f3f4f6] px-6 py-4 flex items-center justify-between">
      <p className="text-sm text-[#9ca3af]">
        Welcome, <span className="font-bold text-[#0a0a0a]">{user.name ?? user.email}</span>
      </p>
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="flex items-center gap-2 text-xs font-bold text-[#9ca3af] hover:text-[#f97316] transition-colors uppercase tracking-widest"
      >
        <LogOut size={14} /> Sign Out
      </button>
    </header>
  )
}
