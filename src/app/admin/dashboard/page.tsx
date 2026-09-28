'use client'

import { useEffect, useState } from 'react'
import { FolderOpen, Star, MessageSquare, Settings, TrendingUp, Eye } from 'lucide-react'

interface Stats {
  projects: number
  services: number
  testimonials: number
  messages: number
  unreadMessages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadStats() {
      try {
        const [projects, services, testimonials, messages] = await Promise.all([
          fetch('/api/projects').then(r => r.json()),
          fetch('/api/services').then(r => r.json()),
          fetch('/api/testimonials').then(r => r.json()),
          fetch('/api/messages').then(r => r.json()),
        ])
        setStats({
          projects: projects.length ?? 0,
          services: services.length ?? 0,
          testimonials: testimonials.length ?? 0,
          messages: messages.length ?? 0,
          unreadMessages: messages.filter((m: { read: boolean }) => !m.read).length ?? 0,
        })
      } catch {
        setError('Failed to load stats')
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  const cards = [
    { label: 'Projects', value: stats?.projects, icon: FolderOpen, href: '/admin/projects', color: 'bg-[#f97316]' },
    { label: 'Services', value: stats?.services, icon: Settings, href: '/admin/services', color: 'bg-[#0a0a0a]' },
    { label: 'Testimonials', value: stats?.testimonials, icon: Star, href: '/admin/testimonials', color: 'bg-[#f97316]' },
    { label: 'Messages', value: stats?.messages, icon: MessageSquare, href: '/admin/messages', color: 'bg-[#0a0a0a]', badge: stats?.unreadMessages },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#0a0a0a]">E-DIGITALS STUDIO</h1>
        <p className="text-[#9ca3af] mt-1">Welcome back, Emmanuel. Here's what's happening.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <a key={card.label} href={card.href} className="bg-white border border-[#f3f4f6] p-6 hover:border-[#f97316] transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3`}>
                  <Icon size={20} className="text-white" />
                </div>
                {card.badge ? (
                  <span className="bg-[#f97316] text-white text-xs font-bold px-2 py-1">
                    {card.badge} new
                  </span>
                ) : null}
              </div>
              <p className="text-3xl font-black text-[#0a0a0a]">
                {loading ? '—' : card.value}
              </p>
              <p className="text-sm text-[#9ca3af] font-medium mt-1">{card.label}</p>
            </a>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#f3f4f6] p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-[#f97316]" />
            <h2 className="font-black text-[#0a0a0a]">Quick Actions</h2>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Add New Project', href: '/admin/projects/new' },
              { label: 'Add New Service', href: '/admin/services' },
              { label: 'View Messages', href: '/admin/messages' },
              { label: 'Update Settings', href: '/admin/settings' },
            ].map(action => (
              <a key={action.label} href={action.href}
                className="block w-full text-left px-4 py-3 bg-[#f9fafb] hover:bg-[#f97316] hover:text-white font-medium text-sm text-[#0a0a0a] transition-colors">
                → {action.label}
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#f3f4f6] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye size={18} className="text-[#f97316]" />
            <h2 className="font-black text-[#0a0a0a]">Site Info</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Live URL', value: 'e-digitals.onrender.com' },
              { label: 'Stack', value: 'Next.js 16 + Prisma + Neon' },
              { label: 'Theme', value: 'White / Black / Orange' },
              { label: 'Status', value: '🟢 Online' },
            ].map(item => (
              <div key={item.label} className="flex justify-between py-2 border-b border-[#f3f4f6] text-sm">
                <span className="text-[#9ca3af] font-medium">{item.label}</span>
                <span className="font-bold text-[#0a0a0a]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
