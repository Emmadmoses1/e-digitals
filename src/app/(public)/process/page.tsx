import PageTransition from '@/components/animations/PageTransition'
import FadeUp from '@/components/animations/FadeUp'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Process',
  description: 'How I work — from discovery to launch.',
}

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Every great project starts with understanding. I take time to learn about your business, your audience, your competitors and your goals. This foundation shapes every decision that follows.',
  },
  {
    number: '02',
    title: 'Strategize',
    description:
      'With a clear picture of your world, I define the creative and digital direction. Brand positioning, visual language, content strategy and technical architecture are all established here.',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'This is where strategy becomes visible. I craft the visual identity, user interface and digital experience — with precision, intention and craft at every level.',
  },
  {
    number: '04',
    title: 'Develop',
    description:
      'The approved design is built into a functional, fast and responsive digital product. Clean code, optimised performance and careful attention to detail throughout.',
  },
  {
    number: '05',
    title: 'Refine',
    description:
      'Before launch, everything is reviewed, tested and polished. Your feedback is incorporated and every detail is checked against the original vision.',
  },
  {
    number: '06',
    title: 'Launch',
    description:
      'Your brand and digital product go live. I handle deployment, provide handover documentation and remain available for support as you grow.',
  },
]

export default function ProcessPage() {
  return (
    <PageTransition>
      <section className="pt-40 pb-20">
        <div className="container">
          <FadeUp>
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
              Process
            </span>
            <h1 className="text-heading-xl mt-2 mb-6">How I Work</h1>
            <p className="text-body text-[var(--color-text-secondary)] max-w-xl mb-20">
              A clear, collaborative process designed to deliver exceptional
              results — on time, every time.
            </p>
          </FadeUp>

          <div className="max-w-3xl">
            {steps.map((step, i) => (
              <FadeUp key={step.number} delay={i * 0.1}>
                <div className="flex gap-8 pb-12 border-b border-[var(--color-border)] mb-12 last:border-0 last:mb-0 last:pb-0">
                  <div className="shrink-0">
                    <span className="text-4xl font-medium text-[var(--color-border-light)]">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-heading-md mb-3">{step.title}</h2>
                    <p className="text-body text-[var(--color-text-secondary)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp className="mt-20 pt-16 border-t border-[var(--color-border)]">
            <h2 className="text-heading-lg mb-4">Ready to begin?</h2>
            <p className="text-body text-[var(--color-text-secondary)] mb-8">
              Let&apos;s start with a conversation about your project.
            </p>
            <Link href="/contact" className="btn btn-primary text-xs tracking-wider uppercase">
              Start a Project
            </Link>
          </FadeUp>
        </div>
      </section>
    </PageTransition>
  )
}
