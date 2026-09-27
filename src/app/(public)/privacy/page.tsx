import PageTransition from '@/components/animations/PageTransition'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <PageTransition>
      <section className="pt-40 pb-20">
        <div className="container max-w-3xl">
          <h1 className="text-heading-xl mb-10">Privacy Policy</h1>
          <div className="flex flex-col gap-8 text-body text-[var(--color-text-secondary)]">
            <div>
              <h2 className="text-heading-md text-[var(--color-text-primary)] mb-3">Information I Collect</h2>
              <p>When you submit the contact form, I collect your name, email address, company name and project details. This information is used solely to respond to your enquiry.</p>
            </div>
            <div>
              <h2 className="text-heading-md text-[var(--color-text-primary)] mb-3">How I Use Your Information</h2>
              <p>Your information is used only to communicate with you about your project enquiry. I do not sell, share or distribute your personal information to third parties.</p>
            </div>
            <div>
              <h2 className="text-heading-md text-[var(--color-text-primary)] mb-3">Data Storage</h2>
              <p>Contact form submissions are stored securely in my database. You may request deletion of your data at any time by emailing hello@e-digitals.com.</p>
            </div>
            <div>
              <h2 className="text-heading-md text-[var(--color-text-primary)] mb-3">Contact</h2>
              <p>For any privacy-related questions, contact me at hello@e-digitals.com.</p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
