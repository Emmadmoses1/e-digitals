import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  }).catch(() => [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-[#0a0a0a]">Projects</h1>
        <Link href="/admin/projects/new"
          className="flex items-center gap-2 bg-[#f97316] text-white text-xs font-bold tracking-widest uppercase px-5 py-3 hover:bg-[#ea6c0a] transition-colors">
          <Plus size={14} /> New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white border border-[#f3f4f6] p-12 text-center">
          <p className="text-[#9ca3af] mb-4">No projects yet.</p>
          <Link href="/admin/projects/new" className="text-[#f97316] font-bold text-sm">+ Add your first project</Link>
        </div>
      ) : (
        <div className="bg-white border border-[#f3f4f6]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#f3f4f6]">
                <th className="text-left px-6 py-4 text-xs font-bold text-[#9ca3af] uppercase tracking-widest">Title</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-[#9ca3af] uppercase tracking-widest hidden md:table-cell">Category</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-[#9ca3af] uppercase tracking-widest">Status</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3f4f6]">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="px-6 py-4 font-bold text-[#0a0a0a]">{p.title}</td>
                  <td className="px-6 py-4 text-[#9ca3af] hidden md:table-cell">{p.category ?? '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] px-2 py-1 font-bold border ${p.published ? 'border-green-500/30 text-green-600 bg-green-50' : 'border-[#f3f4f6] text-[#9ca3af]'}`}>
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/projects/${p.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#9ca3af] hover:text-[#f97316] transition-colors">
                      <Pencil size={12} /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
