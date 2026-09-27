import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen bg-white flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#f97316]/10 text-[#f97316] text-xs font-semibold px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-[#f97316] rounded-full animate-pulse" />
              Available for new projects
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0a0a] leading-tight tracking-tight mb-6">
              We Build Brands &{' '}
              <span className="text-[#f97316]">Digital</span>{' '}
              Experiences
            </h1>

            <p className="text-lg text-[#6b7280] leading-relaxed mb-8 max-w-lg">
              E-DIGITALS is a creative studio specialising in brand identity design and web development for ambitious businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/work" className="btn-primary">
                View Our Work <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-outline">
                Start a Project
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 pt-8 border-t border-[#f3f4f6]">
              <div className="flex -space-x-2">
                {['#f97316', '#0a0a0a', '#6b7280', '#374151'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f97316" className="text-[#f97316]" />)}
                </div>
                <p className="text-xs text-[#6b7280]"><span className="font-semibold text-[#0a0a0a]">50+</span> happy clients</p>
              </div>
            </div>
          </div>

          {/* Right — visual */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main card */}
              <div className="absolute inset-8 bg-[#0a0a0a] rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#f97316] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-black text-3xl">E</span>
                  </div>
                  <p className="text-white font-bold text-xl tracking-tight">E-DIGITALS</p>
                  <p className="text-[#6b7280] text-sm mt-1">Creative Studio</p>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute top-4 right-0 bg-white rounded-2xl shadow-xl p-4 border border-[#f3f4f6]">
                <p className="text-xs text-[#6b7280] mb-1">Projects Done</p>
                <p className="text-2xl font-bold text-[#0a0a0a]">120+</p>
              </div>

              <div className="absolute bottom-4 left-0 bg-[#f97316] rounded-2xl shadow-xl p-4">
                <p className="text-xs text-white/80 mb-1">Client Rating</p>
                <p className="text-2xl font-bold text-white">5.0 ★</p>
              </div>

              <div className="absolute bottom-20 right-2 bg-white rounded-2xl shadow-xl p-3 border border-[#f3f4f6]">
                <p className="text-xs text-[#6b7280]">Years Experience</p>
                <p className="text-xl font-bold text-[#0a0a0a]">5+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
