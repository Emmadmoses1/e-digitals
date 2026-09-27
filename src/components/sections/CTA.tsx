import Link from 'next/link'
import FadeUp from '@/components/animations/FadeUp'

export default function CTA() {
  return (
    <section className="section border-t border-[var(--color-border)]">
      <div className="container">
        <div className="max-w-3xl">
          <FadeUp>
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
              Let&apos;s Work Together
            </span>
            <h2 className="text-heading-xl mt-3 mb-6">
              Have a project
              <br />
              <span className="text-[var(--color-text-secondary)]">
                in mind?
              </span>
            </h2>
            <p className="text-body-lg text-[var(--color-text-secondary)] mb-10 max-w-lg">
              Let&apos;s build something remarkable. I&apos;m available for brand
              identity and web development projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="btn btn-primary text-xs tracking-wider uppercase"
              >
                Start a Project
              </Link>
              <Link
                href="/work"
                className="btn btn-outline text-xs tracking-wider uppercase"
              >
                View My Work
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
