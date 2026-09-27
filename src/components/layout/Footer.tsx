import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-[#f97316] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">E</span>
              </span>
              <span className="font-bold tracking-tight">E-DIGITALS</span>
            </div>
            <p className="text-[#6b7280] text-sm leading-relaxed">
              Brand identity & digital experiences that help businesses grow.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#6b7280] mb-4">Navigation</p>
            <div className="flex flex-col gap-3">
              {[['Work', '/work'], ['Services', '/services'], ['About', '/about'], ['Process', '/process'], ['Contact', '/contact']].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm text-[#9ca3af] hover:text-white transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#6b7280] mb-4">Get In Touch</p>
            <a href="mailto:hello@e-digitals.com" className="text-sm text-[#f97316] hover:text-[#ea6c0a] transition-colors font-medium">
              hello@e-digitals.com
            </a>
            <p className="text-sm text-[#9ca3af] mt-4 leading-relaxed">
              Available for freelance projects and collaborations.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-white border border-white/20 px-4 py-2 rounded-full hover:border-[#f97316] hover:text-[#f97316] transition-all">
              Start a project →
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6b7280]">© {year} E-DIGITALS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-[#6b7280] hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-[#6b7280] hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
