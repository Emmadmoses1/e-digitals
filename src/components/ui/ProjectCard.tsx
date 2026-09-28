import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  project: {
    id: string
    title: string
    slug: string
    category?: string | null
    shortDescription?: string | null
    coverImage?: string | null
    client?: string | null
    year?: string | null
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="group block bg-white border border-[#f3f4f6] hover:border-[#f97316] transition-colors">
      <div className="aspect-video bg-[#f3f4f6] overflow-hidden relative">
        {project.coverImage ? (
          <Image src={project.coverImage} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#f97316] font-black text-3xl">E</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-bold text-[#f97316] uppercase tracking-widest mb-2">{project.category}</p>
        <h3 className="font-black text-[#0a0a0a] text-lg leading-tight mb-2 group-hover:text-[#f97316] transition-colors">{project.title}</h3>
        {project.shortDescription && <p className="text-sm text-[#9ca3af] line-clamp-2">{project.shortDescription}</p>}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#f3f4f6]">
          <span className="text-xs text-[#9ca3af]">{project.client ?? ''}</span>
          <span className="text-xs text-[#9ca3af]">{project.year ?? ''}</span>
        </div>
      </div>
    </Link>
  )
}
