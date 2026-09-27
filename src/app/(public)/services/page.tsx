import { prisma } from '@/lib/prisma'
import PageTransition from '@/components/animations/PageTransition'
import FadeUp from '@/components/animations/FadeUp'
import Link from 'next/link'
import { Palette, Monitor, Code, Globe, Layers, Zap, Star, Heart } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Brand identity design and web development services.',
}

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette size={24} />,
  Monitor: <Monitor size={24} />,
  Code: <Code size={24} />,
  Globe: <Globe size={24} />,
  Layers: <Layers size={24} />,
  Zap: <Zap size={24} />,
  Star: <Star size={24} />,
  Heart: <Heart size={24} />,
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  }).catch(() => [])

  return (
    <PageTransition>
      <section className="pt-40 pb-20">
        <div className="container">
          <FadeUp>
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
              Services
            </span>
            <h1 className="text-heading-xl mt-2 mb-6">What I Do</h1>
            <p className="text-body text-[var(--color-text-secondary)] max-w-xl mb-16">
              From brand strategy to web development — a complete creative
              and digital service for ambitious businesses.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <FadeUp key={s.id} delay={i * 0.1}>
                <div className="border border-[var(--color-border)] rounded-lg p-8 hover:border-[var(--color-border-light)] transition-colors h-full">
                  <div className="w-10 h-10 flex items-center justify-center text-[var(--color-accent)] mb-5">
                    {s.icon && iconMap[s.icon] ? iconMap[s.icon] : <span className="text-sm font-medium">0{i + 1}</span>}
                  </div>
                  <h2 className="text-heading-md mb-3">{s.title}</h2>
                  {s.description && (
                    <p className="text-body text-[var(--color-text-secondary)]">{s.description}</p>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp className="mt-20 pt-16 border-t border-[var(--color-border)]">
            <div className="max-w-2xl">
              <h2 className="text-heading-lg mb-4">Ready to start?</h2>
              <p className="text-body text-[var(--color-text-secondary)] mb-8">
                Let&apos;s discuss your project and how I can help bring your brand vision to life.
              </p>
              <Link href="/contact" className="btn btn-primary text-xs tracking-wider uppercase">
                Start a Project
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </PageTransition>
  )
}
