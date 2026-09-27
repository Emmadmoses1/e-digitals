import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-black text-2xl tracking-tight mb-4">
              E-<span className="text-[#f97316]">DIGITALS</span>
            </p>
            <p className="text-[#6b7280] text-sm leading-relaxed">
              A creative studio building brand identities and digital experiences for ambitious businesses.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#6b7280] mb-5">Navigation</p>
            <div className="flex flex-col gap-3">
              {[['Home', '/'], ['Work', '/work'], ['Services', '/services'], ['About', '/about'], ['Contact', '/contact']].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm text-[#9ca3af] hover:text-[#f97316] transition-colors font-medium">{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#6b7280] mb-5">Contact</p>
            <a href="mailto:hello@e-digitals.com" className="text-[#f97316] text-sm font-bold hover:text-[#ea6c0a] transition-colors">
              hello@e-digitals.com
            </a>
            <p className="text-[#6b7280] text-sm mt-4 leading-relaxed">Available for freelance projects worldwide.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 mt-6 text-xs font-bold tracking-widest uppercase border border-[#2a2a2a] px-4 py-3 text-white hover:border-[#f97316] hover:text-[#f97316] transition-all">
              Start a Project →
            </Link>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6b7280]">© {year} E-DIGITALS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-[#6b7280] hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-[#6b7280] hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
