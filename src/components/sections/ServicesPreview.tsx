import Link from 'next/link'
import { ArrowRight, Palette, Monitor, Code, Globe, Layers, Zap } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette size={24} />,
  Monitor: <Monitor size={24} />,
  Code: <Code size={24} />,
  Globe: <Globe size={24} />,
  Layers: <Layers size={24} />,
  Zap: <Zap size={24} />,
}

interface Service {
  id: string
  title: string
  description?: string | null
  icon?: string | null
}

export default function ServicesPreview({ services }: { services: Service[] }) {
  return (
    <section className="section bg-white">
      <div className="container-tight">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="tag-accent mb-3 inline-block">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] tracking-tight">Our Services</h2>
          </div>
          <Link href="/services" className="btn-ghost font-semibold text-[#0a0a0a]">
            All services <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div key={s.id} className="card p-8 group hover:shadow-lg">
              <div className="w-12 h-12 bg-[#f97316]/10 text-[#f97316] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#f97316] group-hover:text-white transition-all duration-300">
                {iconMap[s.icon || ''] || <Zap size={24} />}
              </div>
              <h3 className="text-lg font-bold text-[#0a0a0a] mb-3">{s.title}</h3>
              {s.description && (
                <p className="text-[#6b7280] text-sm leading-relaxed">{s.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-12 bg-[#0a0a0a] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Ready to start your project?</h3>
            <p className="text-[#9ca3af] text-sm">Let&apos;s create something amazing together.</p>
          </div>
          <Link href="/contact" className="btn-primary whitespace-nowrap">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
