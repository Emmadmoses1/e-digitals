import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen bg-white flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <p className="text-xs font-bold text-[#f97316] tracking-widest uppercase mb-6">
              Hello, welcome to
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-[#0a0a0a] leading-none tracking-tight mb-2">
              E-DIGITALS
            </h1>
            <h2 className="text-5xl md:text-7xl font-black text-[#f97316] leading-none tracking-tight mb-8">
              STUDIO
            </h2>
            <p className="text-base text-[#6b7280] leading-relaxed mb-10 max-w-md">
              We are a creative studio specialising in brand identity design and web development for ambitious businesses ready to stand out.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link href="/work" className="btn-primary">
                View Our Work <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-outline">
                Start a Project
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#f3f4f6]">
              {[
                { number: '120+', label: 'Projects Done' },
                { number: '50+', label: 'Happy Clients' },
                { number: '5+', label: 'Years Experience' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-black text-[#0a0a0a]">{s.number}</p>
                  <p className="text-xs text-[#9ca3af] font-medium mt-1 tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — decorative visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-[420px] h-[480px]">
              {/* Main block */}
              <div className="absolute inset-0 bg-[#0a0a0a] rounded-none flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-[#f97316] flex items-center justify-center mb-6">
                  <span className="text-white font-black text-5xl">E</span>
                </div>
                <p className="text-white font-black text-2xl tracking-tight">E-DIGITALS</p>
                <p className="text-[#6b7280] text-sm mt-2 tracking-widest uppercase">Creative Studio</p>
              </div>

              {/* Accent corner */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#f97316]" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-4 border-[#f97316]" />

              {/* Floating stat */}
              <div className="absolute -right-12 top-1/3 bg-white shadow-xl border border-[#f3f4f6] p-4 w-36">
                <p className="text-xs text-[#9ca3af] font-medium uppercase tracking-wide mb-1">Client Rating</p>
                <p className="text-2xl font-black text-[#0a0a0a]">5.0 <span className="text-[#f97316]">★</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
