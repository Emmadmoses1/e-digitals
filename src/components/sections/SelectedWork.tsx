import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  slug: string
  category: string
  shortDescription?: string | null
  coverImage?: string | null
  client?: string | null
  year?: string | null
}

export default function SelectedWork({ projects }: { projects: Project[] }) {
  if (!projects.length) return null
  const [featured, ...rest] = projects

  return (
    <section className="section bg-white">
      <div className="container-tight">

        <div className="flex items-end justify-between mb-12">
          <div className="relative">
            <p className="text-[#f97316] text-xs font-bold tracking-widest uppercase mb-2">02.</p>
            <div className="relative">
              <h2 className="text-5xl md:text-7xl font-black text-[#0a0a0a] leading-none">Work</h2>
              <span className="hidden md:block absolute top-0 left-0 text-[100px] font-black text-[#0a0a0a]/5 leading-none select-none pointer-events-none -z-10">Work</span>
            </div>
          </div>
          <Link href="/work" className="btn-ghost">
            View All Work
          </Link>
        </div>

        {/* Featured project */}
        <Link href={`/work/${featured.slug}`} className="group block mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 border border-[#e5e7eb] hover:border-[#f97316]/40 hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[4/3] bg-[#f3f4f6] overflow-hidden">
              {featured.coverImage ? (
                <Image src={featured.coverImage} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full min-h-[280px] bg-[#0a0a0a] flex items-center justify-center">
                  <span className="text-[#f97316] font-black text-6xl">E</span>
                </div>
              )}
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
              <span className="tag-accent mb-4 inline-block">{featured.category}</span>
              <h3 className="text-2xl md:text-3xl font-black text-[#0a0a0a] mb-4 leading-tight">{featured.title}</h3>
              {featured.shortDescription && (
                <p className="text-[#6b7280] text-sm leading-relaxed mb-6">{featured.shortDescription}</p>
              )}
              <div className="flex items-center gap-4 text-xs text-[#9ca3af] font-medium mb-8">
                {featured.client && <span>{featured.client}</span>}
                {featured.year && <><span>·</span><span>{featured.year}</span></>}
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#f97316] group-hover:gap-3 transition-all uppercase tracking-wider">
                View Case Study <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </Link>

        {/* Grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rest.map((p) => (
              <Link key={p.id} href={`/work/${p.slug}`} className="group block border border-[#e5e7eb] hover:border-[#f97316]/40 hover:shadow-md transition-all duration-300">
                <div className="relative aspect-[4/3] bg-[#f3f4f6] overflow-hidden">
                  {p.coverImage ? (
                    <Image src={p.coverImage} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center">
                      <span className="text-[#f97316] font-black text-4xl">E</span>
                    </div>
                  )}
                </div>
                <div className="p-6 bg-white">
                  <span className="tag-accent mb-3 inline-block">{p.category}</span>
                  <h3 className="font-black text-[#0a0a0a] mb-3 text-lg leading-tight">{p.title}</h3>
                  <span className="text-xs font-bold text-[#f97316] inline-flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-wider">
                    View Project <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
