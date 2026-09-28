import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen bg-white flex items-end pt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-end min-h-[calc(100vh-64px)]">

          {/* Left — text */}
          <div className="flex flex-col justify-center py-16 lg:py-0">
            <p className="text-xs font-bold text-[#f97316] tracking-widest uppercase mb-6">
              Hello, my name is
            </p>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-[#0a0a0a] leading-none tracking-tight mb-2">
              Emmanuel
            </h1>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-[#0a0a0a] leading-none tracking-tight mb-8">
              Moses
            </h1>
            <p className="text-xs font-bold text-[#6b7280] tracking-widest uppercase mb-8">
              I&apos;m a Brand Identity Designer &amp; Web Developer
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/work" className="btn-primary">
                View My Work <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-outline">
                Hire Me
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

          {/* Right — photo */}
          <div className="relative hidden lg:flex items-end justify-center h-full min-h-[calc(100vh-64px)]">
            {/* Orange background block behind photo */}
            <div className="absolute bottom-0 right-0 w-4/5 h-[90%] bg-[#f97316]/10" />

            {/* Orange accent squares */}
            <div className="absolute top-24 right-8 w-16 h-16 bg-[#f97316]" />
            <div className="absolute top-40 right-0 w-8 h-8 border-4 border-[#f97316]" />

            {/* Photo — flush to bottom */}
            <div className="relative z-10 w-[380px] h-[520px]">
              <Image
                src="/images/emmanuel.jpg"
                alt="Emmanuel Moses"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Gradient fade at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-xl border border-[#f3f4f6] p-5 w-44 z-20">
              <p className="text-xs text-[#9ca3af] font-medium uppercase tracking-wide mb-1">Client Rating</p>
              <p className="text-2xl font-black text-[#0a0a0a]">5.0 <span className="text-[#f97316]">★</span></p>
            </div>

            <div className="absolute right-4 top-1/3 bg-[#f97316] p-5 w-40 z-20">
              <p className="text-xs text-white/80 font-medium uppercase tracking-wide mb-1">Projects Done</p>
              <p className="text-2xl font-black text-white">120 +</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
