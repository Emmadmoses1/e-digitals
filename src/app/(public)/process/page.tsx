export const metadata = { title: 'Process' }

export default function ProcessPage() {
  const steps = [
    { num: '01', title: 'Discovery', desc: 'We start by understanding your business, goals, audience, and competitors through in-depth research and consultation.' },
    { num: '02', title: 'Strategy', desc: 'We develop a clear strategic direction that will guide all creative decisions and ensure the work achieves your objectives.' },
    { num: '03', title: 'Design', desc: 'Our team crafts distinctive visual solutions — from brand identities to full digital experiences — with precision and care.' },
    { num: '04', title: 'Delivery', desc: 'We deliver polished, production-ready assets and provide support to ensure a smooth launch and handover.' },
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-12">
          <p className="text-xs font-bold text-[#f97316] uppercase tracking-widest mb-3">How We Work</p>
          <h1 className="text-5xl font-black text-[#0a0a0a]">Our Process</h1>
        </div>
        <div className="space-y-0">
          {steps.map((s, i) => (
            <div key={s.num} className={`flex gap-8 py-10 ${i < steps.length - 1 ? 'border-b border-[#f3f4f6]' : ''}`}>
              <span className="text-5xl font-black text-[#f3f4f6] shrink-0 w-16">{s.num}</span>
              <div>
                <h2 className="text-xl font-black text-[#0a0a0a] mb-3">{s.title}</h2>
                <p className="text-[#9ca3af] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
