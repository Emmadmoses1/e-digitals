import PageTransition from '@/components/animations/PageTransition'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Service' }

export default function TermsPage() {
  return (
    <PageTransition>
      <section className="pt-40 pb-20">
        <div className="container max-w-3xl">
          <h1 className="text-heading-xl mb-10">Terms of Service</h1>
          <div className="flex flex-col gap-8 text-body text-[var(--color-text-secondary)]">
            <div>
              <h2 className="text-heading-md text-[var(--color-text-primary)] mb-3">Services</h2>
              <p>E-DIGITALS provides brand identity design and web development services. All project scopes, timelines and deliverables are agreed upon in writing before work begins.</p>
            </div>
            <div>
              <h2 className="text-heading-md text-[var(--color-text-primary)] mb-3">Payment</h2>
              <p>A deposit is required before work begins. Payment terms are outlined in each project proposal and must be agreed upon before the project commences.</p>
            </div>
            <div>
              <h2 className="text-heading-md text-[var(--color-text-primary)] mb-3">Intellectual Property</h2>
              <p>Upon full payment, clients receive full ownership of the final deliverables. E-DIGITALS retains the right to display the work in its portfolio.</p>
            </div>
            <div>
              <h2 className="text-heading-md text-[var(--color-text-primary)] mb-3">Revisions</h2>
              <p>Each project includes a defined number of revision rounds as outlined in the project proposal. Additional revisions are billed at the agreed hourly rate.</p>
            </div>
            <div>
              <h2 className="text-heading-md text-[var(--color-text-primary)] mb-3">Contact</h2>
              <p>For questions about these terms, contact hello@e-digitals.com.</p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
