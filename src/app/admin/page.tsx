import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import {
  FolderOpen,
  MessageSquare,
  Star,
  Briefcase,
  Plus,
  ArrowRight,
} from 'lucide-react'

export const metadata = { title: 'Dashboard — Admin' }

export default async function AdminDashboard() {
  const [
    totalProjects,
    publishedProjects,
    draftProjects,
    totalMessages,
    unreadMessages,
    totalTestimonials,
    totalServices,
    recentProjects,
    recentMessages,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.project.count({ where: { published: false } }),
    prisma.message.count(),
    prisma.message.count({ where: { status: 'new' } }),
    prisma.testimonial.count(),
    prisma.service.count(),
    prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]).catch(() => [0, 0, 0, 0, 0, 0, 0, [], []])

  const stats = [
    {
      label: 'Total Projects',
      value: totalProjects,
      sub: `${publishedProjects} published · ${draftProjects} draft`,
      icon: FolderOpen,
      href: '/admin/projects',
    },
    {
      label: 'Messages',
      value: totalMessages,
      sub: `${unreadMessages} unread`,
      icon: MessageSquare,
      href: '/admin/messages',
      alert: (unreadMessages as number) > 0,
    },
    {
      label: 'Testimonials',
      value: totalTestimonials,
      sub: 'Published reviews',
      icon: Star,
      href: '/admin/testimonials',
    },
    {
      label: 'Services',
      value: totalServices,
      sub: 'Active services',
      icon: Briefcase,
      href: '/admin/services',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium">Dashboard</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Welcome back to E-DIGITALS CMS
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="btn btn-primary text-xs tracking-wider uppercase"
        >
          <Plus size={14} />
          New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="border border-[var(--color-border)] rounded-lg p-5 bg-[var(--color-surface)] hover:border-[var(--color-border-light)] transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <stat.icon
                size={18}
                className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors"
              />
              {stat.alert && (
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shrink-0" />
              )}
            </div>
            <p className="text-2xl font-medium">{stat.value as number}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{stat.label}</p>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 opacity-70">
              {stat.sub}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent projects */}
        <div className="border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
            <h2 className="text-sm font-medium">Recent Projects</h2>
            <Link
              href="/admin/projects"
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {(recentProjects as any[]).length === 0 ? (
              <p className="px-5 py-6 text-sm text-[var(--color-text-muted)]">
                No projects yet.
              </p>
            ) : (
              (recentProjects as any[]).map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/projects/${p.id}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-[var(--color-bg-tertiary)] transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{p.title}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{p.category}</p>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      p.published
                        ? 'border-green-500/30 text-green-400 bg-green-400/10'
                        : 'border-[var(--color-border)] text-[var(--color-text-muted)]'
                    }`}
                  >
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent messages */}
        <div className="border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
            <h2 className="text-sm font-medium">Recent Messages</h2>
            <Link
              href="/admin/messages"
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {(recentMessages as any[]).length === 0 ? (
              <p className="px-5 py-6 text-sm text-[var(--color-text-muted)]">
                No messages yet.
              </p>
            ) : (
              (recentMessages as any[]).map((m) => (
                <Link
                  key={m.id}
                  href="/admin/messages"
                  className="flex items-center justify-between px-5 py-3 hover:bg-[var(--color-bg-tertiary)] transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)] truncate max-w-[180px]">
                      {m.email}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      m.status === 'new'
                        ? 'border-[var(--color-accent)]/30 text-[var(--color-accent)] bg-[var(--color-accent)]/10'
                        : 'border-[var(--color-border)] text-[var(--color-text-muted)]'
                    }`}
                  >
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
