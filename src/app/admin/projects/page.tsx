import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit, Eye, EyeOff } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata = { title: 'Projects — Admin' }

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  }).catch(() => [])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium">Projects</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            {projects.length} total
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

      {projects.length === 0 ? (
        <div className="border border-[var(--color-border)] rounded-lg p-16 text-center">
          <p className="text-[var(--color-text-muted)] mb-4">No projects yet.</p>
          <Link href="/admin/projects/new" className="btn btn-primary text-xs tracking-wider uppercase">
            <Plus size={14} /> Create First Project
          </Link>
        </div>
      ) : (
        <div className="border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-[var(--color-border)] text-[10px] font-medium tracking-[0.1em] uppercase text-[var(--color-text-muted)]">
            <div className="col-span-5">Project</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1"></div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[var(--color-border)]">
            {projects.map((project) => (
              <div
                key={project.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-5 py-4 hover:bg-[var(--color-bg-tertiary)] transition-colors items-center"
              >
                {/* Title */}
                <div className="md:col-span-5">
                  <p className="text-sm font-medium">{project.title}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    /work/{project.slug}
                  </p>
                </div>

                {/* Category */}
                <div className="md:col-span-2">
                  <span className="tag text-[10px]">{project.category}</span>
                </div>

                {/* Status */}
                <div className="md:col-span-2 flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    project.published
                      ? 'border-green-500/30 text-green-400 bg-green-400/10'
                      : 'border-[var(--color-border)] text-[var(--color-text-muted)]'
                  }`}>
                    {project.published ? 'Published' : 'Draft'}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--color-accent)]/30 text-[var(--color-accent)] bg-[var(--color-accent)]/10">
                      Featured
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="md:col-span-2">
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {formatDate(project.createdAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="md:col-span-1 flex items-center gap-2 justify-end">
                  {project.published && (
                    <Link
                      href={`/work/${project.slug}`}
                      target="_blank"
                      className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                      title="View live"
                    >
                      <Eye size={14} />
                    </Link>
                  )}
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                    title="Edit"
                  >
                    <Edit size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
