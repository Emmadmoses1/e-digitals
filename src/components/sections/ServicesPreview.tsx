import Link from 'next/link'
import { ArrowRight, Palette, Monitor, Code, Globe } from 'lucide-react'
import { Service } from '@/types'

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette size={20} />,
  Monitor: <Monitor size={20} />,
  Code: <Code size={20} />,
  Globe: <Globe size={20} />,
}

interface ServicesPreviewProps {
  services: Service[]
}

export default function ServicesPreview({ services }: ServicesPreviewProps) {
  return (
    <section className="section border-t border-[var(--color-border)]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left */}
          <div className="lg:col-span-4">
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
              What I Do
            </span>
            <h2 className="text-heading-xl mt-2 mb-6">
              Services
            </h2>
            <p className="text-body text-[var(--color-text-secondary)] mb-8">
              From brand strategy to web development — I handle the full
              creative and digital process.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:gap-3 transition-all group"
            >
              All Services
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-[var(--color-border)]">
              {services.map((service, i) => (
                <div
                  key={service.id}
                  className="py-6 flex items-start gap-6 group hover:pl-2 transition-all duration-300"
                >
                  <div className="w-8 h-8 flex items-center justify-center text-[var(--color-accent)] shrink-0 mt-0.5">
                    {service.icon && iconMap[service.icon]
                      ? iconMap[service.icon]
                      : <span className="text-sm font-medium">0{i + 1}</span>
                    }
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {service.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
