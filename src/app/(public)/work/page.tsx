import { prisma } from '@/lib/prisma'
import ProjectCard from '@/components/ui/ProjectCard'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Work' }

export default async function WorkPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  }).catch(() => [])

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-12">
          <p className="text-xs font-bold text-[#f97316] uppercase tracking-widest mb-3">Portfolio</p>
          <h1 className="text-5xl font-black text-[#0a0a0a]">Our Work</h1>
        </div>
        {projects.length === 0 ? (
          <p className="text-[#9ca3af]">No projects published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
