import Link from 'next/link'

const footerLinks = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/process', label: 'Process' },
  { href: '/contact', label: 'Contact' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container">
        {/* Top */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-sm font-semibold tracking-[0.15em] uppercase text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
            >
              E-DIGITALS
            </Link>
            <p className="mt-3 text-xs text-[var(--color-text-muted)] tracking-wider uppercase">
              Brand Identity Designer
              <br />
              Web Developer
            </p>
            <p className="mt-6 text-sm text-[var(--color-text-secondary)] max-w-xs leading-relaxed">
              Creating distinctive brands and digital experiences for ambitious businesses.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-medium tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-5">
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-5">
              Get In Touch
            </p>
            <a
              href="mailto:hello@e-digitals.com"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
            >
              hello@e-digitals.com
            </a>
            <div className="mt-6">
              <Link
                href="/contact"
                className="btn btn-outline text-xs tracking-wider uppercase"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {year} E-DIGITALS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
