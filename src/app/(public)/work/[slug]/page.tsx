import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } }).catch(() => null)
  if (!project || !project.published) notFound()

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <Link href="/work" className="text-xs font-bold text-[#9ca3af] uppercase tracking-widest hover:text-[#f97316] transition-colors mb-8 inline-block">
          ← Back to Work
        </Link>
        <p className="text-xs font-bold text-[#f97316] uppercase tracking-widest mb-3">{project.category}</p>
        <h1 className="text-4xl md:text-5xl font-black text-[#0a0a0a] mb-6">{project.title}</h1>
        <div className="flex gap-6 text-sm text-[#9ca3af] mb-10">
          {project.client && <span><strong className="text-[#0a0a0a]">Client:</strong> {project.client}</span>}
          {project.year && <span><strong className="text-[#0a0a0a]">Year:</strong> {project.year}</span>}
        </div>
        {project.coverImage && (
          <div className="relative aspect-video mb-10 bg-[#f3f4f6]">
            <Image src={project.coverImage} alt={project.title} fill className="object-cover" unoptimized />
          </div>
        )}
        {project.description && (
          <div className="mb-8">
            <h2 className="text-xs font-bold text-[#f97316] uppercase tracking-widest mb-3">Overview</h2>
            <p className="text-[#6b7280] leading-relaxed">{project.description}</p>
          </div>
        )}
        {project.challenge && (
          <div className="mb-8">
            <h2 className="text-xs font-bold text-[#f97316] uppercase tracking-widest mb-3">The Challenge</h2>
            <p className="text-[#6b7280] leading-relaxed">{project.challenge}</p>
          </div>
        )}
        {project.solution && (
          <div className="mb-8">
            <h2 className="text-xs font-bold text-[#f97316] uppercase tracking-widest mb-3">Solution</h2>
            <p className="text-[#6b7280] leading-relaxed">{project.solution}</p>
          </div>
        )}
        {project.outcome && (
          <div className="mb-8">
            <h2 className="text-xs font-bold text-[#f97316] uppercase tracking-widest mb-3">Outcome</h2>
            <p className="text-[#6b7280] leading-relaxed">{project.outcome}</p>
          </div>
        )}
        {project.projectUrl && (
          <a href={project.projectUrl} target="_blank" rel="noopener noreferrer"
            className="inline-block bg-[#f97316] text-white font-black text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#ea6c0a] transition-colors">
            View Live Project →
          </a>
        )}
      </div>
    </div>
  )
}
