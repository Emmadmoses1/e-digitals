import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

export default function CTA() {
  return (
    <section className="bg-[#f97316] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none mb-6">
          Have a Project<br />in Mind?
        </h2>
        <p className="text-white/80 text-base mb-10 max-w-xl mx-auto">
          Let&apos;s create something amazing together. We&apos;re ready to bring your vision to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-[#1a1a1a] transition-colors">
            Start a Project <ArrowRight size={16} />
          </Link>
          <a href="mailto:hello@e-digitals.com" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-[#f97316] transition-all">
            <Mail size={16} /> Email Us
          </a>
        </div>
      </div>
    </section>
  )
}
