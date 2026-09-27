import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
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
    <section className="section bg-[#f9fafb]">
      <div className="container-tight">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="tag-accent mb-3 inline-block">Our Work</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] tracking-tight">Selected Projects</h2>
          </div>
          <Link href="/work" className="btn-ghost font-semibold text-[#0a0a0a]">
            View all projects <ArrowRight size={16} />
          </Link>
        </div>

        {/* Featured */}
        <Link href={`/work/${featured.slug}`} className="group block mb-6">
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto bg-[#f3f4f6] overflow-hidden">
                {featured.coverImage ? (
                  <Image src={featured.coverImage} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full min-h-[280px] flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#f97316]/20 rounded-2xl flex items-center justify-center">
                      <span className="text-[#f97316] font-black text-2xl">E</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="tag-accent mb-4 inline-block">{featured.category}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] mb-4 tracking-tight">{featured.title}</h3>
                {featured.shortDescription && (
                  <p className="text-[#6b7280] leading-relaxed mb-6">{featured.shortDescription}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-[#9ca3af] mb-6">
                  {featured.client && <span>{featured.client}</span>}
                  {featured.year && <><span>·</span><span>{featured.year}</span></>}
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#f97316] group-hover:gap-3 transition-all">
                  View Case Study <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rest.map((p) => (
              <Link key={p.id} href={`/work/${p.slug}`} className="group card overflow-hidden block">
                <div className="relative aspect-[4/3] bg-[#f3f4f6] overflow-hidden">
                  {p.coverImage ? (
                    <Image src={p.coverImage} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[#f97316] font-black text-2xl">E</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="tag-accent mb-3 inline-block">{p.category}</span>
                  <h3 className="font-bold text-[#0a0a0a] mb-2">{p.title}</h3>
                  <span className="text-sm font-semibold text-[#f97316] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Project <ArrowRight size={14} />
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
