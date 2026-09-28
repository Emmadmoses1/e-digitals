import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { FolderOpen, MessageSquare, Star, Briefcase, Plus, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Dashboard — Admin' }

export default async function AdminDashboard() {
  const [
    totalProjects, publishedProjects, draftProjects,
    totalMessages, unreadMessages,
    totalTestimonials, totalServices,
    recentProjects, recentMessages,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.project.count({ where: { published: false } }),
    prisma.message.count(),
    prisma.message.count({ where: { status: 'new' } }),
    prisma.testimonial.count(),
    prisma.service.count(),
    prisma.project.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.message.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ]).catch(() => [0, 0, 0, 0, 0, 0, 0, [], []])

  const stats = [
    { label: 'Total Projects', value: totalProjects, sub: `${publishedProjects} published · ${draftProjects} draft`, icon: FolderOpen, href: '/admin/projects' },
    { label: 'Messages', value: totalMessages, sub: `${unreadMessages} unread`, icon: MessageSquare, href: '/admin/messages', alert: (unreadMessages as number) > 0 },
    { label: 'Testimonials', value: totalTestimonials, sub: 'Published reviews', icon: Star, href: '/admin/testimonials' },
    { label: 'Services', value: totalServices, sub: 'Active services', icon: Briefcase, href: '/admin/services' },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#0a0a0a]">E-DIGITALS STUDIO</h1>
          <p className="text-sm text-[#9ca3af] mt-1">Welcome back, Emmanuel. Here's your dashboard.</p>
        </div>
        <Link href="/admin/projects/new"
          className="flex items-center gap-2 bg-[#f97316] text-white text-xs font-bold tracking-widest uppercase px-5 py-3 hover:bg-[#ea6c0a] transition-colors">
          <Plus size={14} /> New Project
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}
            className="border border-[#f3f4f6] p-5 bg-white hover:border-[#f97316] transition-colors group">
            <div className="flex items-start justify-between mb-3">
              <stat.icon size={18} className="text-[#9ca3af] group-hover:text-[#f97316] transition-colors" />
              {stat.alert && <span className="w-2 h-2 bg-[#f97316] shrink-0" />}
            </div>
            <p className="text-2xl font-black text-[#0a0a0a]">{stat.value as number}</p>
            <p className="text-xs text-[#0a0a0a] font-medium mt-1">{stat.label}</p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">{stat.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-[#f3f4f6] bg-white">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f3f4f6]">
            <h2 className="text-sm font-black text-[#0a0a0a]">Recent Projects</h2>
            <Link href="/admin/projects" className="text-xs text-[#9ca3af] hover:text-[#f97316] flex items-center gap-1 transition-colors">
              View all <ArrowRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-[#f3f4f6]">
            {(recentProjects as any[]).length === 0 ? (
              <p className="px-5 py-6 text-sm text-[#9ca3af]">No projects yet.</p>
            ) : (
              (recentProjects as any[]).map((p) => (
                <Link key={p.id} href={`/admin/projects/${p.id}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-[#f9fafb] transition-colors">
                  <div>
                    <p className="text-sm font-bold text-[#0a0a0a]">{p.title}</p>
                    <p className="text-xs text-[#9ca3af]">{p.category}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 font-bold border ${p.published ? 'border-green-500/30 text-green-600 bg-green-50' : 'border-[#f3f4f6] text-[#9ca3af]'}`}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="border border-[#f3f4f6] bg-white">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f3f4f6]">
            <h2 className="text-sm font-black text-[#0a0a0a]">Recent Messages</h2>
            <Link href="/admin/messages" className="text-xs text-[#9ca3af] hover:text-[#f97316] flex items-center gap-1 transition-colors">
              View all <ArrowRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-[#f3f4f6]">
            {(recentMessages as any[]).length === 0 ? (
              <p className="px-5 py-6 text-sm text-[#9ca3af]">No messages yet.</p>
            ) : (
              (recentMessages as any[]).map((m) => (
                <Link key={m.id} href="/admin/messages"
                  className="flex items-center justify-between px-5 py-3 hover:bg-[#f9fafb] transition-colors">
                  <div>
                    <p className="text-sm font-bold text-[#0a0a0a]">{m.name}</p>
                    <p className="text-xs text-[#9ca3af] truncate max-w-[180px]">{m.email}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 font-bold border ${m.status === 'new' ? 'border-[#f97316]/30 text-[#f97316] bg-orange-50' : 'border-[#f3f4f6] text-[#9ca3af]'}`}>
                    {m.status}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
