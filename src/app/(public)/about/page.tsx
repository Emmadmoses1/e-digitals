import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-12">
          <p className="text-xs font-bold text-[#f97316] uppercase tracking-widest mb-3">About Us</p>
          <h1 className="text-5xl font-black text-[#0a0a0a]">E-DIGITALS STUDIO</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-[#6b7280] leading-relaxed mb-6">
              E-DIGITALS STUDIO is a brand identity design and web development studio founded by Emmanuel Dakudina Moses. We create distinctive visual identities and modern digital experiences for ambitious businesses.
            </p>
            <p className="text-[#6b7280] leading-relaxed">
              Every project is approached with strategic thinking, creative excellence, and a commitment to delivering results that make brands stand out.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { num: '120+', label: 'Projects Completed' },
              { num: '50+', label: 'Happy Clients' },
              { num: '5+', label: 'Years Experience' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-4 border-b border-[#f3f4f6] pb-4">
                <span className="text-3xl font-black text-[#f97316]">{s.num}</span>
                <span className="text-sm font-bold text-[#0a0a0a]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#f97316] text-white font-black text-xs uppercase tracking-widest px-6 py-4 hover:bg-[#ea6c0a] transition-colors">
          Work With Us <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
