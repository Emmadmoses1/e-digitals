import Link from 'next/link'
import { ArrowRight, Palette, Monitor, Code, Globe, Layers, Zap } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette size={28} />,
  Monitor: <Monitor size={28} />,
  Code: <Code size={28} />,
  Globe: <Globe size={28} />,
  Layers: <Layers size={28} />,
  Zap: <Zap size={28} />,
}

interface Service {
  id: string
  title: string
  description?: string | null
  icon?: string | null
}

export default function ServicesPreview({ services }: { services: Service[] }) {
  return (
    <section className="section bg-[#f9fafb]">
      <div className="container-tight">

        {/* Header like reference */}
        <div className="flex items-end justify-between mb-12">
          <div className="relative">
            <p className="section-number text-[#f97316] text-xs font-bold tracking-widest uppercase mb-2">01.</p>
            <div className="relative">
              <h2 className="text-5xl md:text-7xl font-black text-[#0a0a0a] leading-none">Services</h2>
              <span className="hidden md:block absolute top-0 left-0 text-[100px] font-black text-[#0a0a0a]/5 leading-none select-none pointer-events-none -z-10">Services</span>
            </div>
          </div>
          <Link href="/services" className="btn-ghost">
            View All Services
          </Link>
        </div>

        {/* Services grid — first card orange like reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={s.id}
              className={`p-8 transition-all duration-300 ${i === 0 ? 'bg-[#f97316] text-white' : 'bg-white border border-[#e5e7eb] hover:border-[#f97316]/40 hover:shadow-md'}`}
            >
              <div className={`mb-6 ${i === 0 ? 'text-white' : 'text-[#f97316]'}`}>
                {iconMap[s.icon || ''] || <Zap size={28} />}
              </div>
              <h3 className={`text-lg font-bold mb-3 ${i === 0 ? 'text-white' : 'text-[#0a0a0a]'}`}>
                {s.title}
              </h3>
              {s.description && (
                <p className={`text-sm leading-relaxed ${i === 0 ? 'text-white/80' : 'text-[#6b7280]'}`}>
                  {s.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
