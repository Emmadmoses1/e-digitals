import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

export default function CTA() {
  return (
    <section className="section bg-[#f97316]">
      <div className="container-tight text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Have a project in mind?
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
          We&apos;d love to hear about your project. Let&apos;s talk about how we can help your business grow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#f97316] px-8 py-4 rounded-full font-bold hover:bg-[#f3f4f6] transition-colors">
            Start a Project <ArrowRight size={16} />
          </Link>
          <a href="mailto:hello@e-digitals.com" className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
            <Mail size={16} /> hello@e-digitals.com
          </a>
        </div>
      </div>
    </section>
  )
}
