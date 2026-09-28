import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Services' }

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  }).catch(() => [])

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-12">
          <p className="text-xs font-bold text-[#f97316] uppercase tracking-widest mb-3">What We Do</p>
          <h1 className="text-5xl font-black text-[#0a0a0a]">Services</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div key={s.id} className="border border-[#f3f4f6] p-8 hover:border-[#f97316] transition-colors group">
              <p className="text-xs font-bold text-[#f97316] mb-4">0{i + 1}.</p>
              <h2 className="text-xl font-black text-[#0a0a0a] mb-3 group-hover:text-[#f97316] transition-colors">{s.title}</h2>
              {s.description && <p className="text-sm text-[#9ca3af] leading-relaxed">{s.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
